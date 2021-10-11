import React, { Component } from "react";
//метод из ReactDOM для создания портала разметки модалки
import { createPortal } from "react-dom";

//портал для разметки модалки
const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  //метод для очистки слушателя событий
  componentWillUnmount = (e) => {
    window.removeEventListener("keydown", this.handleKeyDown);
  };

  //метод для закрытия модалки по кнопке Escape
  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClick();
    }
  };

  //метод для закрытия модалки по backdrop
  handleBackDropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClick();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackDropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
