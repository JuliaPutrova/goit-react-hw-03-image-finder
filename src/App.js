import React, { Component } from "react";
//импортируем библиотеку
import Loader from "react-loader-spinner";

import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import LoaderIcon from "./components/Loader";

import api from "./services/pixabay-api";

class App extends Component {
  state = {
    query: "",
    images: [],
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    largeImage: "",
  };

  //   handleSubmit = (query, response) => {
  //   getPictures(this.state.query, 1).then((response) =>
  //     this.setState({
  //       query,
  //       images: response,
  //     })
  //   );
  // };

  //метод для сохранения поиска
  // handleSearchBarSubmit = (query) => {
  //   this.setState({
  //     query: query,
  //   });
  // };

  // метод для сохранения поиска
  handleSearchBarSubmit = (query) => {
    this.setState({
      query: query,
      // page: 1,
      // images: [],
    });
  };

  // //метод запроса на сервер
  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.query;
    const nextSearch = this.state.query;
    if (prevSearch !== nextSearch) {
      this.getPictures();
      //проверка для плавного скролла
      if (prevState.page !== this.state.page) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }

  getPictures = () => {
    const { query, page } = this.state;

    this.setState({
      isLoading: true,
    });

    api
      .getPictures(query, page)
      .then((response) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...response],
          page: prevState.page + 1,
        }))
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  reset = () => {
    this.setState({
      images: [],
      page: 1,
    });
  };

  toggleShowModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  onOpenModal = (e) => {
    this.setState({
      largeImage: e.target.dataset.img,
    });
    this.toggleShowModal();
  };

  render() {
    const { images, largeImage, isLoading, showModal } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchBarSubmit} reset={this.reset} />
        {isLoading && <LoaderIcon />}
        <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        {images.length > 0 && <Button onClick={this.getPictures} />}

        {showModal && (
          <Modal onClick={this.toggleShowModal}>
            <img src={largeImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
