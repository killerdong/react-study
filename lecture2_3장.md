# 3장. 자바스크립트를 활용한 함수형 프로그래밍

* 리액트 프로그래밍의 세계를 탐험하다보면 함수형 프로그래밍이라는 이야기를 많이 듣는다..(이책에서 처음 듣는데...)
* Array.map, Array.reduce 등을 사용해봤으면 이미 함수형 프로그램을 경험해 본 것이다.
* 리액트 뿐만 아니라 [redux](https://deminoth.github.io/redux/) 등을 사용하면 함수형 프로그래밍에 대한 개념이 많이 사용된다.(순수함수 등등)   
  
## 3.1 함수형이란?

* 특징
    * 추상화를 식별해서 함수로 만든다.
    * 기존 함수를 이용해서 더 복잡한 추상화를 만든다.
    * 기존 함수를 다른 함수에 제공해서 더 복잡한 추상화를 만든다.
    말이 참 아렵다는.. 

* 1급시민(1급함수)
    * 숫자를 변수에 저장하듯이 함수를 변수에 저장할 수 있다.
    ```javascript
    const fortytwo = () => 42;
    ```
    * 숫자를 배열에 저장하듯히 함수를 배열에 저장할 수 있다.
    ```javascript
    const fortytwos = [42, () => 42];
    ```
    * 숫자를 객체 저장하듯이 함수를 배열에 저장할 수 있다.
    ```javascript
    const fortytwos = {number:42, fun() {return 42}};
    ```
    * 언제든 숫자를 만들 수 있듯이 필요할 때 함수를 만들 수 있다.
    ```javascript
    42 + (() => 42)();
    ```
    * 함수에 숫자를 전달할 수 있듯이 함수에 함수를 전달할 수 있다.
    ```javascript
    const weirdAdd = (n,f) => n + f();
    weirdAdd(42, () => 42);
    ```
    * 함수가 숫자를 반환할 수 있듯이 함수가 함수를 반환할 수 있다.
    ```javascript
    return 42;

    return () => 42;
    ```
    위와 같은 특징을 가지는 것들을 1급 ... 라고 부른다. 자바스크립트에서는 함수가 위의 특정을 가지고 있기 때문에 1급 함수라고 부른다.

* 고차 함수
    * 1급 함수 중에서 아래 특징을 가지면 고차 함수
        * 함수에 함수를 전달할 수 있다.
        * 함수가 함수를 반화할 수 있다.
        ```javascript
        const createScream = logger => message => logger(`${message.toUpperCase()}!!!`);
        ```
    * 화살표 함수가 2개 이상 있으면 고차함수라고 생각하면 됩니다.

## 3.2 명령형 프로그래밍과 선언적 프로그래밍 비교

### 명령형 프로그래밍(imperative programming)
* 코드가 원하는 결과를 달성해나가는 과정에만 관심을 두고 프로그래밍
* 이것을 해결하기 위해서 `어떻게` 이 것을 처리하는 관점
* 사람이 이해하기 위해서는 영어 문장 해석 하듯이 해석을 해야 함...
```javascript
const string = 'This is the midday show with Cheryl Waters';
let urlFriendly = '';

for (let i=0; i < string.length; i++) {
    if (string[i] === ' ') {
        urlFriendly += '-';
    } else {
        urlFriendly += string[i];
    }
}

console.log(urlFriendly);
```

### 선언적 프로그래밍(declarative programming)
* 어떤 일이 발생해야 하는지 기술을 하고, 실제로 그 작업을 처리하는 방법은 추상화로 아랫단에 감춰진다.
* 이것을 해결하기 위해서 `무엇을` 해야 하는 것에 관점
* 추상화된 이름만으로 무엇이 동작할 수 있는 있는 바로 추론이 가능
* 이름이 해당 기능을 전체적으로 추상화 할 수 있도록 잘 지어야 한다.
* 영어를 잘해야 한다..(....)
```javascript
const string = 'This is the midday show with Cheryl Waters';

const urlFriendly = string.replace(/ /g, '-'); 

//replace를 사용하지 말고 한번 함수형으로 구현해 봅시다.
const replaceChar = (c, ic, rl) => c === ic ? rl : c;
const reduce = (v, fn, init) => v instanceof Array ? v.reduce(fn, init) : Array.prototype.reduce.call(v, fn, init);
const replaceString = (str, replaceChar) => reduce(str, (out, char) => out + replaceChar(char,' ', '-'), '');

const urlFriendly2 = replaceString(string, replaceChar); 

console.log(urlFriendly);
console.log(urlFriendly2);
```

## 3.3 함수형 프로그래밍의 개념

### 불변성(immutable)

* 파라미터로 들어온 값을 변형하는 것이 아니고 새로운 값을 생성해서 리턴한다.

```javascript
// 불변성이 성립되지 않는 예
let color_lawn = {
    title: '잔디',
    color: '#0F0',
    rating: 0
};

const rateColor = (color, rating) => {
    color.rating = rating;
    return color;
};

console.log(rateColor(color_lawn, 5).rating);   //5
console.log(color_lawn.rating);                 //5

// 불변성이 성립되는 예
// ES2015
const rateColor2 = (color, rating) => Object.assign({}, color, {rating});
// ES2017
const rateColor3 = (color, rating) => ({...color, rating});

console.log(rateColor2(color_lawn, 7).rating);      //7
console.log(rateColor3(color_lawn, 8).rating);      //8
console.log(color_lawn.rating);                     //5

// 불변성이 성립되지 않는 예
let colorArray = [
    {title: '과격한 빨강'},
    {title: '잔디'},
    {title: '파티 핑크'}
];

const addColor = (title, colors) => {
    colors.push({title});
    return colors;
};

console.log(addColor('test', colorArray).length);   //4
console.log(colorArray.length);                 //4

// 불변성이 성립되는 예
// ES5
const addColor2 = (title, colors) => colors.concat([{title}];
// ES2015+
const addColor3 = (title, colors) => [...colors, {title}];

console.log(addColor2('test', colorArray).length);   //5
console.log(addColor3('test', colorArray).length);   //5
console.log(colorArray.length);                 //4
```

### 순수함수

* 파라미터에 의해서만 반환값이 결정되는 함수
* 최소 1개이상의 파라미터를 가진다.
* 파라미터 값이 같을 경우 항상 같은 결과 값이나 함수를 반환한다.
* 부수 효과(side effect)가 발생하면 안된다.

```javascript

const frederick = {
    name: '서동우',
    canRead: false,
    canWrite: false
};

// 순수하지 않은 함수
// 1. 파라미터를 가지고 있지 않는다.
// 2. 전역 객체를 수정하였기 때문에 side effect가 발생한다.
const selfEducate = () => {
    frederick.canRead = true;
    frederick.canWrite = true;

    return frederick;
};

selfEducate();

// 순수함수
const selfEducate2 = person => ({...person, canRead: true, canWrite: false});
```
* DOM을 직접 수정하는 것은 순수함수가 아니다.
* 그래서 리액트의 경우는 component 리턴하는 방식으로 순수함수의 특징을 지키고 있다.
```javascript
const Header = props => (<h1>{props.title}</h1>);
```

### 데이터 변환

* 함수형 프로그래밍에서는 원본 데이터를 복사해서 변환 후 결과 값을 내보낸다.
* 데이터 변환 작업을 위해서 함수를 만들기보다 우선 기존에 있는 함수를 활용할 수 있는지 고민해본다. 
* 자바스크립트에서는 `Array.prototype.map`과 `Array.protortpe.reduce` 같은 데이터 변환을 위한 여러 함수를 제공해준다.
```javascript
const shcools = ['산곡남', '세일', '인천'];

console.log(shcools.join(' , '));   //산곡남 , 세일 , 인천
console.log(shcools.filter(school => school.startsWith('산'))); //['산곡남']
console.log(shcools.map(school => `${school}고딩`));   //[산곡남고딩 , 세일고딩 , 인천고딩]

const editName = (oldName, name, arr) => arr.map(item => item.name === oldName ? {...item, name} : item);

console.log(editName('세일', '제일', schools)); //['산곡남','제일','인천']

// Object.keys() 를 이용해서 각 object의 key 값을 배열로 가져올 수 있다.

const ages = [21, 18, 42, 40, 64, 63, 34];

const maxAge = array => array.reduce((max, age) => max <= age ? age : max , 0);

console.log(maxAge(ages)); //64
```

### 고차함수

* 다른 함수를 조작할 수 있는 함수
* 다른 함수를 인자로 받거나 함수를 반환할 수 있고, 때로는 그 두가지를 모두 수행할 수 있다.
* `Array.map`, `Array.filter`, `Array.reduce` 전부 고차 함수

```javascript
const invokeIf = (condition, fnTrue, fnFalse) => condition ? fnTrue() : fnFalse();

const showWelcome = () => console.log('Welcome!!');
const showUnauthorized = () => console.log('Unauthorized!!');

invokeIf(true, showWelcome, showUnauthorized);      //Welcome!!
invokeIf(false, showWelcome, showUnauthorized);     //Unauthorized!!
```

* 커링(currying): 고차 함수 사용법과 관련한 함수형 프로그래밍 기법
    * 어떤 연산을 수행할 때 필요한 값 중 일부를 저장하고 나중에 나머지 값을 전달받는 기법이다. 이를 위해 다른 함수를 변환하는 함수를 사용하며, 이를 커링된 함수라 부른다.

```javascript
const userLogs = userName => message => console.log(`${userName} -> ${message}`);

const log1 = userLogs('서동우');        //커링 함수
const log2 = userLogs('하하하맨');      //커링 함수

log1('안녕하세요.');     //서동우 -> 안녕하세요.
log2('반갑습니다.');     //하하하맨 -> 반갑습니다.
```

### 재귀

* 자기 자신을 호출하는 함수를 만드는 기법
* 모든 루프는 재귀로 변경이 가능하고, 루프보다 오히려 재귀를 만드는게 보기 더 좋은 경우가 많다.
* 재귀의 경우 항상 스택 overflow를 조심해야 한다..
* 함수형프로그래밍에서는 최대한 재귀를 이용한다.

```javascript
const countdown = (value, fn) => {
    fn(value);
    return value > 0 ? countdown(value -1, fn) : value;
}

countdown(10, value => console.log(value));

const deepPick = (fields, object={}) => {
    const [first, ...remaining] = fields.split('.');
    return remaining.length ? deepPick(remaining.join('.'), object[first]) : object[first];
}


const test = {
    type: 'person',
    data: {
        gender: 'male',
        info: {
            id: 22,
            fullname: {
                first: 'Dan',
                last: 'Deacon'
            }
        }
    }
};

deepPick('type', test);                         //person
deepPick('data.info.fullname.first', test);     //Dan
```

### 합성(composition)

* 여러 순수함수들이 합쳐져서 함수형 프로그래밍이 가능하다.
* 각 함수를 서로 연쇄적으로 또는 병렬로 호출하거나 여러 작은 함수를 조합해서 더 큰 함수로 만드는 과정을 반복해서 전체 애플리케이션을 구축
* jquery에서 사용하는 채이닝 방법도 하나의 합의 예
```javascript
// 나중에 저런게 20개가 된다면.......
const both = date => appendAMPM(civilianHours(date));

// 이런식으로 구현하는게 
const both = compose(
    civilianHours,
    appendAMPM
);

const compose = (...fns) => arg => fns.reduce( (arg, fn) => fn(arg) , arg);
```

### 하나로 합치기

* 함수형 프로그래밍의 규칙
    1. 데이터를 변경 불가능하게 유지한다.
    2. 함수를 순수 함수로 만든다. 인자를 적어도 하나 이상 받게 만들고 데이터나 다른 함수를 반환해야 한다.
    3. (가능하면) 루프보다는 재귀를 사용한다.

# 참고 문헌

* 러닝 리액트
* 함수형 자바스크립트
