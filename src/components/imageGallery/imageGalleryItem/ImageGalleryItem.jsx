import PropTypes from "prop-types";
const ImageGalleryItem = ({item, onShow}) => {
    return ( <li className="ImageGalleryItem" onClick={()=> onShow(item.largeImageURL)} > 
    <img src={item.webformatURL} className="ImageGalleryItem-image" />
  </li> );
}
 
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
  }),
  onShow: PropTypes.func.isRequired,

}