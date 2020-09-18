import React from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const SingleFileAutoSubmit = ({cantidad}) => {
    const toast = (innerHTML) => {
      const el = document.getElementById('toast')
      el.innerHTML = innerHTML
      el.className = 'show'
      setTimeout(() => { el.className = el.className.replace('show', '') }, 3000)
    }
  
    const getUploadParams = () => {
      return { url: 'https://httpbin.org/post' }
    }
  
    const handleChangeStatus = ({ meta, remove }, status) => {
      /*if (status === 'headers_received') {
        toast(`${meta.name} uploaded!`)
        remove()
      } else if (status === 'aborted') {
        toast(`${meta.name}, upload failed...`)
      }*/
    }
  
    return (
      <React.Fragment>
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          maxFiles={cantidad}
          multiple={true}
          canCancel={false}
          accept="image/*"
          inputWithFilesContent={'Subir otra imagen'}
          inputContent={()=>(cantidad===1?`Selecciona ${cantidad} imagen`:`Selecciona ${cantidad} imágenes`)}
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