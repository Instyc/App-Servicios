import React, { useState, Component, useEffect, useContext } from 'react';
import axios from 'axios'

import './EstiloChat.css'
import {
    ChatItem,
    MessageBox,
    ChatList,
    SystemMessage,
    MessageList,
    Input,
    Button,
    Avatar,
    Navbar,
    SideBar,
    Dropdown,
    Popup,
    MeetingList,
} from './ComponentesChat'; 
import {IconButton, Button as Boton, Tooltip} from '@material-ui/core/';
import {KeyboardReturn as Atras, StarRate} from '@material-ui/icons/';
import AlertaSi_No from '../AlertaSi_No.js';
import AlertaMensaje from '../AlertaMensaje.js';
import you from './Miniatura.png'


//import loremIpsum from 'lorem-ipsum';
//import Identicon from './identicon.js';  
import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'
import Estilos from '../Estilos.js'

export function Chat(){
    const classes = Estilos();
    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
    const [cargando, setcargando] = useState(false)
    const [chats, setchats] = useState([])
    const [chatsOrdenados, setchatsOrdenados] = useState([])
    const [mensajes, setmensajes] = useState([]);
    const [chatSeleccionado, setchatSeleccionado] = useState(null);
    const [confirmacion, setconfirmacion] = useState(false);
    const [abrir, setabrir] = useState(false);
    const [deshabilitado, setdeshabilitado] = useState(false);
    
    const [contenido, setcontenido] = useState("");
    const [atras, setatras] = useState(false);
    
    useEffect(()=>{
        let auth = 'Bearer '+state.jwt;
        setcargando(true)
        if(state.jwt!==""){
            axios.get(state.servidor+"/api/chats/",{
                headers: {'Authorization': auth},
              })
            .then(response => {
                console.log(response.data)
                //Obtenemos todos los chats del sistema y filtramos segun el id de receptor o emisor
                let chats_ = response.data.filter(chat => (chat.receptor.id === state.datosSesion.id || chat.emisor.id === state.datosSesion.id))
                
                setchats(chats_.map((chat)=>{
                    let emisor = `${chat.emisor.nombre} ${chat.emisor.apellido}`
                    let receptor = `${chat.receptor.nombre} ${chat.receptor.apellido}`

                    //Establecemos el objeto de mensaje (de la interfaz), con los mensajes del respectivo chat
                    let msjs = chat.mensajes.map((mensaje)=>({
                        position: mensaje.enviado_por?'right':'left',
                        forwarded: false,
                        replyButton: false,
                        reply: null,
                        meeting: null,
                        type: "text",
                        theme: 'white',
                        view: 'list',
                        title: mensaje.enviado_por?emisor:receptor,
                        titleColor: "#EB7887",
                        text: mensaje.contenido,
                        onLoad: () => {
                            console.log('Photo loaded');
                        },
                        status: null,
                        date: new Date(mensaje.created_at),
                        onReplyMessageClick: () => {
                            console.log('onReplyMessageClick');
                        },
                        avatar: you,
                    }
                    ))
                                        
                    setcargando(false)
                    return {
                        chat:{
                            id: chat.id,
                            avatar: you,
                            avatarFlexible: true,
                            statusColor: 'lightgreen',
                            statusColorType: 'encircle',
                            alt: "Imagen de perfil",
                            title: chat.solicitud===null?chat.categoria.nombre:chat.solicitud.titulo,
                            date: new Date(chat.mensajes[chat.mensajes.length-1].created_at),
                            subtitle: chat.mensajes[chat.mensajes.length-1].contenido,
                            unread: state.datosSesion.id===chat.emisor.id?chat.noleido_emisor:chat.noleido_receptor,
                            mensajes: msjs,
                            emisor: chat.emisor,
                            receptor: chat.receptor,
                            noleido_emisor: chat.noleido_emisor,
                            noleido_receptor: chat.noleido_receptor,
                            categoria: chat.categoria,
                            solicitud: chat.solicitud,
                            peticion: chat.peticion
                        }
                    }
                }))
            })
            .catch(error => {
                alert("Un error ha ocurrido al cargar los chats.")
                console.log(error.response)
            }) 
        }
    },[state.jwt])

    useEffect(()=>{
        if(chats.length!==0){
            //console.log(chats)
            setchatSeleccionado(chats[0].chat)
            setmensajes(chats[0].chat.mensajes)
        }
    },[chats])

    useEffect(() => {
        if (chatSeleccionado!==null && chatSeleccionado.peticion)
            setdeshabilitado(true)
    }, [chatSeleccionado])

    function actualizarMensajes(chat){
        setmensajes(chat.mensajes)
        setchatSeleccionado(chat)
        setatras(false)
        let auth = 'Bearer '+state.jwt;

        //Si abrimos el chat debemos actualizar el valor de los mensajes no leidos a 0
        let obj_leido = {}
        if(state.datosSesion.id===chat.emisor.id){
            obj_leido["noleido_emisor"]= 0
        }else{
            obj_leido["noleido_receptor"] = 0
        }
        axios.put(state.servidor+"/api/chats/"+chat.id,obj_leido,{
            headers: {'Authorization': auth},
        }).then(response => {
            console.log(response.data)
        })
        //////////////////////////////////////////////////////////////////////////////////

        //Buscamos todos los mensajes del chat seleccionado
        axios.get(state.servidor+"/api/chats/"+chat.id,{
            headers: {'Authorization': auth},
          })
        .then(response => {
            let emisor = `${response.data.emisor.nombre} ${response.data.emisor.apellido}`
            let receptor = `${response.data.receptor.nombre} ${response.data.receptor.apellido}`
            
            //Establecemos el objeto de mensaje (de la interfaz), con los mensajes del respectivo chat
            let msjs = response.data.mensajes.map((mensaje, i)=>({
                position: mensaje.enviado_por?'right':'left',
                forwarded: false,
                replyButton: false,
                reply: null,
                meeting: null,
                type: "text",
                theme: 'white',
                view: 'list',
                title: mensaje.enviado_por?emisor:receptor,
                titleColor: "#EB7887",
                text: mensaje.contenido,
                onLoad: () => {
                    console.log('Photo loaded');
                },
                status: null,
                date: new Date(mensaje.created_at),
                onReplyMessageClick: () => {
                    console.log('onReplyMessageClick');
                },
                avatar: you,
            }
            ))
            setmensajes(msjs)
            setdeshabilitado(response.data.peticion)
        })
        .catch(error => {
            alert("Un error ha ocurrido al cargar los mensajes.")
            console.log(error.response)
        }) 
    }

    function agregarMensaje() {
        let auth = 'Bearer '+state.jwt;
        if(chatSeleccionado!==null){
            let emisor = `${chatSeleccionado.emisor.nombre} ${chatSeleccionado.emisor.apellido}`
            let receptor = `${chatSeleccionado.receptor.nombre} ${chatSeleccionado.receptor.apellido}`

            //Se actualiza el arreglo de mensajes
            setmensajes([...mensajes, {
                position: state.datosSesion.id===chatSeleccionado.emisor.id?'right':'left',
                forwarded: false,
                replyButton: false,
                reply: null,
                meeting: null,
                type: "text",
                theme: 'white',
                view: 'list',
                title: state.datosSesion.id===chatSeleccionado.emisor.id?emisor:receptor,
                titleColor: "#EB7887",
                text: contenido,
                onLoad: () => {
                    console.log('Photo loaded');
                },
                status: null,
                date: new Date(),
                onReplyMessageClick: () => {
                    console.log('onReplyMessageClick');
                },
                avatar: you,
            }])
            
            //Se envía un nuevo mensaje al emisor o receptor
            axios.post(state.servidor+"/api/mensajes/",{
                chat: chatSeleccionado.id,
                enviado_por: state.datosSesion.id===chatSeleccionado.emisor.id,
                contenido: contenido
            },{
                headers: {'Authorization': auth},
            })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                alert("Un error ha ocurrido al cargar los mensajes.")
                console.log(error.response)
            }) 

            /////////////////////////////////////////////////////////////////////////////////
            //Si se envia un mensaje, entonces aumentamos la cantidad de mensajes no leidos, ya sea del receptor como emisor
            let obj_noleido = {}
            console.log(chatSeleccionado)
            if(state.datosSesion.id===chatSeleccionado.emisor.id){
                obj_noleido["noleido_receptor"] = chatSeleccionado.noleido_receptor+1
                let vari = chatSeleccionado
                vari.noleido_receptor++
                setchatSeleccionado(vari)
            }else{
                obj_noleido["noleido_emisor"]= chatSeleccionado.noleido_emisor+1
                let vari = chatSeleccionado
                vari.noleido_receptor++
                setchatSeleccionado(vari)
            }
            axios.put(state.servidor+"/api/chats/"+chatSeleccionado.id,obj_noleido,{
                headers: {'Authorization': auth},
            }).then(response => {
                console.log(response.data)
            })
        }
    }

    useEffect(() => {
        if (chats.length!==0){
            console.log(chats.sort((a, b) => a.chat.mensajes[a.chat.mensajes.length-1].date.getTime() > b.chat.mensajes[b.chat.mensajes.length-1].date.getTime()))
        }
    }, [chats])

    function enviarNotificacion(boole){
        setconfirmacion(false)
        if (boole){
            let auth = 'Bearer '+state.jwt;
            //Seteamos los ids de emisores y receptores de la notificación
            let emisor = chatSeleccionado.receptor.id
            let receptor = chatSeleccionado.emisor.id
            
            if (chatSeleccionado.solicitud!==null){
                //Si el tipo de la solicitud es false, significa que es una solicitud y que el emisor de la notificación es el emisor del chat
                if (!chatSeleccionado.solicitud.tipo){
                    emisor = chatSeleccionado.emisor.id
                    receptor = chatSeleccionado.receptor.id
                }
            }
            axios.post(
                state.servidor+"/api/notificaciones/",{
                    tipo: 2,
                    emisor: emisor,
                    receptor: receptor,
                    solicitud: chatSeleccionado.solicitud===null?null:chatSeleccionado.solicitud.id,
                    datos_notificacion: chatSeleccionado.categoria===null?"":String(chatSeleccionado.categoria.id+"_"+chatSeleccionado.categoria.nombre),
                    leido: false
                },
                {headers: {'Authorization': auth},})
            .then(response => {
                console.log("Se ha podido crear la notificacion: ",response.data)
                let auth = 'Bearer '+state.jwt;
                axios.put(state.servidor+"/api/chats/"+chatSeleccionado.id,{
                    peticion: true
                },{
                    headers: {'Authorization': auth},
                }).then(response => {
                    console.log(response.data)
                    setdeshabilitado(true)
                })
                setabrir(true)
            })
            .catch(error => {
                console.log("Error, no se ha podido crear la notificacion.", error.response)
                alert("Error, no se ha podido crear la notificacion.")
            })
        }
    }

    return (
        <div className='container' >
            <div className='chat-list' className={atras?classes.EstiloMovil:classes.EstiloPC}>
                <SideBar
                    top={
                        <div>
                            
                        </div>
                    }
                    center={
                        <ChatList className='chat-list' onClick={(e)=>{actualizarMensajes(e)}} dataSource={chats.map(chat=>(chat.chat))}/>
                    }
                    bottom={
                        <div>
                            
                        </div>
                    }/>
            </div>
            <IconButton
                className={classes.EstiloMovil}
                style={{
                    position: atras?"relative":"absolute",
                    left: "0px",
                    top: "70px",
                    zIndex: 100,
                }}
                onClick={()=>{setatras(!atras)}}
            >
                <Atras/>
            </IconButton>
            <div className={atras?classes.EstiloPC:classes.EstiloVacio} className='right-panel'>
                {
                    chatSeleccionado!==null &&
                        <ChatItem
                            avatar={you}
                            alt={'Reactjs'}
                            title={chatSeleccionado.title}
                            subtitle={chatSeleccionado.emisor.id===state.datosSesion.id?
                                `${chatSeleccionado.receptor.nombre} ${chatSeleccionado.receptor.apellido}`:
                                `${chatSeleccionado.emisor.nombre} ${chatSeleccionado.emisor.apellido}`}
                            date={null}
                            unread={0}
                        />
                }
                {
                    chatSeleccionado!==null && !atras &&
                    (chatSeleccionado.solicitud===null?(chatSeleccionado.receptor.id===state.datosSesion.id):
                    (chatSeleccionado.solicitud.tipo?chatSeleccionado.receptor.id===state.datosSesion.id:chatSeleccionado.emisor.id===state.datosSesion.id)) &&
                        <div>
                            <Boton disabled={deshabilitado} onClick={()=>setconfirmacion(true)} color="primary" className={classes.BotonSolicitar} variant="contained">
                                Petición de reseña
                            </Boton>
                            <Boton disabled={deshabilitado} onClick={()=>setconfirmacion(true)} color="primary" className={classes.BotonSolicitarMovil} variant="contained">
                                <StarRate/>
                            </Boton>
                        </div>
                }
                {
                    confirmacion &&
                    <AlertaSi_No
                    mensaje="Esta acción solo se debe realizar cuando ya se haya cumplido con el servicio pactado. ¿Está seguro que quiere enviar la petición?"
                    funcionAceptar={enviarNotificacion}
                    titulo="Enviar petición de reseña al cliente"/> 
                }
                <AlertaMensaje mensaje="¡Petición de reseña enviada!" setabrir={setabrir} abrir={abrir}/>
                <MessageList
                    className='message-list'
                    lockable={true}
                    downButtonBadge={10}
                    dataSource={mensajes}
                />
                {
                    chatSeleccionado!==null &&
                    <Input
                    placeholder="Escribe tu mensaje."
                    defaultValue=""
                    onChange={(e)=>{setcontenido(e.target.value)}}
                    //ref='input'
                    multiline={true}
                    // buttonsFloat='left'
                    onKeyPress={(e) => {
                        if (e.shiftKey && e.charCode === 13) {
                            return true;
                        }
                        if (e.charCode === 13) {
                            agregarMensaje();
                            e.preventDefault();
                            return false;
                        }
                    }}
                    rightButtons={
                        <Button
                            color='white'
                            backgroundColor='black'
                            text='Enviar'
                            onClick={()=>{agregarMensaje()}} />
                    } />
                }
            </div>
        </div>
    );
    
}

export default Chat;
