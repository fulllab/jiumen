import { isEmpty } from "./is";

export function checkedType<T = unknown>(val: T): val is T {
  if (isEmpty(val)) {
    return false
  }
  return val
}
