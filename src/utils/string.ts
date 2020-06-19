export const isNullOrWhiteSpaces = (str: string | undefined) => {
  return str === null || str === undefined || str.match(/^ *$/) !== null;
};
