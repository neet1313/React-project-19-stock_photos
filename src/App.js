import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'

const clientId = `${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/?client_id=`
const searchUrl = `https://api.unsplash.com/search/photos/?client_id=`

function App() {
  const [loading, setloading] = useState(false);
  const [photos, setphotos] = useState([]);
  const [page, setpage] = useState(1);
  const [query, setquery] = useState('');
  const [newimages, setnewimages] = useState(false);
  const mounted = useRef(false);

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
        if (query && page === 1) {
          return jsonData.results;
        } else if (query) {
          return [...oldPhotos, ...jsonData.results]
        } else {
          return [...oldPhotos, ...jsonData]
        }
      });
    } catch (error) {
      console.log(error.message);
    }
    setnewimages(false);
    setloading(false);
  }

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const scrollEvent = window.addEventListener("scroll", () => {
      if ((window.pageYOffset + window.innerHeight) >= document.body.scrollHeight - 10) {
        setnewimages(true);
      }

    });
    return () => {
      window.addEventListener("scroll", scrollEvent);
    }
  }, [])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newimages) return;
    if (loading) return;
    setpage(oldPage => oldPage + 1);
    //Not running on initial render"
    // eslint-disable-next-line
  }, [newimages]);


  const clickHandler = (e) => {
    e.preventDefault();
    if (!query) { return }
    if (page === 1) {
      fetchImages();
      return;
    }
    setpage(1);
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
        {photos.map((photo, index) => <Photo key={index} {...photo} />)}
      </div>
      {loading && <h2 className='loading'>Loading...</h2>}
    </section>
  </main>
}

export default App
