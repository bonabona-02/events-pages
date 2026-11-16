# CLAUDE.md — events.cubig.ai

이 저장소는 CUBIG 행사·캠페인 페이지입니다. `main` 브랜치가 그대로 **https://events.cubig.ai** 에 공개됩니다(GitHub Pages, 정적 HTML).
작업하는 사람은 GitHub에 익숙하지 않을 수 있습니다. git 작업은 Claude가 대신하고, 결과는 쉬운 말로 알려 주세요.
누가 작업하든 같은 결과가 나오도록, 아래 순서와 규칙을 그대로 따릅니다. 절차 안내가 필요하면 `/event-page` 스킬을 씁니다.

## 0. 매번 이 순서로 시작

1. `git checkout main && git pull` 로 최신 상태를 받습니다.
2. 새 브랜치를 만듭니다. 새 페이지 = 폴더 이름(예: `webinar-1201`), 고치기 = `fix-폴더이름`. `main`에 직접 커밋·푸시하지 않습니다(보호돼 있어 막힙니다).
3. 사용자가 원하는 일이 아래 넷 중 무엇인지 확인하고 해당 절차로 갑니다. 애매하면 묻습니다.
   - 새 페이지 → §3 · 기존 페이지 수정 → 그 폴더만 고침 · 섹션 추가 → §4 · 새 양식 → §5
4. 끝내기 전에 `python3 tools/check_pages.py` 를 실행해 오류 0건을 만듭니다. PR을 올리면 GitHub에서도 같은 검사가 자동으로 돕니다.
5. 로컬 미리보기로 확인합니다. 저장소 **루트**에서 실행해야 경로가 맞습니다.
   ```bash
   python3 -m http.server 8090
   ```
   → `http://localhost:8090/폴더이름/` 을 데스크톱(1440px)·모바일(375px)에서 보고, 가로 넘침·깨진 이미지·끊긴 링크가 없는지 확인합니다.
6. 커밋 → 브랜치 푸시 → `gh pr create`. 본문은 `.github/pull_request_template.md` 체크리스트를 채우고 데스크톱·모바일 스크린샷을 붙입니다.
7. PR이 승인돼 합쳐지면 1분 안팎으로 공개됩니다. 승인 전에는 공개되지 않습니다.

## 1. 구조

```
events-pages/
├─ events.json            행사 목록 (공홈 cubig.ai/events 와 머리글 메뉴가 읽음, §6)
├─ assets/                공통 파일 (모든 페이지에 반영)
│  ├─ ev.css              공통 바탕
│  ├─ ev-nav.js           머리글·메뉴·바닥글
│  ├─ ev-detail.css       양식: 전시·행사
│  ├─ ev-pages.css        양식: On air·미팅
│  └─ media/              여러 페이지가 같이 쓰는 이미지
├─ _template/
│  ├─ exhibition/         전시·행사 새 페이지는 여기서 복사
│  └─ live/               On air 새 페이지는 여기서 복사
├─ 폴더이름/index.html     페이지 하나 (영어)
├─ ko/폴더이름/index.html  같은 페이지의 한국어판
├─ meet/                  미팅 예약 페이지
├─ tools/check_pages.py   검사 도구 (GitHub 자동 검사와 같음)
└─ .claude/               팀 공용 Claude Code 설정 (/event-page 스킬, 금지 동작, 미리보기)
```

- 폴더 하나 = 페이지 하나. 폴더 이름이 곧 주소입니다: `webinar-1201/` → `https://events.cubig.ai/webinar-1201/`
- 폴더 이름: 영어 소문자·숫자·하이픈만. 한국어판은 같은 이름으로 `ko/` 아래에 둡니다.
- 그 페이지에서만 쓰는 이미지·PDF는 그 페이지 폴더 안에 둡니다. 이미지는 1MB 이하(.webp·.jpg), 한 파일 100MB 초과 불가. 영상은 YouTube 등에 올리고 삽입합니다(`youtube-nocookie.com` 권장).
- 이미 공개된 폴더의 이름 변경·삭제 금지(광고·메일 링크가 깨짐). 필요하면 사람에게 먼저 묻습니다.
- 루트 `index.html`은 cubig.ai로 넘기는 페이지입니다. 행사 목록(허브)은 공홈 `cubig.ai/events`가 `events.json`을 읽어 보여 줍니다.

