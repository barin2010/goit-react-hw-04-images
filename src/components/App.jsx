import React from 'react';
import axios from 'axios';
import { Blocks } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

const PIXABAY_API_KEY = '40555904-676fe49c75520c90cb2144395';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      images: [],
      page: 1,
      loading: false,
      selectedImage: null,
      isModalOpen: false,
    };
    this.handleSearchbarSubmit = this.handleSearchbarSubmit.bind(this);
  }

  handleSearch = async (newQuery, newPage) => {
    console.log('handleSearch called with query:', newQuery);
    try {
      const apiUrl = `https://pixabay.com/api/?q=${newQuery}&page=${newPage}&key=${PIXABAY_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
      console.log('API URL:', apiUrl);

      this.setState({ loading: true });
      const response = await axios.get(apiUrl);
      console.log('Pixabay API Response:', response.data);

      if (response.data.totalHits === 0) {
        console.warn('No images found for the query:', newQuery);
      }

      const newImages = response.data.hits;
      console.log('New Images:', newImages);
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        page: newPage,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearchbarSubmit = newQuery => {
    console.log('handleSearchbarSubmit called with query:', newQuery);
    this.setState({ query: newQuery, page: 1, images: [] });
  };

  handleLoadMore = () => {
    const { query, page } = this.state;
    this.handleSearch(query, page + 1);
  };

  openModal = image => {
    this.setState({ selectedImage: image, isModalOpen: true });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.handleSearch(this.state.query, this.state.page);
    }
  }

  render() {
    const { images, loading, selectedImage, isModalOpen } = this.state;

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
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        <ImageGallery>
          {images.map((image, index) => (
            <ImageGalleryItem
              key={`${image.id}-${index}`}
              src={image.webformatURL}
              alt={`Image by ${image.user}`}
              openModal={() => this.openModal(image)}
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
        {images.length > 0 && <Button onClick={this.handleLoadMore} />}
        {isModalOpen && (
          <Modal
            imageUrl={selectedImage && selectedImage.largeImageURL}
            onClose={() => this.setState({ isModalOpen: false })}
            onOverlayClick={() => this.setState({ isModalOpen: false })}
          />
        )}
      </div>
    );
  }
}

export { App };
