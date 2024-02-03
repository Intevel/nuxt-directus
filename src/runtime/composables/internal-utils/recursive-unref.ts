import { isRef, unref } from 'vue'

export function recursiveUnref (value: any): any {
  if (isRef(value)) {
    return recursiveUnref(unref(value))
  } else if (Array.isArray(value)) {
    const result: any[] = []
    for (let i = 0; i < value.length; i++) {
      result[i] = recursiveUnref(value[i])
    }
    return result
  } else if (typeof value === 'object') {
    const result: any = {}
    for (const key in value) {
      result[key] = recursiveUnref(value[key])
    }
    return result
  } else {
    return value
  }
}
