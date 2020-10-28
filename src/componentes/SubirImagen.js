import React,{useEffect, useContext, useState} from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import axios from 'axios'
import { ObtenerEstadoAplicacion } from '../Estados/AplicacionEstado'

const SingleFileAutoSubmit = ({cantidad, funcionSetImagen, ids}) => {
    const toast = (innerHTML) => {
      const el = document.getElementById('toast')
      el.innerHTML = innerHTML
      el.className = 'show'
      setTimeout(() => { el.className = el.className.replace('show', '') }, 3000)
    }
    const [archivos, setarchivos] = useState([])

    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
    useEffect(()=>{
      console.log(ids)
        if(state.datosSesion.id!==null && ids.some(id=>(id!==null))){
          let IDS = ""
          ids.map((id)=>{
            if(id!==null){
              IDS+="id_in="+id+"&"
            }
          })
          axios.get(state.servidor+"/upload/files?"+IDS)
          .then(response => {
            response.data.map((dat) => {
              hacerArchivo(state.servidor+dat.url)
            })
          })  
          .catch(error => {
              //let err = JSON.parse(error.response.request.response).message[0].messages[0].id;
              console.log("Error: ", error)
          })
        }
    },[])
    
    
    function hacerArchivo(imagenUrl) {
      let file
      fetch(imagenUrl).then(res => {
        res.arrayBuffer().then(buf => {
          file = new File([buf], 'image_data_url.jpg', { type: 'image/jpeg' })
          setarchivos([...archivos, file])
        })
      })
    }
  
    const getUploadParams = ({ file, meta }) => {

      funcionSetImagen(file, cantidad, 0);

      //console.log(file)

      return { url: 'https://httpbin.org/post'}
    }
  
    const handleChangeStatus = ({ meta, file }, status) => {
      if (status === 'removed') {
        funcionSetImagen(file, cantidad, 1);

        /*toast(`${meta.name} uploaded!`)
        remove()*/
      }/* else if (status === 'aborted') {
        toast(`${meta.name}, upload failed...`)
      }*/
    }
  
    return (
      <React.Fragment>
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          maxFiles={cantidad}
          initialFiles={ids.length!==0?archivos:null}
          multiple={true}
          canCancel={false}
          accept="image/*"
          inputWithFilesContent={'Subir otra imagen'}
          inputContent={()=>(cantidad===1?`Selecciona ${cantidad} imagen`:`Selecciona hasta ${cantidad} imágenes`)}
          //submitButtonContent=null to remove el botón submit
          styles={{
            dropzone: { width: "100%", height: "100%", overflow:"auto"},
            dropzoneActive: { borderColor: 'green' },
          }}
        />
      </React.Fragment>
    )
  }

  export default SingleFileAutoSubmit;