export const { prototype, freeze, keys, create, assign } = Object;

export function isObject(target: any):target is object{
  return target !== null && typeof target === 'object';
} 

export function isUndef(v: any): boolean {
  return v === undefined || v === null
}

export function isDef(v: any): boolean {
  return v !== undefined && v !== null
}

/**
 * 比较两个对象是否相同
 * @param x 第一个对象
 * @param y 第二个对象
 * @returns 如果比较的两个对象相同则返回 true, 不相等则返回 false
 */
export function deepEqual(x: any, y: any): boolean {
  if (x && y && typeof x === "object" && typeof y === "object") {
    if (Array.isArray(x) !== Array.isArray(y)) {
      return false;
    }
    for (const key in x) {
      if (!deepEqual(x[key], y[key])) {
        return false;
      }
    }
    for (const key in y) {
      if (!deepEqual(y[key], y[key])) {
        return false;
      }
    }
    return true;
  }
  return x === y;
}

/**
 * 判断传入的两个值是否相等
 */
export function isEqual(value, value2) {
  return value === value2 || (value !== value && value2 !== value2);
}