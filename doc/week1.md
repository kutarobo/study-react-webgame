## package.json 설치

```js
npm init
npm i react react-dom
npm i -D webpack webpack-cli

npm i -D @babel/core    // 바벨의 기본적인것
npm i -D @babel/preset-env // 옛날문법 지원
npm i -D @babel/preset-react // 리액트같은거 지원함.
npm i -D babel-loader // 바벨과 웹팩연결
npm i -D @babel/plugin-proposal-class-properties

npm i -D react-refresh @pmmmwh/react-refresh-webpack-plugin // 핫로딩
npm i -D webpack-dev-server
```

- -D 옵션: 개발용으로 사용 (devDependencies)
- preset: plugin 들의 모음

---

## class vs hooks

- react에서는 hooks 를 추천한다.
- react hooks 방식의 코드가 더 간결하다.
- hooks: state가 변하면 컴포넌트 함수가 재실행하기때문에 조금 더 느릴 수 있다. (ex. gugudan 전체)
- class: state가 변하면 reder() 함수만 재실행한다 (ex. gugudan 의 render)

### useRef 사용법.

1. class 방식에서

```js
class GuGuDan extends React.Component {
    input;

    this.input.focus();
    reder() {
        return (<input ref={(c) => { this.input = c; }} />) //
    }
}
```

2. hook 방식에서

```js
const GuGuDan = () => {
  const inputRef = React.useRef(초기값);
  inputRef.current.focus(); // current가 중간에 들어가줘야함.
  return <input ref={inputRef} />;
};
```

---

## 각종팁

1. 성능최적화를 위해 render를 최소화 해야한다.
2. 함수를 태그에서 따로 빼는 이유

   - 가독성과 유지보수.
   - 새로 랜더링될 때마다 태그에 있는 함수도 새로 생성되기때문에 바깥으로 뺀다.

3. class component 방식으로 개발할경우 생성자와 슈퍼는 아래와 같이 생략가능하다

```js
constructor(props) {
    super(props)
    this.state = {
        // 바뀌는 것 들 속성으로 추가
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: '',
        result: ''
    }
}
```

는 constructor와 super를 생략하고 아래와 같이 줄여서 사용하기도 한다.

```js
this.state = {
  // 바뀌는 것 들 속성으로 추가
  first: Math.ceil(Math.random() * 9),
  second: Math.ceil(Math.random() * 9),
  value: "",
  result: "",
};
```

## lifeCycle

1. class 의경우

- constructor -> render -> ref -> componentDidMount
- -> setState/props 바뀔때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate
- -> 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

- componentDidMount
  - 컴포넌트가 첫 렌더링 된 후 실행
  - 비동기 요청을 많이 한다.
- componentWillUnmount
  - 부모가 해당 컴포넌트를 제거하기 직전 실행
  - 비동기 요청 정리를 많이한다.
