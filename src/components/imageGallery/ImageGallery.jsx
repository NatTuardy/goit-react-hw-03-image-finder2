import PropTypes from "prop-types";
import ImageGalleryItem from "./imageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ images, onShow }) => {
  return <ul className="ImageGallery">
      {images.map((item)=> <ImageGalleryItem key={item.id} item={item} onShow={onShow}/>)}
  </ul>;
};

export default ImageGallery;


ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.object,
      id: PropTypes.number,
    })
  ),
  onShow: PropTypes.func.isRequired,

}
