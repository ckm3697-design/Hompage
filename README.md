# 삼원 홈페이지 (템플릿 기반) 관리 가이드

업로드해주신 템플릿을 기반으로 만든 **한 페이지짜리(원페이지) 홈페이지**입니다.
상단 메뉴를 누르면 같은 페이지 안의 해당 섹션으로 스크롤 이동합니다 (분리된 여러
HTML 파일이 아니라 `index.html` 하나에 모든 섹션이 들어있는 구조예요).

jQuery, GSAP, Swiper가 전부 `resources/js/plugin.js` 안에 번들되어 있어서
별도 설치 없이 GitHub Pages에 그대로 올리면 동작합니다.

## 파일 구성

```
index.html                     ← 전체 페이지 (모든 섹션 포함)
resources/
  css/
    setting.css                ← 폰트, 기본 변수 (거의 수정 불필요)
    plugin.css                 ← Swiper 등 라이브러리 스타일 (수정 금지)
    templatehouse.css          ← 프레임워크 공통 스타일 (수정 금지)
    style.css                  ← 섹션별 레이아웃 스타일 (원본, 수정 비권장)
    site-overrides.css         ← 삼원 브랜드 색상·배경 덮어쓰기 (여기를 수정하세요)
  js/
    plugin.js                  ← jQuery + GSAP + Swiper 번들 (수정 금지)
    templatehouse.js, style.js, setting.js  ← 탭/슬라이드 동작 로직 (수정 금지)
  images/
    logo.png, logo_w.png       ← 헤더/푸터 로고 (업로드하신 로고로 교체됨)
  images_custom/                ← 저희가 새로 만든 블루 톤 배경·아이콘 이미지
  icons_custom/                 ← 체크포인트 아이콘, 파이프 규격 다이어그램
  icons/                        ← 템플릿 기본 아이콘 (네이버/카카오 지도, 화살표 등)
```

**절대 건드리면 안 되는 파일**: `plugin.js`, `templatehouse.js`, `style.js`,
`setting.js`, `templatehouse.css`, `plugin.css` — 이 파일들이 탭 전환, 슬라이드,
모바일 메뉴 등 모든 동작을 담당합니다. 여기를 수정하면 사이트가 깨질 수 있어요.

**색상을 바꾸고 싶다면** `site-overrides.css`의 `:root` 안 `--primary`,
`--secondary` 값만 바꾸면 버튼·포인트 색상이 전체적으로 바뀝니다.

---

## 섹션 구성 (위에서 아래 순서)

| 섹션 | 내용 | id |
|---|---|---|
| 헤더 | 로고 + 메가메뉴(회사소개/제품안내/오시는 길/문의하기) | - |
| 히어로 | 슬라이드 배너 + 메인 카피 | `#hero-section` |
| 회사소개 | SOURCING → QUALITY TEST → CERTIFIED → DELIVERY 4단계 소개 | `#about-section` |
| 왜 삼원인가 | 아이콘 5개 강점 소개 | `#checkpoint-section` |
| 제품 규격 | 16/22/28/36mm 탭 전환식 규격 안내 | `#product-section` |
| 오시는 길 | 본사·영업팀 주소 + 지도 링크 | `#location-section` |
| 견적 문의 폼 | 담당자명/연락처/목적/문의내용 입력 폼 | `#contact-section` |
| CTA 배너 | 전화·문의 바로가기 | `#cta-section` |
| 푸터 | 주소, 연락처, 개인정보처리방침 | - |

메뉴에 새 항목을 추가하려면 헤더 두 곳(PC용 `header-gnblist`, 모바일용
`fullmenu-gnblist`) 모두에 `<li>` 항목을 추가하고, 이동시킬 섹션에
`id="원하는이름"`을 지정한 뒤 `href="#원하는이름"`으로 연결하면 됩니다.

---

## 사진 교체하는 방법

지금은 실제 사진이 없어서 **블루 톤 그라디언트 이미지**로 자리를 채워뒀습니다
(`images_custom/` 폴더). 실제 사진이 생기면:

1. `resources/images_custom/` 폴더에 새 사진 업로드
2. `index.html`에서 아래 이미지들의 `src` 경로를 새 사진 파일명으로 교체

   | 위치 | 현재 플레이스홀더 |
   |---|---|
   | 히어로 슬라이드 3장 | `hero_1.svg`, `hero_2.svg`, `hero_3.svg` |
   | 회사소개 4단계 아이콘 | `about_1.svg` ~ `about_4.svg` |
   | 오시는 길 지도 썸네일 | `map_thumb.svg` (2곳 동일 파일 사용 중) |

3. 히어로 배경, CTA 배너 배경, 제품 규격 섹션 배경은 `site-overrides.css`에서
   그라디언트로 처리되어 있습니다. 실제 사진으로 바꾸려면 해당 규칙의
   `background: 그라디언트... !important;` 부분을
   `background: url(../images_custom/파일명.jpg) no-repeat center/cover !important;`
   로 바꿔주세요. (`.properties-N4`, `.properties-N7 .col-right .item`,
   `.properties-N10` 규칙을 찾으면 됩니다)

