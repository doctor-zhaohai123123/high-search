type NumberParam = null | undefined | string | number

export function isNumber(val: NumberParam): boolean {
  if (val === null || val === undefined) return false
  if (typeof val === 'number') return true
  return /^\d+$/g.test(val)
}
