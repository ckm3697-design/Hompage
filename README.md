# 다온파이프 홈페이지 관리 가이드

> 이 사이트는 **PC(데스크톱) 화면을 기준**으로 설계되었습니다. 모바일 반응형이 아니라
> 최소 가로폭 1024px 이상에서 보는 것을 기준으로 사이드바형 제품 카탈로그, 3단 문의 영역 등을
> 구성했습니다. 모바일에서 열면 확대/축소 없이 데스크톱 레이아웃이 그대로(가로 스크롤 가능하게) 보입니다.
>
> 또한 **한 페이지를 쭉 스크롤하는 방식이 아니라, 상단 메뉴를 누르면 각각 별도의 페이지로
> 이동하는 다중 페이지 구조**입니다 (index.html / about.html / products.html / features.html / contact.html).

이 폴더 안의 파일들을 GitHub에 올리면 무료로 회사 홈페이지를 운영할 수 있습니다.
코딩을 몰라도 아래 순서만 따라 하면 됩니다.

## 파일 구성

| 파일 | 설명 | 평소에 수정할 일 |
|---|---|---|
| `index.html` | 홈 (히어로 + 바로가기 카드) | 가끔 |
| `about.html` | 회사소개 페이지 | 가끔 |
| `products.html` | 제품/서비스 페이지 (검색·필터) | - |
| `features.html` | 왜 다온인가 페이지 | 가끔 |
| `contact.html` | 문의하기 페이지 (연락처·지도·폼) | 가끔 |
| `products.json` | 제품 목록 데이터 | **자주** (제품 추가/삭제할 때) |
| `style.css` | 모든 페이지가 공유하는 디자인 | 거의 없음 |
| `app.js` | 제품 검색·필터 로직 (products.html에서만 사용) | 거의 없음 |

**제품을 추가/수정/삭제하는 건 `products.json` 파일 하나만 건드리면 됩니다.**
디자인이 깨질 걱정 없이 안전하게 관리할 수 있도록 데이터와 디자인을 분리해뒀습니다.

각 페이지는 같은 헤더(상단 메뉴)와 푸터를 공유합니다. 메뉴 문구나 링크를 바꾸고 싶다면
5개 HTML 파일 모두에서 `<nav>` 부분을 동일하게 수정해야 합니다 (정적 사이트라 자동으로
공유되지 않습니다).

---

## 1단계. GitHub에 저장소 만들기

1. [github.com](https://github.com) 가입 후 로그인
2. 오른쪽 위 `+` → `New repository` 클릭
3. Repository name에 원하는 이름 입력 (예: `daon-homepage`)
4. `Public` 선택 → `Create repository` 클릭

## 2단계. 파일 업로드

1. 방금 만든 저장소 페이지에서 `Add file` → `Upload files` 클릭
2. 이 폴더의 파일 8개(`index.html`, `about.html`, `products.html`, `features.html`, `contact.html`, `style.css`, `app.js`, `products.json`)를 전부 끌어다 놓기
3. 아래 `Commit changes` 클릭

## 3단계. GitHub Pages 켜기

1. 저장소 상단 메뉴 `Settings` 클릭
2. 왼쪽 메뉴 `Pages` 클릭
3. `Branch`를 `main` / `/(root)`로 선택 후 `Save`
4. 1~2분 기다리면 `https://내아이디.github.io/저장소이름/` 주소로 사이트가 열립니다

---

## 제품 추가하는 방법 (자주 하게 될 작업)

1. 저장소에서 `products.json` 파일 클릭
2. 오른쪽 위 연필 아이콘(Edit) 클릭
3. 아래 형태로 한 칸을 복사해서 추가:

```json
{
  "code": "CAT01-04",
  "category": "생활용품",
  "name": "규격 이름",
  "desc": "제품 한 줄 설명"
}
```

4. 쉼표(,)로 앞 항목과 구분되게 넣고 저장(`Commit changes`)
5. 1분 이내로 홈페이지에 자동 반영됩니다

`category` 이름을 새로 만들면(예: "전자제품") 필터 버튼도 자동으로 생깁니다.

---

## 회사 정보(연락처, 소개 문구) 수정하는 방법

1. `index.html` 파일을 열고 연필 아이콘(Edit) 클릭
2. 다음 텍스트를 찾아 원하는 내용으로 바꾸기:
   - 전화번호: `02-1234-5678`
   - 이메일: `sales@daonpipe.co.kr`
   - 주소: `서울특별시 중구 을지로 00길 00, 3층`
   - 회사소개 문단, 통계 숫자(거래처 수, 취급 품목 수 등)
3. 저장(`Commit changes`)

---

## 문의 폼을 실제 이메일로 받기 (Formspree 연동)

GitHub Pages는 서버가 없는 정적 사이트라, 문의 폼이 실제로 이메일을 보내려면
무료 폼 서비스인 **Formspree**를 한 번만 연결해주면 됩니다.

1. [formspree.io](https://formspree.io) 무료 가입
2. `New Form` 생성 → 받을 이메일 주소 입력
3. 발급된 주소가 `https://formspree.io/f/abcdwxyz` 형태로 나옵니다
4. `index.html`에서 아래 부분을 찾아
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   `YOUR_FORM_ID`를 발급받은 값으로 교체
5. 저장 후 홈페이지에서 폼을 한 번 테스트 제출하면 Formspree가 이메일로 알려줍니다

무료 플랜은 월 50건까지 무료입니다. 문의가 더 많아지면 유료 플랜으로 전환하면 됩니다.

---

## 오시는 길 지도 바꾸는 방법

1. [Google 지도](https://maps.google.com)에서 우리 회사 주소 검색
2. `공유` → `지도 퍼가기(embed)` 탭 클릭 → HTML 코드 복사
3. `index.html`에서 `<iframe src="https://www.google.com/maps?q=...` 부분을
   복사한 코드로 통째로 교체
4. 저장

---

## 자주 묻는 질문

- **파일을 더블클릭해서 열었더니 제품 목록이 안 보여요** → 정상입니다. `products.json`을
  불러오는 기능은 GitHub Pages처럼 실제 웹 주소로 열었을 때만 동작합니다.
- **수정한 내용이 사이트에 안 보여요** → 저장(Commit) 후 1~2분 기다렸다가 새로고침
  (강력 새로고침: Ctrl+Shift+R / Cmd+Shift+R) 해보세요.
- **도메인(예: daonpipe.com)을 연결하고 싶어요** → Settings → Pages 화면에서
  `Custom domain`란에 보유한 도메인을 입력하면 됩니다. 단, 도메인 자체는 별도 구매(유료)가 필요합니다.
