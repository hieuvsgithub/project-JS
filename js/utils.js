async function getParam(key) {
  try {
    console.log(window.location.search);
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  } catch (error) {
    console.log(error);
  }
}
export { getParam };
