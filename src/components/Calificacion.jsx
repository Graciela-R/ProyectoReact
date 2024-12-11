import { Box, Button, Rating, Typography } from '@mui/material'
import { arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase'
import { useAuth } from './AuthContext'

const Calificacion = ({movie}) => {
    const [value, setValue] =useState(2)
    const [valor,setValor]=useState([])
    const [auxVar,setAuxVar]=useState(0)
    const [promedio, setPromedio]=useState(1)
    const [activador,setActivador]=useState([])
    const {user}=useAuth()

    // console.log('=>>>>aqui estan las calificacioness',value)
    const handleCalificacion=async ()=>{
      const dbCalificacion=doc(db, 'calificaciones', user.uid)
      const calificacionRef=await getDoc(dbCalificacion)
      setActivador(calificacionRef)
      try{
        if(calificacionRef.exists()){
          await  updateDoc(
            dbCalificacion,{
              calificacion:arrayUnion(
                {
                  id:movie.id,
                  title:movie.title,
                  calificacion: value
                }
              )
            } 
          )

        }else{
          await  setDoc(
            dbCalificacion,{
              calificacion:arrayUnion(
                {
                  id:movie.id,
                  title:movie.title,
                  calificacion: value
                }
              )
  
            }
            
          )
          

        }
       
        alert(`calificaste a ${movie.title} con ${value} estrella`)
      }catch(e){
        console.log("error en el calificar",e)
      }
    }
    useEffect(()=>{
      const fechtCalificacion=async()=>{
        const calificacionRef=collection(db,"calificaciones")
       
        const docSnap= await getDocs(calificacionRef)
        // const q=query(calificacionRef,where("id","==", movie.id))
        docSnap.forEach((doc)=>{
          var varSuma=0;
          const calificacionesArray=doc.data().calificacion
          const calificacionEncontrada=calificacionesArray.filter(item=>item.id === movie.id)
          // console.log('aqui estan las calificiones encontradas444',calificacionEncontrada)
          setValor(calificacionEncontrada)    
        })
      }
      fechtCalificacion()

    },[activador])
    useEffect(()=>{
      const useFetch=()=>{

        if(valor.length >0){
          const suma=valor.reduce((acumulador,elemento)=>acumulador + elemento.calificacion,0)
          const promedioVar=Math.round(suma/valor.length)
          setPromedio(promedioVar)
          // console.log("el promedio",promedioVar)
        }

      }

      useFetch()
    },[valor])

  return (
    <>
    <Box
    sx={{
      
      position: 'absolute',
      bottom: '0',
      left: '0',
      margin:'10px'
    }}
    >
      <Box
      
      >
        <Typography 
        sx={{
          color:'#fff'
        }}  variant='h8'>Calificacion</Typography>

        <Rating
            sx={{
              
              height:'30px'
            }} 
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            />
        <Button 
        sx={{
          height:'20px',
          backgroundColor:'#ffff'
        }}
        onClick={handleCalificacion}>Enviar</Button>
      </Box>
      <Box>
      <Typography 
      sx={{
        color:'#fff'
      }}
      variant='h8'>Promedio</Typography>
      <Rating name="read-only" value={promedio} readOnly />
      </Box>
    </Box>    
    </>
  )
}

export default Calificacion