import PropTypes from "prop-types";

import GalleryItem from "./ImageGalleryItem";

function ImageGallery({ images, onOpenModal }) {
  return (
    <ul className="ImageGallery">
      {images.map((image) => (
        <GalleryItem image={image} key={image.id} onOpenModal={onOpenModal} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
