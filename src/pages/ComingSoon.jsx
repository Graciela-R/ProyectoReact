import { Box, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getMovieUpcomming } from '../api'
import MovieCard from '../components/MovieCard'

const ComingSoon = () => {
  const [moviesUpcomming, setmoviesUpcomming]=useState([])
  
  useEffect(()=>{
    const fecthUpcomming=async()=>{
      const moviesUpcomming=await getMovieUpcomming()
      setmoviesUpcomming(moviesUpcomming)
    }
    fecthUpcomming()

  },[])



  return (
    <>
      <Box
       sx={{
         display:'flex',
         flexWrap:'wrap'
       }}
      >
        <Typography
        sx={{
          width:'100%',
          textAlign:'center',
          color:'#ffff'
        }}
        >
          Commming Soon
        </Typography>
        {
          moviesUpcomming.map(movies=>(
            <MovieCard key={movies.id} movie={movies}/>
          ))
        }

      </Box>
    
    </>
  )
}

export default ComingSoon