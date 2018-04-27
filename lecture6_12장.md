# 12장 리액트와 서버

* 아이소모픽 : 브라우저가 아닌 플랫폼에서 리액트를 렌더링한다는 뜻, UI를 서버에서 렌더링하고 브라우저에 보내 표시한다는 뜻
* 서버 렌더링의 강점을 살리면 애플리케이션의 성능, 이식성, 보안을 향상시킬 수 있다.
* 리액트를 아이소모픽하게 렌더링할 수 있음

## 12.1 아이소모피즘과 유니버설리즘 비교

* 아이소모픽과 유지버설이라는 용어는 클라이언트와 서버 양쪽에서 작동하는 애플리케이션이라는 의미에서 동일
* 차이는 아이소모픽 애플리케이션은 여러 플랫폼에서 렌더링되는 애플리케이션을 의미
* 유니버설 코드는 완전히 같은 코드를 여러 환경에서 실행할 수 있다는 의미

```javascript
// 유니비설 코드의 예
// 아래 소스는 웹브라우저 뿐만 아니라서 node.js에서도 동일하게 동작한다.
var printNames = response => {
    const people = JSON.parse(response).results, names = people.map(({name}) => `${name.last} ${name.first}`);
    console.log(names.join('\n'));
};
```

```javascript
//해당 프로그램은 웹에서는 잘 동작하지만 node.js 에서는 에러가 난다.
//그래서 아래 소스는 유니버셜한 코드가 아니다.
const request = new XMLHttpRequest();
request.open('GET', 'http://...');
request.onload = () => printNames(request.response);
request.send();
```

```javascript
// 아래 프로그램은 아이소모픽하다.
// 웹과 node에서 동작하는 것을 전부 구현해서 웹과 node에서 전부 동작할 수 있기 때문이다.
if (typeof window !== 'undefined') {
    const request = new XMLHttpRequest();
    request.open('GET', 'http://...');
    request.onload = () => printNames(request.response);
    request.send();
} else {
    const https = require('https');
    https.get('http://...', res => {
        let results = '';
        res.setEncoding('utf8');
        res.on('data', chuck => results += chuck);
        res.on('end', () => printName(results));
    });
}
```

### 12.1.1 서버 렌더링 리액트

* ReactDOM.renderToString 메서드를 사용하면 UI를 서버에서 렌더링할 수 있다.
* 서버는 강력하기 때문에(보안, 자원이용 등등) 이런 이점을 살려서 서버에서 콘텐트를 우선 렌더링할 수 있다.
* 책은 여기까지 하고 끝

## 번외. Redux에서 서버 데이터 가져오기

### 액션

* API 호출을 시작할 때 매우 중요한 순간이 2가지가 있는데, 호출을 시작할 때와 응답을 받았을 때
* 두 순간 모두 애플리케이션에서 상태 변화가 요구되기 때문에, 각각에 대한 액션을 만들어야 한다.
    1. 리듀서에게 요청이 시작되었음을 알리는 액션.
    2. 리듀서에게 요청이 성공적으로 완료되었다고 알리는 액션.
    3. 리듀서에게 요청이 실패했음을 알리는 액션.

* 액션은 아래와 같은 형태로 구성될 수 있다.

```javascript
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }

//OR

{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```
* 이건 전적으로 설계하는 사람 마음대로 구성

### 동기 액션 생산자

* 아래 앱은 reddit 의 posts 정보를 가져오는 앱이다.
* 비동기 액션을 처리하기 전에 우선 몇몇 동기 액션을 만들고 생산자를 만들어 보자.

```javascript
//reddit 을 선택하는 액션
export const SELECT_REDDIT = 'SELECT_REDDIT';

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  };
}

//업데이트 액션
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  };
}

//요청 액션
export const REQUEST_POSTS = 'REQUEST_POSTS';

export function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  };
}

//데이터를 받았을 때의 액션
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}
```

### 상태의 모양을 설계하기

* 구현하기 전에 애플리케이션의 상태가 어떤 모양알지 미리 설계하는 것이 좋다.
* 비동기 애플리케이션에서는 상태가 어떤 정보를 기술해야 하고 이를 단일 트리 안에 어떻게 정리해야 할지 바로 명백해지 않기 때문에 혼란스러운 경우가 많다.
* 이럴 경우 가장 흔한 케이스부터 시작한다. 
* 어떤 종류의 목록을 표시해야 할지 부터 시작한다.
* 아래 앱은 아래와 같은 상태를 가진다.
```javascript
{
  selectedReddit: 'frontend',
  postsByReddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [{
        id: 42,
        title: 'Confusion about Flux and Relay'
      }, {
        id: 500,
        title: 'Creating a Simple Application Using React JS and Flux Architecture'
      }]
    }
  }
}
```

