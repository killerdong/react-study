# What is the Execution Context & Stack in JavaScript?(번외 3편)

이 포스트에서 우리는 자바스크립트의 가장 근본적인 부분 중에 하나인 Execution Context 에 대해서 한번 알아보도록 하겠습니다. 이 포스트의 목적은 자바스크립트 인터프리터가 무엇을 할려고 시도하는지에 대한 명확한 이해와 몇몇의 함수 또는 변수가 그것들 선언하기 전에 사용될 수 있는지, 그 값들이 어떻게 결정되어 지는지이다.

## Execution Context란?

자바스크트립트에서 코드가 평가할 떄 그 실행한 환경은 매우 중요합니다. 그 환경에 따라서 아래 3가지의 코드로 구분할 수 있습니다.

1. 글로벌 코드: 코드가 처음 실행된 기본 환경
2. 함수 코드: 함수를 실행하는 코드
3. Eval 코드: Evel 함수 내에서 실행가능한 Text

해당 문서를 이해하기 위해서 여러분들은 scope에 대한 기본을 이해하고 있어야 합니다. 만약 모른다면? 좀 찾아보고 다시 오세요~..
현재 코드가 실행되는 환경 또는 scope 로써 한번 Execution Context를 생각해보도록 합시다. 자 그럼 global context와 function/local context 가 포함된 아래 예제를 보도록 합시다.

```javascript
// Global Context
var sayHello = 'Hello';

function person() {
    // execution Context - 1

    var first = 'David';
    var last = 'Shariff';

    function firstName() {
        // execution Context - 2
        return first;
    }

    function lastName() {
        // execution Context - 2
        return last;
    }

    alert(sayHello + firstName() + ' ' + lastName());
}
```

특별한 건 없습니다. 1개의 global Context를 가지고 있고, 3개의 다른 function contexts를 가지고 있습니다.자바스크립트는 다른 contexts에서 접근 가능할 수 있는 1개의 global Context를 가지고 있습니다. 

여러 개의 function contexts 를 가질 수 있으며, 각각의 contexts 들은 서로 다른 scope를 가지고 있습니다. 그리고 해당 scope 내에 정의된 어떤 것들도 외부에 바로 접근이 불가능합니다.
위 예제에서 보면 person 함수 에서 global context에 있는 sayHello 변수에 접근은 가능하지만, person 함수 내부에 있는 firstName 함수의 first 변수에는 접근이 불가능합니다. 히자만 firstName() 함수는 외부에 있는 person 함수의 first 변수에 접근이 가능합니다.

왜 이렇게 될까요? 

## Execution Context Stack

브라우저 안에 있는 자바스크립트 인터프리터는 하나의 싱글 쓰레드로서 구현되어 있습니다.(실제는 하나의 싱글 쓰레드는 아니고 하나의 스택과 하나의 이벤트 큐로 되어 있습니다.) 이말은 브라우저에 한 번에 하나만 실행이 가능하고 다른 액션들과 이벤트들은 execution Stack 이라고 불리는 곳에 저장이 된다는 것이다.
아래 그림은 해당 Stack을 추상화 해놓은 것입니다.

