
import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { fetchTrailerKey } from '../api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import XIcon from '@mui/icons-material/X';

function VideoPlayer() {
  const [videoKey, setVideoKey] = useState(null)
  const [open,setOpen]=useState(null)

  const { id } = useParams ();
  const handleOpen = async () => {
    const key = await fetchTrailerKey(id)
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
  useEffect(()=>{
    const handleOpen = async () => {
      const key = await fetchTrailerKey(id)
      if (key) {
        setVideoKey(key)
        setOpen(true)
      } else {
        console.error('No se encontró un trailer para ésta película')
      }
    }
    handleOpen()

  },[])
  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth fullHeigth>
          <DialogContent>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 2,
                top: 2,
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
    
    
  );
}

export default VideoPlayer;
