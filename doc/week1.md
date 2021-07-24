1. 성능최적화를 위해 render를 최소화 해야한다.

2. 함수를 태그에서 따로 빼는 이유
    - 가독성과 유지보수.
    - 새로 랜더링될 때마다 태그에 있는 함수도 새로 생성되기때문에 바깥으로 뺀다.


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
는 constructor와 super를 생략하고 아래와 같이 줄여서 사용하기도 한다.

this.state = {
    // 바뀌는 것 들 속성으로 추가
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: '',
    result: ''
}

```