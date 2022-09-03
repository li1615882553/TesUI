import { isArray } from "./array/array";
import { isObject,assign } from "./object/object";

export const escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

export const getValueByPath = function (object, prop) {
  prop = prop || '';
  const paths = prop.split('.');
  let current = object;
  let result = null;
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

/**
 * 返回浅拷贝内容
 * @param value 
 * @returns 
 */
 export function shallowCopy(value:any){
  if(isArray(value)){
    return value.slice(0);
  }else if(isObject(value)){
    return assign({}, value);
  }
  return value;
}
