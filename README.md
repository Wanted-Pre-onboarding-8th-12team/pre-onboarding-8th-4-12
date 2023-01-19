# 동료학습을 통해서 인턴쉽 선발 과제 Best Practice 만들기

## 📕 개요

### 과제 목표

> API 서버와 통신해서 작동하는 댓글 프로젝트를 Redux를 통해 구현

### 기간

2023.01.16 ~ 2023.01.19

---

## 👨‍👩‍👧‍👦 Members

|                                              류지창                                              |                                             박준하                                              |                                             백광천                                              |                                             유제원                                              |                                             정세연                                              |                                             조영일                                              |
| :----------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/104156381?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/85827017?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/82658528?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/96014828?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/79056677?s=70&v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/86599495?s=70&v=4" width="100" height="100"/> |
|                           [RyuJiChang](https://github.com/RyuJiChang)                            |                            [harseille](https://github.com/harseille)                            |                             [back0202](https://github.com/back0202)                             |                               [LLSJYY](https://github.com/LLSJYY)                               |                               [n0eyes](https://github.com/n0eyes)                               |                            [young1the](https://github.com/young1the)                            |

---

## 🖥 Demo

gif 시연 내용 추가

![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/104156381/213342062-ce57dd50-c3b8-42aa-87fc-619c04595792.gif)

---

## ⚡️ 사용 라이브러리

- react: 18.2.0
- styled-components: 5.3.6
- axios: 1.2.2
- typescript: 4.9.3
- redux: 7.2.8

## 🤔 실행방법

```
npm install // node modules 설치
npm run api // json server 실행
npm start // dev server 실행
```

---

## ✅ 요구 사항 체크리스트

1. 구현 사항

- [x] 페이지네이션
- [x] 댓글 불러오기, 작성, 수정, 삭제가 동작하도록 기능 구현
  - [x] 작성 후: 다른 페이지에 위치하고 있었더라도 1페이지로 이동, 입력 폼 초기화
  - [x] 수정 후: 현재 보고있는 페이지 유지, 입력 폼 초기화
  - [x] 삭제 후: 1페이지로 이동

2. 요구 사항

- Redux 환경설정은 자유롭게 진행
  - Redux-saga or Redux-thunk 자유롭게 선택 가능
  - 미들웨어 사용안하는 것도 가능
- Redux logger, Redux-Devtools 설정 필수
- Redux를 이용한 비동기 처리 필수

3. 개발 조건 및 환경

- 언어 : JavaScript / TypeScript
- 필수 기술: React, Redux, Redux-Logger, Redux-Devtools
- 선택 기술:
    -Redux Middleware
    -스타일 관련 라이브러리(styled-components, emotion, ui kit 등)
    -HTTP Client(axios 등)
- 위에 기재된 라이브러리 외 사용 불가

### 🥲 Best Practice는 아니었지만 고민한 것과 개발 내용

> 내용이 방대하여 추가적인 링크로 전달드립니다.

- [류지창 Trouble Shooting Log](https://www.notion.so/joonhabaak/dbde9475018940208df552e974d54574)
- [박준하 Trouble Shooting Log](https://www.notion.so/joonhabaak/8a1e02323da44751835746e26587f736)
- [유제원 Trouble Shooting Log](https://www.notion.so/joonhabaak/94be49e1297e46ed91f0581e52739a65)

## 👍 Best Practice

Best Practice는 영일님의 코드를 선정했습니다.

영일님의 코드의 특별한 점을 아래에 사항에 설명드리겠습니다.

### 1. 페이지네이션

Redux-Toolkit의 slice를 활용해서 page라는 이름의 slice를 만들었습니다.

```ts
type TPageSliceState = {
  totalAmount: number;
  commentPerPage: number;
  pageAmount: number;
  pageIndex: number;
};

const initialState: TPageSliceState = {
  totalAmount: 0,
  commentPerPage: PARAMS.COMMENT_PER_PAGE,
  pageAmount: 0,
  pageIndex: 1,
};
```

프로젝트 실행 시 `page`의 reducer인 `init()`을 호출하게 되고, `get()` 요청의 응답의 response의 header에서 `x-total-count` 속성을 이용해서 총 댓글 수를 알수있어서 `totalAmount`값에 넣어주고 `totalAmount`와 `commentPerPage`를 나누어서 올림한 값을 `pageAmount`에 넣었습니다.

그리고 추가적으로 `commentPerPage`와 같은 변수는 확장성을 고려해서 매직 넘버 대신 상수로 선언해주었습니다.

### 2. 댓글 불러오기, 작성, 수정, 삭제가 동작하도록 기능

이전 과제들에서 CRUD 자체는 많이 해보았기 때문에 어려움이 없었지만, redux를 사용한 것은 이번이 처음이어서 이 부분에서 많이 고민했습니다.

redux만을 사용한다면 reducer 함수가 과도하게 커지고 가독성이 떨어질 경우를 걱정해서, redux의 middleware 중 하나인 redux-toolkit을 사용했습니다.

```ts
const store = configureStore({
  reducer: {
    page,
    comments,
    form,
  },
// ...
)
```

프로젝트의 주요 컴포넌트 단위인 page, comments, form으로 관심사를 분리해서 3개의 slice를 만들었고, slice 자체의 reducer는 간단하지만, 예를 들어 page 이동의 경우에는 comments 또한 업데이트가 되어야 하기 때문에, 실제 동작은 파일을 분리, redux-toolkit에서 제공하는 액션 생성을 이용해서 dispatch에서 다른 reducer를 호출하는 방식으로 구현했습니다.

```ts
const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {
//...
    get(state, action) {
      state.comments = action.payload.comments;
      state.apiStatus = "DONE";
    },
  }})
```
commets slice의 reducer인 get()은 slice 내에서는 state에 payload로 받은 comments를 업데이트 해주지만,

```ts
export const getComments = () => {
  const { commentPerPage, pageIndex, totalAmount } = store.getState().page;
  return async (dispatch: any) => {
    try {
      dispatch(commentsActions.changeStatus({ status: "LOADING" }));
      const response = await ApiService.getComments({
        _page: pageIndex,
        _limit: commentPerPage,
      });
      const comments = response.data;
      const newTotalAmount = response.headers["x-total-count"];
      dispatch(
        commentsActions.get({
          comments,
        })
      );
      if (totalAmount + "" !== newTotalAmount) {
        dispatch(pageActions.init({ totalAmount: newTotalAmount }));
      }
    } catch (err) {
      dispatch(commentsActions.changeStatus({ status: "ERROR" }));
    }
  };
};
```
`store.getState().page`로 page slice의 pageIndex 등의 상태를 받아와서 axios 요청을 보내고 요청을 기다리는 동안 혹은 에러가 발생했을 시에, apiState를 변경해주어서 api 호출의 진행 상황을 알 수 있게 했고, 댓글의 개수가 변경되었을 때는 page의 pageAmount도 변경되어야 되기 때문에 pageAction의 dispatch를 실행하도록 했습니다.

```ts
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (isInitial) {
      dispatch(getComments());
      isInitial = false;
    }
  }, [dispatch]);
// ...
```

### 3. Redux-Logger, Redux-Devtools

Redux-Devtools의 경우 기본 redux에서는 따로 설정을 해주어야 하는 걸로 알고 있었지만, redux-toolkit을 사용하면서 크롬에서 익스텐션을 설치해서 자동으로 적용되는 것을 확인했습니다.

추가로 redux-logger를 적용하기 위해서 다음과 같이 기본 설정을 해주었습니다.

```ts
const store = configureStore({
  reducer: {
    page,
    comments,
    form,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
```
