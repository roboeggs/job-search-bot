function Board(){
  const jwtToken = localStorage.getItem('jwtToken');

  fetch('/api/data', {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Data received:', data);
    })
    .catch((error) => console.error(error));
}
export default Board;