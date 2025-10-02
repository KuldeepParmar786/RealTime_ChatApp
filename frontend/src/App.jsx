import {useEffect} from 'react'
import {Routes,Route,Link,Navigate} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Loginpage from './Pages/LoginPage'
import Profilepage from './Pages/ProfilePage'
import Settingspage from './Pages/SettingsPage'
import Signuppage from './Pages/SignupPage'
import {useAuthStore} from './store/checkAuth.js'
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'

const App=()=>{
   const {authUser,checkAuth,isCheckingAuth}=useAuthStore()
   
   useEffect(()=>{
     checkAuth()
   },[checkAuth])

   if(isCheckingAuth && !authUser){
      return(
         <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin" />
         </div>
      )
   }
   return(
      <div>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <Signuppage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Loginpage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settingspage />} />
        <Route path="/profile" element={authUser ? <Profilepage /> : <Navigate to="/login" />} />
      </Routes>
         <Toaster />
      </div>
   )
}
export default App