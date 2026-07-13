# Day 1 — Claude Code로 배우는 AI 코딩 입문

> AXT CC · 7월 14일 13:00–18:00 · 5시간 · Mac / Windows 모두 대응

**오늘의 목표:**
- Claude Code를 실행하고 첫 프롬프트를 던질 수 있다
- Claude가 만든 웹페이지를 로컬 서버에서 확인할 수 있다
- 마음에 안 드는 부분을 명확히 말해서 고칠 수 있다
- CLAUDE.md와 단축키로 효율적으로 작업할 수 있다

---

## 시간표

| 시간 | 파트 | 내용 | 소요 |
|------|------|------|------|
| 13:00 | A | 기본 개념 & 환경 준비 | 60분 |
| 14:00 | B | Claude Code 설치 | 60분 |
| 15:00 | — | 휴식 | 15분 |
| 15:15 | C | 첫 웹페이지 만들기 | 75분 |
| 16:30 | D | 수정 사이클 & 레벨업 | 90분 |

---

## Part A — 기본 개념 & 환경 준비 ⏱ 60분

### Step 0. 시작 전에 알아둘 기본 용어

**[이론]**

| 단어 | 한 줄 설명 | 비유 |
|------|-----------|------|
| 브라우저 | 인터넷 페이지를 보여주는 프로그램 | TV 화면 |
| 에디터 (VS Code) | 코드를 쓰는 메모장 | 코딩용 Word |
| 터미널 | 글자로 컴퓨터에 명령 내리는 검은 창 | AI 스피커 키보드 버전 |
| Claude Code | 터미널 안에서 내 파일을 직접 만들고 고치는 AI | 내 책상에 앉은 개발자 동료 |
| 폴더 / 경로 | 파일들을 담는 상자 / 파일이 어디 있는지 알려주는 주소 | 서랍 / 집 주소 |

**Claude.ai vs Claude Code — 이 차이가 핵심:**

| 종류 | 어디서 | 무엇을 |
|------|-------|-------|
| Claude (웹/앱) | 브라우저, 핸드폰 | 대화하며 글·코드 받기 (텍스트로 표시) |
| **Claude Code** | 터미널 | **내 컴퓨터에 진짜 파일을 만들고 저장** |

---

### Step 1. VS Code 설치하기

**[실습]**

공식 다운로드: https://code.visualstudio.com/download

**Mac:**
1. `Mac` 버튼 → zip 다운로드 → 더블클릭 → 파란 아이콘을 **응용 프로그램** 폴더로 드래그
2. ⭐ `code` 명령어 PATH 등록 (필수):
   - `⌘ + Shift + P` → `shell command` 입력 → "Shell Command: Install 'code' command in PATH" 클릭

**Windows:**
1. `.exe` 다운로드 → 더블클릭 설치
2. ⭐ "PATH에 추가" 체크박스 반드시 체크

한국어 팩 (선택): Extensions → `Korean` 검색 → Korean Language Pack → Install → Restart

**[확인]**
- [ ] VS Code 열면 Welcome 탭 보임
- [ ] (Mac) code 명령어 PATH 등록 완료
- [ ] (Windows) "Code로 열기" 우클릭 메뉴 있음

---

### Step 2. 프로젝트 폴더 만들고 열기

**[이론]**

폴더 이름 규칙: 영어 소문자만 · 띄어쓰기 대신 하이픈(-) · 특수문자/한글 금지
- ❌ `내 첫 번째 웹앱`, `포트폴리오 (2026)`
- ✅ `my-first-web`, `portfolio-2026`

**[실습]**

**GUI (마우스):**
- Mac: 바탕화면 우클릭 → 새로운 폴더 → `my-first-web` → VS Code: File → Open Folder
- Windows: 우클릭 → 새로 만들기 → 폴더 → 우클릭 → "Code(으)로 열기"

**터미널:**
```bash
# Mac
cd ~/Desktop && mkdir my-first-web && cd my-first-web && code .

# Windows PowerShell
cd $HOME\Desktop && mkdir my-first-web && cd my-first-web && code .
```

**[확인]**
- [ ] VS Code Explorer에 `▾ MY-FIRST-WEB` 표시됨

---

## Part B — Claude Code 설치 ⏱ 60분

### Step 3. Claude Code 설치하기

**[이론]**

설치 흐름: `3-0` Node.js 확인 → `3-1` 없으면 설치 → `3-2` Claude Code 설치 → `3-3` 첫 실행 & 로그인 → `3-4` 첫 인사

