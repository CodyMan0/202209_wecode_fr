# 📭[KODA] 설문조사 웹 어플리케이션

<br>
<img src="https://user-images.githubusercontent.com/93697790/210754031-b80985e9-1b2d-4a35-ba1c-902ef7b8a663.png" width="1440" alt="no-img">
<br>

## 👉 [KODA 노션](https://gifted-jacket-9e1.notion.site/KODA-9ea2f0163f4e4121b3c979279ae196e7)

## 목표

새로운 기술에 대해 학습하며 즉시 적용하여 코오롱 글로벌 내부에서 사용할 설문조사 웹 어플리케이션 결과물을 만드는 것.

## 목표 달성을 위해 만난 문제 해결 과정 💭

<details>
  <summary>리서치 에디터를 어떻게 만들 수 있을까?</summary>
<br>

- **문제 상황** : 관리자가 리서치를 만드는 에디터 페이지와 완성된 리서치 설문지의 링크를 고객에게 보내 고객의 설문을 받아야하는 고객 페이지가 필요한 상황.

  <br>

- **문제 정의** :

  - 어떻게 **JSON API**를 만들 것인가?
  - 프론트단에서 컴포넌트를 계층화하기 쉬운 **JSON API**의 형식을 어떻게 정의할 것인가?
    <br>

- **문제 해결 과정**

  > 어떻게 **JSON API**를 만들 것인가?

  1. **survey.js**를 사용하여 손쉽게 JSON 형식으로 프론트단에서 가공하여 만든 데이터를 활용하여 UI로 보여주고려 했으나 JSON 데이터를 UI로 변환하는 것은 무료이지만 사용자가 직접 UI를 통해 JSON 데이터를 만드는 부분은 유료 서비스여서 어려움이 있다고 판단하였습니다.

  2. **react-hook-form**을 활용하여 JSON 형식의 데이터를 만들 수 있다는 것을 알았지만 2주라는 짧은 기간 가운데 배워서 결과물을 만드는데 있어 챌린징한 상황이었습니다. 그럼에도 불구하고 react-hook-form을 사용하기로 정하였습니다.

    <br>

  > 프론트단에서 **컴포넌트**를 계층화하기 쉬운 **JSON API**의 형식을 어떻게 정의할 것인가?

  1. 주어진 10일의 개발 기간 중 3일 안에 react-hook-form을 익혀 프론트단에서 컴포넌트를 계층화하기 쉽도록 JSON API mock-data를 제시하기로 의견 제시.

  2. 3일 간, react-hook-form 공식 문서 전체를 3번 이상 읽고 학습하여, 리서치 에디터 UI에 따른 JSON mock-data를 제공하여 백앤드 개발자와 동료 프론트엔드 개발자에게 공유.
     <br>
  3. Mock-data 중 추가해야하거나 수정해야하는 부분은 그 즉시, 노션을 통해 팀원들에게 공유.

- **공부한 부분** : surveyJs Library, react-hook-form, JSON 데이터 포멧
- **경험** : 사용할 기술 스택에 대한 이해도가 낮은 상황에서 학습과 실전 프로젝트를 병행하여 압박감 속에서 결과물을 만들어낸 경험을 했습니다.
</details>

<details>
<summary>에디터 설문지 제출 클릭시, 서버로 2번 이상 전송되는 문제 직면</summary>
<br>

- **문제 상황** : 에디터 페이지에서 항목들을 추가하고 "다음" 버튼을 누르면 모달창이 나옵니다. 그 후, 완료 버튼을 누르면 form data가 한번 보내져야하지만 두번 보내집니다. 백앤드에서는 설문지에 따라 ID를 부여합니다. 그에 따라 링크를 생성하는데 동일한 설문지를 두번 이상 보내면 동일한 설문지임에도 불구하고 서로 다른 링크가 생성되는 문제가 있었습니다.

<br>

- **문제 정의** : react-hook-form 미숙한 사용 문제라고 정의 및 렌더링 문제

<br>

- **문제 해결 과정**
  <div style="display:flex; flex-direction:raw; ">
  <img style="width:50%;" src="/public/images/next.png" alt='next'/>
  <img style="width:50%;" src="/public/images/submit.png" alt="submit"/>
  <div>

> "다음" button 클릭시, form이 submit되는 문제

