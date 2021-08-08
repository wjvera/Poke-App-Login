//importaciones
import {autenticacion, firebase} from '../Firebase'

//vista o datos iniciales

const dataInicial = {
    loading: false,
    activo: false
}



//type  
const CARGANDO = 'CARGANDO'
const CARGANDO_ERROR = 'CARGANDO_ERROR'
const INGRESO  = 'INGRESO'
const SALIDA  = 'SALIDA'


//reducer
export default function usuarioReducer (state = dataInicial, action){
    switch(action.type){
        case CARGANDO:
            return {...state, loading: true}
        case CARGANDO_ERROR:
            return {...dataInicial}
        case INGRESO:
            return {...state, loading: false, user: action.payload, activo: true}
        case SALIDA:
            return {...dataInicial}
        default:
            return {...state}
    }
}


//acciones
export const ingresoUsuario = () => async(dispatch) =>{
    
    dispatch({
        type: CARGANDO
    })

    try {
        const proveedor = new firebase.auth.GoogleAuthProvider()

        const respuesta = await autenticacion.signInWithPopup(proveedor)

        dispatch({
            type: INGRESO,
            payload: {
                uid: respuesta.user.uid,  
                email: respuesta.user.email
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
            uid: respuesta.user.uid,
            email: respuesta.user.email
        }))
    } catch (error) {
        console.log(error)
        dispatch({
            type: CARGANDO_ERROR
        })
    }
}

export const noPerderusuario = () => (dispatch) =>{
    if(localStorage.getItem('usuario')){
        dispatch({
            type: INGRESO,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }
}

export const cerrarSesion = () => (dispatch) =>{
    autenticacion.signOut()
    localStorage.removeItem('usuario')
    dispatch({
        type: SALIDA
    })
}