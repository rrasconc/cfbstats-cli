export const getRandomYear = () => {
  const start = new Date(2005, 1, 1);
  const end = new Date(2021, 1, 1);
  return new Date(+start + Math.random() * (end - start)).getFullYear();
};
