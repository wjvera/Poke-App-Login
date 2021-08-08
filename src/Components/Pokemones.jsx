import React, {useEffect} from 'react'

//useDispatch para consumir la accion
//useSelector para consumir la vista


//importamos los hooks
import {useDispatch, useSelector} from 'react-redux'
//importar la accion
import {consumirApi, siguientePoke, anteriorPoke, pokeDetalle} from '../Redux/pokePato'

import Pokedetalles from './Pokedetalles'

const Pokemones = () => {

    const dispatch = useDispatch()

    const poke = useSelector(tienda => tienda.leerPokemones.results)
    const sigui = useSelector(tienda => tienda.leerPokemones.next)
    const ante = useSelector(tienda => tienda.leerPokemones.previous)


    useEffect(() => {
        const fetchData = () => {
            dispatch(consumirApi())
        }
        fetchData()
    }, [dispatch])


    return (
        <div className = "row mt-5">

            <div className="col-md-6">
                
                <h1>Lista de pokemones</h1>
               
                <ul className = "list-group mt-4">
                    {
                        poke.map(devolver => (
                            <li key = {devolver.name} className = "list-group-item">
                                {devolver.name}
                                <button 
                                    className="btn btn-dark btn-sm float-end"
                                    onClick = {() => dispatch(pokeDetalle(devolver.url))}
                                >
                                    Detalles
                                </button>
                            </li>
                        ))
                    }
                </ul>
                
                <div className="d-flex justify-content-between mt-4">
                        {
                            poke.length === 0 &&
                            <button onClick = {()=> dispatch(consumirApi())} className = "btn btn-dark">
                                Consumir
                            </button>

                        }


                        {
                            sigui && 
                            <button onClick = {()=> dispatch(siguientePoke())} className = "btn btn-dark">
                                Siguiente
                            </button>
                        }

                        
                        {
                            ante &&
                            <button onClick = {()=> dispatch(anteriorPoke())} className = "btn btn-dark">
                                Anterior
                            </button>
                        }

                        

                </div>
                

            </div>
        
            <div className="col-md-6">
            
                <h1>Detalle del pokemon</h1>
                <Pokedetalles />
            </div>
        </div>
    )
}

export default Pokemones
