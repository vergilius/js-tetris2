export const getTime = (previous = 0) => {
  let delta = 0;
  const now = +new Date;

  if (previous) {
    delta = (now - previous) / 1000;
  }

  return {
    previous: now,
    delta
  }
};