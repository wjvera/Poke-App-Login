import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'


//llamamos al reducer
import reducerPoke from './pokePato'

import usuarioReducer, {noPerderusuario} from './usuarioPato'

//combinamos los reducer
const todoReducer = combineReducers({
    leerPokemones: reducerPoke,
    leerUsuario: usuarioReducer
})


//extension de google chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



//configurando el store
export default function generarTienda(){
    const tienda = createStore(todoReducer, composeEnhancers(applyMiddleware(thunk)))
    noPerderusuario()(tienda.dispatch)
    return tienda
}