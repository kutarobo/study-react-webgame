1. useReducer

- redux와 비슷한 효과를 낼 수 있다.

  - contextApi 와 합쳐서 사용함으로 써 소규모앱에서 리덕스를 대체할 수 있다.
  - 규모가 크다면 리덕스를 쓰게된다.
    - 비동기적인 부분이 불편해서..

- useState가 많아지면 state를 모아서 action을 통해서만 바꾼다.

  - action을 dispatch 하면 reducer에 정의된 방식대로 실행이된다.

- dispatch

2. 최적화

- props 넣어두는 데이터는 useCallback으로 감싸주면 좋다.

  - 변경될 데이터를 감지하도록 지정한다.

  ```js
  useCallback(() => {
    // 본문
  }, [감지될데이터]);
  ```

- 어떤것 때문에 랜더링을 유발하는지 잘 모르겠을때 아래와 같은 방법으로 원일을 찾으면 유용하다.
  ```js
  import React, { useEffect, useRef } from "react";
  const ref = UseRef([]);
  useEffect(() => {
    console.log(
      propsA === ref.current[0],
      propsB === ref.current[1],
      dispatch === ref.current[2]
    ); // 이런식으로 검증할 프롭스와 ref로 비교. false가 뜨는게 있으면 그것때문에 리랜더링이되는거다.
    ref.current = [propsA, propsB];
  }, [propsA, propB, dispatch]); // 검증할 프롭스 다때려박는다.
  ```

3. immer 라이브러리

- 불변성을 유지하도록 도와준다.
- 적용

### createContext 및 Provider

- 성능적인 이슈가 생길 수있어 매번 새로운 객체가 생기지 않도록 useMemo로 캐싱을 해주면 좋다
- useContext
