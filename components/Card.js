import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";

const Card = ({
  id = "",
  image = "",
  title = "",
  guests = "",
  beds = 0,
  baths = 0,
  price = 0,
  favorite = false,
  onClickFavorite = () => null,
}) => {
  const handleClick = (event) => {
    event.preventDefault();
    if (typeof onClickFavorite === "function") {
      onClickFavorite(id);
    }
  };

  return (
    <Link href={`/homes/${id}`}>
      <a className="block w-full">
        <div className="relative">
          <div className="bg-gray-200 rounded-lg shadow overflow-hidden aspect-w-16 aspect-h-9">
            {image ? (
              <Image
                src={image}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="hover:opacity-80 transition"
              />
            ) : null}
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="absolute top-2 right-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-7 h-7 drop-shadow-lg transition ${
                favorite ? "text-red-500" : "text-white"
              }`}
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
        </div>
        <div className="mt-2 w-full text-gray-700 font-semibold leading-tight">
          {title ?? ""}
        </div>
        <ol className="mt-1 inline-flex items-center space-x-1 text-gray-500">
          <li>
            <span>{guests ?? 0} guests</span>
            <span aria-hidden="true"> · </span>
          </li>
          <li>
            <span>{beds ?? 0} beds</span>
            <span aria-hidden="true"> · </span>
          </li>
          <li>
            <span>{baths ?? 0} baths</span>
          </li>
        </ol>
        <p className="mt-2">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(price ?? 0)}{" "}
          <span className="text-gray-500">/night</span>
        </p>
      </a>
    </Link>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  guests: PropTypes.number,
  beds: PropTypes.number,
  baths: PropTypes.number,
  price: PropTypes.number,
  favorite: PropTypes.bool,
  onClickFavorite: PropTypes.func,
};

export default Card;
