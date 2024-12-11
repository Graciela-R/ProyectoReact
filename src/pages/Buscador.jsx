import { AddBox } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { getMovieBuscador } from '../api'
import MovieCard from '../components/MovieCard'

const Buscador = () => {
    const [query,setQuery]=useState('')
    const [movies,setMovies]=useState([])
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(!query) return alert("llene el formulario")

       const results=await  getMovieBuscador(query)
       setMovies(results)
       console.log("aqui estan las repuestas del buscador",results)
        // alert(`buscando ${ query}`)
    }
  return (
    <>
       <Box>
           <Box
           sx={{
              
               display:'flex',
               justifyContent:'center'
           }}
           >
            <form onSubmit={handleSubmit}>
                <input 
                style={{
                    width:'400px',
                    height:'40px',
                    borderRadius:'5px'
                }}
                        type="text"
                        onChange={(e)=>setQuery(e.target.value)}
                        placeholder="Buscar peliculas..."
                        />
                <button
                style={{
                    margin:'2px'
                }}
                 type='submit'>Buscar</button>
            </form>
            </Box>
            <Box
                sx={{
                    display:'flex',
                    flexWrap:'wrap'
                }}
            >
                {query?
                    movies.map(movie=>(
                        <MovieCard key={movie.id} movie={movie}/>
                    ))
                    :
                    <p>Resultados de la busqueda......</p>
                }

            </Box>

       </Box> 
    
    
    </>
  )
}

export default Buscador