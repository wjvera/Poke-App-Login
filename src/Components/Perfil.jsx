import React, {useState} from 'react'
//para llamar a la tienda, se usa, useSelector
import {useSelector, useDispatch} from 'react-redux'

import {actualizar} from '../Redux/usuarioPato'


import {editarImagen} from '../Redux/usuarioPato'


const Perfil = () => {

    const usuario = useSelector(tienda => tienda.leerUsuario.user)
    console.log(usuario)

    const [nombre, setNombre] = useState(usuario.displayName)
    const [activar, setActivar] = useState(false)
    const [error, setError] = useState(false)

    const cargando = useSelector(tienda => tienda.leerUsuario.loading)


    const dispatch = useDispatch()


    const actualizarUsuario = () =>{

        if(nombre.trim().length === 0){
            console.log('Campo nombre vacio')
            return
        }
        dispatch(actualizar(nombre))
        setActivar(false)
    }


    const seleccionarArchivo = (imagen) =>{
        
        console.log(imagen.target.files[0])

        const imagenFormato = imagen.target.files[0]


        if(imagenFormato === undefined){
            alert('No se seleccionó la imagen')
            return
        }


        if(imagenFormato.type === 'image/png' || imagenFormato.type === 'image/jpg' || imagenFormato.type === 'image/jpeg'){
            dispatch(editarImagen(imagenFormato))
            setError(false)
        }else{
            setError(true)
        }
    }

    return (
        <div className = "mt-5 text-center">
            <div className="card">
                    <div className="card-body mt-2">
                        
                        <img src={usuario.photoURL} alt="" width="100px" className = "img-fluid"/>
                        <br />
                        <h5 className = "card-title">Nombre Usuario: {usuario.displayName}</h5>
                        <p className="card-text">Correo: {usuario.email}</p>
                        <button 
                            className="btn btn-dark"
                            onClick = {()=> setActivar(true)}
                        >
                            Editar nombre
                        </button>

                        {
                            error &&
                                <div className="alert-alert-warning mt-3">
                                    Solo archivos .png  .jpg  .jpeg
                                </div>
                        }

                        <div className="custom-file mt-4">
                            <input  
                                type="file" 
                                className="form-control" 
                                id="inputGroupFile02"
                                style={{display: 'none'}}
                                onChange = {(e)=>seleccionarArchivo(e)}
                                disabled = {cargando}
                            />
                            <label 
                                className={ cargando ? "btn btn-dark disabled" : "btn btn-dark"} 
                                htmlFor="inputGroupFile02"
                            >
                                Actualizar Imagen
                            </label>
                        </div>

                    </div>
                    {
                        cargando && 
                            <div className="card-doby mt-3">
                                <div className="spinner-border text-secondary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                    }

                    {
                        activar && 
                                <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-md-5">

                                        <div 
                                            className="input-group mb-3"
                                        >
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value = {nombre}
                                                onChange = {(e)=> setNombre(e.target.value)}
                                            />
                                            <button 
                                                className="btn btn-dark" 
                                                type="button"
                                                onClick = {()=> actualizarUsuario()}
                                            >
                                                    Actualizar
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                    }
            </div>
        </div>
    )
}

export default Perfil
