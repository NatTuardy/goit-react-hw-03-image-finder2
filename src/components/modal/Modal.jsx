import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeModal);
  }

  closeModal = (e) => {
    if (e.key === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.props.onClose}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
