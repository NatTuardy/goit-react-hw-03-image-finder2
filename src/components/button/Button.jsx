import PropTypes from "prop-types";
const Button = ({onLoadMore}) => {
    return ( <button onClick={onLoadMore} className='Button'>Load more</button> );
}
 
export default Button;

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
  };