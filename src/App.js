import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'

const clientId = `${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/?client_id=`
const searchUrl = `https://api.unsplash.com/search/photos/?client_id=`

function App() {
  const [loading, setloading] = useState(false);
  const [photos, setphotos] = useState([]);
  const [page, setpage] = useState(1);
  const [query, setquery] = useState('')

  const fetchImages = async () => {
    setloading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    if (query) {
      url = `${searchUrl}${clientId}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientId}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const jsonData = await response.json();

      setphotos((oldPhotos) => {
        if (query) {
          return [...oldPhotos, ...jsonData.results]
        } else {
          return [...oldPhotos, ...jsonData]
        }
      });
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
      if (!loading && (window.pageYOffset + window.innerHeight) >= document.documentElement.scrollHeight - 10) {
        setpage(oldPage => oldPage + 1);
      }
    });
    return () => {
      window.addEventListener("scroll", scrollEvent);
    }
  }, [loading])


  const clickHandler = (e) => {
    e.preventDefault();
    fetchImages();
  }

  return <main>
    <section className='search'>
      <form className='search-form'>
        <input type='text' placeholder='search' className='form-input' value={query} onChange={(e) => setquery(e.target.value)} />
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
