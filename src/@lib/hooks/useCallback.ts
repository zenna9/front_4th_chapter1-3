import { DependencyList } from "react";

export function useCallback<T extends (...args: T[]) => T>(
  factory: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _deps: DependencyList,
): T {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  return ((...args) => factory(...args)) as T;
}
