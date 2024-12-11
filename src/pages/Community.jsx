import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getTrendingMovies } from '../api'
import MovieCard from '../components/MovieCard'
import {StarBorder} from '@mui/icons-material';
import { height, width } from '@mui/system'
import Calificacion from '../components/Calificacion'
import ForoDebate from '../components/ForoDebate'

const Community = () => {
  const [movies,setMovies]=useState([])

  const handleCalificar=()=>{
    alert('estas calificando')
  }
  useEffect(()=>{
   const  fetchTrending=async()=>{
      const moviesTrending= await getTrendingMovies()
      setMovies(moviesTrending)
    }
    fetchTrending()

  },[])
  return (
    <>
    <Box>
      {
        movies.map(movie=>(
          <>
          <Box
          sx={{
            display:'flex',
            justifyContent:'center'
          }}
          >
            <MovieCard movie={movie} isComunity={false}/>
            <Box
             sx={{
              width:'50%',
              padding:'10px',
              borderRadius:'5px',
              boxShadow:'5px 5px 15px rgba(255, 255, 255, 0.2)',
              margin:'5px',
              position:'relative'
            }} 
               
               
            >
              <Typography
              sx={{
                color:'#ffff',
                textAlign:'justify'
                
                
              }}
              >
                  {movie.overview}
              </Typography>
                <Calificacion movie={movie}/>
              
            </Box>
            {/* <IconButton
            sx={{
              background:'#6100C2', 
              width:'100px',
              height:'30px'
            }}>
             
            </IconButton> */}
          </Box>
          </>
        ))
      }
      


    </Box>
    <Box>
      <ForoDebate/>
    </Box>
    
    
    </>
  )
}

export default Community