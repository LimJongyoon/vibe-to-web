# Vibe to Web — AXT CC 워크샵

> Claude Code로 배우는 AI 코딩 입문 · 완전 비기너용 · Mac / Windows 모두 대응

---

## 워크샵 개요

3일간의 핸즈온 워크샵. 코딩 경험 없이도 Claude Code를 이용해 웹 앱을 만들고 인터넷에 배포하는 것이 목표.

| 날짜 | 주제 | 핵심 결과물 |
|------|------|------------|
| Day 1 | Claude Code 입문 & 첫 웹페이지 | 로컬에서 동작하는 자기소개 페이지 |
| Day 2 | 컨텍스트 관리 · Git · 자동화 도구(Skills·슬래시·Sub-Agent·MCP·Hooks) | GitHub에 올라간 멀티 파일 포트폴리오 사이트 |
| Day 3 | Vercel 배포 · Worktree 심화 · 데모데이 | 인터넷에 배포된 나만의 웹 앱 |

---

## 파일 구조

```
vibe-to-web/
├── index.html      # Day 1 강의자료 (Steps 0-7, Part A-D)
├── day2.html       # Day 2 강의자료 (Steps 8-22, Part A-E)
├── day3.html       # Day 3 강의자료 (Steps 23-25, Part A-C)
├── style.css       # 공통 CSS (다크모드 디자인 시스템)
├── script.js       # 탭 전환 + 사이드바 하이라이트
│
├── plan.md         # 이 파일 — 워크샵 전체 개요
├── day1.md         # Day 1 콘텐츠 초안
├── day2.md         # Day 2 콘텐츠 초안
└── day3.md         # Day 3 콘텐츠 초안
```

---

## 각 Day의 구조

모든 Day는 동일한 템플릿을 따릅니다:

```
[Hero] 제목 + 날짜/시간
[오늘의 목표] 보통 4개 안팎 (콘텐츠 양에 따라 유동적)
[시간표] 파트별 소요시간

[Part A] 제목  ⏱ XX분
  [이론] 핵심 개념 설명
  [실습] 번호 매긴 실행 단계
  [확인] 체크리스트
  💡 팁

[Part B / C / ...] 동일 구조 (파트 개수는 그날 스텝 수에 맞춰 A-D를 넘어갈 수 있음, 예: Day2는 Part E까지)
...
[마무리 체크리스트]
[치트시트 (Appendix)]
```

---

## 개발 환경

빌드 도구 없음. 브라우저에서 직접 열거나 로컬 서버 사용:

```bash
open index.html          # Mac
start index.html         # Windows
python3 -m http.server   # 로컬 서버
```

---

## 디자인 시스템 (style.css)

CSS 변수 (`:root`에 정의):

| 변수 | 용도 |
|------|------|
| `--bg` / `--bg2` / `--bg3` | 배경 계층 |
| `--accent` / `--accent2` | 보라 강조색 |
| `--text` / `--text2` / `--text3` | 텍스트 계층 |

컴포넌트 클래스:
- `.part-section` + `.part-header` + `.part-badge` — Day 파트 구분
- `.section-label` + `.label-theory` / `.label-practice` / `.label-verify` — 이론/실습/확인 배지
- `.timetable` — 시간표 블록
- `.tip` / `.warn` / `.info` — 알림 박스
- `.compare-good` / `.compare-bad` — 비교 패널
- `.os-tabs` + `.tab-btn` + `.tab-content` — OS 탭

반응형 브레이크포인트: `900px` (사이드바 숨김)
