# 리액트 소개

## 리액트란?
* 리액트는 사용자 인터페이스(UI)를 설계할 때 사용하는 유명한 라이브러리(프레임워크가 아니다.)
* 재사용 가능한 UI 컨포넌트
* 특징
    1. Declarative
        1. Declarative(선언형)
            * 무엇을?
            * Table for two, please.
            ```javascript
                function double (arr) {
                    return arr.map((item) => item * 2);
                }

                function add (arr) {
                    return arr.reduce((prev, current) => prev + current, 0);
                }

                <Btn
                onToggleHighlight={this.handleToggleHighlight}
                highlight={this.state.highlight}>
                    {this.state.buttonText}
                </Btn>            
            ```
        2. Imperative(명령형)
            * 어떻게?
            * 창가에 위치한 테이블이 비어있다. 나와 친구는 그쪽으로 걸어가서 앉았다.
            ```javascript
                function double (arr) {
                    let results = []
                    for (let i = 0; i < arr.length; i++){
                        results.push(arr[i] * 2)
                    }
                    return results
                }

                function add (arr) {
                    let result = 0
                    for (let i = 0; i < arr.length; i++){
                        result += arr[i]
                    }
                    return result
                }

                $("#btn").click(function() {
                $(this).toggleClass("highlight")
                $(this).text() === 'Add Highlight'
                    ? $(this).text('Remove Highlight')
                    : $(this).text('Add Highlight')
                })
            ```
    2. Component-Based
    3. Learn once, Write Anywhere

## 장애물

1. 리액트는 라이브러리이다.
2. 새로운 ECMAScript
3. 함수형 자바스크립트가 유명해짐.
4. 자바스크립트 툴링 피로
    1. webpack
    2. grunt
    3. jasmine
    4. jest
    5. lodash
    6. ....

## 리액트의 미래

웹 뿐만 아니라 여러 분야에서 애플리케이션을 개발할 수 있는 토대를 갖추기 시작

## 변화하는 기술 계속 따라잡기

1. https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html
2. https://www.facebook.com/groups/react.ko/

# 최신 자바스크립트

1. const, let
    * 변수를 선언하는 최신 방법
    * const, let의 차이는 재할당이 가능한지 여부
    * var와의 차이는 const, let은 {} scope를 가진다는 것이고, var는 function scope를 가진다는 것이다.
2. template literals
    * literals : 값을 생성하는 문맥상 구조.
    * 변수를 넣는 기능을 지원하는 멀티 라인 String 리터널
    ```javascript
        const firstName = 'Jane';
        console.log(`Hello ${firstName}!
        How are you
        today?`);

        // Output:
        // Hello Jane!
        // How are you
        // today?        
    ```
    * tag literals : template literals 을 통해서 제공하는 파라미터를 통해서 특정 함수를 호출하는 literals
    ```javascript
        function raw(strs, ...substs) {
            let result = strs.raw[0];
            for (const [i,subst] of substs.entries()) {
                result += subst;
                result += strs.raw[i+1];
            }

            console.log(strs);
            console.log(substs);

            return result;
        }
        const aaaa = 1000;
        const bbbbb = 2000;

        console.log(raw`A \tagged\ template ${aaaa} wdwdwd\t\t\t\ ${bbbbb}`);
    // output : 'A \tagged\ template'
    ```
3. default parameter
    ```javascript
        function f(x, y=12) {
        // y is 12 if not passed (or passed as undefined)
        return x + y;
        }
        f(3) == 15
    ```
4. Arrow function
    ```javascript
        // Expression bodies
        var odds = evens.map(v => v + 1);
        var nums = evens.map((v, i) => v + i);

        // Statement bodies
        nums.forEach(v => {
            if (v % 5 === 0)
                fives.push(v);
            });

            // Lexical this
            var bob = {
            _name: "Bob",
            _friends: [],
            printFriends() {
                this._friends.forEach(f =>
                console.log(this._name + " knows " + f));
            }
        };

        // Lexical arguments
        function square() {
        let example = () => {
            let numbers = [];
            for (let number of arguments) {
                numbers.push(number * number);
            }

            return numbers;
        };

        return example();
        }

        square(2, 4, 7.5, 8, 11.5, 21); // returns: [4, 16, 56.25, 64, 132.25, 441]
    ```
