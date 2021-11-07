export type FieldValues = Record<string, any>;

const isKey = (value: string) => /^\w*$/.test(value);

const compact = (value: any[]) => value.filter(Boolean);
const stringToPath = (input: string): string[] =>
  compact(input.replace(/["|']/g, "").replace(/\[/g, ".").replace(/\]/g, "").split("."));
const isObjectType = (value: unknown) => typeof value === "object";

const isNullOrUndefined = (value: unknown): value is null | undefined => value == null;
const isObject = <T extends object>(value: unknown): value is T =>
  !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value) && !(value instanceof Date);

const setValueByPath = (object: FieldValues, path: string, value?: unknown) => {
  let index = -1;
  const tempPath = isKey(path) ? [path] : stringToPath(path);
  const length = tempPath.length;
  const lastIndex = length - 1;

  while (++index < length) {
    const key = tempPath[index];
    let newValue = value;

    if (index !== lastIndex) {
      const objValue = object[key];
      newValue = isObject(objValue) || Array.isArray(objValue) ? objValue : !isNaN(+tempPath[index + 1]) ? [] : {};
    }
    object[key] = newValue;
    object = object[key];
  }
  return object;
};
export default setValueByPath;
