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

  const fetchImages = async () => {
    setloading(true);
    let url;
    url = `${mainUrl}${clientId}`;
    try {
      const response = await fetch(url);
      const jsonData = await response.json();

      setphotos(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }

  useEffect(() => {
    fetchImages();
  }, []);


  return <h2>stock photos starter</h2>
}

export default App
