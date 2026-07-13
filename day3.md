# Day 3 — 배포 & Claude Code 고급 자동화 마스터

> AXT CC · 7월 16일 13:00–18:00 · 5시간 · Mac / Windows 모두 대응

**오늘의 목표:**
- Git + Vercel로 만든 사이트를 인터넷에 올릴 수 있다
- Skills로 반복 프롬프트를 재사용 가능한 매뉴얼로 만들 수 있다
- Sub-Agent로 여러 작업을 동시에 병렬 실행할 수 있다
- Hooks로 이벤트 기반 자동화를 구성할 수 있다

---

## 시간표

| 시간 | 파트 | 내용 | 소요 |
|------|------|------|------|
| 13:00 | A | 배포 — Git & Vercel | 60분 |
| 14:00 | B | Skills — AI 업무 매뉴얼 | 75분 |
| 15:15 | — | 휴식 | 15분 |
| 15:30 | C | Sub-Agent — 병렬 실행 | 60분 |
| 16:30 | D | Hooks & 고급 팁 | 90분 |

---

## Part A — 배포 ⏱ 60분

### Step 1. Git에 올리기

**[이론]**

| 이름 | 뭐 |
|------|-----|
| **Git** | 내 컴퓨터에서 돌아가는 버전 관리 프로그램 |
| **GitHub** | Git 코드를 인터넷에 보관해주는 사이트 |

**[실습]**

GitHub 가입: https://github.com → Sign up

Git 설치 확인:
```bash
git --version
# Mac: xcode-select --install
# Windows: git-scm.com/download/win
```

초기 설정 (한 번만):
```bash
git config --global user.name "본인이름"
git config --global user.email "github이메일"
```

**방법 A. GitHub Desktop:**
1. desktop.github.com → 설치 → 로그인
2. File → Add Local Repository → Create a Repository
3. Summary: `첫 커밋` → Commit to main
4. Publish repository → "Keep private" 체크 해제 → Publish

**방법 B. 터미널:**
```bash
git init && git add . && git commit -m "첫 커밋"
git branch -M main
git remote add origin https://github.com/내아이디/프로젝트.git
git push -u origin main
```

이후 업데이트:
```bash
git add . && git commit -m "수정 내용" && git push
```

⚠️ 비밀번호/API 키 코드에 있으면 올리지 말 것. `.gitignore` 만들어달라고 Claude에게 시키기.

**[확인]**
- [ ] GitHub 계정 생성
- [ ] 코드 올리고 브라우저에서 저장소 확인

---

### Step 2. Vercel 배포

**[실습]**

1. vercel.com → Sign up → Continue with GitHub
2. dashboard → Add New → Project
3. 내 저장소 → Import
4. Framework: Other (기본값) → Deploy

자동 재배포: `git push` → Vercel 자동 감지 → 자동 배포

**[확인]**
- [ ] 프로젝트가 인터넷에 배포됨
- [ ] 핸드폰에서 주소 열어봄
- [ ] 코드 수정 → git push → 자동 반영 확인

---

## Part B — Skills — AI 업무 매뉴얼 ⏱ 75분

### Step 3. Skills

**[이론]**

| | 프롬프트 | Skills |
|--|---------|--------|
| 입력 | 매번 | 한 번 만들면 자동 호출 |
| 품질 | 들쭉날쭉 | 일관 |
| 공유 | 어려움 | Git으로 팀 공유 |

**2단계 로딩 방식:**
- 1단계: 스킬 이름 + description만 로드 (항상, ~50-100바이트)
- 2단계: 실제 호출 시 SKILL.md 본문 전체 로드

| 도구 | 평소 공간 | 언제 |
|------|----------|------|
| CLAUDE.md | 전체 매번 | 항상 적용 규칙 |
| **Skills** | 설명만 (~50-100B) | 특정 작업할 때만 |
| Sub-Agent | 에이전트 설명 매번 | 대량 탐색/격리 |

**[실습]**