1. button을 p element로 바꿔보니 해결, 하지만 semantic html의 관점에서는 상당히 불편했습니다. 찾아보니 다음으로 가기 클릭시, 상위 컴포넌트에 있는 **useForm이 submit** 되는 근본적인 문제를 발견하였습니다. styledComponent 공식 문서를 찾아보니, **styledComponent의 button의 기본 type이 submit**이라는 것을 알게 됐습니다.
   <br>
2. "다음" button을 styledComponent가 아닌 일반 css를 사용하여 button type을 button으로 설정하여 해결.

<br>

- **공부한 부분** : styled-component , semantic HTMl, HTML/CSS
- **경험** : 복잡해보이는 문제지만 결국 기본적인 원인으로 인해 파생된 문제일 수 있다는 것을 경험.

</details>

<details>
<summary>이전 페이지 유효성 검사</summary>

<br>
<img src="/public/images/check.png" alt='inputCheck'/>

- **문제 상황** : 관리자 리서치를 만드는데 2단계가 필요합니다. 설문 제목, 날짜 질문들을 추가하여 다음 버튼을 누르면 Modal이 뜨고 익명 여부, 사용자 랜딩 페이지 설정을 하는 기능이 있습니다. 하지만 당시 모달페이지의 제출하기를 눌러야 useForm 안에 있는 각 인풋들에 대한 유효성 검사가 이루어졌기에 모달을 끄거나 뒤로가기를 통해 정정해야했습니다. 불편한 UX라고 판단하였습니다.

<br>

- **문제 정의** :

  1. UX를 변경하는 것.

  2. 유효성 검사를 하는 시점을 조절할 수 있는 react-hook-form의 내장 함수가 있지 않을까?

<br>

- **문제 해결 과정**

> react-hook-form의 내장 함수로 유효성 검사의 시점을 조절

1. 현재 2단계의 제출하기를 눌러야 전체적인 렌더링이 이루어지는 상황이어서 유효성 검사도 마지막에 일어납니다. 공식 문서를 통해 찾아보니, 폼의 인풋 유효성 검사를 수동으로 해주는 **trigger**라는 내장 함수를 알게 됐습니다.
   <br>

> 비동기 함수를 동기적으로 사용

2. trigger 내장 함수를 사용해서 시도했으나 트리거 됐을떄, errors 객체의 값을 trigger를 포함하지 않은 값이 담겨 원하는대로 동작하지 않는 상황이 발생하였습니다.

- before
  <img src="/public/images/%EC%97%90%EB%9F%AC1.png" alt="beforeErrorImg">

- after

  <img src="/public/images/afterError.png" alt="afterErrorImg" style="width:300px">
  
  **비동기 함수를 동기적으로 사용**하기 위해 **async await**을 활용하여 값을 사용하여 onClickHandler로 넘겨주는 방식으로 문제 해결
<br>

- **공부한 부분** : async await, Promise, callBack, 동기와 비동기
- **경험** :async await을 활용하여 비동기를 동기화하여 값으로 사용해서 문제를 해결하였습니다. 더 나아가 비동기의 값을 사용할때 주의해야하는 점을 이해하였습니다.

</details>

<details>
<summary>useForm안에서 추가된 질문 항목 삭제가 반영되지 않는 문제</summary>
<br>

- **문제 상황** : 관리자 에디터에서 추가된 질문을 삭제하였지만 정작 고객 페이지에 삭제가 되지 않고 보여지는 상황

<br>

- **문제 정의** :

1. 질문 선택 항목을 추가할땐 register 매소드를 활용하여 Form 데이터에 추가하지만 삭제 버튼을 클릭하면 해당 질문의 id값만 지우는 것이 문제.

2. unregister과 삭제 버튼과 연동.

<br>

> react-hook-form 내장 함수를 활용

- **문제 해결 과정**

  1. unregister : 삭제하기 위해 click한 애들의 아이디를 배열로 저장해서 완료버튼을 누를때 unregister하려고 했으나 생각대로 안됐고 하루 종일 했는데 안된 상황.
     <br>

  ```js
  const methods = useForm({
    shouldUnregister: true, // <--
  });

  const {
    register,
    formState: { errors },
  } = methods;
  ```

  2. 다음 날 공식 문서에서 shouldUnregister : true를 발견하고 넣어봤는데 마지막에 있는 데이터만 자동으로 인식해서 폼으로 만들어지는 놀라운 함수 발견 **shouldUnregister: true**를 붙혀주니 해결

