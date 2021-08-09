import React, {useState, useEffect} from 'react'
import { autenticacion } from './Firebase'


//importamos el component
import Pokemones from './Components/Pokemones'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Perfil from './Components/Perfil'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


function App() {


    const [firebaseUser, setFirebaseUser] = useState(false)

    useEffect(() => {
      const fetchUser = () =>{
        autenticacion.onAuthStateChanged(user => {
          console.log(user)
          if(user){
              setFirebaseUser(user)
          }else{
              setFirebaseUser(null)
          }
      })
    }
    fetchUser()   
  }, [])

  const RutaPrivada = ({component, path, ...resto}) =>{
    if(localStorage.getItem('usuario')){
      const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'))
      if(usuarioGuardado.uid === firebaseUser.uid){
        return <Route component = {component} path = {path} {...resto} />
      }else{
        return <Redirect to="/Login" {...resto}/>
      }
    }else{
      return <Redirect to="/Login" {...resto}/>
    }
  }

  return firebaseUser !== false ?(
    <Router>
        <div className="container mt-5">

          <Navbar />
          
          <Switch>
              <RutaPrivada component={Pokemones} path="/" exact/>
              <RutaPrivada component={Perfil} path="/Perfil" exact/>
              <Route component={Login} path="/Login" exact/>
          </Switch>
   
        </div>
    </Router>
  ) : (<div><h1>Cargando...</h1></div>)
}

export default App;