**[실습]**

**3-0. Node.js 확인:**
```bash
node --version
```
버전이 나오면 3-2로 건너뛰기. `command not found`면 3-1에서 설치.

**3-1. Node.js 설치:** https://nodejs.org → LTS 버튼
- Mac: `.pkg` → 더블클릭 → "계속 → 동의 → 설치" → 터미널 재시작
- Windows: `.msi` → 더블클릭 → Next 계속 (⚠️ "Automatically install the necessary tools" 체크 해제)

**3-2. Claude Code 설치:**
```bash
npm install -g @anthropic-ai/claude-code
# Mac에서 permission denied 시:
sudo npm install -g @anthropic-ai/claude-code
```

**3-3. 첫 실행 & 로그인:**
```bash
cd ~/Desktop/my-first-web
claude
```
"Claude account (recommended)" 선택 → Enter → 브라우저 로그인 → "Authorize Claude Code" 클릭

**3-4. 첫 인사:**
```
> 안녕! 너는 누구야?
> 지금 이 폴더 안에 뭐가 있어?
```

**[확인]**
- [ ] `node --version` → v18 이상 출력
- [ ] 환영 화면 확인, 로그인 완료
- [ ] 인사 & 폴더 내용 물어보기 성공

---

## Part C — 첫 웹페이지 만들기 ⏱ 75분

### Step 4. 첫 프롬프트로 웹페이지 만들기

**[이론]**

| ❌ 나쁜 프롬프트 | ✅ 좋은 프롬프트 |
|----------------|----------------|
| "웹페이지 만들어" | **무엇을** / **어떻게** / **어떤 형태로** 세 가지를 챙긴다 |

**[실습]**

```
내 자기소개 웹페이지를 만들어줘.

요구사항:
- 파일은 index.html 하나만
- 제목은 "안녕, 나는 [본인 이름]"
- 짧은 자기소개 한 문단
- 좋아하는 것 3가지 리스트
- 다크모드 디자인 (검은 배경, 밝은 글자)
- 가운데 정렬

CSS는 같은 HTML 파일 안에 <style> 태그로 넣어줘.
```

💡 권한 창이 뜨면 "Yes, and don't ask again for this session" 선택.

**보너스 — 스크린샷으로 디자인 보여주기:**
- Mac: `⌘ + Shift + 4` → 드래그 → PNG 저장 → 터미널에 드래그
- Windows: `Win + Shift + S` → 영역 선택 → 저장 후 터미널에 드래그

**[확인]**
- [ ] VS Code Explorer에 `index.html` 생성됨

---

### Step 5. 로컬 서버로 결과 보기

**[이론]**

| 항목 | 파일 더블클릭 | 로컬 서버 |
|------|-------------|----------|
| 자동 새로고침 | ❌ 수동 F5 | ✅ (Live Server) |
| 실제 환경과 유사 | ❌ | ✅ |

**[실습]**

**방법 1. Live Server ⭐ 추천:**
1. Extensions → `Live Server` 검색 → Ritwick Dey → Install
2. `index.html` 열기 → 오른쪽 아래 `[ Go Live ]` 클릭
3. 파일 저장 시 자동 새로고침

**방법 2. npx serve:**
```bash
npx serve   # http://localhost:3000 에서 접속. 종료: Ctrl+C
```
⚠️ 자동 새로고침 없음 — F5로 수동 새로고침 필요.

**[확인]**
- [ ] 브라우저에서 자기소개 페이지를 봤다
- [ ] Live Server 자동 새로고침이 작동한다

💡 "Go Live" 안 보임 → HTML 파일이 열려 있어야 합니다.

---

## Part D — 수정 사이클 & 레벨업 ⏱ 90분

### Step 6. 수정 사이클

**[이론]**

```
① Claude에게 시킨다
② 결과를 본다 (브라우저 확인)
③ 마음에 안 드는 부분을 찾는다
④ 구체적으로 말한다 ("OO을 OO로 바꿔줘")
⑤ 새로고침해서 확인 → 다시 ①로
```

피드백 3원칙: ① **어디를** · ② **어떻게** · ③ **얼마나**

| ❌ 나쁜 피드백 | ✅ 좋은 피드백 |
|--------------|--------------|
| "별로야", "뭔가 이상해" | "제목이 너무 작아. 두 배로 키워줘." |

**[실습]**

