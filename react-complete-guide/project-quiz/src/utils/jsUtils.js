function isEmptyString(value) {
  return value === null || value === undefined || value === "";
}

function isEmptyObject(value) {
  return value === null || value === undefined || Object.keys(value).length === 0;
}

export { isEmptyString, isEmptyObject };
