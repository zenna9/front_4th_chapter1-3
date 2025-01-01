export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true; // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)

  if (typeof objA !== typeof objB) {
    // 타입이 다르면 false
    return false;
  } else if (
    typeof objA === "object" &&
    typeof objB === "object" &&
    objA !== null &&
    objB !== null
  ) {
    //두 타입 모두 object인 경우

    if (Array.isArray(objA) && Array.isArray(objB)) {
      // 배열인 경우

      if (objA.length != objB.length) {
        return false;
      } else {
        return objA.every((item, index) => deepEquals(item, objB[index])); // 깊은비교
      }
    } else if (Object.keys(objA).length !== Object.keys(objB).length) {
      // 3. 객체의 키 개수가 다른 경우 처리
      return false;
    } else {
      // 4. 모든 키에 대해 얕은 비교 수행 (Record<string, any>로 타입 캐스팅 후 재귀적으로 비교
      return Object.keys(objA).every((key) =>
        deepEquals(
          (objA as Record<string, unknown>)[key],
          (objB as Record<string, unknown>)[key],
        ),
      );
    }
  } else {
    return false;
  }
}
