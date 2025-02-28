import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ plant }) => {
  const { _id, name, image, price, category, quantity } = plant || {};

  return (
    <Link
      to={`/plant/${_id}`}
      className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            "
        >
          <img
            className="
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              "
            src={image}
          />
          <div
            className="
              absolute
              top-3
              right-3
            "
          ></div>
        </div>
        <div className="font-semibold text-lg text-gray-800">{name}</div>
        <div className="font-semibold text-lg text-gray-600">
          Category: {category}
        </div>
        <div className="font-semibold text-lg text-gray-600">
          Quantity: {quantity}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold text-gray-600"> Price: {price}$</div>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  plant: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
