async function fetchAPI(URL_API) {
  try {
    const res = await fetch(URL_API);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export { fetchAPI };
