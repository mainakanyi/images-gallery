import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.js'
import Search from './components/Search.js'

const UNSPLASH_KEY=process.env.REACT_APP_UNSPLASH_KEY;


const App = () => {
  const [word, setWord] = useState('');
  const handleSearchSubmit = (e) =>{
    e.preventDefault();
    fetch(`https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
    
  // console.log(word);
  }

  // console.log(word);

  return (
    <div>
     <Header title = "Image Gallery2"/>
     <Search word = {word} setWord={setWord} handleSubmit = {handleSearchSubmit}/>
    </div>
  );
}

export default App;
