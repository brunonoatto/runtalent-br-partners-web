export const onlyNumbers = (value: string) =>
  value?.match(/\d/g)?.join("") || "";
