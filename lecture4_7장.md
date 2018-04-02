# 7장 컴포넌트 개선하기

* 리액트 컴포넌트의 render 함수만 사용해도 상당히 많은 애플리케이션을 만들 수 있음
* 하지만 자바스크립트는 callback의 연속이기 때문에 이런 부분을 처리해야할 요소가 필요하다.

## 7.1 컴포넌트 생애주기

![](https://velopert.com/wp-content/uploads/2016/03/Screenshot-from-2016-12-10-00-21-26-1.png)

* 컴포넌트가 마운트되거나 갱싱될 때 호출되는 일련의 메서드들
* 위 그림과 같은 구조로 되어 있음
* 크게 2가지의 생애주기 그룹으로 구성할 수 있다.

### 마운팅 생애주기

* 컴포넌트가 마운트되거나 언마운트되면 호출되는 메서드
* 마운트 되거나 언마운트 될 때 딱 한 번만 호출하는 메서드
* 보통 최초 상태를 설정하거나, API를 호출, 타이머 처리, 서드파티 라이브러리를 초기화하는 등의 작업에 사용

* 마운트란?
    * 끼우다, 고정하다, 올라타다 등의 사전적 의미
    * 리액트에서는 컴포넌트를 특정 영역에 끼워넣는 행위를 가리킨다.
    * 예로 ReactDOM.render 함수를 통해서 DOM의 특정 영역에 리액트 컴포넌트를 끼워 넣을 수 있고, 이러한 과정을 마운트한다고 의미한다.

* 컴포넌트 마운팅 생애주기
    * 컴포넌트가 마운트 될 경우
        1. constructor(props)
        2. componentWillMount() : 컴포넌트가 렌더링 되기 적전에 호출
        3. render()
        4. componentDidMount()  : 컴포넌트가 렌더링된 직후에 호출
    * 컴포넌트가 언마운트 될 경우
        1. componentWillUnmount()

* 보통 DOM을 처리해야 하는 경우는 컴포넌트가 렌더링 된 후에 처리해야 하기 때문에 componentDidMount() 함수를 사용
* 초기 API 요청의 경우 둘 다 사용 가능
* 위에서 시작한 프로세스들은 componentWillUnmount()에서 종료를 해야 함

### 갱신 상애주기

* 컴포넌트의 상태가 바뀌거나 부모로부터 새로운 프로퍼티가 도착한 경우에 호출되는 메소드
* 생애주기
    * 상태가 변경된 경우
        1. shouldComponentUpdate(nextProps, netState) : true인 경우 생애주기 메소드들이 실행, 기본 값은 true
        2. componentWillUpdate(nextProps, netState) : 컴포넌트 갱신 직전에 호출
        3. render()
        4. componentDidUpdate(prevProps, prevState) : 컴포넌트 갱신 직후에 호출
    * 새로운 프로퍼티가 도착한 경우
        1. componentWillReceiveProps(nextProps) : setState를 유일하게 쓸 수 있음
        2. shouldComponentUpdate(nextProps, netState)
        3. componentWillUpdate(nextProps, netState)
        4. render()
        5. componentDidUpdate(prevProps, prevState)
* 기본적으로 부모가 갱신되면 자식들도 전부 갱신 된다.
* shouldComponentUpdate()를 사용하면 위 내용에 제한을 걸 수 있다.
* shouldComponentUpdate()는 아직 변경 전이기 때문에 이전 값들은 this.state와 this.props로 가져올 수 있다.

## React.Children

* 특정 컴포넌트의 자식들을 다룰 수 있는 방법을 제공
* 자식 노드노드들을 배열로 변환(toArray), map을 적용하거나, 자식을 이터레이션하거나, 자식 수를 셀 수 있다.
* React.Children.only 를 사용하면 오직 한 자식만 표시하는 검사할 도 있음.
* props.children 를 통해서 자식 elements를 전달 받을 수 있음
* 자세한 건 https://reactjs.org/docs/react-api.html#reactchildren 참고

# 7.2 자바스크립트 라이브러리 통합

* 요즘은 웬만한 건 다 표준으로 제공해주기 때문에 표준을 우선 쓰자.

## 7.2.1 Fetch 를 사용해 요청하기

* https://developer.mozilla.org/ko/docs/Web/API/Fetch_API
* IE에서는 아직 지원이 안되기 때문에 폴리필을 사용

## 7.2.2 D3 타입라인 포함시키시

* 책에 있는 내용 참고

# 7.3 고차 컴포넌트

* 고차 컴포넌트는 리액트 컴포넌트를 인자로 받아서 다른 리액트 컴포넌트를 반환하는 함수
* 인자로 받은 컴포넌트를 상태를 관리하는 컴포넌트나 다른 기능을 부가하는 컴포넌트로 감싸서 돌려줌
* 기능을 재활용하고 컴포넌트 상태나 생애주기 관리를 추상화할 수 있는 훌륭한 방법

# 7.4 리액트 밖에서 상태 관리하기

* 리액트 기본 상태 관리 기능만으로 훌륭한 애플리케이션 개발은 가능
* 규모가 커지면 사람의 두뇌로 이해하기 어렵게 됨
* 상태를 리액트 밖에서 관리하면 리액트에 존재하는 클래스 컴포넌트의 필요성이 줄어든다.
* 이 말은 애플리케이션 안에서 리액트 상태나 setState 를 전혀 사용하지 않는다는 의미
* 대부분의 컴포넌트를 상태가 없는 함수형 컴포넌트로 제작이 가능
* 이해하기 쉽고 테스트하기 쉬운 구조 작성이 가능

# 7.5 플럭스





# 병행성 모델과 이벤트 LOOP (번외편)

```JavaScript
(function () {

  console.log('this is the start');

  setTimeout(function cb() {
    console.log('this is a msg from call back');
  });

  console.log('this is just a message');

  setTimeout(function cb1() {
    console.log('this is a msg from call back1');
  }, 0);

  console.log('this is the  end');
  for(var i=0; i <= 10000000; i++) {
  }
  console.log('this is the delay Logic');
})();
```
위 함수가 실행할 경우에 결과는 어떻게 나올까요?(생각해보고 직접 한번 해보세요.)
해당 결과가 나오는 구조에 대해서 한번 설명해보도록 하겠습니다.
자바스크립트는 이벤트 LOOP을 기반으로 한 병행성 모델을 가지고 있습니다. 이 모델에 대해서 한번 설명을 해보겠습니다.

## 자바스크립트 런타임 개념

   ![런타임 개념](https://developer.mozilla.org/files/4617/default.svg)

   자바스크립트도 다른 언어와 마찬가지로 런타임 시에 스택과 HEAP의 메모리 구조로 되어 있습니다. 거기에 추가적으로 하나의 이벤트 큐를 가지고 있습니다.
   그럼 각각이 해주는 역할에 대해서 한번 알아보도록 하겠습니다.

1. 스택
   ```JavaScript
   function f(b){
     var a = 12;
     return a+b+35;
   }

   function g(x){
     var m = 4;
     return f(m*x);
   }

   g(21);
   ```
   * 위 프로그램은 아래와 같은 구조로 동작합니다.
      * g가 호출될 경우 g 함수의 arguments와 로컬 변수를 포함해서 스택의 한 프레임에 저장이 됩니다. 
      * g에서 f 함수를 호출할 경우 f 함수의 arguments와 로컬 변수를 g 함수가 저장된 스택의 프레임 위에 저장이 됩니다.
      * f함수가 return 되거나 종료하게 되면 스택에서 제거 됩니다.
      * g함수가 return 되거나 종료하게 되면 스택에서 제거 됩니다.
   * 런타임 시 Stack의 역할은 함수의 동작을 순서대도 되도록 해주는 역할을 합니다.

2. HEAP
   * 자바스크립트에서는 객체({}로 구성된 부분)가 힙 영역안에 위치합니다.

3. 큐
   * 자바스크립트에만 있는 부분입니다.
   * 해당 큐에는 함수들이 저장이 됩니다.
   * 스택이 비어 있고 해당 큐에 함수가 들어가 있으면 해당 함수를 실행합니다.
   * 어떤 함수들이 들어갈까요?
      * setTimeout, setInternal 등 타이머 관련 함수에 사용되는 리턴 함수들
      * XHR 등을 활용한 Ajax 결과 함수들

## 이벤트 루프

1. 자바스크립트는 아래와 같은 방식으로 동작을 합니다.
   1. 우선 Stack을 확인합니다.
   2. Stack에 실행해야 함수가 있다면 Stack의 데이터를 비울 때 까지 계속 동작합니다.(Run-To-Completion)
   3. Stack에 실행해야 할 함수가 없다면 큐를 확인 합니다.
   4. 큐에 실행할 함수가 있다면 해당 함수를 Stack에 넣습니다.
   5. 위 작업을 계속 반복합니다.
2. 자바스크립트는 한번 동작을 시작하면 종료되기 전까지 해당 프로세스를 계속 동작합니다.
3. 그래서 한 함수가 너무 오래 동안 동작을 하면 다른 함수가 동작을 하지 못합니다.
4. 그래서 최대한 작게 만들고 큐를 활용해서 프로그램을 작성할 수 있도록 해야 합니다. 

## 그럼 자바스크립트는

1. 자바스크립트는 기본적으로 1개의 Stack, 1개의 이벤트 큐를 가지고 동작을 합니다. 그래서 꼭 싱글 쓰레드로 동작하는 것 처럼 보입니다.
2. 최근에는 webwroker 등을 이용해서 여러 개의 stack과 이벤트 큐를 이용해서 프로그램이 가능하지만 이건 우선 번외판
3. 이벤트 루프를 사용하기 떄문에 결과 block을 사용하지 않는 다는 장점
   1.  C에서는 함수가 하나의 쓰레드에서 실행 될 때 그것은 어떤 시점에 다른 쓰레드에 있는 어떤 코드를 실행하기 위해 멈추지만(blocking) 자바스크립트는 하나에서 전부 동작하기 떄문에 Blocking이 없습니다. 
4. nodejs 홈페이지에 나와있는 내용이 바로 이런 부분을 나타내는 것입니다.
> Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

# 자바스크립트 Scope Chain 의 식별자 해결 및 Closures(번외편)

제목만 봐서는 머라고 하는 건지... 우선 해당 내역을 특정 글을 번역할려고 노력하다가 그냥 제가 이해한 정도의 수준의 내용입니다.

우리는 이젠 모든 함수가 런타임 시에 variable object(VO: 함수 내에 주어진 모든 변수, 함수, 파라미터 등등)를 가진 execution context 를 가진다는 것을 알게 되었습니다.(우아..)

각각의 execution context 의 scope chain 은 현재 context의 VO와 부모 context 들의 lexical VO들을 모아놓은 집합이라고 보면 됩니다.

Scope=VO + 모든 부모의 VO
eg: scopeChain = [VO + VO1 + VO2 ... + VOn+1]

## Scope Chain 의 VO 생성

Scope Chain 의 첫 번째 VO의 경우 현재 함수의 execution context이고, 우리는 부모 Context의 Scope Chain을 통해서 부모의 VO들을 찾을 수 있습니다.

```javascript
function one() {
    two();

    function two() {
        three();

        function three() {
            alert('I am at function three');
        }
    }
}
```

!(Execution COntext Stack)[http://davidshariff.com/blog/wp-content/uploads/2012/06/stack14.jpg]

위 예제는 global context 부터 시작해서 one(), two(), three() 함수를 차례대로 호출하고, 최종적으로 alert 창을 호출합니다. 위 이미지는 three 함수 호출 시에 보여지는 stack 이미지 입니다. 그 때 스코프 체인은 아래와 같을 것 입니다.

```javascript
    "three() Execution Context" : {
        "Scope Chain" : [
            [threeVO],
            [twoVO],
            [oneVO],
            [GlobalVO]
        ]
    }
```

## Lexical Scope

자바스크립트 가장 큰 특징 중 하나는 인터프리터가 동적 스코프가 아닌 Lexical Scope를 사용한다는 것입니다. Lexical Scope 란 자식 함수는 부모 함수의 변수에 접근할 수 있는 scope를 가진다는 것을 의미합니다.

위의 예제에서 어떤 순서로 내부함수들이 호출되는지 순서가 중요하지는 않습니다. three() 함수는 항상 two() 함수가 호출한 후에 호출될 것이고, 두 함수 또한 one() 함수가 호출된 후에 호출 될 것입니다. 이것은 scope chain 을 통해서 모든 내부 함수들이 외부 함수의 VO에 연결할 수 있도록 해 줍니다.

lexcial scope는 모든 개발자들이 복잡하게 생각합니다. 모든 함수는 현재 context 의 값들을 가지고 있는 VO를 포함하는 execution context를 생성합니다.

VO의 동적 런타임 평가는 각 context의 lexcial scope와 결합하여 예상하지 못할 결과를 이끌어낼 수 있습니다. 아래 예제를 한반 봅시다.

```javascript
var myAlerts = [];

for (var i = 0; i < 5; i++) {
    myAlerts.push(
        function inner() {
            alert(i);
        }
    );
}

myAlerts[0](); // 5
myAlerts[1](); // 5
myAlerts[2](); // 5
myAlerts[3](); // 5
myAlerts[4](); // 5
```
위에 예제를 처음 보내게되면 우리는 1,2,3,4,5가 순서대로 alert 이 나올 것으로 예상을 하게 됩니다.
하지만 예상과 다르게 5,5,5,5,5 라는 결과가 나오게 됩니다. 왜 그럴까요? 한번 이 것에 대해서 생각해면,

우선 inner() 함수가 global context 에 생생되게 됩니다. inner() 의 scope chain 에는 global context를 포함하고 있습니다.

inner() 함수가 실행할 때, i가 무엇을 처다볼까요? i는 global context에 있는 i를 처다보게 됩니다. 이미 for 문은 전부 동작을 했기 때문에 i는 5라는 값으로 변경이 되었고, 그래서 전부 5 값이 나오게 됩니다.

## 변수의 값 해결?

아래 예제는 a,b,c 값을 더해서 6이라는 결과는 보여주는 예제입니다.

```javascript
​function one() {

    var a = 1;
    two();

    function two() {

        var b = 2;
        three();

        function three() {

            var c = 3;
            alert(a + b + c); // 6

        }

    }

}

one()​;
```

alert(a+b+c) 부분이 매우 흥미롭습니다.(왜??) 보면 three() 함수 내부에 a,b 변수가 선언 되지 않았는데, 어떻게 이것들을 여기서 쓸 수 있을까요? 인터프리터가 어떻게 이코드를 평가하는지 알기 위해서, 우리는 three() 함수의 스코프 체인을 볼 필요가 있습니다.   

![scope chain](http://davidshariff.com/blog/wp-content/uploads/2012/06/scopechain1.png)

a 변수를 평가하기 위해서 먼저 three() VO를 검색합니다. 만약 있으면 그것을 사용하고 없으면 scope chain 을 통해서 two() VO를 검색하고, 여기에도 없으면 다음 one() VO, 그 다음에는 global VO를 검색합니다. 만약 있다면 그 단계에 있는 값을 가져옵니다.

## 어떻게 closures 와 함계 동작하나요?

자바스크립트에서 closure는 매우 어려운 부분으로 인식되고 있는데, closure는 단순한 scope chain 에 대한 이해만 있으면 쉽게 알 수 있습니다.

클로저에 대해서 더글라스 크락포드는 이렇게 말했습니다.

> An inner function always has access to the vars and paramters of it's outer function, event after the outer function has returned....

아래 코드는 클로저에 대한 예제 입니다.

```javascript
function foo() {
    var a = 'private variable';
    return function bar() {
        alert(a);
    }
}

var callAlert = foo();

callAlert(); // private variable
```

우선 global context에 foo() 함수와 callAlert 라는 변수가 저장이 됩니다. foo 함수의 리턴 값은 함수로 되어 있습니다.
자 그럼 각각의 함수의 VO는 어떤 식으로 되었을까요?

```javascript
// Global Context when evaluated
global.VO = {
    foo: pointer to foo(),
    callAlert: returned value of global.VO.foo
    scopeChain: [global.VO]
}

// Foo Context when evaluated
foo.VO = {
    bar: pointer to bar(),
    a: 'private variable',
    scopeChain: [foo.VO, global.VO]
}

// Bar Context when evaluated
bar.VO = {
    scopeChain: [bar.VO, foo.VO, global.VO]
}
```

callAlert()함수를 선언할 때, 우리는 bar() 함수의 포인터를 리턴하는 foo() 함수를 넣어줍니다. bar() 함수를 보면 scope Chain 에 [bar.VO, foo.VO, global.VO] 이런 식으로 들어가 있는 것을 볼 수 있습니다.
우선 a 값을 bar.VO에서 찾고 없으면 Foo.VO, global.VO 순서대로 검색을 합니다. 여기서는 foo.VO에 있기 때문에 여기서 찾아서 결과를 리턴합니다. 

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

* 러닝 리액트
* https://velopert.com/1130
* https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/
* https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop\
* http://davidshariff.com/blog/javascript-scope-chain-and-closures/#first-article
* http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/
* https://reactjs.org/docs/jsx-in-depth.html