SKILL.md 구조:
```yaml
---
name: ppt-generator
description: "PPT 발표자료 자동 생성.
  'PPT 만들어줘', '발표자료 작성' 요청 시 트리거."
---

## 목적
주제와 핵심 내용을 입력하면 PPT 발표자료를 자동 생성합니다.

## 절차
1. 발표 주제, 청중, 시간 확인
2. 목차 및 슬라이드 구성 설계
3. 각 슬라이드 내용 작성

## 체크리스트
- [ ] 슬라이드 수가 적절한가?
- [ ] 핵심 메시지가 있는가?
```

description 작성 팁:
- ❌ "문서를 생성하는 스킬" — 너무 추상적
- ✅ "PPT 발표자료 자동 생성. 'PPT 만들어줘', '발표자료 작성' 요청 시 트리거."
- 핵심 기능 첫 문장 + 트리거 표현 3개 이상

만들기:
```bash
# 수동
mkdir -p ~/.claude/skills/ppt-generator
# SKILL.md 작성

# skill-creator (추천)
> /install-plugin skill-creator
> "스킬 만들어줘"  # 자동 트리거
```

| 위치 | 경로 | 적용 |
|------|------|------|
| 개인용 | `~/.claude/skills/<name>/SKILL.md` | 내 모든 프로젝트 |
| 프로젝트용 | `.claude/skills/<name>/SKILL.md` | 이 프로젝트만 (Git 공유) |

**[확인]**
- [ ] SKILL.md frontmatter 구조를 안다
- [ ] description이 트리거 조건임을 안다
- [ ] Skill 하나 만들고 자동 발동 확인

---

## Part C — Sub-Agent & 병렬 실행 ⏱ 60분

### Step 4. Sub-Agent

**[이론]**

메인 Claude 안에서 별도 작업 공간을 가진 도우미를 더 띄우는 것. 조사 결과는 Sub-Agent 쪽에만 남고 메인에는 **요약만** 돌아옴.

핵심 장점:
- **병렬 처리** — 여러 작업 동시 실행
- **컨텍스트 보호** — 메인 컨텍스트 오염 없음
- **전문화** — 각 Sub-Agent에 전문 역할 부여

| Sub-Agent | 모델 | 권한 | 용도 |
|-----------|------|------|------|
| Explore | Haiku (빠름) | 읽기전용 | 코드 탐색, 파일 검색 |
| Plan | 상속 | 읽기전용 | Plan Mode 계획 수립 |
| General-purpose | 상속 | 모든 도구 | 복잡한 다단계 작업 |
| Bash | 상속 | Bash만 | 터미널 명령 실행 |
| Claude Code Guide | Haiku | 읽기전용 | Claude Code 기능 답변 |

⚠️ Sub-Agent는 다른 Sub-Agent를 생성할 수 없음. 메인에서 체인으로 연결.

**[실습]**

커스텀 에이전트 만들기 (`/agents`):
1. `/agents` 입력
2. Create new agent
3. User-level / Project-level 선택
4. Generate with Claude → 설명 입력
5. 도구 선택 → 모델 선택 → 저장

```yaml
---
name: code-reviewer
description: "코드 리뷰 전문가. 품질, 보안, 모범 사례를 검토."
tools: Read, Grep, Glob, Bash
model: sonnet
---

피드백 우선순위:
- 🔴 크리티컬 (반드시 수정)
- 🟡 경고 (수정 권장)
- 🟢 제안 (개선 고려)
```

저장 위치:
- `~/.claude/agents/` — 내 모든 프로젝트 (개인용)
- `.claude/agents/` — 이 프로젝트만 (팀 공유)

실전 패턴:
- **대량 출력 격리** — 테스트 로그를 Sub-Agent에 위임하고 요약만 받기
- **병렬 연구** — 독립 모듈을 각각 동시 분석
- **에이전트 체인** — code-reviewer → optimizer 순차 연결

**[확인]**
- [ ] Sub-Agent와 메인 대화의 차이를 안다
- [ ] 내장 Sub-Agent 5종의 역할을 안다
- [ ] /agents로 커스텀 에이전트 만들어봤다

---

## Part D — Hooks & 고급 팁 ⏱ 90분

### Step 5. Hooks — 자동화 엔진

**[이론]**

