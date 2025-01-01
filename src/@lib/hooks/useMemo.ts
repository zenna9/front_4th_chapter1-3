import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  // useRef에 deps와 result가 들어가는 이유가 뭘까?
  // useRef는 state와 다르게 값이 바뀌어도 렌더링을 하진 않음
  const memoizedRef = useRef<{ deps: DependencyList; result: T } | null>(null);

  // 2. 현재 의존성과 이전 의존성 비교
  const hasChanged =
    !memoizedRef.current || // 최초 실행인경우 이 값이 null임
    !_equals(memoizedRef.current.deps, _deps); // 의존성이 변경되었으면 '같지않음'

  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  if (hasChanged) {
    const newValue = factory(); // 새 값 계산?????(???)
    memoizedRef.current = { deps: _deps, result: newValue };
  }

  // 4. 메모이제이션된 값 반환
  return memoizedRef.current!.result;
}
