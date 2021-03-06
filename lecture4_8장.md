# 8. 리덕스

* 플럭스를 기반으로 애플리케이션 안에서 변경된 데이터가 어떻게 흘러가는지 더 명확히 표현하도록 해주는 것
* 액션, 액션 생성기, 스토어, 리듀서로 구성
* 플러스와 다른 점은 디스패처를 없애고 애플리케이션 상태를 불편 객체 하나로 표현함으로써 좀 더 단순화
* 리덕스의 3가지 원칙
    1. 진실은 하나의 소스로부터 - 애플리케이션의 모든 상태는 하나의 스토어 안에 하나의 객체 트리 구조로 저장
    2. 상태는 읽기 전용이다 - 상태를 변화시키는 유일한 방법은 무슨 일이 벌어지는 지를 묘사하는 액션 객체를 전달하는 방법뿐
    3. 변화는 순수 함수로 작성되어야한다 - 액션에 의해 상태 트리가 어떻게 변화하는 지를 지정하기 위해 프로그래머는 순수 리듀서를 작성

## 8.1 상태

* 상태는 하나의 스토어 안에 하나의 객체 트리 구조로 저장
* 이렇게 한 객체 모으게 함으로써 애플리케이션에서 상태를 보는 관점을 단순화
* 리액트에서 상태 관리를 완전히 가져올 수 있고, 리덕스에서 상태를 관리함
* 리덕스 앱을 만들 때 상태를 어떻게 만들 것인지 잘 고민해봐야 한다.
* 상태는 변경 불가능한 객체 안에 저장이 되야 함
* 상태가 바뀐다는 의미를 새로운 객체를 생성해서 객체 전체를 바꿔치기한다는 의미
```javascript
{
    "colors": [
        {
            "id": "8658c1d0-9eda-4a90-95e1-8001e8eb6036",
            "title": "바닷빛 파랑",
            "color": "#0070ff",
            "rating": 3,
            "timestamp": "Sat Mar 12 2016 16:12:09 GMT-0800 (PST)"
        },        
        {
            "id": "8658c1d0-9eda-4a90-95e1-8001e8eb6038",
            "title": "토마토",
            "color": "#d10012",
            "rating": 2,
            "timestamp": "Fri Mar 11 2016 16:12:09 GMT-0800 (PST)"
        }
    ],
    "sort": "SORTED_BY_DATE"
}
```

## 8.2 액션

* 바꿀 대상을 지정하는 명령을 액션이라고 한다.
* 애플리케이션 상태 중에서 어떤 부분을 바꿀지 지시하고 그런 변경이 필요한 데이터를 제공
* 상태를 갱신할 수 있는 유일한 방법
* 리덕스 애플리케이션을 구축할 때는 사고방식을 동사 위주로 바꿔야 한다.
* 액션은 javascript object 형태이고, type 속성을 가지고 있어야 한다.
* payload: 상태를 변화시키는데 필요한 데이터

```javascript
const costants = {
    SORT_COLORS: "SORT_COLORS",
    ADD_COLORS: "ADD_COLORS",
    RATE_COLORS: "RATE_COLORS",
    REMOVE_COLORS: "REMOVE_COLORS"
};

// 액션은 기본적으로 type 속성을 가지는 javascript object 리터럴이다.
// type은 기본적으로 문자열인데 문자열을 직접 처리하는 건 버그 가능성이 있기 때문에 위와 같이 상수화 시켜서 사용하는 것이 좋다.
// payload 사용은 규칙으로 정해진 것이 없지만 https://github.com/redux-utilities/flux-standard-action 문서를 참고하면 payload object 내에 데이터를 넣는 것이 좋다.
const addAction = {type: costants.ADD_COLORS, payload: {id: '', color: '' ...}};
```

## 8.3 리듀서

* 리덕스를 함수로 모듈화를 제공
* 상태 트리 일부는 갱신하는 함수
* 기본적인 형태는 (상태, action) => 새로운 상태
* 상태 트리의 한 부붐만 담당하기 때문에 각 리듀서가 반환하는 값이나 이전 상태 값의 타입은 리듀서가 처리하는 상태 트리 부분의 타입과 같다.

