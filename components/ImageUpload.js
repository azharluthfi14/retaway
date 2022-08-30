import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import toast from "react-hot-toast";
import classNames from "classnames";

const ImageUpload = ({
  label = "Image",
  initialImage = null,
  objectFit = "cover",
  accept = ".png, .jpg, .jpeg, .gif",
  sizeLimit = 10 * 1024 * 1024, // max size 10MB
  onChangePicture = () => null,
}) => {
  const pictureRef = useRef();

  const [image, setImage] = useState(initialImage);
  const [updatingPicture, setUpdatingPicture] = useState(false);
  const [pictureError, setPictureError] = useState(null);

  const handleOnChangePicture = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    const filename = file?.name?.split(".")?.[0] ?? "New file";

    reader.addEventListener(
      "load",
      async () => {
        try {
          setImage({ src: reader.result, alt: filename });
          if (typeof onChangePicture === "function") {
            await onChangePicture(reader.result);
          }
        } catch (error) {
          toast.error("Unable update image");
        } finally {
          setUpdatingPicture(false);
        }
      },
      false
    );

    if (file) {
      if (file.size <= sizeLimit) {
        setUpdatingPicture(true);
        setPictureError("");
        reader.readAsDataURL(file);
      } else {
        setPictureError("Maximum file size is 10 Mb");
      }
    }
  };

  const handleOnClickPicture = () => {
    if (pictureRef.current) {
      pictureRef.current.click();
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-600">{label}</label>

      <button
        disabled={updatingPicture}
        onClick={handleOnClickPicture}
        className={classNames(
          `relative aspect-w-16 aspect-h-9 overflow-hidden rounded-md disabled:opacity-50 disabled:cursor-not-allowed
           transition group focus:outline-none`,
          image?.src
            ? "hover:opacity-50 disabled:opacity-100"
            : "border-2 border-dashed hover:border-gray-400 focus:border-gray-400 disabled:hover:border-gray-700"
        )}
      >
        {image?.src ? (
          <Image
            src={image.src}
            alt={image?.alt ?? ""}
            layout="fill"
            objectFit={objectFit}
          />
        ) : null}

        <div className="flex items-center justify-center">
          {!image?.src ? (
            <div className="flex flex-col items-center space-y-2">
              <div
                className="shrink-0 rounded-full p-2 bg-gray-200 group-hover:scale-110
                    group-focus:scale-110 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-gray-500 transition"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold text-gray-500 transition">
                {updatingPicture ? "Uploading ..." : "Upload"}
              </span>
            </div>
          ) : null}
          <input
            type="file"
            ref={pictureRef}
            accept={accept}
            onChange={handleOnChangePicture}
            className="hidden"
          />
        </div>
      </button>

      {pictureError ? (
        <span className="text-red-600 text-sm">{pictureError}</span>
      ) : null}
    </div>
  );
};

ImageUpload.propTypes = {
  label: PropTypes.string,
  initialImage: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  objectFit: PropTypes.string,
  accept: PropTypes.string,
  sizeLimit: PropTypes.number,
  onChangePicture: PropTypes.func,
};

export default ImageUpload;
