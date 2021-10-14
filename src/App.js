import { Component } from "react";
import LoaderComponent from "./components/loader/Loader.jsx";
import SearchBar from "./components/searchBar/SearchBar.jsx";
import ImageGallery from "./components/imageGallery/ImageGallery.jsx";
import Modal from "./components/modal/Modal.jsx";
import Button from './components/button/Button.jsx'
import { fetchImages } from "./services";
import "./Styles.css";

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    query: "",
    page: 1,
    largeImg: "",
    isModal: false,
  };

  handleSubmit = (inputValue) => {
    this.setState({ isLoading: true, query: inputValue, page: 1, images: [] });
  };

  componentDidUpdate() {
    const { query, page, isLoading } = this.state;
    if (isLoading) {
      this.getFetchImages(query, page);
    }
  }

  getFetchImages = async (query, page) => {
    try {
      const { data } = await fetchImages(query, page);
      const imagesDataArr = data.hits.map(
        ({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        }
      );
      this.setState((prevState) => {
        return {
          images: [...prevState.images, ...imagesDataArr],
          page: prevState.page + 1,
          isLoading: false,
        };
      });
      if(!this.state.isModal) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
      
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  };

  onShowModal = (img) => {
    this.setState({ largeImg: img, isModal: true });
  };

  onCloseModal = () => {
     this.setState({isModal: false})
  }

  handleLoadMore = () => {
    this.setState({isLoading: true})
  }

  render() {
    const { images, largeImg, isModal, isLoading } = this.state;
    const { onShowModal, onCloseModal, handleLoadMore } = this;
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSubmit} onChange={this.handleChange} />
        <ImageGallery images={images} onShow={onShowModal} />
        {isModal && (
          <Modal onClose={onCloseModal}>
            <img src={largeImg} />
          </Modal>
        )}
        {isLoading && <LoaderComponent/>}
        {images.length > 0 && <Button onLoadMore={handleLoadMore}/>}
      </div>
    );
  }
}
export default App;
