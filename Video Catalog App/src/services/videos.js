import axios from 'axios';

//https://www.omdbapi.com/?apikey=30db7c62&s=america&type=movie
const getVideos = async ( titleKey, type ) => {
    const response = await axios.get(
        ` http://www.omdbapi.com/`,
        {
            params: {
                apikey:'30db7c62',
                s: titleKey,
                type:type
            }
        }
    );
    return response.data.Search;
};


//
const getVideosByTitle = async ( titleKey ) => {
    console.log('getVideosByTitle')
    const response = await axios.get(
        ` http://www.omdbapi.com/`,
        {
            params: {
                apikey:'30db7c62',
                s: titleKey
            }
        }
    );
    return response.data.Search;
};

// named exports
export {
    getVideos,
    getVideosByTitle
};