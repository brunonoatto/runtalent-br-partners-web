export const get = () => {
  fetch("http://localhost:5173/client").then((response) => {
    console.log({ response });
  });
};
