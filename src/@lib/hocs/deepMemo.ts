import { deepEquals } from "../equalities";
import React, { ComponentType, useRef } from "react";
import { memo } from "./memo.ts";

export function deepMemo<P extends object>(Component: ComponentType<P>) {

  // return memo(Component, deepEquals);
  return  (props : P) => { //Component를 바로 리턴하는게 아니라, 고차함수(HOC)를 반환해 나중에 props를 넣어 사용할 수 있게 함
    // 1. 이전 props를 저장할 ref 생성
    const prevPropsRef = useRef<P | null>(null);

    if(prevPropsRef.current && deepEquals(prevPropsRef.current, props)){ //3. equals 함수를 사용하여 props 비교
      return null ; //null반환, 메모이제이션된 컴포넌트 반환하지 않음
    }else{ // 4. props가 변경된 경우
      prevPropsRef.current = props; // 변경 props 렌더링
      return React.createElement(Component, props); // 2. 메모이제이션된 컴포넌트 생성
    }

  }
}
