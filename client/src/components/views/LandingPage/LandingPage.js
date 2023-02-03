import React,{useEffect} from 'react'
import axios from 'axios'

function LandingPage() {

  useEffect(() =>{
    console.log(123)
    axios.get('/api/hello')
    .then(response => console.log(response.data))
  },[])

  return (
    <div>LandingPage</div>
  )
}

export default LandingPage