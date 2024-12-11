import axios from 'axios'

const API='0eb40180ce3e30715b55ff6d31dff2ee'
const BASE_URL='https://api.themoviedb.org/3'
export const getTrendingMovies=async () => {
    try {
        const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
          params: {
            api_key: API,
          },
        });
        return response.data.results;
      } catch (error) {
        console.error("Error al obtener películas en tendencia:", error);
        return [];
      }
}

export const getMovieVideos = async (movieId) => {
  try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
          params: {
              api_key: API,
          },
      });
      return response.data.results; 
  } catch (error) {
      console.error("Error al obtener videos de la película:", error);
      return [];
  }
};

export const fetchTrailerKey = async (movieId) => {
  const videos = await getMovieVideos(movieId);
  const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  return trailer ? trailer.key : null;
};

export const getMovieUpcomming=async ()=>{
  try{
   const response=await  axios.get(`${BASE_URL}/movie/upcoming`,{
     params:{
       api_key:API,
     }

   });
   return response.data.results

  }catch(e){
    console.log("error al obtener las peliculas de muy pronto",e)
    return [];

  }
}

export const getMovieBuscador=async(query)=>{
  try{
    const response=await axios.get(`${BASE_URL}/search/movie`,{
      params:{
        api_key:API,
        query:query
      }
    })
    return response.data.results

  }catch(e){
    console.log("error al obtener las peliculas en el buscador",e)
    return [];
  }
}
