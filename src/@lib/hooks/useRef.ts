import { useState } from "react";
export function useRef<T>(initialValue: T): { current: T } {
  // 이게 무슨뜻이지...
  const [ref] = useState<{ current: T }>({ current: initialValue });

  return ref;
}
