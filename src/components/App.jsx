import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Blocks } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

const PIXABAY_API_KEY = '40555904-676fe49c75520c90cb2144395';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async (newQuery, newPage) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pixabay.com/api/?q=${newQuery}&page=${newPage}&key=${PIXABAY_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const newImages = response.data.hits;
      setImages(prevImages => [...prevImages, ...newImages]);
      setPage(newPage);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false); // Stop loading, whether successful or not
    }
  };

  const handleLoadMore = () => {
    handleSearch(query, page + 1);
  };

  const handleSearchbarSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const openModal = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (query) {
      handleSearch(query, page);
    }
  }, [query, page]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 0,
        fontSize: 40,
        color: '#010101',
        paddingBottom: 16,
      }}
    >
      <Searchbar onSubmit={handleSearchbarSubmit} />
      <ImageGallery>
        {images.map((image, index) => (
          <ImageGalleryItem
            key={`${image.id}-${index}`}
            src={image.webformatURL}
            alt={`Image by ${image.user}`}
            openModal={() => openModal(image)}
          />
        ))}
      </ImageGallery>

      {loading && (
        <Blocks
          type="ThreeDots"
          color="#4fa94d"
          height={80}
          width={80}
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      )}
      {images.length > 0 && <Button onClick={handleLoadMore} />}
      {isModalOpen && (
        <Modal
          imageUrl={selectedImage.largeImageURL}
          onClose={() => setIsModalOpen(false)}
          onOverlayClick={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export { App };
