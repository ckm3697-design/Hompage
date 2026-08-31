# 삼원 홈페이지 (템플릿 기반) 관리 가이드

상단 메뉴를 누르면 실제로 다른 HTML 파일로 이동하는 **다중 페이지 구조**입니다.
회사소개·제품안내처럼 하위 항목이 있는 영역은 페이지 좌측에 **사각형 박스형
소분류 이동 메뉴**가 있어서, 같은 대분류 안의 다른 페이지로 바로 이동할 수
있습니다.

jQuery, GSAP, Swiper가 전부 `resources/js/plugin.js` 안에 번들되어 있어서
별도 설치 없이 GitHub Pages에 그대로 올리면 동작합니다.

## 페이지 구성 (총 10개)

| 파일 | 내용 | 좌측 소분류 메뉴 |
|---|---|---|
| `index.html` | 홈 — 히어로 + 신뢰 배지 마퀴 + 왜 삼원인가 미리보기 + 제품 카테고리 타일 + CTA 배너 | 없음 |
| `about.html` | 회사소개 &gt; 회사개요 + 왜 삼원인가 | 회사개요 / 인사말 / 회사 연혁 |
| `about-greeting.html` | 회사소개 &gt; 인사말 | 〃 |
| `about-history.html` | 회사소개 &gt; 회사 연혁 | 〃 |
| `products.html` | 제품안내 &gt; 난연 PVC 파이프 (16/22/28/36mm 탭) | 4개 카테고리 |
| `products-fire.html` | 제품안내 &gt; 소방 배관자재 | 〃 |
| `products-fitting.html` | 제품안내 &gt; 이음관·부속자재 | 〃 |
| `products-insulation.html` | 제품안내 &gt; 보온·단열자재 | 〃 |
| `location.html` | 오시는 길 — 지도, 주소 | 없음 |
| `contact.html` | 문의하기 — 견적 문의 폼 + CTA | 없음 |

상단 메가메뉴(PC)와 모바일 풀메뉴 모두 이 10개 페이지로 정확히 연결되어
있고, 지금 보고 있는 대분류 메뉴는 파란 밑줄로, 좌측 소분류 메뉴는 파란
배경으로 현재 위치가 표시됩니다.

## 파일 구성

```
index.html, about.html, about-greeting.html, about-history.html,
products.html, products-fire.html, products-fitting.html,
products-insulation.html, location.html, contact.html      ← 10개 페이지
resources/
  css/
    setting.css                ← 폰트, 기본 변수 (거의 수정 불필요)
    plugin.css                 ← Swiper 등 라이브러리 스타일 (수정 금지)
    templatehouse.css          ← 프레임워크 공통 스타일 (수정 금지)
    style.css                  ← 섹션별 레이아웃 스타일 (원본, 수정 비권장)
    site-overrides.css         ← 삼원 브랜드 색상 · 로고 · 소분류 박스 등
                                   (여기를 수정하세요)
  js/
    plugin.js                  ← jQuery + GSAP + Swiper 번들 (수정 금지)
    templatehouse.js, style.js, setting.js  ← 탭/슬라이드 동작 로직 (수정 금지)
    site-custom.js              ← 홈페이지 추가 섹션의 스크롤 애니메이션 (여기서 확장하세요)
  images/
    logo.png, logo_w.png       ← 헤더/푸터 로고
  images_custom/                ← 블루 톤 배경 이미지 (히어로, 회사소개 아이콘)
  icons_custom/                 ← 체크포인트 아이콘, 제품 규격 다이어그램
  icons/                        ← 템플릿 기본 아이콘 (네이버/카카오 지도, 닫기 등)
```

**절대 건드리면 안 되는 파일**: `plugin.js`, `templatehouse.js`, `style.js`,
`setting.js`, `templatehouse.css`, `plugin.css` — 이 파일들이 탭 전환, 슬라이드,
모바일 메뉴 등 모든 동작을 담당합니다. 여기를 수정하면 10개 페이지 전부에서
동작이 깨질 수 있어요.

**색상을 바꾸고 싶다면** `site-overrides.css`의 `:root` 안 `--primary`,
`--secondary` 값만 바꾸면 버튼·포인트 색상이 10개 페이지 전체에서 한 번에
바뀝니다.

---

## 홈페이지에 추가한 섹션 (마퀴 · 미리보기 · 타일)

