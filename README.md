# AI Wellness Lab Gallery (GitHub Pages)

동호회 멤버들이 자유 주제로 만든 GitHub Pages 사이트를 한곳에서 공유/소개하는 페이지입니다.
실명 대신 코드네임(가명)으로 표기하고, 사이트 캡처 이미지를 카드로 보여줍니다.

## 파일 구조

- `index.html` : 페이지 구조
- `styles.css` : UI/UX 스타일
- `script.js` : 프로젝트 데이터 + 태그 필터 렌더링
- `assets/screenshots/*` : 프로젝트 미리보기 캡처 이미지

## 멤버 사이트 추가 방법

1. `script.js`의 `PROJECTS` 배열에 객체를 추가합니다.
2. 아래 형식을 맞춰주세요.

```js
{
  id: "p7",
  title: "프로젝트 이름",
  member: "멤버명",
  url: "https://username.github.io/repo-name",
  description: "한 줄 소개",
  image: "assets/screenshots/project-15.jpg",
  tags: ["추천"]
}
```

## GitHub Pages 배포

1. 이 폴더를 GitHub 저장소에 push
2. GitHub 저장소 `Settings` → `Pages`
3. `Build and deployment`에서
   - Source: `Deploy from a branch`
   - Branch: `main` / `(root)` 선택 후 저장
4. 1~3분 후 배포 URL 접속

## 추천 커스터마이징

- 색상 톤 변경: `styles.css`의 `:root` 변수
- 동호회 소개 문구 변경: `index.html` 상단 Hero 영역
- 카드 UI 확장: `script.js`의 카드 렌더링 템플릿
