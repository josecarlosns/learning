export function isEmptyString(value) {
  return value === undefined || value === null || value.trim() === '';
}

export function isNotEmptyObject(value) {
  return value && Object.keys(value).length > 0;
}