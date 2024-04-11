export const onlyNumbers = (value: string) =>
  value?.match(/\d/g)?.join("") || "";

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36);
};
