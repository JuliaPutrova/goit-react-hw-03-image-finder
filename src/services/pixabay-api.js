//импорт библиотеки axios
import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "22803693-8c4edbce38da2fef7cf44b0fa";

//функция для запроса на сервер
function getPictures(query, page) {
  return axios
    .get(
      `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
    )
    .then((response) => response.data.hits);
}

const api = {
  getPictures,
};

export default api;