```javascript

const color = (state={}, action) => {
    switch(action.type) {
        case costants.ADD_COLORS: 
            return {
                ...action.payload,
                rating: 0
            };
        case costants.RATE_COLORS:
            return action.payload.id === state.id ? {
                ...state,
                rating: action.payload.rating
            } : state;
        default:
            return state;
    }
};

const colors = (state=[], action) => {
    switch(action.type) {
        case costants.ADD_COLORS: 
            return [...state, color({}, action)];
        case costants.RATE_COLORS:
            return state.map(c => color(c, action));
        case costants.REMOVE_COLORS:
            return state.filter(c => c.id !== action.payload.id);
        default:
            return state;
    }
};

const sort = (state='SORTED_BY_DATE', action) => {
    switch(action.type) {
        case costants.SORT_COLORS: 
            return action.playload.sortBy;
        default:
            return state;
    }
}
```

## 8.4 스토어

* 애플리케이션의 상태 데이터를 저장하고 모든 상태 갱신을 처리
* 오직 한 개의 스토어만 허용
* 현재 상태와 액션을 한 리듀서에 전달해서 상태 갱신을 처리
* 여러 리듀서를 조합하고 합성해서 스토어에서 사용할 단일 리듀서 생성

```javascript

import {createStore} from 'redux';

// 한개의 리듀서만 처리
const store = createStore(color);
// 여러 개의 리듀서의 경우 합쳐서 사용

import {createStore} from 'redux';
import {combineReducers} from 'redux';

const store2 = createStore(combineReducers([colors, sort]));

//초기 상태 값을 지정할 수도 있다.
const store2 = createStore(combineReducers([colors, sort]), initialState);

//상태 값을 변경하는 유일 한 방법은 스토어를 통한 액션을 디스패치 하는 것 뿐이다.
store2.dispatch({
    type: costants.ADD_COLORS,
    ....
});

//스토어에 핸들러 함수를 등록하면 액션이 디스패치 될 때 해당 함수가 호출이 된다.
//리스너를 해제할 수 있는 함수를 호출
const unSubscribe = store2.subscribe(() => console.log('색 개수:', store.getState().colors.length));

//구독된 핸들러 함수가 해제된다
unSubscribe();
```

## 8.5 액션 생성기

* 액션 객체는 자바스크립트 리터럴일 뿐이다.
* 액션 생성기는 이런 리터럴을 만들어서 반환하는 함수
* 액션 객체를 직접 생성하는 것보다 더 단순화 해준다.
* 액션을 제대로 만들기 위해 필요한 모든 로직을 캡슐화
* 액션 생성기는 백엔드 API와의 통신을 집어넣어야 하는 장소이기도 한데 이 건 12장에서 ..

```javascript
const removeColor = id => ({
    type: costants.REMOVE_COLORS,
    id
});

const rateColor = (id, rate) => ({
    type: costants.RATE_COLORS,
    id,
    rate
});

//특정 값들을 액션 생성자에서 바로 생성해서 표현 가능
//uuid를 구하거나 timestamp를 구하는 건 액션 생성기에서 처리해주고 캡슐화 함
import {v4} from 'uuid';

const addColor = (title, color) => ({
    type: costants.ADD_COLORS,
    id: v4(),
    title, 
    color,
    timestamp: new Date().toString()
});
```

## 8.6 미들웨어

* 서로 다른 두 계층이나 두 소프트웨어를 붙어여준 풀 같은 역할을 하는 소프트웨어
* 리덕스에서는 스토어의 디스패치 파이프라인에 적용
* 미들웨어의 각 요소는 액션과 dispatch 함수에 접근할 수 있는 함수
* 이 함수는 next 를 호출
* next는 갱신이 일어나게 만든다.
* next 호출 전에 액션을 변경할 수 있다.
* next 호출 후에는 상태가 변경된다.


# 참고자료

1. 러닝 리액트
1. https://deminoth.github.io/redux
1. https://github.com/redux-utilities/flux-standard-action
