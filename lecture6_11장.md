# 11장 리액트 라우터

* 사용자는 여러 주소를 내비게이션하면서 파일을 요청하거나 열 수 있다.
* 서버에서 렌더링되는 웹사이트에서는 브라우저의 내비게이션이나 방문 기록이 일반적인 예상과 마찬가지로 작동한다.
* 단일 페이지 앱에서는 이 모든 기능이 문제가 된다.
* 브라우저 방문 기록, 책갈피, 이전 페이지, 다음 페이지 등의 기능은 적절한 라우팅 솔류션이 없으면 제대로 작동하지 않는다.
* 라우팅이란 클라이언트의 요청을 처리할 종말점(endpoint)을 찾는 과정
* 종말점은 브라우저의 위치, 방문 기록 객체와 함께 작동하고 요청받은 콘첸트를 식별한다.
* 자바스크립트는 이렇게 식별한 콘텐트를 가져와서 적절히 사용자 인터페이스를 렌더링할 수 있다.
* react에서는 표준 라우팅 기술을 지원하지 않음.
* 그래서 react router 라는 확장 모듈을 이용해서 사용할 수 있다.

## 11.1 라우터 사용하기

* 해시라우터
    * 전통적인 해시(#)는 앵커 링클르 정의할 때 쓰였다.
    * 백앤드가 필요 없는 작은 클라이언트 사이트를 만들 때 유용한 도구
    
* 경로 : 브라우저의 주소창에 넣을 수 있는 종말점
* 앱은 요청받은 경로에 따라 적절한 콘텐트를 렌더링해 보여준다.
* React에서 라우터를 사용하기 위해서는 react-router-dom 을 추가
* HashRouter 컴포넌트를 사용해서 렌더링
* HashRouter 컴포넌트는 애플리케이션의 경로 컨포넌트로 렌더링된다. 각 경로는 HashRouter 내부에 있는 Route 컴포넌트로 정의
* 이렇게 정의한 Route와 윈도우의 주소에 따라 라우터가 렌더링할 컴포넌트가 결정
* Route
    * path : 이동할 주소
    * component : 표시할 컴포넌트
    * exact: 주소가 경로 주소와 정확히 일치할 때만 해당 컴포넌트 표시

* Link 컴포넌트를 이용해서 이동할 주소에 대한 링크를 만드는 것도 가능하다.

### 11.1.1 라우터 프로퍼티

* switch 컴포넌트는 경로가 일치하는 Route에서 첫 번째 경로를 렌더링하고, 일치하는 것이 없을 경우 맨 마지막 Route가 표시된다.
* 모든 Route 컴포넌트들은 Router 로 감싸야 한다.

## 11.2 경로 내포시키기

* Router 컴포넌트는 특정 URL과 일치할 때 표시해야 하는 콘텐트와 함께 쓰인다. 이 기능을 활용해서 웹앱을 명확한 구조로 조직하면 콘텐트 재사용을 촉진시킬 수 있다.

### 11.2.1 페이지 템플릿 사용

* 앱의 UI 중 일부가 계속 같은 위치에 남아 있기를 원하는 경우가 있음(메뉴 등등)
* NavLink 컴포넌트를 사용하면 링크가 활성화된 경우 다른 스타일로 표시되는 링크를 만들 수 있다.
* 페이지 템플릿 콤퍼넌트를 이용해서 중복되는 부분을 하나로 묶을 수 있다.
```javascript
    import React from 'react';
    import MainMenu from './MainMenu';

    export default ({children}) => 
        <div className="">
            <MainMenu />
            {children}
        </div>;
```

### 11.2.2 하위 섹션과 하위 메뉴

* 소스보기

## 11.3 라우터 파라미터

* 라우터 파라미터는 URL에서 값을 얻을 수 있는 변수로, 콘텐트를 걸러내거나 사용자 선호에 따라 여러 표시 방법을 제공해야 하는 데이터 주도 웹 애플리케시션에 유용하다.
* 라우터에 아래와 같은 형태로 파라미터 값을 넘길 수 있다.
```javascript
    <Route path="/events/:name/:message" component={Events}  />
```
* 그럼 match.params 라는 속성 값을 이용해서 컴포넌트에서 사용이 가능하다.
```javascript
    export default ({match}) => <PageTemplate><section className="events"><h1>[이벤트]{match.params.name}{match.params.message}</h1></section></PageTemplate>;
```
* Route에 등록되지 않은 컴포넌트의 경우 withRouter 함수를 이용해서 Route된 컴포넌트로 변환이 가능하고, Route된 컴포넌트의 경우 history, location, match 프로퍼티를 제공받아서 사용할 수 있다.

# 관련 소스

# 참고자료

* 러팅 리액트
* https://reacttraining.com/react-router/web/guides/philosophy
