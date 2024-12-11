import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../assets/banner.svg";
import { useAuth } from "./AuthContext";

const DynamicNavbar = () => {
  const location = useLocation();
  const {user}=useAuth()
   const navigate= useNavigate()

   const goToSearch=()=>{
     navigate('/search')
   }

  // Cambia el estilo dinámicamente según la ruta actual
  const getBackgroundStyle = () => {
    if (location.pathname === "/home") {
      return {
        backgroundImage: `url(${Banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
      };
    } else {
      return {
        backgroundColor: "#21201E",
        height: "130px",
      };
    }
  };

  return (
    <AppBar
      position="relative"
      sx={{
        ...getBackgroundStyle(),
        color: "white",
        boxShadow: "none",
        paddingBlockStart:'1rem',
      }}
      >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Menú de navegación superior */}
        {console.log('USER EN NAV ', user)}
        <Box sx={{ 
          display: "flex",
          gap: "2rem" ,
        }}>
          <Typography variant="body2" component="div">
            Movies
          </Typography>
          <Typography variant="body2" component="div">
            Series
          </Typography>
          <Typography variant="body2" component="div">
            Documentaries
          </Typography>
        </Box>

        {/* Iconos a la derecha */}
        <Box sx={{ 
          display: "flex",
          alignItems: "center", 
          gap: "1rem" }}>
          <IconButton color="inherit" onClick={goToSearch}>
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            {user? (
              <img src={user.photoURL} 
              alt={ "User Avatar"}
              style={{borderRadius:'50%'}}
              height='40px'
              />
            ):(
               <img src="https://via.placeholder.com/40" alt="avatar" />         
              )}
          </IconButton>
          <Typography variant="body2">{user?user.displayName:null}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DynamicNavbar;