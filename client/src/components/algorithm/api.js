const baseUrl = 'https://api.hh.ru';

export const searchVacancies = async (params) => {
  const url = new URL(`${baseUrl}/vacancies`);
  url.search = new URLSearchParams(params);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const searchRegions = (newRegionValue) => {
  const url = new URL(`${baseUrl}/suggests/area_leaves`);
  url.search = new URLSearchParams({
    text: newRegionValue.trim(),
  });

  return fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => data.items)
    .catch(error => {
      console.error(error);
      return error;
    });
};