import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/LoginPage/LoginPage';
import './index.css';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { HeaderMegaMenu } from './Components/Navbar/HeaderMegaMenu';
import Profile from './Pages/Profile';
import UrlShortener from './Pages/UrlShortener';
import MyUrls from './Components/MyUrls';


function App() {
  return (
    <Router>
        <HeaderMegaMenu/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/url/shortener' element={<UrlShortener/>} />
            <Route path='/myurls' element={<MyUrls/>} />
            <Route element={<PrivateRoute/>}>
            </Route>
        </Routes>
    </Router>
  )
}

export default App
