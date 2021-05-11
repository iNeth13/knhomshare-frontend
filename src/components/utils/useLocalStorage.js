export default function useLocalStorage() {
  const getFromLocal = (key) => {
    const userFromLocal = localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : "";
    return userFromLocal;
  };
  const setToLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [getFromLocal, setToLocal];
}
