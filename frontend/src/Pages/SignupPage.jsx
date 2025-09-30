import {useState} from 'react'
const Signuppage=()=>{
  const [showpassword,setShowpassword]=useState(false)
  const[form,setForm]=useState({
    fullName:"",
    email:"",
    password:""
  })
    return(
      <div>
        <h1>SignUpPage</h1>
      </div>
    )
}
export default Signuppage