## 2. 양식(템플릿)

| 양식 | 언제 | 템플릿 | 전용 스타일 |
|---|---|---|---|
| `exhibition` | 전시·컨퍼런스 부스, 발표 참가 | `_template/exhibition/` | `assets/ev-detail.css` |
| `live` | On air: 크리에이터 라이브·인터뷰·방송 영상 | `_template/live/` | `assets/ev-pages.css` |

- 어느 양식인지 애매하면 사용자에게 묻습니다. 기존 양식으로 안 되면 §5(새 양식)입니다.
- 두 양식 모두 공통 바탕(`ev.css`)과 머리글·바닥글(`ev-nav.js`)을 같이 씁니다.

## 3. 새 페이지 만들기

1. 양식을 정하고 `_template/<양식>/index.html` 을 `폴더이름/index.html` 로 복사합니다. 한국어판이 필요하면 `ko/폴더이름/index.html` 도 만듭니다(영·한 서로 `hreflang` 연결).
2. 맨 위 체크리스트대로 자리표시(`FOLDER-NAME`, `EVENT TITLE` 등)를 모두 바꿉니다. 남아 있으면 검사에서 오류가 납니다.
3. `events.json` 에 한 줄 추가합니다(§6).
4. 검색 노출을 켠 페이지는 `sitemap.xml` 에 주소를 추가합니다(한국어판 포함).
5. §0의 4~7번(검사 → 미리보기 → PR).

## 4. 섹션 추가

먼저 사용자에게 묻습니다: **"이 페이지에만 쓰나요, 다음 행사에도 쓰나요?"**

- **이 페이지에만**: 그 페이지 안에서만 만듭니다. 스타일은 그 페이지의 `<style>` 안에, 클래스 이름 앞에 폴더 이름을 붙입니다(예: `.ais2026-schedule`). 공통 파일은 고치지 않습니다.
- **다음 행사에도**: 템플릿에 주석 블록으로 넣고(필요할 때 주석을 풀어 쓰는 방식), 스타일은 그 양식의 공통 스타일에 추가하고, README의 '섹션 목록'에 한 줄 추가합니다. PR 본문에 '공통 파일 변경'이라고 쓰고 기존 페이지 화면도 확인해 스크린샷을 붙입니다.
- 섹션에 행사별 데이터가 필요하면 `events.json` 에 칸을 **추가만** 합니다(§6).

## 5. 새 양식 만들기

1. 먼저 기존 양식에 섹션만 추가해서 되는지 사용자와 확인합니다. 화면 구성이 정말 다를 때만 새로 만듭니다(예: 폼이 주인공인 웨비나 신청 페이지).
2. 한 PR에 아래를 모두 넣습니다.
   - `_template/<종류>/index.html` (맨 위 체크리스트, ⑤ 추적 코드 포함)
   - `assets/ev-<종류>.css` (공통 바탕 `ev.css`·`ev-nav.js`는 그대로 사용)
   - `events.json` 의 `type` 에 새 값(영어 소문자 한 단어, 예: `webinar`)
   - `assets/ev-nav.js` 메뉴에 그 종류의 이름(영·한)
   - README 양식 표와 이 파일 §2 표에 한 줄
3. 공홈 `cubig.ai/events` 는 모르는 종류를 기본 카드로 보여 줍니다. 따로 묶어 보여 주려면 PR에 '공홈 반영 필요'라고 적습니다.

## 6. events.json (공홈과의 약속)

공홈 `cubig.ai/events` 와 머리글 메뉴가 이 파일을 읽습니다. **기존 칸 이름을 바꾸거나 지우면 공홈이 깨집니다. 칸은 추가만 합니다.** 새 칸을 추가하면 PR에 적습니다.

| 칸 | 필수 | 값 |
|---|---|---|
| `id` | ✅ | 폴더 이름과 같게 |
| `type` | ✅ | `exhibition` · `live` (§2·§5) |
| `title` | ✅ | 행사·방송 이름 |
| `start` | ✅ | `YYYY-MM-DD` (행사 현지 날짜) |
| `end` | | `YYYY-MM-DD` (하루짜리면 생략) |
| `place` | | 도시·장소 또는 방송 채널 |
| `page` | | `폴더이름/index.html`, 페이지가 없으면 `null` |
| `summary` | | 한 줄 소개 |
| `thumb` | | 썸네일 이미지 경로 |
| `video` · `with` · `length` | | On air: 영상 주소 · 함께한 사람·채널 · 길이 |

