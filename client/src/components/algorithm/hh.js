export default class Api {
    constructor(config) {
      this.baseUrl = config.baseUrl;
      this.headers = config.headers;
    }

    _handleResponse(response, errorMessage) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error(`Ошибка: ${res.status}. Сообщение об ошибке: ${errorMessage}`)
        );
    }
    
}  
export const data = () => {
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