![Execution Stack](http://davidshariff.com/blog/wp-content/uploads/2012/06/ecstack.jpg)

우리가 알고 있는 것과 같이, 자바스크립트가 실행될 때, 기본적으로 global execution context가 스택에 들어 갑니다. 그리고 global code에서 함수를 호출하게 되면, 호출된 함수로 프로그램 sequence 흐름이 넘어가고, 이 떄 새로운 execution context 가 생성되고 stack에 해당 context가 쌓이게 됩니다.

만약 현재 함수 내에 다른 함수가 또 호출이 된다면, 위와 같은 절차로 진행이 됩니다. 프로그램 흐름이 새로운 함수로 넘어가고, execution context 가 생성되며 해당 context가 stack에 쌓이게 됩니다. 브라우저는 항상 stack 최 상위에 있는 context를 실행하고 해당 context가 완료가 되면 스택에서 제거하고 스택에 있는 다음 context를 실행하고 해당 스택이 비워질 때 까지 계속 해당 함수를 실행하게 됩니다.

아래는 제귀함수를 이용해서 프로그램의 execution stack을 보여주는 예입니다.

```javascript
(function(v) {
    if (i === 3) {
        return;
    } else {
        foo(++i);
    }
})(0);
```

결과는 아래와 같습니다.

![Result](http://davidshariff.com/blog/wp-content/uploads/2012/06/es1.gif)

이 코드는 제귀함수를 이용해서 3번 foo() 함수를 호출하는 간단한 예제입니다. 

execution stack에 대해서 5가지의 중요한 포인트가 있습니다.

1. 싱글 쓰레드처럼 동작합니다.
2. 비동기 execution 입니다.
3. 한 개의 global context 를 가지고 있습니다.
4. 무 한대(스택의 한계까지) function contexts 를 가질 수 있습니다.
5. 각각의 함수가 실행될 때 새로운 execution context를 가지게 됩니다.

## Execution context 좀 더 자세히!

그래서 우리는 함수가 호출될 때마다 execution context가 생성된다는 것을 알게 되었습니다. 그러게 자바스크립트 인터프리터 안에서 모든 execution context 2가지 단계를 가지고 있습니다.

1. 생성 단계
  1. Scope Chain 을 생성합니다.
  2. 함수, 변수, arguments 를 생성합니다.
  3. this의 값을 결정합니다.
2. 실행 단계
  1. 코드를 실행하면서 값, 함수 등을 할당합니다.

이것들은 아래와 같이 3개의 properties 값을 가진 object로 구성할 수 있습니다.

```javascript
executionContextObj = {
    'scopeChain': { /* variableObject + all parent execution context's variableObject */ },
    'variableObject': { /* function arguments / parameters, inner variable and function declarations */ },
    'this': {}
}
```

## Activation / Variable Object [AO/VO]

함수가 invoke 될 때 executionContextObj 가 생성이 되는데, 이 생성이 될 때는 아직 함수가 실행되기 전입니다. 이 단계를 생성단계라고 합니다. 여기서 인터프리터는 함수를 스캔해서 내부 함수, 변수, 파라미터, arguments를 검색합니다. 이 결과 값을 variableObject 에 생성합니다.

아래 인터프리터가 어떻게 코드를 판별하는지 내용이 있습니다.

1. 함수의 실행한 코드를 찾습니다.
2. 함수 코드를 실행하기 전에, execution context 를 생성합니다.
3. 생성 단계 돌입
   1. Scope Chain 을 초기화합니다.
   2. variable Object 를 생성합니다.
      1. arguments object를 생성, context 의 파라미터들을 체크해서 arguments 에 데이터를 넣습니다.
      2. 선언된 함수를 검색합니다.
         1. 함수를 찾을 경우 variable object의 properties에 등록합니다. 등록할 때 함수의 pointer를 참조합니다.
         2. 동일한 이름이 있을 경우 덮어 쒸웁니다.
      3. 선언된 변수를 검색합니다.
         1. 변수를 찾을 경우 variable object의 properties에 등록합니다. 그리고 undefined 값으로 초기화 합니다.
         2. 동일한 이름이 있을 경우 그냥 지나 갑니다.
   3. this 값을 결정합니다.
4. 실행 단계 돌입
   1. 함수 코드를 실행하여 변수 값을 할당

예를 하나 들어보면

```javascript
function foo(i) {
    var a = 'hello';
    var b = function privateB() {

    };
    function c() {

    }
}

foo(22);
```

위 예제에 대한 생성 단계를 아래와 같습니다.

```javascript
fooExecutionContext = {
    scopeChain: { ... },
    variableObject: {
        arguments: {
            0: 22,
            length: 1
        },
        i: 22,
        c: pointer to function c()
        a: undefined,
        b: undefined
    },
    this: { ... }
}
```

실행 단계는 아래와 같습니다.

```javascript
fooExecutionContext = {
    scopeChain: { ... },
    variableObject: {
        arguments: {
            0: 22,
            length: 1
        },
        i: 22,
        c: pointer to function c()
        a: 'hello',
        b: pointer to function privateB()
    },
    this: { ... }
}
```

# 참고자료

* http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/