5. transpiling vs compiling
    * transpiling : 한 언어로 작성된 소스 코드를 가져 와서 비슷한 수준의 추상화를 가진 다른 언어로 변환하는 과정
    * compiling : 한 언어로 작성된 소스 코드를 다른 언어로 변환하는 과정
6. destructuring(Array, Object)
    ```javascript
        // list matching
        var [a, ,b] = [1,2,3];
        a === 1;
        b === 3;

        // object matching
        var { op: a, lhs: { op: b }, rhs: c }
            = getASTNode()

        // object matching shorthand
        // binds `op`, `lhs` and `rhs` in scope
        var {op, lhs, rhs} = getASTNode()

        // Can be used in parameter position
        function g({name: x}) {
        console.log(x);
        }
        g({name: 5})

        // Fail-soft destructuring
        var [a] = [];
        a === undefined;

        // Fail-soft destructuring with defaults
        var [a = 1] = [];
        a === 1;

        // Destructuring + defaults arguments
        function r({x, y, w = 10, h = 10}) {
        return x + y + w + h;
        }
        r({x:1, y:2}) === 23
    ```
7. Object literal enhancement
    ```javascript
        var obj = {
            // Sets the prototype. "__proto__" or '__proto__' would also work.
            __proto__: theProtoObj,
            // Computed property name does not set prototype or trigger early error for
            // duplicate __proto__ properties.
            ['__proto__']: somethingElse,
            // Shorthand for ‘handler: handler’
            handler,
            // Methods
            toString() {
            // Super calls
            return "d " + super.toString();
            },
            // Computed (dynamic) property names
            [ "prop_" + (() => 42)() ]: 42
        };
    ```
8. spread operator
    ```javascript
        function f(x, ...y) {
        // y is an Array
        return x * y.length;
        }
        f(3, "hello", true) == 6

        function f(x, y, z) {
        return x + y + z;
        }
        // Pass each elem of array as argument
        f(...[1,2,3]) == 6        
    ```
9. promise
    * await async
    ```javascript
        function timeout(duration = 0) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, duration);
            })
        }

        var p = timeout(1000).then(() => {
            return timeout(2000);
        }).then(() => {
            throw new Error("hmm");
        }).catch(err => {
            return Promise.all([timeout(100), timeout(200)]);
        })

    ```
10. class
    * private?
    ```javascript
        class SkinnedMesh extends THREE.Mesh {
            constructor(geometry, materials) {
                super(geometry, materials);

                this.idMatrix = SkinnedMesh.defaultMatrix();
                this.bones = [];
                this.boneMatrices = [];
                //...
            }
            update(camera) {
                //...
                super.update();
            }
            static defaultMatrix() {
                return new THREE.Matrix4();
            }
        }
    ```
11. Iterators + For..Of
    ```javascript
        let fibonacci = {
            [Symbol.iterator]() {
                let pre = 0, cur = 1;
                return {
                next() {
                    [pre, cur] = [cur, pre + cur];
                    return { done: false, value: cur }
                }
                }
            }
        }

        var fibonacci = {
        [Symbol.iterator]: function*() {
            var pre = 0, cur = 1;
            for (;;) {
                var temp = pre;
                pre = cur;
                cur += temp;
                yield cur;
            }
        }
        }        

        for (var n of fibonacci) {
        // truncate the sequence at 1000
        if (n > 1000)
            break;
        console.log(n);
        }

        interface IteratorResult {
            done: boolean;
            value: any;
        }
        interface Iterator {
            next(): IteratorResult;
        }
        interface Iterable {
            [Symbol.iterator](): Iterator
        }
    ```
12. module
    1. esscript module
    2. common.js
    3. amd

# 참고자료

1. 러닝 리액트
2. https://github.com/chocoma87/ToyProject/wiki/%EA%B0%9C%EB%B0%9C%EC%9D%BC%EC%A7%80-6-(Imperative-vs-Declarative-Programming)
3. https://reactjs.org/blog/2013/06/05/why-react.html
4. http://exploringjs.com/
5. https://babeljs.io/learn-es2015/
