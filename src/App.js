import { useSelector } from 'react-redux'
import Register from './Pages/Register/Register'
import Profile from './Pages/Profile/Profile'
import Login from './Pages/Login/Login'
import Chat from './Pages/Chat/Chat'
import Home from './Pages/Home/Home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ForgottPassword from './Pages/ForgottPassword/ForgottPassword'
import ResetPassword from './Pages/ResetPassword/ResetPassword'
import OthersProfile from './Pages/OthersProfile/OthersProfile'
import Notification from './Pages/Notifications/Notification'
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail'
function App() {
  const userDetails = useSelector((state) => state.user)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={userDetails && userDetails?.verified === true ? <Home /> : <Navigate to={"/login"} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={!userDetails ? <Login />: <Navigate to={"/"}/>} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/othersprofile/:id' element={<OthersProfile />} />
          <Route path='/notifications' element={<Notification />} />
          <Route path='/verifyEmail/:id' element={<VerifyEmail />} ></Route>
          <Route path='/resetPassword' element={<ResetPassword />} ></Route>
          <Route path='/forgottPassword' element={<ForgottPassword />}></Route>
          <Route path='/chat' element={<Chat />}></Route>
          <Route path='/success' element={<div className='text-3xl font-bold p-48 text-green-300'>check your email or spam page </div>} ></Route>
          <Route path='*' element={<div className='p-96 text-3xl font-bold'> Bad Request<br />404 found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
