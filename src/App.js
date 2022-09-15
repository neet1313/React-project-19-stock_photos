import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const clientId = `${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/?client_id=`
const searchUrl = `https://api.unsplash.com/search/photos/?client_id=`
// const accessKey = "1owf68QiVhmS_UaZqiGg5O_So_FjlpsBdlpaH3zpIK0"

function App() {
  const [loading, setloading] = useState(false);
  const [photos, setphotos] = useState([]);
  const [page, setpage] = useState(1);

  const fetchImages = async () => {
    setloading(true);
    let urlPage = `&page=${page}`
    let url = `${mainUrl}${clientId}${urlPage}`;
    try {
      const response = await fetch(url);
      const jsonData = await response.json();

      setphotos((oldData) => { return [...oldData, ...jsonData] });
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  }

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const scrollEvent = window.addEventListener("scroll", () => {
      if (!loading && (window.pageYOffset + window.innerHeight) >= document.documentElement.scrollHeight - 100) {
        setpage(oldPage => oldPage + 1);
      }
    });
    return () => {
      window.addEventListener("scroll", scrollEvent);
    }
  }, [loading])


  const clickHandler = (e) => {
    e.preventDefault();
  }

  return <main>
    <section className='search'>
      <form className='search-form'>
        <input type='text' placeholder='search' className='form-input' />
        <button type='submit' className='submit-btn' onClick={clickHandler}>
          <FaSearch />
        </button>
      </form>
    </section>
    <section className='photos'>
      <div className='photos-center'>
        {photos.map(photo => <Photo key={photo.id} {...photo} />)}
      </div>
      {loading && <h2 className='loading'>Loading...</h2>}
    </section>
  </main>
}

export default App