<br>

- **공부한 부분** : react-hook-form , state props
- **경험** : 제한된 시간 안에 QA 검수를 통해 나온 에러를 해결한 경험
</details>

## BPS Form – Survey Tool 프로젝트

Survey Tool 프로젝트로 서비스 설문조사 툴을 이용함에 따라 발생할 수 있는 개인정보 보호 이슈를 방지하고 고객 정보 및 응답 데이터를 자산화하기 위해 **내부 서베이 툴**을 구현했습니다.

**유저 플로우** : 매니저 로그인 👉 템플릿 선택 👉 에디터 제작 👉 설문지 전송 👉 응답자 설문지 응답 👉 통계 확인

### 프로젝트 기간

- 프로젝트 구현 : 22.9.19 ~ 22.10.13

---

### FE

<table>
  <tr>
    <td>
      <a href="https://github.com/Joeunji0119">
            <img src="https://avatars.githubusercontent.com/u/95282989?v=4" width="100px"/>
        </a>
    </td>
    <td>
      <a href="https://github.com/CodyMan0">
          	<img src="https://ca.slack-edge.com/TH0U6FBTN-U03JHMEQ02X-6cffc3092879-512" width="100px" />
        </a>
    </td>
  </tr>
  <tr>
    <td><b>조은지</b></td>
    <td><b>이주영🔰</b></td>
  </tr>
  <tr>
    <td><b>Front-End</b></td>
    <td><b>Front-End</b></td>
  </tr>
</table>

