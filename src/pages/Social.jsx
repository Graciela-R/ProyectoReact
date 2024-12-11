import { Box, Button, ButtonBase, List, ListItem, ListItemText, Typography } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTrendingMovies } from '../api'
import { useAuth } from '../components/AuthContext'
import MovieCard from '../components/MovieCard'
import { db } from '../firebase'
import {Facebook,WhatsApp,X} from '@mui/icons-material';




const Social = () => {
  const [movieCalificadas,setMovieCalificadas]=useState([])
  const{user}=useAuth()


  const handleCompartir=()=>{
    alert("presionaste compartir con facebook")
  }

  const url = window.location.href;

  useEffect(()=>{
    const fechCalificaciones=async()=>{
      const calificacionesData=doc(db,'calificaciones',user.uid)
      const docSnap=await getDoc(calificacionesData)
      // console.log("las calificaciones de los usuarios",docSnap.data().calificacion)
      setMovieCalificadas(docSnap.data().calificacion)
    }
    fechCalificaciones()

  },[])
  return (
    <>
    <Box>
      <Typography variant="h4"
      sx={{
        color:'#ffff',
        textAlign:'center'
      }}
      
      >Tu informacion Social</Typography>
      <Box
      sx={{
        display:'flex',
        justifyContent:'center',
        margin:'20px'
      }}>
        {console.log("el link de usuaio foto",user.photoURL)}

      <img
      style={{
        width:'200px',
        height:'200px',
        borderRadius:'10px'
      }}
      src={user.photoURL}
      alt={"user avatar"}
      
      />
      </Box>
       <p
       style={{
         color:'#fff',
         textAlign:'center'
       }}
       
       >{user.displayName}</p>
     
      <Typography
        variant="h5"
        sx={{
          color:'#fff'
        }}
      >Tus peliculas que calificaste</Typography>
      <List
      sx={{
        margin:'10px'
      }}
      >
        {
          movieCalificadas.map((movie)=>(
            
              <ListItem
              sx={{
                background:'#fff',
                borderRadius:'5px',
                margin:'2px'
              }}
              >
                <Link  
                to={`/video/${movie.id}`}>
                <ListItemText
                 primary={movie.title}
                 />
                 </Link>
                <Button
                
                >
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank">
                 <Facebook />
                </a>
                </Button>
                <Button>
                  <a href={`https://twitter.com/intent/tweet?url=${url}`} target="_blank">
                 <X/>
                 </a>
                </Button> 
              </ListItem>

            
          ))
        }
      </List>


    </Box>

    
    
    </>
  )
}

export default Social