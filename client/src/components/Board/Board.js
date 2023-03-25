function Board(){
    const data = () => {
        const url = new URL("https://api.hh.ru/vacancies");
        url.search = new URLSearchParams({
        text: 'frontend',
        area: 113,
        per_page: 2
        });
        fetch(url, {
            method: "GET",
            headers: {
              "User-Agent": "application/json"
            },
            // Включение режима отключения проверки сертификата SSL
            // (не рекомендуется использовать в боевых приложениях!)
            // Для безопасной работы с HTTPS-сайтами лучше использовать верификацию сертификата
            // с помощью библиотеки, например, https://www.npmjs.com/package/ssl-root-cas
            // В примере используется для демонстрации только для сайта hh.ru
          })
          .then(response => response.json())
          .then(data => {
            // Обработка ответа в формате JSON
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
    }
    // console.log(data());
}
export default Board;