[프론트 깃허브로](https://github.com/kolonDT/202209_wecode_fr)

### BE

<table>
  <tr>
    <td>
    	 <a href="https://github.com/Mjj4682">
          <img src="https://avatars.githubusercontent.com/u/105341553?v=4" width="100px"/>
        </a>
    </td>
     <td>
    	 <a href="https://github.com/sockwon">
          <img src="https://avatars.githubusercontent.com/u/88824305?v=4" width="100px"/>
      </a>
    </td>
  </tr>
  <tr>
    <td><b>문정진</b></td>
    <td><b>이석원</b></td>
  </tr>
  <tr>
    <td><b>Back-End</b></td>
    <td><b>Back-End</b></td>
  </tr>
</table>

[백앤드 깃허브](https://github.com/kolonDT/202209_wecode_en)
<br>
<br>

## 🧰 Front-end 기술 Tools 기술 스택

<div align=left>
  <img src="https://img.shields.io/badge/JavaScript-FFCA28?style=flat-square&logo=javascript&logoColor=white"/>&nbsp;
  <img src="https://img.shields.io/badge/React.js-58c3cc?style=flat-square&logo=React&logoColor=white"/>&nbsp;
  <img src="https://img.shields.io/badge/React.js-58c3cc?style=flat-square&logo=React&logoColor=white"/>&nbsp;
  <img src="https://img.shields.io/badge/CRA-58c3cc?style=flat-square&logo=Create-React-App&logoColor=white"/>&nbsp;
  <img src="https://img.shields.io/badge/React Router Dom-gray?style=flat-square&logo=React-Router&logoColor=F6BB43"/>&nbsp;
  <img src="https://img.shields.io/badge/eslint-000066?style=flat-square&logo=eslint&logoColor=white"/>&nbsp;
  <img src="https://img.shields.io/badge/prettier-00CC00?style=flat-square&logo=eslint&logoColor=white"/>&nbsp;
  <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>&nbsp;
  <img src="https://img.shields.io/badge/Notion-1c1c1c?style=flat-square&logo=Notion&logoColor=white"/> &nbsp;
  <img src="https://img.shields.io/badge/Slack-553830?style=flat-square&logo=Slack&logoColor=white"/> &nbsp;
  <img src="https://img.shields.io/badge/Gather-8B00F?style=flat-square&logo=Gather&logoColor=white"/>&nbsp;
</div>
<br>
<br>

## 코다 주요 기능

- **로그인** 🤝
  - 관리자 직급에게 아이디와 비밀번호 권한을 부여하여 일반 로그인 가능
- **서베이 확인하기**✅
  - 로그인 후 메인 페이지로 이동, 전체 서베이를 최신순으로 조회 가능
  - 각 서베이 응답자 수 조회 가능
  - 전체 / 대기중 / 진행중 / 완료 카테고리 별로 투표글을 필터링 조회 가능
  - 필터와 함께 서베이 제목으로 서치 가능
  - 진행중인 서베이 강제 종료 가능 (해당 서베이 종료 날짜를 앞당겨 종료 처리, 조회 가능)
  - 서베이 삭제 가능 (데이터 삭제 기능)
- **서베이 만들기**💬
  - 새로운 설문지 혹은 템플릿을 제공하여 설문지 제작 가능
  - 선택 항목 중 필요한 항목을 사용하여 설문지 커스텀 기능
  - 필수적인 정보는 유효성 검사를 통해 사용자에게 알려주는 기능
  - 중복 여부와 익명 여부 랜딩 페이지를 커스텀할 수 있도록 관리자 기능
- **커스텀 랜딩 페이지 지정하기**🆓
  - 유료 서비스 중 하나인 랜딩 페이지 url 기능을 무료로 사용 가능
- **서베이 공유하기**📖
  - 서베이 제목 클릭시 응답자 설문이 담긴 링크 확인 가능
  - 링크 복사 기능
- **통계 확인하기**👤
  - 서베이 제목 / 응답자 수 / 상태 확인 가능
  - 응답자 정보 (이름, 핸드폰 번호) 확인 가능
  - 서베이 각 항목 응답률 확인 가능
    <br>

## 🔧 **기술적 의사결정**

| 사용 기술               | 기술 결정 이유                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`react-hook-form`**   | react-hook-form vs SurveyJs<br><br>설문지를 JSON 형식으로 백앤드와 주고 받아야했습니다.survey.js를 활용하면 JSON 형식으로 데이터를 쉽게 만들 수 있고 UI로도 보여줄 수도 있었지만, 비용이 든다는 문제가 있었습니다. 또한 최소 10개 이상의 input이 있는 설문지 제작 페이지에서 렌더링 이슈를 문제를 해결해야 했습니다. 따라서 비제어 컴포넌트 방식을 구현된 react-hook-form을 활용하여 렌더링 이슈와 설문지를 JSON 형식으로 만들기로 했습니다. |
| **`recharts`**          | nivo vs Recharts<br><br>내부에서 상업용으로 쓰일 수 있기 때문에 최대한 오픈 소스를 사용하고자 했습니다.이에 차트 라이브러리인 nivo 와 Recharts 고민했고, nivo는combined charts를 제공해주지 않는다는 점을 고려해 가장 많이 쓰이는 Recharts를 사용하기로 결정했습니다.                                                                                                                                                                        |
| **`Axios`**             | Axios vs JS Fetch API<br><br>response timeout (fetch에는 없는 기능) 처리 방법이 존재 Promise 기반으로 만들어졌기 때문에 데이터를 다루기 편리합니다. 브라우저 호환이 fetch보다 뛰어나기 때문에 웹을 염두한 코다 서비스에 적합하다고 생각했습니다.                                                                                                                                                                                             |
| **`Styled components`** | CSS-in-JS vs CSS-in-CSS<br><br>css를 파일 분리 없이 유지 보수 할 수 있는점이 장점이라 생각했습니다. props나 state에 따른 동적 스타일링이 가능합니다. 그 중 점유율이 높은 styled components를 사용하기로 결정했습니다.                                                                                                                                                                                                                        |

---

## 기여한 부분

### 공통 Nav, 설문 제작 페이지, 고객 설문 제작 페이지

#### 공통 네브 Router 기능 (중첩 라우팅)

React-Router-dom의 Outlet 내장 함수를 활용하여 원하는 페이지에서만 상단 nav가 보이도록 함.

#### 선택 질문 항목 추가 및 삭제 기능

<img src="https://user-images.githubusercontent.com/93697790/197448417-5bcb5aa5-2775-48b8-aa76-14ac81765f3e.gif" width="600px">

```jsx
export const QUESTION_ARRAY = (sortIndex, formId, ...args) => {
  return {
    1: (
      <MultipleSingle
        sortIndex={sortIndex}
        question={args[0]}
        option={args[1]}
        onRemove={args[2]}
        formId={formId}
      />
    ),

    2: (
      <MultipleMultiple
       ...
      />
    ),

    3: (
      <ShortDescription
      ...
      />
    ),
```

왼쪽 선택항목 7개는 각각 id를 가지고 있고 7개 중 하나를 선택하면 해당하는 컴포넌트가 그려지도록 설계했다. 여기서 인자가 3개 이상 있을 경우는 객체로 바꾸는 것이 좋다는 것도 알게 돼어 수정하려고 합니다.
<br>
<br>

#### 객관식 질문 양식 중 문제 추가 삭제 기능

  <img src="https://user-images.githubusercontent.com/93697790/196628966-e0f21167-9328-433b-a4f6-544c8e6f329d.gif" width="600px">

```jsx
const [optionIndexes, setOptionIndexes] = useState(Object.keys(option));
//객관식 문항수를 상위 컴포넌트로부터 option이라는 props로 받고 있다.

const addOptionIndexes = () => {
    setOptionIndexes([...optionIndexes, optionIndexes.length.toString()]);
  };
...

{optionIndexes.map(idx => (
       <Choice key={idx}>
        ...}
```

객관식 문항이라는 option을 받고 option의 index는 계속 변하는 값이므로 state로 지정하여 관리했습니다. 그리고 이 값을 map을 사용하여 option의 갯수에 따라 문항이 생성되도록 만들었습니다. 여기서 어려움이 있었던 부분은 addOptionIndexes 부분이었습니다,. Object.keys(option)을 사용하면 결과값이 배열에 **문자열**이 담기는 것을 모르고 기능 작동이 안되는 것이었습니다. 알고보니 optionIndexes.length의 결과값이 숫자타입이라는 것을 알게 됐고 어려워보였던 문제지만 굉장히 간단한 문제였다는 것을 알게 됐습니다.

#### 폼 데이터 생성 및 삭제 기능

<img src="https://user-images.githubusercontent.com/93697790/197449438-9b72c090-8a08-470f-a15b-d0b2de9ba2fa.gif"
width="600px">

```jsx
  //생성
  //최상위 컴포넌트 Editor.js
 <MakeSurvey onSubmit={methods.handleSubmit(onSubmit)}>

  //상위 컴포넌트 SurveyEditor.js
  <TitleInput
    placeholder="제목을 입력하세요"
    {...register('surveyName', {
    shouldSelect: true,
    required: {
      value: 'title',
      message: `제목은 필수!`,
               },
     })}
    />
```

각 인풋에 register을 등록하고 마지막 onsubmit이 될때 한번에 폼이 생성되어 보내지도록 하였습니다.
<br>

```jsx
//삭제
const methods = useForm({ shouldUnregister: true });
```

여기서 많이 해맸었습니다. 선택 항목을 삭제했음에도 불구하고 보내지는 폼에서는 적용이 되지 않는 어려움을 마주했습니다. 하루 종일 다양한 방법을 시도했고 결과적으로 Usehook-Form 공식문서를 통해 shouldUnregister:true를 정의하면 마지막 onsubmit 될때 register된 상태인 input의 form만 생성된다는 것을 알았습니다.

#### 폼 데이터 안에서 이미지 보내는 기능

<img src="https://user-images.githubusercontent.com/93697790/196628841-66341773-fa1b-4cbe-8eca-4b641e28f03d.gif"
width="600px">

#### 에디터 및 고객 폼 데이터 유효성 검사 기능

<img src="https://user-images.githubusercontent.com/93697790/197449820-0fc53a72-70dc-4525-a4e9-8a1438ee7a42.gif"
width="600px">

```jsx
<ErrorMessage
  errors={errors}
  name="surveyName"
  render={({ message }) => (
    <ErrorM>
      <Icon>
        <MdInfo />
      </Icon>
      {message}
    </ErrorM>
  )}
/>
```

ErrorMessage라는 react-hook-form안에 있는 컴포넌트를 import하여 설정해서 커스텀해주었습니다. name은 해당 register된 이름과 동일하게 설정해주어야 원하는 동작을 하였고 message 또한 미리 설정해주어야 에러 객체가 있을때 message가 보여졌습니다.

#### 고객 페이지 폼데이터 생성 기능

<img src="https://user-images.githubusercontent.com/93697790/197450258-3042aeb2-3bc0-48f1-b489-21d15804292c.gif" width="600px">

고객 페이지 폼데이터 또한 관리자 에디터 페이지와 마찬가지로 동일하게 useForm 라이브러리를 사용하여 생성 및 삭제해주었습니다.
