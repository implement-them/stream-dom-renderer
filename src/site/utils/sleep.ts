
export const sleep = (t: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, t);
  });
};
