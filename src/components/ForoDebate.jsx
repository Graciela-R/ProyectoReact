import { Box, Typography } from '@mui/material'
import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase'
import { useAuth } from './AuthContext'

const ForoDebate = () => {
  const [valor,setValor]=useState('')
  const [activador,setActivador]=useState(false)
  const [textos,setTextos]=useState([])
  const {user}=useAuth()

  const handleChange=(e)=>{
    const {value}=e.target
    setValor(value)

  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    
    const userForoRef=doc(db,'comentarios',user.uid)
     const foroRef=await getDoc(userForoRef)
     
    try{
      if(foroRef.data() !== undefined)
      {
        await updateDoc(
          userForoRef,{
            comentarios:arrayUnion(
              {
                usuario:user.displayName,
                comentario:valor
              }
            )
          }
        )

      }else{
        await setDoc(
          userForoRef,{
            comentarios:arrayUnion(
              {
                usuario:user.displayName,
                comentario:valor
              }
            )
          }
        )

      }
        
        setActivador(true)
        alert('gracias por comentar!')

    }catch(e){
      console.log(`error en el foro debate ${e}`)
    }

  }
  useEffect(()=>{
    const useForo=async()=>{
      const foroRef = collection(db, 'comentarios'); 
      const querySnapshot = await getDocs(foroRef); 
      
      const allComentarios = [];
      
      querySnapshot.forEach((doc) => {
        const comentarios = doc.data().comentarios || [];
        allComentarios.push(...comentarios);
      });
      
      setTextos(allComentarios);
    }
    useForo()

  },[textos])

  return (
    <>
    <Box
    sx={{
      backgroundColor:'#ffff',
      borderRadius:'5px',
      padding:'10px',
      margin:'10px'
    }}
    >
    
      <Typography
      sx={{textAlign:'center',
        fontWeight:'bold'
    }}
    >Foro Debate </Typography>
      <form onSubmit={handleSubmit}>
        <label
        sx={{

        }}>Escribe un comentario</label>
        <br/>
            <textarea
            style={{
              width: "900px",
             height: "150px",
             border: "2px solid #ccc",
            }}
            name='debate'
            onChange={handleChange}
            value={valor}
            placeholder='escribe algo aqui'
            />

      <button 
      
      type='submit'
      style={{
        backgroundColor:'#000',
        color:'#fff'
      }}
      >Enviar</button>
      </form>
      <Box>
        <Typography>los comentarios compartidos</Typography>
        {console.log("los textos===",textos)}
        {
          textos.map(item=>(
            <Box
            sx={{
              backgroundColor:'#949494',
              padding:'5px',
              borderRadius:'5px',
              margin:'5px'

            }}
            >

            <p
            style={{
             
            }}>{item.comentario}</p>
            <i
            style={{
              textAlign:'left',
              width:'100%',
              background:'#f3e362',
              borderRadius:'5px '
            }}
            >{item.usuario}</i>
            </Box>
            ))
          }
      </Box>
      
    </Box>
    </>
  )
}

export default ForoDebate