export const findDiff = (obj1: {}, obj2: {}) => {
  let changesVals = [];

  for (let item1 in obj1) {
    for (let item2 in obj2) {
      if (
        item1 === item2 &&
        obj1[item1 as keyof typeof obj1] !== obj2[item2 as keyof typeof obj2]
      ) {
        changesVals.push(item1);
      }
    }
  }

  return changesVals;
};

export const isEqual = (obj1: {}, obj2: {}) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export const isEmptyOrNull = (value: string | null) =>
  value === "" || value == null;

export const isArray = (value: any) => Array.isArray(value);

export const isEmptyArray = (value: any) => {
  if (isArray(value)) return value.length < 1;

  new Error("This is not array");
};

export const isEmptyObject = (obj: any) => {
  if (isEmptyOrNull(obj)) return true;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

export class ThrowNewError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
    Object.setPrototypeOf(this, ThrowNewError.prototype);
  }
}

export const setNewError = (message: any, options?: { name?: string }) => {
  if (
    (!isEmptyOrNull(message) && typeof "" === typeof message) ||
    !isEmptyObject(message)
  ) {
    class CustomError extends Error {
      constructor(message: string) {
        super(message);
        this.name = options?.name ?? "";
        Object.setPrototypeOf(this, CustomError.prototype);
      }
    }

    throw new CustomError(message);
  }

  throw new Error(message);
};

export const parse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const joinArray = (type: "all" | "middle", arr = [], separator = "") => {
  if (type === "all") {
    return arr.join(separator);
  }

  if (type === "middle") {
    let result = "";

    for (let i = 0; i < arr.length; i++) {
      if (i > 0) {
        result += separator;
      }
      result += arr[i];
    }

    return result;
  }
};

export const getActiveRoute = (a: string, b: string) => {
  return a === (b?.startsWith("/") ? b : "/" + b);
};
