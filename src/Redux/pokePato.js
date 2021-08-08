//importaciones
import axios from 'axios'



//vistas
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: []
}



//types
const CONSUMO_API_EXITO = 'CONSUMO_API_EXITO'
const SIGUIENTE_POKE = 'SIGUIENTE_POKE'
const INFORMACION_POKE = 'INFORMACION_POKE'




//reducer
export default function reducerPoke(state = dataInicial, action){
    switch(action.type){
        case CONSUMO_API_EXITO:
            return {...state, ...action.payload}
        case SIGUIENTE_POKE:
            return {...state, ...action.payload}
        case INFORMACION_POKE:
            return {...state, pokeInfo: action.payload}
        default:
            return state
    }
}



//acciones
export const pokeDetalle = (url = "https://pokeapi.co/api/v2/pokemon/1/") => async (dispatch) =>{

    if(localStorage.getItem(url)){
        console.log('trayendo datos guardados de localStorage')
        dispatch({
            type: INFORMACION_POKE,
            payload: JSON.parse(localStorage.getItem(url))
        })
        return
    }


    try {
        console.log('consumiendo desde la API')
        const respuesta = await axios.get(url)

        dispatch({
            type: INFORMACION_POKE,
            payload: {
                nombre: respuesta.data.name,
                ancho: respuesta.data.weight,
                alto: respuesta.data.height,
                foto: respuesta.data.sprites.front_default
            }
        })
        localStorage.setItem(url, JSON.stringify({
            nombre: respuesta.data.name,
            ancho: respuesta.data.weight,
            alto: respuesta.data.height,
            foto: respuesta.data.sprites.front_default
        }))
    } catch (error) {
        console.log(error)
    }
}


export const consumirApi = () => async(dispatch) =>{

    if(localStorage.getItem('consumirApi')){

        console.log('Datos ya guardados')
        
        dispatch({
            type: CONSUMO_API_EXITO,
            payload: JSON.parse(localStorage.getItem('consumirApi'))
        })
        return
    }
    
    try {
        console.log('consumiendo datos de la API')
        const respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=8`)
        dispatch({
            type: CONSUMO_API_EXITO,
            payload: respuesta.data
        })

        //guardamos la data en el localStorage del navegador
        localStorage.setItem('consumirApi', JSON.stringify(respuesta.data))
    } catch (error) {
        console.log(error)
    }
}


export const siguientePoke = () => async(dispatch, getState) =>{
    
    const siguiente = getState().leerPokemones.next
    
    if(localStorage.getItem(siguiente)){

        console.log('Datos ya guardados')

        dispatch({
            type: CONSUMO_API_EXITO,
            payload: JSON.parse(localStorage.getItem(siguiente))
        })
        return
    }

    try {

        console.log('consumiendo datos de la API')

        const respuesta = await axios.get(siguiente)
        dispatch({
            type: SIGUIENTE_POKE,
            payload: respuesta.data
        })

        localStorage.setItem(siguiente, JSON.stringify(respuesta.data))
    } catch (error) {
        console.log(error)
    }
}

export const anteriorPoke = () => async(dispatch, getState)=>{
    
    const anterior = getState().leerPokemones.previous

    if(localStorage.getItem(anterior)){

        console.log('Datos ya guardados')

        dispatch({
            type: CONSUMO_API_EXITO,
            payload: JSON.parse(localStorage.getItem(anterior))
        })
        return
    }

    try {
        const respuesta = await axios.get(anterior)
        dispatch({
            type: SIGUIENTE_POKE,
            payload: respuesta.data
        })


    localStorage.setItem(anterior, JSON.stringify(respuesta.data))
    } catch (error) {
        console.log(error)
    }

}

