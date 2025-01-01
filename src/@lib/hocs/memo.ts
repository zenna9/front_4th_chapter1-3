import { shallowEquals } from "../equalities";
// import { ComponentType } from "react";
import React, { useRef, ComponentType } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>, // 기존 컴포넌트
  _equals = shallowEquals, // 비교용 함수 (deep일지 shallow선택하려나봄)
) {
  return (props: P) => {
    //Component를 바로 리턴하는게 아니라, 고차함수(HOC)를 반환해 나중에 props를 넣어 사용할 수 있게 함
    // 1. 이전 props를 저장할 ref 생성
    const prevPropsRef = useRef<P | null>(null);

    if (prevPropsRef.current && _equals(prevPropsRef.current, props)) {
      //3. equals 함수를 사용하여 props 비교
      return null; //null반환, 메모이제이션된 컴포넌트 반환하지 않음
    } else {
      // 4. props가 변경된 경우
      prevPropsRef.current = props; // 변경 props 렌더링
      return React.createElement(Component, props); // 2. 메모이제이션된 컴포넌트 생성
    }
  };
}
