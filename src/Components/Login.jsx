import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {ingresoUsuario} from '../Redux/usuarioPato'

import {withRouter} from 'react-router-dom'

const Login = (props) => {

    const dispatch = useDispatch()
    const cargando = useSelector(tienda => tienda.leerUsuario.loading)
    const activo = useSelector(tienda => tienda.leerUsuario.activo)
    console.log(activo)


    useEffect(() => {
        
        if(activo){
            props.history.push('/')
        }
    }, [activo, props.history])


    return (
        <div className = "mt-5 text-center">
            <h3>Ingresar con tu cuenta de Google</h3>
            <hr />
            <button  
                className = "btn btn-dark"
                onClick = {()=> dispatch(ingresoUsuario())}
                disabled = {cargando}
            >
                Acceder
            </button>
        </div>
    )
}

export default withRouter(Login)
