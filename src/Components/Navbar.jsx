import React from 'react'
import {Link, NavLink} from 'react-router-dom'


import { useDispatch, useSelector } from 'react-redux'

import {cerrarSesion} from '../Redux/usuarioPato'

//sacarlo de la sesion
import {withRouter} from 'react-router-dom'


const Navbar = (props) => {

    const dispatch = useDispatch()

    const cerrarCuenta = () =>{
        dispatch(cerrarSesion())
        props.history.push('/login') //sacarlo de la sesion
    }

    const activo = useSelector(tienda => tienda.leerUsuario.activo)


    return (
        <div className = "navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">App Poke</Link>
            <div className="d-flex">
                {
                    activo ? (
                        <>
                        <NavLink className = "btn btn-dark mr-2" to="/" exact>Inicio</NavLink>
                            <button 
                                className = "btn btn-dark mr-2"
                                onClick={()=> cerrarCuenta()} 
                            >
                                Cerrar sesion
                            </button>
                        </>
                        
                    ) : (
                        <NavLink className = "btn btn-dark mr-2" to="/Login" exact>Login</NavLink>
                    )
                }
                
                
                
            </div>  
        </div>
    )
}

//sacarlo de la sesion
export default withRouter(Navbar)