### 액션 다루기

```javascript
import { combineReducers } from 'redux';
import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions';

function selectedReddit(state = 'reactjs', action) {
  switch (action.type) {
  case SELECT_REDDIT:
    return action.reddit;
  default:
    return state;
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case INVALIDATE_REDDIT:
    return Object.assign({}, state, {
      didInvalidate: true
    });
  case REQUEST_POSTS:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });
  case RECEIVE_POSTS:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.posts,
      lastUpdated: action.receivedAt
    });
  default:
    return state;
  }
}

function postsByReddit(state = {}, action) {
  switch (action.type) {
  case INVALIDATE_REDDIT:
  case RECEIVE_POSTS:
  case REQUEST_POSTS:
    return Object.assign({}, state, {
      [action.reddit]: posts(state[action.reddit], action)
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit
});

export default rootReducer;
```

### 비동기 액션 생성자

* redux 썽크 미들웨어 : 액션 생성자는 액션 객체 대신 함수를 반환할 수 있도록 해주는 미들웨어
* 썽크 : 특정 작업을 나중에 하도록 미루기 위해서 함수형태로 감싸는 것을 말한다.

```javascript
const x = 1 + 2; // 이런 것을
const foo = () => 1 + 2; //이렇게 하는것이 썽크
```

* 액션 생성자가 함수를 반환하면, Redux 썽크 미들웨어에 의해 실행. 이 함수는 순수 함수가 아니어도 됨

```javascript
import fetch from 'isomorphic-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

// 우리의 첫 번째 썽크 액션 생산자입니다!
// 안쪽은 다르지만 다른 액션 생산자처럼 사용하면 됩니다:
// store.dispatch(fetchPosts('reactjs'));

export function fetchPosts(reddit) {

  // 썽크 미들웨어는 함수를 어떻게 다룰지 알고 있습니다.
  // 미들웨어는 디스패치 메서드를 함수에 인수로 보내서,
  // 함수가 직접 액션을 보낼 수 있도록 합니다.

  return function (dispatch) {

    // 첫번째 디스패치: 앱 상태를 갱신해서 
    // API 호출이 시작됨을 알립니다.

    dispatch(requestPosts(reddit));

    // 썽크 미들웨어가 호출하는 함수는 값을 반환할 수 있고,
    // 이 값이 디스패치 메서드의 반환값이 됩니다.

    // 이 경우엔 기다릴 수 있는 약속을 반환합니다.
    // 썽크 미들웨어에서 필수적인건 아니지만, 우리의 편의를 위함입니다.

    return fetch(`http://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json =>

        // 디스패치는 여러번 가능합니다!
        // 여기서는 API 호출의 결과로 앱 상태를 갱신합니다.

        dispatch(receivePosts(reddit, json))
      );

      // 실제 앱에서는 네트워크 호출에서
      // 에러도 잡고 싶을겁니다.
  };
}
```

### index.js

```javascript
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { selectReddit, fetchPosts } from './actions';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // 함수를 dispatch() 하게 해줍니다
  loggerMiddleware // 액션을 로깅하는 깔끔한 미들웨어입니다
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

store.dispatch(selectReddit('reactjs'));
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
);
```

* 썽크는 서로 데이터를 주고 받을 수 있다.
```javascript
import fetch from 'isomorphic-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit));
    return fetch(`http://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)));
  };
}

function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(reddit) {

  // 함수가 getState()도 받는 것을 눈여겨보세요
  // 이를 통해 무엇을 보낼지 선택할 수 있습니다.

  // 이는 혹시 이미 캐시된 값이 있을 경우
  // 네트워크 호출을 하지 않을 때 유용합니다.

  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      // 썽크에서 썽크를 보냅니다!
      return dispatch(fetchPosts(reddit));
    } else {
      // 호출하는 코드에게 아무것도 기다리지 않아도 된다는걸 알려줍니다.
      return Promise.resolve();
    }
  };
}

//index.js

...

store.dispatch(fetchPostsIfNeeded('reactjs')).then(() =>
  console.log(store.getState());
);
```

## NEXT

https://mskims.github.io/redux-saga-in-korean/


# 참고 자료

* 러닝 리액트
* https://deminoth.github.io/redux/advanced/AsyncActions.html
* https://velopert.com/3401





