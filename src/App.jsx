import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from './pages/Welcome';
import { AuthProvider, useAuth } from './components/AuthContext';
import Home from './pages/Home';
import ProtectedRoute from './pages/ProtectedRoute';
import Favorites from './pages/Favorites';
import Trending from './pages/Trending';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Setting from './pages/Setting';
import Community from './pages/Community';
import ComingSoon from './pages/ComingSoon';
import Social from './pages/Social';
import MainLayout from './components/MainLayout';
import DynamicNavbar from './components/DynamicNavBar';
import Buscador from './pages/Buscador';
import Calificacion from './components/Calificacion';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route
          path="/*"
          element={
            <MainLayout>
              {/* <DynamicNavbar/> */}
              <Routes>
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/coming-soon" element={<ComingSoon />} />
                <Route path="/community" element={<Community />} />
                <Route path="/social" element={<Social />} />
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<Buscador />} />
                <Route path="/calificacion" element={<Calificacion />} />
                <Route path="/video/:id" element={<VideoPlayer/>} />
              </Routes>
            </MainLayout>
          }/>
        </Routes>
      </Router>
    </AuthProvider>
    // <AuthProvider>
    //   <Router>
    //     <Routes>
    //       <Route path='/' element={<Welcome/>}/>
    //       { user &&(
    //         <Route
    //           path='/'
    //           element={
    //             <Box
    //             sx={{display:'flex'}}
    //             >
    //               <Sidebar/>
    //               <Box sx={{flex:1, display:'flex', flexDirection:'column'}}>
    //                 <NavBar/>
    //                 <Box>
    //                   <Routes>
    //                     <Route path='home' element={<Home/>} />
    //                     <Route path='favorites' element={<Favorites/>} />
    //                     <Route path='trending' element={<Trending/>} />
    //                     <Route path='settings' element={<Setting/>} />
    //                   </Routes>
    //                 </Box>

    //               </Box>
    //             </Box>
    //           }
    //         />
    //       )
    //       }
    //     </Routes>
    //   </Router>

    // </AuthProvider>


  )
}

export default App
