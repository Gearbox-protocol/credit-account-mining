const isVisited = () => {
  try {
    return localStorage.getItem('visited') === 'true';
  } catch {
    return false;
  }
};

const setVisited = (status: boolean) => {
  localStorage.setItem('visited', String(status));
};

export { isVisited, setVisited };
