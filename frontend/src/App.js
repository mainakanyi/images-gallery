import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.js';
import Search from './components/Search.js';
import ImageCard from './components/ImageCard.js';
import Welcome from './components/Welcome.js';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getSavedImages() {
      try {
        const res = await axios.get(`${API_URL}/images`);
        setImages(res.data || []);
      } catch (error) {
        console.log(error);
      }
    }

    getSavedImages();
  }, []);
  const headers = {
    'Content-Type': 'application/json',
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    // Now workig with axios
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      console.log(res.data);
      // Adding image to the state
      setImages([{ ...res.data, title: word }, ...images]);
    } catch (error) {
      console.log(error);
    }
    // Clearing search form
    setWord('');
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  //Save  Image
  const handleSaveImage = async (id) => {
    const ImageToBeSaved = images.find((image) => image.id === id);
    ImageToBeSaved.saved = true;
    try {
      const res = await axios.post(`${API_URL}/images`, ImageToBeSaved);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image,
          ),
        );
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header title="Image Gallery2" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i}>
                <ImageCard
                  deleteImage={handleDeleteImage}
                  saveImage={handleSaveImage}
                  image={image}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
      {/* {!!images.length && <ImageCard image={images[0]} />} */}
    </div>
  );
};

export default App;