가로세로 비율은 정사각형(1:1)에 가까운 사진이 히어로·회사소개 영역에 가장 잘 맞습니다.

---

## 제품 추가하는 방법

지금 구조는 4개 규격(16/22/28/36mm) 탭까지만 지원합니다. 규격을 더 추가하려면
`index.html`의 `id="product-section"` 안에서 아래 3곳에 항목을 하나씩 늘려야 합니다
(탭·좌측 정보·우측 썸네일 세 군데가 순서대로 짝이 맞아야 정상 작동합니다):

1. `col-left` 안의 `info` 목록에 `<div class="item">` 블록 추가
2. `col-right` 안의 `tabset-list`에 `<li class="tabset-item">` 탭 추가
3. `col-right` 안의 `thumb`에 `<div class="item">` 이미지 블록 추가

제품 종류가 많아질수록 관리가 번거로워질 수 있어요. 만약 제품이 계속 늘어날
예정이라면, 이전에 만들어드렸던 **검색·카테고리 필터가 있는 별도 제품 목록
페이지**(`products.json` 기반) 방식이 더 관리하기 쉬울 수 있습니다. 필요하시면
이 템플릿 디자인에 맞춰 그 페이지를 다시 연결해드릴 수 있어요.

---

## GitHub Pages에 올리는 방법

1. [github.com](https://github.com)에서 새 저장소 생성 (Public)
2. `index.html`과 `resources` 폴더 전체를 저장소 루트에 업로드 (`Add file` → `Upload files`,
   폴더째로 드래그)
3. 저장소 `Settings` → `Pages` → Branch를 `main` / `/(root)`로 설정 → Save
4. 1~2분 후 `https://내아이디.github.io/저장소이름/` 주소로 접속

---

## 문의 폼을 실제 이메일로 받기 (Formspree 연동)

이 템플릿의 문의 폼은 원래 템플릿하우스 자체 서버(`api.imbackend.com`)로
전송되는 구조였는데, 이는 템플릿하우스 계정에 연결된 사이트에서만 동작하는
백엔드라 저희 쪽 GitHub Pages 배포본에서는 작동하지 않습니다. 그래서 이전에
안내해드린 것처럼 **Formspree**(무료)로 교체해뒀습니다.

1. [formspree.io](https://formspree.io) 무료 가입
2. `New Form` 생성 → 받을 이메일 주소 입력
3. 발급된 주소가 `https://formspree.io/f/abcdwxyz` 형태로 나옵니다
4. `index.html`에서 아래 부분을 찾아
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   `YOUR_FORM_ID`를 발급받은 값으로 교체
5. 저장 후 홈페이지에서 폼을 한 번 테스트 제출하면 Formspree가 이메일로 알려줍니다

무료 플랜은 월 50건까지 무료입니다.

---

## 오시는 길 지도 링크 수정하기

지금은 주소 텍스트를 기반으로 한 네이버/카카오 지도 검색 링크가 걸려있습니다.
정확한 위치로 연결하고 싶다면:

1. [네이버 지도](https://map.naver.com)에서 정확한 위치 검색 → `공유` → 단축 URL 복사
2. [카카오맵](https://map.kakao.com)에서도 동일하게 단축 URL 복사
3. `index.html`의 `#location-section` 안 `href="https://map.naver.com/..."`,
   `href="https://map.kakao.com/..."` 부분을 복사한 단축 URL로 교체

---

## 회사 정보 수정하는 방법

전화번호(`02-1234-5678`), 이메일(`sales@samwon.co.kr`), 주소는 `index.html`
안에서 여러 곳(헤더 CTA 버튼 근처, 오시는 길, 문의 폼 개인정보 모달, CTA 배너,
푸터)에 나눠서 들어있습니다. 브라우저의 찾기(Ctrl+F / Cmd+F)로 옛 값을 검색해
전체를 한 번에 바꾸시는 걸 추천드려요.

---

## 자주 묻는 질문

- **탭을 눌러도 화면이 안 바뀌어요** → `resources/js/` 폴더 전체가 함께
  업로드됐는지 확인해주세요. 이 폴더가 빠지면 탭 전환, 슬라이드, 모바일 메뉴가
  전부 동작하지 않습니다.
- **모바일에서 이상하게 보여요** → 이 템플릿은 반응형(모바일 대응)입니다. 다만
  저희가 사진 없이 그라디언트로 채운 부분들은 모바일에서 비율이 다르게 보일 수
  있으니, 실제 사진을 넣은 뒤 모바일 화면도 한 번 확인해보시길 권장해요.
- **수정한 내용이 사이트에 안 보여요** → 저장(Commit) 후 1~2분 기다렸다가
  강력 새로고침(Ctrl+Shift+R / Cmd+Shift+R) 해보세요.
