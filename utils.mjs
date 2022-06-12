export const getRandomYear = () => {
  const start = new Date(2011, 1, 1);
  const end = new Date(2021, 1, 1);
  return new Date(+start + Math.random() * (end - start)).getFullYear();
};
