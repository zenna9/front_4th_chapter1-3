/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(
  factory: T, // 반환할 콜백
  _deps: DependencyList, // 의존성 리스트?
) {
  // useMemo를 사용해 factory를 메모이제이션 .. 이라는데 factory가 뭔데
  // factory: 사용자가 정의한 함수 (ex: 이벤트 핸들러)
  // _deps: 의존성 배열, 이 배열의 값이 변경되면 새로운 함수가 반환
  return useMemo(() => factory, _deps);
}