**`!` 접두사 — 터미널 명령 바로 실행:**
```
> !ls                  # 폴더 내용 확인
> !open index.html     # 브라우저로 열기 (Mac)
> !start index.html    # 브라우저로 열기 (Windows)
```

**에러 보고:**
```
방금 수정 후 제목이 사라졌어.
콘솔 에러: "Uncaught SyntaxError: ..."
확인하고 고쳐줘.
```
💡 브라우저 콘솔: F12 → Console 탭. 빨간 글씨를 복사해서 주세요.

**되돌리기:**
- `Esc × 1` — 작업 중단
- `Esc × 2` — 체크포인트 복원

**`/resume` — 터미널 닫았을 때:**
```bash
cd ~/Desktop/my-first-web && claude
> /resume
```

**[확인]**
- [ ] 3번 이상의 수정 사이클을 돌려봤다
- [ ] `!` 접두사로 터미널 명령 실행해봤다
- [ ] 에러 메시지를 복사해서 Claude에 전달해봤다
- [ ] `Esc × 2`로 되돌리기 시도해봤다

> "여러분이 오늘 배워가야 할 건 코딩 문법이 아닙니다. **AI한테 명확하게 말하는 능력**입니다. '어디를, 어떻게, 얼마나' — 이게 바이브 코딩의 전부예요."

---

### Step 7. CLAUDE.md와 단축키로 레벨업

**[이론]**

Claude Code를 끄고 다시 켜면 이전 대화를 기억 못합니다. **CLAUDE.md**는 폴더 안의 메모 파일 — 매번 자동으로 먼저 읽어서 항상 기억한 상태로 일해줍니다.

**[실습]**

**CLAUDE.md 만들기:**
```
> /init   # 자동 생성
```

**권장 구조:**
```markdown
# 절대 규칙 ⚠️
- 답변은 항상 한국어로
- !important 사용 금지

# 아키텍처
- HTML, CSS, JS 파일 분리

# 디자인 취향
- 다크 모드 (배경: #1a1a2e, 글자: #f5f5f7)

# 코드 규칙
- CSS 변수(:root)로 색상 관리
```
⚠️ 300줄 이하로 유지

**필수 단축키:**

| 단축키 | 기능 |
|--------|------|
| `Shift + Tab` | Plan ↔ Accept 전환 |
| `Esc × 1` | 작업 중단 |
| `Esc × 2` | 체크포인트 복원 |
| `↑ 화살표` | 이전 명령어 가져오기 |

**슬래시 명령어:**

| 명령어 | 기능 | 언제 |
|--------|------|------|
| `/clear` | 대화 초기화 (파일 유지) | 새 작업 시작 시 |
| `/compact` | 대화 압축 (맥락 유지) | 같은 작업 계속, 공간 확보 |
| `/context` | 토큰 사용량 확인 | 80% 넘으면 /clear 타이밍 |
| `/resume` | 이전 세션 복구 | 터미널 닫았을 때 |
| `/init` | CLAUDE.md 자동 생성 | 새 프로젝트 시작 |

**커스텀 명령어 (고급):**
```
.claude/commands/배포준비.md → /배포준비 로 실행됨
```

**[확인]**
- [ ] CLAUDE.md 생성 완료
- [ ] `Shift + Tab`으로 Plan ↔ Accept 전환 시도
- [ ] `/clear`, `/compact`, `/context` 사용해봄
- [ ] `/resume`이 뭔지 안다

---

## 치트시트

**터미널 기본 명령어:**
```bash
pwd         # 현재 위치 확인
ls          # 폴더 내용 보기 (Mac)
dir         # 폴더 내용 보기 (Windows)
cd 폴더     # 폴더 이동
cd ..       # 한 단계 위로
mkdir 폴더  # 폴더 생성
code .      # VS Code로 열기
```

**프롬프트 원칙:**

| 상황 | 3가지 원칙 |
|------|-----------|
| 만들 때 | 무엇을 / 어떻게 / 어떤 형태로 |
| 수정할 때 | 어디를 / 어떻게 / 얼마나 |
| 에러 보고 | 언제 / 무슨 일 / 에러 메시지 |

**막혔을 때:**
- 새로고침? (F5 / ⌘+R)
- 에러 메시지 Claude에게 복사해서 주기
- `Esc × 2`로 되돌리기
- `/clear`로 초기화 후 재시도
- 터미널 닫았으면 `/resume`