이벤트 → Hook 감지 → 액션 실행

| 이벤트 | 타이밍 | 설명 |
|--------|--------|------|
| **PreToolUse** | 도구 호출 직전 | 검증, 승인/차단/수정 |
| **PostToolUse** | 도구 실행 직후 | 린트, 포맷팅 등 후처리 |
| **Notification** | 사용자 응답 대기 시 | 알림 전송, 로깅 |
| **Stop** | 에이전트 턴 종료 시 | 최종 정리, 보고서 생성 |

**[실습]**

방법 1 — Claude에게 요청 (추천):
```
> 알림 Hook 만들어줘. 작업이 끝나면 소리랑 알림 띄워줘.
```

방법 2 — settings.json 직접 편집:
```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "terminal-notifier -title 'Claude Code' -message '알림' && afplay /System/Library/Sounds/Ping.aiff &"
          }
        ]
      }
    ]
  }
}
```

⚠️ Hook 실행 중 Claude는 멈춤. timeout 설정하고 무거운 작업은 `&` 백그라운드로.

**[확인]**
- [ ] 이벤트 타입 4가지를 안다
- [ ] 알림 Hook 하나 만들고 실행 확인

---

### Step 6. 고급 팁 & 통합 워크플로우

**[이론 & 실습]**

**멀티 인스턴스:**
```
탭 1: "Feature-Auth" — 인증 개발
탭 2: "Bug-Fix"      — 버그 수정
```

**Git Worktree:**
```bash
claude -w feature-auth  # 워크트리 생성 + 브랜치 + 세션 자동
```

**음성 입력:**
```
> /voice   # 스페이스바 누르고 말하기. 한국어 지원.
```

**MCP 대신 로컬 Bash 스크립트:**
```bash
# scripts/check-db.sh
psql -h localhost -U dev -d mydb -c "SELECT count(*) FROM users;"
```
```
> check-db.sh 실행해줘   # MCP 연결 불필요
```

**통합 파이프라인 — 8단계 워크플로우:**

| # | 기능 | 시너지 |
|---|------|--------|
| 1 | 음성 입력 | 피드백 10개를 30초에 전달 |
| 2 | 커스텀 MCP (review_plan) | 경쟁 모델로 플랜 검증 |
| 3 | Sub-Agent 병렬 실행 | 프론트/백엔드 동시 작업 |
| 4 | 번들 Skills (/batch) | 우선순위 파일 병렬 수정 |
| 5 | 로컬 Bash 스크립트 | pytest + lint 원커맨드 |
| 6 | Hooks | 작업 완료 자동 알림 |
| 7 | 코드 리뷰 에이전트 | 전체 변경사항 품질 검증 |
| 8 | 커스텀 Skills (client-report) | 보고서 자동 생성 |

수동이면 반나절 → Claude Code 파이프라인으로 30분.

**[확인]**
- [ ] 멀티 인스턴스 + Git Worktree 개념을 안다
- [ ] /voice 써봤다
- [ ] 로컬 Bash vs MCP 차이를 안다
- [ ] 통합 파이프라인의 흐름을 안다

---

## 치트시트

**도구 선택 기준:**

| 도구 | 평소 공간 | 언제 |
|------|----------|------|
| CLAUDE.md | 전체 매번 | 항상 적용 규칙 |
| Skills | 설명만 (~50-100B) | 특정 작업 매뉴얼 |
| Sub-Agent | 에이전트 설명 매번 | 대량 탐색/격리 |
| Hooks | — | 이벤트 기반 자동 실행 |
| 로컬 Bash | — | MCP 불필요한 간단 도구 |

**Hook 이벤트:**
- `PreToolUse` — 도구 호출 직전 (검증/차단)
- `PostToolUse` — 실행 직후 (린트/포맷)
- `Notification` — 응답 대기 시 (알림)
- `Stop` — 턴 종료 시 (정리)

**SKILL.md 템플릿:**
```yaml
---
name: 영-소문자-하이픈
description: "핵심 기능 첫 문장. '트리거1', '트리거2' 요청 시."
---

## 절차
1. 단계 1
2. 단계 2
```
