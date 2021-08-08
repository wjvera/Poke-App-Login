import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {pokeDetalle} from '../Redux/pokePato'

const Pokedetalles = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = () => {
            dispatch(pokeDetalle())
        }
        fetchData()
    }, [dispatch])

    
    //llamar a la vista
    const pokeVista = useSelector(tienda => tienda.leerPokemones.pokeInfo)
    

    return pokeVista ? (
        <div className="card mt-4 text-center">
            <div className="card-body">
                <img src={pokeVista.foto} alt="" className="img-fluid"/>
                <div className="card-title">{pokeVista.nombre}</div>
                <p className="card-text">Alto: {pokeVista.alto}| Ancho: {pokeVista.ancho}</p>
            </div>
        </div>
    ) : null
}

export default Pokedetalles
