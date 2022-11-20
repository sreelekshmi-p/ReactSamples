import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './App.css'
import VideoCatalog from './VideoCatalog';


function App() {
//  const [offset, setOffset] = useState(0);
//  const [perPage] = useState(10);
//   const [pageCount, setPageCount] = useState(0);
  
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading ] = useState( true );
//   const [titleKey, setTitleKey] = useState('');
//   const [filterKey, setFilterKey] = useState('');


//   const getData = async() => {
//       const res = await axios.get(`https://jsonplaceholder.typicode.com/photos`)
//       const data = res.data;
//                 const slice = data.slice(offset, offset + perPage)
//                 const postData = slice.map(pd => <div key={pd.id}>
//                     <p>{pd.title}</p>
//                     <img src={pd.thumbnailUrl} alt=""/>
//                 </div>)
//                 setData(postData)
//                 setPageCount(Math.ceil(data.length / perPage))
//   }
//   const handlePageClick = (e) => {
//     const selectedPage = e.selected;
//     setOffset(selectedPage + 1)
// };

// const getVideoList = () =>
// {
//    const res = getVideos(titleKey, filterKey);
//    // get videos from services with searchkey and filterkey as parameters
//    const data = res.data;
//    const slice = data.slice(offset, offset + perPage)
//    setData(postData);
//    setPageCount(Math.ceil(data.length / perPage))
// };

//  useEffect(() => {
//   getData()
//  }, [offset])

  return (     
    <>
        <h2 >Video Catalog</h2>    
        <VideoCatalog/>
    </>
    );
}

export default App;