- 날짜가 지나면 메뉴·공홈에서 자동으로 '지난 행사'로 옮겨집니다. 손으로 상태를 바꾸지 않습니다.

## 7. 건드리지 말 것

- `CNAME`(지우면 events.cubig.ai 연결이 끊김), `.nojekyll`, `.github/`, `.claude/`, `tools/`, 루트 `index.html`, `404.html`, `robots.txt`
- 각 페이지 `<head>`의 **⑤ 추적 코드**(GA4 `G-8MRD9BZ1VJ`). 지우거나 바꾸거나 다른 추적 코드(GTM·픽셀·다른 분석 도구)를 추가하지 않습니다. 필요하면 PR에 요청으로 적습니다.
- 각 페이지의 검색 노출 설정(`noindex` 줄·canonical) — 바꾸려면 사람에게 먼저 묻습니다.
- 공통 파일(`assets/`, `_template/`)은 §4·§5 절차로만 고칩니다.

## 8. 검색 노출 규칙

- **다가오는 행사·On air 페이지 = 검색 노출 켬**(템플릿 기본값). `canonical`을 그 페이지 주소로, 한국어판이 있으면 `hreflang` en·ko를 서로 연결합니다.
- **내부용·테스트 페이지 = 끔**: `<meta name="robots" content="noindex">` 를 넣고 사이트맵에서 뺍니다.
- **끝난 행사**: 검색 유지 여부는 사람이 정합니다(지금 websummit-2026·oracle-ai-world-2026은 유지). 임의로 끄거나 켜지 않습니다. 행사가 끝나면 '예정'으로 쓴 정보(부스 안내·행사 기간 예약 링크)는 빼거나 '지난 행사' 표현으로 바꿉니다. AI 검색이 지난 일정을 현재 정보로 가져갈 수 있습니다.
- **공홈(cubig.ai)과 겹치지 않게 쓰기**: 검색에 나오는 페이지는 행사가 주인공입니다.
  - 제목·설명·첫 제목(h1)에 행사 이름·날짜·장소를 넣습니다(예: `CUBIG at Web Summit Lisbon 2026`).
  - 제품 설명은 2~3문장으로 짧게 쓰고, 자세한 내용은 공홈 페이지로 링크합니다: Syntitan `https://cubig.ai/syntitan/` · LLM Capsule `https://cubig.ai/llmcapsule/` · DTS `https://cubig.ai/dts/`
  - 공홈 문단을 길게 그대로 복사하지 않습니다.
- **사이트맵**: 검색 노출을 켠 페이지(한국어판 포함)는 루트 `sitemap.xml`에 있어야 합니다. 검색 제외로 바꾼 페이지는 뺍니다. 검사 도구가 둘 다 확인합니다.
- 아이콘(파비콘)·이미지 주소는 `https://` 전체 주소 또는 저장소 루트 기준 경로로 씁니다. 이미지는 1MB 이하로 줄입니다(느린 페이지는 검색 순위에 불리).

## 9. UTM·신청 폼

- **페이지 안의 링크(Syntitan·LLM Capsule·cubig.ai·다른 이벤트 페이지)에는 UTM을 붙이지 않습니다.** 방문자의 원래 유입 경로가 덮입니다. 사용자가 붙여 달라고 하면 README의 UTM 규칙을 설명하고 붙이지 않습니다.
- UTM은 메일·SNS·QR·광고처럼 **밖에서 이벤트 페이지로 들어오는 링크**에만 씁니다. 사용자가 그런 링크를 만들어 달라고 하면 README의 값(영문 소문자·하이픈, campaign = 폴더 이름, `utm_term` 금지)으로 만들어 줍니다.
- 신청 폼은 직접 만들지 않고 HubSpot 폼 삽입 코드(Share → Embed code)를 받아 그대로 넣습니다. 코드를 새로 쓰거나 고치지 않습니다. 사용자가 코드를 안 줬으면 README의 HubSpot 절차를 안내합니다. 폼을 넣으면 PR에 '신청 폼 있음 + 폼 이름'을 적습니다.

## 9-1. 미팅 예약 링크

