import { FavoriteBorderSharp } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

import { doc, getDoc, getDocs } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../components/AuthContext'
import MovieCard from '../components/MovieCard'
import { db } from '../firebase'

const Favorites = () => {
  const {user}=useAuth()
  const[favorites,setFavorites]=useState([])
  
  
  useEffect(()=>{
    const fecthFavorites= async()=>{
      if(!user) return alert("No iniciaste sesion")

      const favoriteRef=doc(db,'favoritos',user.uid)
      const docSnap=await getDoc(favoriteRef)
      if(docSnap.exists()){
        setFavorites(docSnap.data().movies || [])
      }

    }
    fecthFavorites()

  },[user])

 
  return (
    <>
      <Box  sx={{
        display:'flex',
        flexWrap: 'wrap'
      }}
      >
      <Typography
      sx={{
      width:'100%',
      textAlign:'center',
      color:'#ffff'
    }}
      >Favorites</Typography>
      {
        favorites.map(movie=>(
          
          <MovieCard key={movie.id} movie={movie} isFavorite={false}/>
          
          ))
      }
      </Box>
      
    </>
  )
}

export default Favorites