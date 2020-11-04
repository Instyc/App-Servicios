import React,{useState, useEffect, useContext} from 'react';
import {useHistory } from 'react-router-dom'

//Material UI
import {Typography, TextField, Button, Paper, Grid} from '@material-ui/core/';
import Cargando from '@material-ui/core/LinearProgress';

//Libreria para consultar la API del servidor
import axios from 'axios';

//Componentes creados
import Estilos from '../Estilos.js';
import SubirImagen from '../SubirImagen.js';

import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function VerificarMiIdentidad(){
    const classes = Estilos()
    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
    let history = useHistory();
    //Variables de la página
    const [cargando, setcargando] = useState(false)
    //   
    
    //Variables de los campos   
    const [DNI, setDNI] = useState("")
    const [imagenes, setimagenes] = useState([])
    const [ImagenDNI, setImagenDNI] = useState([])
    const [imagenesSubidas, setimagenesSubidas] = useState([]);
    const [imagenesBorradas, setimagenesBorradas] = useState([]);

    const funcionSetImagen = (file, cantidad, tipo, subidas) =>{
        setimagenesSubidas(subidas)
        //Si es 0, entonces se agrega la imagen a su respectiva variable, si es 1 entonces se desea eliminar
        if(tipo===0){
            setImagenDNI([...ImagenDNI, file])
        }else{
            setimagenesBorradas(img => [...imagenesBorradas, file])
            let aux = ImagenDNI.filter(f => f !== file)
            setImagenDNI(aux)
        }
        setimagenesSubidas(subidas)
    }

    useEffect(()=>{
        if(state.jwt!==""){
            setDNI(state.datosSesion.dni)
            let imgs = state.datosSesion.imagenes_dni.map(i_dni => i_dni.id)
            setimagenes(imgs)
        }
    },[state.jwt])
    
    const enviarDatos = (e) =>{
        e.preventDefault()
        setcargando(true)

        setDNI(String(DNI))

        let archivosNuevos = []
        
        //archivosNuevos es el arreglo que contiene los archivos que han sido agregados y no los que ya han sido subidos al servidor
        ImagenDNI.map((imagen) => {
            let iguales = imagenesSubidas.some(img => img === imagen)
            if(!iguales){
                archivosNuevos.push(imagen)
            }
        })
        console.log("imagenes dni:", ImagenDNI)
        console.log("nuevos:", archivosNuevos)

        //archivosBorrados es el arreglo que contiene los archivos que han sido subidos al servidor pero que han sido eliminados en el frontend
        let archivosBorrados = []
        imagenesBorradas.map((imagen) => {
            let iguales = imagenesSubidas.some(img => img === imagen)
            if(iguales){
                archivosBorrados.push(imagen)
            }
        })
        console.log("borrados:", archivosBorrados)
        
        //Si existen elementos dentro del arreglo imagenesBorradas, significa que se quieren borrar imágenes de la publicación
        for(let indx = 0; indx < imagenesBorradas.length; indx++){
            let id = Number(imagenesBorradas[indx].name)
            
            let auth = 'Bearer '+state.jwt;
            axios.delete(state.servidor+"/upload/files/"+id,
            {
                headers: {
                'Authorization': auth
            },})
            .then(response => {
                console.log("Borrando imagenes", response)            
            }).catch(error => {
                alert("Error al borrar las imagenes")
                console.log(error.response)
            })
        }

        //Subiendo las imagenes seleccionadas
        const formData = new FormData()
        
        //Se cargan en el fromData las nuevas imágenes cargadas a la publicación, si es que las hay, y los datos modificados
        for(let i = 0; i<archivosNuevos.length; i++){
            formData.append('files', archivosNuevos[i])
        }
        
        
        if(archivosNuevos.length!==0){
            formData.append('ref', 'user')
            formData.append('refId', state.datosSesion.id)
            formData.append('field', 'imagenes_dni')
            formData.append('source', 'users-permissions')

            let auth = 'Bearer '+state.jwt;

            axios.post(
                state.servidor+"/upload",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': auth
                    },
                })
            .then(response => {
                console.log("Respuesta imagen: ",response.data)
                guardarDatos()
            })
            .catch(error => {
                alert("Error al cargar las imágenes.")
                console.log("Error: ", error.response)
            })
        }else{
            guardarDatos()
        }
        
        
    }

    function guardarDatos(){
        let auth = 'Bearer '+state.jwt;
        //Se modifica el perfil del usuario incluyendo los nuevos datos.
        axios.put(
            state.servidor+"/users/"+state.datosSesion.id,{
                dni: DNI,
                espera_verificacion: true
            },{
                headers: {
                    'Authorization': auth
            },})
        .then(response => {
            dispatch({type:"setDatos", value: response.data})
            localStorage.setItem('datosLocal', JSON.stringify({
                jwt: state.jwt,
                datosSesion: response.data
            }));
            console.log("Datos: ",response.data)
            
            setcargando(false)
            history.push("/")
        })
        .catch(error => {
            console.log("Error, no se han podido enviar los datos.", error.response)
        })
    }
    
    return (
        <div className={classes.fondo}>
            <Paper elevation={3} >
                <form onSubmit={enviarDatos}>
                    <Grid className={classes.gridRegistro} spacing={1} container justify="space-between" alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h1" align="center" className={classes.inputAncho}>
                                Verificar mi identidad
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                            className={classes.inputAncho}
                            type="number"
                            name="dni"
                            value={DNI}
                            onChange={(e)=>{setDNI(e.target.value)}}
                            id="filled-basic"
                            label="Número de documento"
                            variant="filled"
                            required/>
                        </Grid>

                        <Grid item xs={12}>
                            <SubirImagen cantidad={2} funcionSetImagen={funcionSetImagen} setcargando={setcargando} ids={imagenes}/>
                        </Grid>

                        <Grid item xs={12} className={classes.inputAncho}>
                            {cargando && <Cargando/>}
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                className={classes.inputAncho}
                                size="large"
                                variant="contained"
                                color="primary"
                                disabled={cargando}
                            >
                                Guardar cambios
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
}