- 예약 링크는 **crm@cubig.ai 공용 계정에서 만든 Google 예약 페이지만** 씁니다. 개인 계정으로 만든 예약 링크는 넣지 않습니다(휴가·퇴사 시 끊김). 누구 계정 링크인지 링크만으로는 알 수 없으니, 사용자에게 확인하고 PR에 적습니다.
- 행사 예약 링크에는 행사 마지막 날을 같이 적습니다. 마지막 날이 지나면 `assets/booking.js` 가 버튼을 상시 30분 미팅 페이지(`/meet/`, 한국어 `/ko/meet/`)로 자동으로 바꾸고, 예약 화면(iframe)·부스 안내 칸은 숨깁니다.
  ```html
  <a class="btn" href="https://calendar.app.google/..." data-booking-until="2026-12-10">Book a meeting</a>
  <iframe src="https://calendar.google.com/calendar/appointments/schedules/...?gv=true" data-booking-until="2026-12-10"></iframe>
  ```
  `<head>`에 `<script src="/assets/booking.js" defer></script>` 가 있어야 합니다(템플릿에 들어 있음).
- 행사가 끝난 뒤 미팅 버튼은 `/meet/` 으로 보냅니다. 상시 30분 미팅 = 공통 예약 링크 `https://calendar.app.google/oCAQAos8bo4denCr7` (crm@cubig.ai). 이 링크는 `/meet/` 페이지에 넣고, `/meet/`이 아직 없는 페이지는 이 링크를 바로 씁니다(마지막 날 적지 않음).
- 사용자가 예약 링크를 주지 않았으면 `/meet/` 으로 연결해 두고 PR에 '행사 예약 링크 필요'라고 적습니다.

## 10. 공개 저장소 주의

이 저장소의 파일과 수정 기록은 **누구나 볼 수 있고, 지워도 기록에 남습니다.** 브랜치에 올린 초안도 바로 보입니다.
- 넣지 말 것: API 키·토큰·비밀번호, 리드 목록·참석자 명단 등 고객 데이터, 고객 실명·연락처, 내부 문서·회의 메모, 미공개 가격·계약, 원본 디자인 파일(.fig·.psd·.ai). (GA4 측정 ID·GTM ID·HubSpot 폼 ID는 공개돼도 괜찮습니다)
- 사용자가 이런 내용을 넣으려 하면 멈추고 알려 주세요.
- 이미 올라갔다면 지우기 전에 사람에게 알리라고 안내합니다(키 교체 등 따로 조치 필요).

## 11. 문구 기준 (CUBIG)

- 제품 이름 표기: `Syntitan`, `LLM Capsule`, `DTS` (`SynTitan`·`syntitan` ❌). <!-- bible-allow: 금지 표기 예시 --> 여러 제품을 나열할 때 순서 = Syntitan → LLM Capsule → DTS.
- 회사 설명: CUBIG은 기업 데이터를 AI 업무에 쓸 수 있게 준비하고 검증하는 회사(영문: AI-ready data operating layer for enterprise AI execution). 보안 회사·합성데이터 회사·마스킹 도구처럼 쓰지 않습니다.
- 금지: 절대 보안 표현(zero exposure, 100% safe, guaranteed compliance, 데이터가 전혀 나가지 않는다), 과장(혁신적·최고·유일·차세대), 경쟁사 실명, 자물쇠·방패 같은 보안 이미지. <!-- bible-allow: 금지 표현 목록 -->
- 숫자·고객 성과·고객 이름·로고·인용·인증·수상은 회사 팩트시트에서 외부 사용이 확인된 것만 씁니다. 확인이 안 되면 넣지 말고 사람에게 묻습니다.
- Gartner는 로고 그림 대신 글자 `Gartner®` 로 쓰고, 새 언급은 PR에 표시합니다.
- 영어 외부 문구에는 엠대시(—)와 큰따옴표를 쓰지 않습니다.

## 12. 끝나면 사람에게 알려 줄 것

- 만든·바꾼 페이지 주소(공개 예정 주소), PR 링크
- 검사 결과(`tools/check_pages.py` 오류 0건인지, 남은 경고)
- 확인한 것(데스크톱·모바일·링크)과 확인 못 한 것
- 사람이 결정해야 할 것(검색 노출, 숫자·고객·Gartner 사용, 예약 링크가 crm@ 계정 것인지, 새 추적 이벤트, 공통 파일 변경, 공홈 반영 필요 등)
