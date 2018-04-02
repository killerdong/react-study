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

# 참고자료
* https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/
* https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop\
