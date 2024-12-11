import React, { useState } from 'react'
import { Alert, Box, Button, Card, CardContent, CardMedia, Collapse, Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import { fetchTrailerKey } from '../api'
import { FavoriteBorder } from '@mui/icons-material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAuth } from './AuthContext';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const MovieCard = ({ movie, isFavorite=true, isComunity=true}) => {
  const [open, setOpen] = useState(false)
  const [videoKey, setVideoKey] = useState(null)
  const {user}=useAuth()
  
  const addFavorite = async() => {
   
    if(!user) return alert("Debes iniciar sesion para agragr a favoritos")
    const userFavoriteRef=doc(db ,'favoritos',user.uid)
    const favoriteRef=await getDoc(userFavoriteRef)
    try{
      if(favoriteRef.exists())
      {
        await updateDoc(
          userFavoriteRef,{
            movies:arrayUnion(
              {
                id:movie.id,
                title:movie.title,
                poster_path:movie.poster_path,
                release_date: movie.release_date
              }
            )
  
          }
        )

      }else{
        await setDoc(
          userFavoriteRef,{
            movies:arrayUnion(
              {
                id:movie.id,
                title:movie.title,
                poster_path:movie.poster_path,
                release_date: movie.release_date
              }
            )
  
          }
        )

      }
      
      alert(`${movie.title} se agrego correctamente`)
      

    }catch(e){
      console.error("error al agregar a favoritos",e)
    }

    
  }

  const handleOpen = async () => {
    const key = await fetchTrailerKey(movie.id)
    if (key) {
      setVideoKey(key)
      setOpen(true)
    } else {
      console.error('No se encontró un trailer para ésta película')
    }
  }

  const handleClose = async () => {
    setOpen(null)
    setVideoKey(null)
  }

  return (
    <>
      <Card sx={{ 
        width: '13rem',
        margin: 2,
        borderRadius: 8,
        border:'1px solid gray',
        }}>
        <CardMedia
          component="img"
          height="160px"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          
          alt={movie.title}
        />
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
        <CardContent
          sx={{
            height:'85px',
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))", // Fondo degradado
          }}
        >
          <Typography variant="body1">{movie.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.release_date}
            {console.log('llllllllll',movie)}
          </Typography>
          {
            isComunity?

            <Box
            sx={{
              display:"flex",
              justifyContent:"center"
            }}>

          <Button
            variant='contained'
            onClick={handleOpen}
            
            sx={{ 
              backgroundColor:'#6100C2',
              width:20,
              borderRadius:2
            }}
            
            >
            {/* aqui esta el icono del play */}
            <PlayArrowIcon/>       
          </Button>
            {
              isFavorite?
              <IconButton onClick={addFavorite}
              sx={{
                backgroundColor:'#6100C2',
                width:30,
                marginLeft:2,
                borderRadius:2
                
              }}
              >
            <FavoriteBorder/>
          </IconButton>
              :
              ''
              
            }
          
          </Box>
          :
          ''
          }
        </CardContent>
        {/* </Collapse> */}
        {console.log('MOVIE', movie.title)}
        <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth>
          <DialogContent>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            {videoKey ? (
              <iframe
                width="100%"
                height="500px"
                src={`https://www.youtube.com/embed/${videoKey}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <Typography variant="h6">No trailer available</Typography>
            )}
          </DialogContent>
        </Dialog>
      </Card>
    </>
  )
}

export default MovieCard