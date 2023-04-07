const baseUrl = 'https://api.hh.ru';

export const searchVacancies = (params) => {
  const url = new URL(`${baseUrl}/vacancies`);
  url.search = new URLSearchParams({
    text: params.text,
    area: 113,
    per_page: 10
  });

  return fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error(error);
      return error;
    });
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