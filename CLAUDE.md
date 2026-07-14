# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Vibe to Web" — AXT CC 3일 워크샵 자료. Claude Code 입문 강의를 위한 정적 웹사이트.

## Development

No build tools. Open directly in browser or use Live Server:

```bash
open index.html          # Mac
start index.html         # Windows
python3 -m http.server   # 로컬 서버로 열기
```

## Architecture

### HTML (강의자료 — 직접 수정 대상)

- **`index.html`** — Day 1 (Steps 0-7, Part A-D)
- **`day2.html`** — Day 2 (Steps 8-22, Part A-E)
- **`day3.html`** — Day 3 (Steps 23-25, Part A-C)
- **`style.css`** — 공통 CSS 디자인 시스템
- **`script.js`** — 탭 전환(`switchTab`) + Intersection Observer 사이드바 하이라이트

### MD (콘텐츠 초안 — HTML 수정 시 함께 업데이트)

- **`plan.md`** — 프로젝트 전체 개요 (워크샵 구조, 파일 설명)
- **`day1.md`** — Day 1 콘텐츠 초안
- **`day2.md`** — Day 2 콘텐츠 초안
- **`day3.md`** — Day 3 콘텐츠 초안

## Page Structure

모든 Day HTML은 동일한 구조를 따름:

```
Hero → 목표 카드 → 시간표
→ Part A (part-section + part-header + step-section들)
→ Part B / C / ... (Day마다 파트 개수 다름 — day2.html은 E까지, day3.html은 C까지)
→ 완료 카드 → 치트시트 Appendix
```

각 step-section 내부:
```
[이론]  section-label label-theory
[실습]  section-label label-practice
[확인]  section-label label-verify
💡 팁   .tip 박스
```

## Design System

CSS 변수 (`style.css` `:root`):

| 변수 | 용도 |
|------|------|
| `--bg` / `--bg2` / `--bg3` | 배경 계층 |
| `--card` | 카드 배경 |
| `--accent` / `--accent2` | 보라색 강조 |
| `--text` / `--text2` / `--text3` | 텍스트 계층 |
| `--code-bg` | 코드 블록 배경 |

컴포넌트 클래스:
- `.part-section` / `.part-header` / `.part-badge` — Day 파트 구분
- `.section-label` + `.label-theory` / `.label-practice` / `.label-verify` — 이론/실습/확인 배지
- `.timetable` / `.timetable-row` — 시간표
- `.tip` / `.warn` / `.info` — 알림 박스
- `.compare-good` / `.compare-bad` — 비교 패널
- `.os-tabs` + `.tab-btn` + `.tab-content` — OS 탭

반응형 브레이크포인트: `900px` (사이드바 숨김, 단일 컬럼)
