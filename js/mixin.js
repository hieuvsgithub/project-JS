async function fetchAPI(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getById(url, id) {
  try {
    const res = await fetch(`${url}?id=${id}`);
    const data = await res.json();
    return data[0];
  } catch (error) {
    console.log(error);
  }
}

export { fetchAPI, getById };