첫 화면이 히어로 하나로 끝나면 밋밋해서, 히어로와 CTA 배너 사이에 세 가지를
추가했습니다 (모두 `index.html` 안에 있습니다):

1. **신뢰 배지 마퀴** — "KS 인증", "난연 2급 인증" 같은 문구가 좌우로 끊임없이
   흐르는 띠입니다. 실제 거래처 수 같은 과장하기 쉬운 숫자 대신, 사실에
   기반한 인증·품질 관련 문구로 채웠습니다. 문구를 바꾸려면 `trust-marquee-track`
   안의 `<span>` 목록을 수정하면 됩니다 (앞뒤로 두 번 반복되어 있어야 끊김
   없이 흐릅니다 — 하나를 고치면 반복된 두 곳 모두 똑같이 고쳐주세요).
2. **왜 삼원인가 미리보기** — `about.html`의 체크포인트 중 3가지를 뽑아 카드로
   보여주고, "더 알아보기" 버튼으로 연결했습니다. 스크롤해서 화면에 들어오면
   아래에서 위로 살짝 올라오며 나타나는 애니메이션이 적용되어 있어요.
3. **제품 카테고리 바로가기 타일** — 4개 카테고리 페이지로 바로 이동하는
   타일입니다. 마우스를 올리면 살짝 떠오르고 아이콘이 회전하는 효과가 있어요.

이 애니메이션은 `class="reveal-up"`이 붙은 요소라면 어디에나 적용됩니다.
새 섹션에도 같은 효과를 쓰고 싶다면 해당 요소에 `reveal-up` 클래스만
추가하면 되고, `resources/js/site-custom.js`는 수정할 필요 없습니다.

---

## 소분류 이동 박스 (좌측 사각형 메뉴)

`about.html`, `products.html` 등 하위 항목이 있는 페이지에는 이런 구조가
들어있습니다:

```html
<aside class="subnav-box">
  <div class="subnav-title">회사소개</div>
  <ul class="subnav-list">
    <li><a class="active" href="about.html">회사개요</a></li>
    <li><a href="about-greeting.html">인사말</a></li>
    <li><a href="about-history.html">회사 연혁</a></li>
  </ul>
</aside>
```

- 현재 페이지에 해당하는 `<a>`에 `class="active"`를 넣으면 파란 배경으로
  강조됩니다.
- 새 소분류를 추가하려면: ① 새 HTML 파일을 만들고 ② **같은 그룹의 모든
  페이지**(회사소개라면 3개 파일 전부)의 `subnav-list`에 `<li>` 항목을
  똑같이 추가해야 합니다. 한 파일에만 추가하면 페이지마다 메뉴가 달라 보여요.

---

## 회사 연혁 항목 추가하는 방법

`about-history.html`에서 아래 형태를 복사해서 원하는 위치에 추가하면 됩니다
(최신 연도가 위로 오도록 정렬되어 있어요):

```html
<li class="history-item">
  <span class="history-year">2027</span>
  <span class="history-text">새로운 소식을 여기에 입력</span>
</li>
```

## 인사말 문구 수정하는 방법

`about-greeting.html`에서 `greeting-lead`(첫 인사말 한 줄), `greeting-desc`
안의 `<p>` 문단들, 하단의 대표이사 이름을 찾아 바꾸면 됩니다.

## 제품 규격/항목 추가하는 방법

각 카테고리 페이지(`products.html`, `products-fire.html` 등)는 탭 형태로
구성되어 있습니다. 항목을 추가하려면 `col-left`의 `info` 목록, `col-right`의
`tabset-list` 탭, `col-right`의 `thumb` 이미지 블록 — 이 세 곳에 순서를 맞춰
항목을 하나씩 늘려야 합니다 (순서가 어긋나면 탭을 눌렀을 때 다른 정보가
표시돼요).

새 카테고리 자체를 추가하려면(예: "밸브류"): 기존 카테고리 페이지 하나를
복사해서 내용을 바꾼 뒤, **`products` 관련 4개 페이지 전부**의 소분류 메뉴에
새 항목을 추가하고, 헤더 메가메뉴·모바일 풀메뉴의 "제품안내" 하위 목록에도
링크를 추가해주세요.

---

## 사진 교체하는 방법

