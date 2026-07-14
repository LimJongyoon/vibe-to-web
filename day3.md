# Day 3 — 배포 & 데모데이

> AXT CC · 7월 16일 13:00–17:00 · 4시간 · Mac / Windows 모두 대응

**오늘의 목표:**
- Vercel로 만든 사이트를 실제 인터넷에 배포할 수 있다
- Git Worktree와 멀티인스턴스로 병렬 작업을 심화 운영할 수 있다
- 데모데이에서 내가 만든 결과물을 자신 있게 발표할 수 있다

---

## 시간표

| 시간 | 파트 | 내용 | 소요 |
|------|------|------|------|
| 13:00 | A | 배포 — Vercel | 30분 |
| 13:30 | B | 운영 심화 — 멀티인스턴스 & Git Worktree | 45분 |
| 14:15 | — | 휴식 | 15분 |
| 14:30 | C | 종합 실습 & 데모데이 | 150분 |

---

## Part A — 배포 ⏱ 30분

### Step 23. Vercel 배포

**[이론]**

| 종류 | 의미 |
|------|------|
| 로컬 서버 | 내 컴퓨터에서만 보이는 미리보기 (Live Server) |
| Vercel 배포 | 인터넷에 올려서 누구나 볼 수 있게 ← 지금 |

어제(Day 2) GitHub에 이미 올려둔 코드를 그대로 가져와서 배포합니다.

**[실습]**

1. vercel.com → Sign up → Continue with GitHub
2. dashboard → Add New → Project
3. 내 저장소 → Import
4. Framework: Other (기본값) → Deploy

자동 재배포: 어제 만든 `/commit` 슬래시 커맨드로 커밋 → `git push` → Vercel 자동 감지 → 자동 배포.

배포 옵션 조금 더:

| 설정 | 위치 | 용도 |
|------|------|------|
| 커스텀 도메인 | Settings → Domains | 내 도메인 연결 |
| Preview Deployment | 자동 (main 외 브랜치 push 시) | 브랜치별 미리보기 URL |
| 환경변수 | Settings → Environment Variables | API 키 등 민감정보 관리 |

**[확인]**
- [ ] 프로젝트가 인터넷에 배포됨
- [ ] 핸드폰에서 주소 열어봄
- [ ] 코드 수정 → git push → 자동 반영 확인

---

## Part B — 운영 심화 — 멀티인스턴스 & Git Worktree ⏱ 45분

### Step 24. 멀티인스턴스 & Git Worktree

**[이론]**

**멀티 인스턴스:**
```
탭 1: "Feature-Auth" — 인증 개발
탭 2: "Bug-Fix"      — 버그 수정
```
사람이 직접 탭을 스위칭한다는 점이 Sub-Agent(Claude가 알아서 위임, Day 2에서 배움)와의 차이입니다.

**Git Worktree:**
하나의 저장소에서 여러 개의 작업 디렉토리를 만드는 기능. 커밋 히스토리는 공유, 파일 시스템은 완전히 분리.
```bash
claude -w feature-auth  # 워크트리 생성 + 브랜치 + 세션 자동
```

**심화 — 워크트리 여러 개 동시 운영:**
```bash
claude -w feature-auth      # 워크트리 1: 인증 기능
claude -w bugfix-navbar     # 워크트리 2: 네비 버그 수정 (동시에!)

git worktree list                     # 목록 확인
git worktree remove ../feature-auth   # 정리
```
터미널 탭마다 서로 다른 워크트리에서 Claude를 띄우면, 브랜치 전환 없이 진짜 병렬로 작업할 수 있습니다.

⚠️ 워크트리마다 `npm install` 등 의존성 설치가 따로 필요할 수 있습니다. 무거운 프로젝트라면 2-3개로 제한.

**[실습]**
1. 터미널 탭 2개를 열고 각각 다른 작업 지시해보기
2. `claude -w bugfix-navbar` 실행해서 워크트리 체험
3. `git worktree list`로 확인 → `git worktree remove`로 정리

**[확인]**
- [ ] 멀티 인스턴스와 Sub-Agent의 차이를 안다
- [ ] 상황에 따라 어떤 걸 쓸지 판단할 수 있다
- [ ] Worktree를 만들고 정리까지 해봤다
- [ ] 워크트리 여러 개를 동시에 운영하는 법을 안다

---

## Part C — 종합 실습 & 데모데이 ⏱ 150분

### Step 25. 종합 실습 & 데모데이 준비

**[이론]**

오늘의 대부분은 **자유 작업 시간**입니다. 3일간 배운 모든 도구(Plan Mode, Skills, 슬래시 커맨드, Sub-Agent, MCP, Hooks, Git, Vercel, Worktree)를 자유롭게 조합해서 프로젝트를 마무리하고, 마지막에 다 함께 발표합니다.

**[실습]**

**1부 — 자유 작업 (약 90분)**
1. Plan Mode로 오늘 마무리할 기능 목록 정리
2. 작은 단위로 쪼개서 하나씩 완성 → 확인 → `/clear`
3. 디자인이 아쉬우면 `frontend-design` 등 Skill로 다듬기
4. code-reviewer Sub-Agent로 전체 코드 리뷰
5. (선택) Hook으로 "배포 완료" 알림 설정

**2부 — 배포 & 최종 점검 (약 30분)**
1. 최종 커밋 정리 후 `/commit` → `git push`
2. Vercel 배포가 최신 상태인지 확인
3. 다른 기기에서 실제 배포 URL 접속해보기

**3부 — 데모데이 (약 30분)**
1. 1분 피치 준비: 무엇을 만들었나 / 무엇을 배웠나 / 가장 재미있었던 순간
2. 배포 URL을 화면에 띄우고 순서대로 발표
3. 서로 피드백 주고받기

💡 시간이 빠듯하면 1부를 줄이고 2부·3부(배포 확인 + 데모데이)는 꼭 지키세요. 데모데이가 오늘의 하이라이트입니다.

**[확인]**
- [ ] 최신 코드가 Vercel에 배포되어 있다
- [ ] Sub-Agent 리뷰를 받아봤다
- [ ] 1분 피치가 준비됐다
- [ ] 공유할 배포 URL을 확보했다
- [ ] 발표를 마쳤다 🎉

---

## Day 3 완료 & 워크샵 전체 완료 🎉

- Git + GitHub으로 버전 관리 & 업로드 (Day 2)
- Vercel로 실제 인터넷에 배포
- Skills · 슬래시 커맨드 · Sub-Agent · MCP · Hooks로 자동화 (Day 2)
- 멀티인스턴스 · Worktree로 병렬 작업 심화
- 데모데이에서 내 결과물 발표

3일간 정말 고생 많았습니다! 오늘 배포한 사이트는 계속 인터넷에 살아있습니다. 앞으로도 Claude Code와 함께 계속 만들어보세요. 🎉

---

## 치트시트

**Vercel 배포:**
```
vercel.com → Sign up with GitHub
→ Add New Project → Import → Deploy
# 이후엔 git push만 하면 자동 재배포
```

**Worktree:**
```bash
claude -w feature-auth   # 생성 + 세션 시작
git worktree list        # 목록 확인
git worktree remove ../feature-auth   # 정리
```

**데모데이 1분 피치 구조:**
```
1. 무엇을 만들었나
2. 무엇을 배웠나
3. 가장 재미있었던 순간
```

**3일 전체 로드맵:**
```
Day 1: 첫 웹페이지, Claude Code 기본기
Day 2: 기억 관리 + Git + Skills/슬래시/Sub-Agent/MCP/Hooks 자동화
Day 3: Vercel 배포 + Worktree 심화 + 데모데이
```
