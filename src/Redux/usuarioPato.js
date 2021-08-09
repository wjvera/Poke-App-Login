//importaciones
import {autenticacion, firebase, db, almacenamiento} from '../Firebase'

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

        const datosUsuario  = {
            uid: respuesta.user.uid,  
            email: respuesta.user.email,
            displayName: respuesta.user.displayName,
            photoURL: respuesta.user.photoURL
        }

        const usuarioDB = await db.collection('Pokedb').doc(datosUsuario.email).get()
        console.log(usuarioDB)

        if(usuarioDB.exists){
            //cuando exista el usuario en la base de datos
            dispatch({
                type: INGRESO,
                payload: usuarioDB.data()
            })

            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))

        }else{
            //cuando no exista el usuario en la base de datos
            await db.collection('Pokedb').doc(datosUsuario.email).set(datosUsuario)

            dispatch({
                type: INGRESO,
                payload: datosUsuario
            })
            localStorage.setItem('usuario', JSON.stringify(datosUsuario))
        }


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

export const actualizar = (nombreActualizado) => async (dispatch, getState) =>{
    
    dispatch({
        type: CARGANDO
    })

    const usuarioget = getState().leerUsuario.user

    try {

        await db.collection('Pokedb').doc(usuarioget.email).update({
            displayName: nombreActualizado
        })

        const usuarioTry = {
            ...usuarioget,
            displayName: nombreActualizado
        }

        dispatch({
            type: INGRESO,
            payload: usuarioTry 
        })

        localStorage.setItem('usuario', JSON.stringify(usuarioTry))
        
    } catch (error) {
        console.log(error)
    }
}


export const editarImagen = (imagenEditada) => async(dispatch, getState) =>{
    
    dispatch({
        type: CARGANDO
    })

    const usuarioget = getState().leerUsuario.user

    try {

        const guardarImagen = await almacenamiento.ref().child(usuarioget.email).child('foto perfil')
        await guardarImagen.put(imagenEditada)
        const imagenURL = await guardarImagen.getDownloadURL()

        await db.collection('Pokedb').doc(usuarioget.email).update({
            photoURL: imagenURL
        })

        const usuarioTry2 = {
            ...usuarioget,
            photoURL: imagenURL
        }

        dispatch({
            type: INGRESO,
            payload: usuarioTry2
        })
        
        localStorage.setItem('usuario', JSON.stringify(usuarioTry2))
    } catch (error) {
        console.log(error)
    }
}