지금은 실제 사진이 없어서 **블루 톤 그라디언트 이미지**로 자리를 채워뒀습니다
(`images_custom/`, `icons_custom/` 폴더). 실제 사진이 생기면 해당 파일을
같은 이름으로 덮어쓰거나, HTML의 `src` 경로를 새 파일명으로 교체해주세요.
가로세로 비율은 정사각형(1:1)에 가까운 사진이 가장 잘 맞습니다.

---

## GitHub Pages에 올리는 방법

1. [github.com](https://github.com)에서 새 저장소 생성 (Public)
2. 10개 HTML 파일과 `resources` 폴더 전체를 저장소 루트에 업로드
   (`Add file` → `Upload files`, 폴더째로 드래그)
3. 저장소 `Settings` → `Pages` → Branch를 `main` / `/(root)`로 설정 → Save
4. 1~2분 후 `https://내아이디.github.io/저장소이름/` 주소로 접속

---

## 문의하기 페이지 (개인정보 미수집 방식)

보안을 위해 홈페이지에서는 이름·연락처 등을 입력받는 문의 양식을 두지 않기로
했습니다. 그래서 `contact.html`은 데이터를 입력받는 폼 대신, 전화번호와
이메일을 눌러서 바로 연결되는 **연락 카드** 두 개로 구성되어 있습니다
(`tel:`, `mailto:` 링크 — 방문자가 직접 전화 앱이나 메일 앱을 열어 연락하는
방식이라, 홈페이지 자체는 어떤 개인정보도 입력받거나 저장하지 않습니다).

전화번호나 이메일을 바꾸고 싶다면 `contact.html`에서 아래 두 줄을 찾아
수정하면 됩니다:

```html
<a href="tel:02-1234-5678" class="contact-direct-card">
<a href="mailto:sales@samwon.co.kr" class="contact-direct-card">
```

`href`의 값과 카드 안에 보이는 전화번호·이메일 텍스트를 함께 바꿔주세요.

같은 이유로 원래 템플릿에 있던 개인정보 수집동의 체크박스, 개인정보
처리방침 모달, 이메일 무단수집 거부 안내 등 개인정보 관련 내용은 10개
페이지 전부에서 삭제했습니다.

---

## 오시는 길 지도 링크 수정하기

1. [네이버 지도](https://map.naver.com)에서 정확한 위치 검색 → `공유` → 단축 URL 복사
2. [카카오맵](https://map.kakao.com)에서도 동일하게 단축 URL 복사
3. `location.html`의 `href="https://map.naver.com/..."`,
   `href="https://map.kakao.com/..."` 부분을 복사한 단축 URL로 교체

---

## 회사 정보 수정하는 방법

전화번호(`02-1234-5678`), 이메일(`sales@samwon.co.kr`), 주소는 **10개 페이지
전부**의 헤더·푸터에 공통으로 들어있고, `location.html`과 `contact.html`에는
오시는 길·연락 카드에도 들어있습니다. 파일마다 브라우저의
찾기(Ctrl+F / Cmd+F)로 옛 값을 검색해 하나씩 바꿔주세요.

---

## 자주 묻는 질문

- **탭을 눌러도 화면이 안 바뀌어요** → `resources/js/` 폴더 전체가 함께
  업로드됐는지 확인해주세요.
- **로고 색이 이상하게 보여요** → 헤더가 맨 위(사진 위 투명 상태)에 있을 때
  로고 색이 반전되던 원본 템플릿 효과는 `site-overrides.css`에서 이미
  꺼뒀습니다. 그래도 이상하면 이 파일이 제대로 업로드됐는지 확인해주세요.
- **상단 네비게이션 바 색이 스크롤에 따라 바뀌었으면 좋겠어요** → 지금은
  요청에 따라 항상 흰색으로 고정되어 있습니다. `site-overrides.css`에서
  "네비게이션 바 색상 고정" 부분을 지우면 원래 템플릿의 투명→흰색 전환
  효과로 되돌릴 수 있습니다.
- **소분류 메뉴에서 현재 페이지가 강조 표시 안 돼요** → 해당 `<a>` 태그에
  `class="active"`가 붙어 있는지 확인해주세요.
- **수정한 내용이 사이트에 안 보여요** → 저장(Commit) 후 1~2분 기다렸다가
  강력 새로고침(Ctrl+Shift+R / Cmd+Shift+R) 해보세요.
