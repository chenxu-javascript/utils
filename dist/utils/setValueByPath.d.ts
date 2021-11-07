export declare type FieldValues = Record<string, any>;
declare const setValueByPath: (object: FieldValues, path: string, value?: unknown) => Record<string, any>;
export default setValueByPath;
