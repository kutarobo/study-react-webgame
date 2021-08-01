## useReducer

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

- useState의 대체 함수. (state, action) => newState의 형태로 reducer를 받고 dispatch 메서드와 짝의 형태로 현재 state를 반환한다
  - useState 보다 효율적인 경우
    - 다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우
    - 다음 state가 이전 state에 의존적인 경우
- 콜백 대신 dispatch를 전달하여 자세한 업데이트를 트리거 하는 컴포넌트의 성능을 최적화할 수 있게 한다
- redux와 비슷한 효과를 낼 수 있다.

  - contextApi 와 합쳐서 사용함으로 써 소규모앱에서 리덕스를 대체할 수 있다.
  - 규모가 크다면 리덕스를 쓰게된다.
    - 비동기적인 부분이 불편해서..

- useState가 많아지면 state를 모아서 action을 통해서만 바꾼다.
  - action을 dispatch 하면 reducer에 정의된 방식대로 실행이된다.

## <br />

## context api

- useState로 관리 하기 까다로운 전역상태를 관리할때 사용한다.
- react 내장 기능.
- root에서 구성한 Provider를 내려주는 방식
- 사용하고자 하는 component에서 Dispatch와 State를 꺼내서 사용한다.
- reducer를 여러개 만들면 Provider에서 여러단계로 만들어 사용 할 수있다.
- context로 전달한 인자는 context 객체 그자체여야 한다 `context.consumer X, context O`
- useContext를 호출한 컴포넌트는 context 값이 변경되면 항상 리렌더링 될 것입니다. 만약 컴포넌트를 리렌더링 하는 것에 비용이 많이 든다면, 메모이제이션을 사용하여 최적화할 수 있다.

### 사용법

```js
 // Context 생성
 // createContext를 통해 상태를 저장하게 됩니다.
 // initState에 초기 상태값을 객체 형태로 넣으면 됩니다.
import { createContext } from "react";
const GameBoardStateContext = createContext(initState});
```

```js
// Action 생성
// 액션을 지정하여 Reducer에서 서로 다른 타입일 때 다른 로직을 진행시킬 수 있습니다.
export type Action = { type: "UPDATE"; payload };
```

```js
// Reducer 생성
// 액션에 따라 state를 변경시키는 로직을 작성할 수 있다.
import { Action } from "@/actions/gameBoardAction";
import { GameBoardState } from "@/contexts/gameBoardContext";

const gameBoardReducer = (
  state: GameBoardState,
  action: Action
): GameBoardState => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...action.payload,
        // 변경되는 payload 로직 작성
      };
    default:
      throw new Error("Unhandled action");
  }
};
```

```js
// Provider 생성
// 위에서 작성한 GameBoardStateContext를 Provider로 하여 state값을 value로 넣습니다.
// React의 useReducer에서 상태값과 dispatch를 value로 사용할 수 있습니다. (해당 예제에서는 state만 Provider로 사용하였지만 중첩된 Provider로 여러 상태를 넣을 수 있습니다.)
export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const [gameBoard, gameBoardDispatch] = useReducer(
    gameBoardReducer,
    initState
  );

  return (
    <GameBoardStateContext.Provider value={gameBoard}>
      {children}
    </GameBoardStateContext.Provider>
  );
};
```

```js
// 엔트리(루트) 파일에 적용
// 위에서 생성한 Provider를 Entry 파일인 App의 root에 감싸 주면 Provider 밑에 작성하는 하위 컴포넌트들에서 상태를 꺼내 사용할 수 있습니다.
const App = () => {
  return (
    <>
      <ContextProvider>// 하위 컴포넌트들</ContextProvider>
    </>
  );
};
```

```js
// 개별 컴포넌트에서 사용하기
// 하위 컴포넌트에서 상태를 사용할 때는 useContext를 통해 state 값을 꺼내 사용 가능합니다.

import { useContext } from "react";

const state = useContext(GameBoardStateContext);
```

## 기타 팁

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

### immer 라이브러리 사용
- [참고 블로그](https://kyounghwan01.github.io/blog/React/immer-js/#immer-js%E1%84%85%E1%85%A1%E1%86%AB)

- 불변성을 유지하도록 도와준다.
