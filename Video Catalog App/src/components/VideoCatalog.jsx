import { useState, useEffect } from 'react';
import { Image, Table, InputGroup, Button, Form, ButtonGroup, ToggleButton } from 'react-bootstrap';
import {getVideoList, getVideos, getVideosByTitle} from '../services/videos'
import VideoDetails from './VideoDetails'
import ReactPaginate from 'react-paginate';

const VideoCatalog = ( ) => {
    
    const [ loading, setLoading ] = useState( true );
    const [ videos, setVideos ] = useState( [] );
    const [ error, setError ] = useState( null );
    const [ videoAvailable, setvideoAvailable ] = useState(true);
    
    // States for filtering and searching the videos
    const [ searchKey, setSearchKey ] = useState( 'american' );    
    const [ filterKey, setFilterKey ] = useState( 'movie' );  
    const [ inputValue, setInputValue ] = useState( 'american' );

    // States for  managing pagination
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    
    // State of radio button group
    const [radioBtnValue, setRadioBtnValue] = useState('2');
    const radioBtns = [
        { name: 'Any', value: '1' , type:"secondary"},
        { name: 'movie', value: '2' ,  type:"primary"},
        { name: 'series', value: '3',  type:"success" },
        { name: 'episode', value: '4',  type:"danger" },
    ];
    const cars = ["Saab", "Volvo", "BMW"];

    const handlePageClick = (e) => {
            const selectedPage = e.selected;
            setOffset(selectedPage + 1)
        };

    const onClickTypeBtn = (name, value) => {
        setFilterKey(name);
        setRadioBtnValue(value);
        };
    
    const populateVideos = () => {        
        setSearchKey(inputValue);
    };

    useEffect(
        () => {
            const helper = async () => {
                try {
                    
                    console.log(`${searchKey} ${filterKey}`);
                    let response;
                    if(filterKey === 'Any')
                     response = await getVideosByTitle(searchKey);
                     else
                     response = await getVideos(searchKey,filterKey);
                    if(response?.length > 0){
                        
                         console.log('got movies'+ response.length);
                        setPageCount(Math.ceil(response.length / perPage));
                        const slice = response.slice(offset, offset + perPage);
                        setvideoAvailable(true);
                        setVideos(slice);
                    }
                    else{
                        console.log('NO movies');
                        setvideoAvailable(false);
                        setVideos(null);
                    }
                } catch( error ) {
                    setError( error );
                } finally {
                    setLoading( false );
                }
            }

            helper();
        },
        [ searchKey, filterKey, offset  ]
    );
    return (
        <div>
           <div className="flexbox-container">
                <ReactPaginate
                            previousLabel={"<<"}
                            nextLabel={">>"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            forcePage={0}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}                        
                    />                        
                
                <InputGroup className="mb-2">
                    <input type="search" id="search" defaultValue={inputValue}
                    onChange={( event ) => setInputValue( event.target.value )}/>
                    <Button variant="secondary" onClick={populateVideos}>search</Button>
                </InputGroup>

                <ButtonGroup className="mb-2">
                    {radioBtns.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio" 
                        variant={radio.type}
                        name={radio.name}
                        value={radio.value}
                        checked={radioBtnValue === radio.value}
                        onChange={(e) => onClickTypeBtn(e.currentTarget.name, e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                    ))}
                </ButtonGroup>
            </div>

            <hr />
            {
                loading && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading videos</span>
                        </div>
                    </div>
                )
            }
            {
                !loading && videoAvailable && videos?.length !== 0 && (
                <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Year</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                videos.map(
                                    ( video, i ) => (
                                        <tr key={video.imdbID}>                                                    
                                            <td>{video.imdbID}</td>
                                            {/* <Image src={video.Poster} alt={video.Title} fluid /> */}
                                            <td>{video.Title}</td>
                                            <td className="font-monospace text-left">{video.Year}</td>
                                            <td className="font-monospace text-left">{video.Type}</td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                  </Table>
                    
                        
                )
            }                       
            {
                !loading && !videoAvailable && (
                    <div className="alert alert-danger" role="alert">
                       Unable to find videos
                    </div>
                )
            }                       
            {
                !loading && error && (
                    <div className="alert alert-danger" role="alert">
                        {error.message}
                    </div>
                )
            }
        </div>
    );
};
 
export default VideoCatalog;