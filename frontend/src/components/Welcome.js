import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

const Welcome = () => {
  return (
    <Jumbotron>
      <h1>Image Gallery</h1>
      <p>
        This is a simple application that retrieves photos using unsplash API.
        In order to start enter any term in the input field.
      </p>
      <p>
        <Button
          variant="primary"
          href="https://unsplash.com/"
          target={'_blank'}
        >
          Learn more
        </Button>
      </p>
    </Jumbotron>
  );
};

export default Welcome;
