import React, { Component } from 'react';
import './EstiloChat.css'
import {
    MessageBox,
    ChatItem,
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

import you from './Miniatura.png'

import FaSearch from 'react-icons/lib/fa/search';
import FaComments from 'react-icons/lib/fa/comments';
import FaClose from 'react-icons/lib/fa/close';
import FaMenu from 'react-icons/lib/md/more-vert';
import FaSquare from 'react-icons/lib/md/crop-square';

//import loremIpsum from 'lorem-ipsum';
//import Identicon from './identicon.js';  

export class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: true,
            list: 'chat',
            messageList: [],
        };
    }

    token() {
        return (parseInt(Math.random() * 10 % 6));
    }


    random(type) {
        switch (type) {
            case 'message':
                var type = this.token();
                var status = 'waiting';

                return {
                    position: (this.token() >= 1 ? 'right' : 'left'),
                    forwarded: false,
                    replyButton: true,
                    reply: /*this.token() >= 1 ? ({
                        photoURL: this.token() >= 1 ? you : null,
                        title: "Titulo x",
                        titleColor: "#EB7887",
                        message: "Mensaje x",
                    }) :*/ null,
                    meeting: null,
                    type: "text",
                    theme: 'white',
                    view: 'list',
                    title: "Fernando Lopez",
                    titleColor: "#EB7887",
                    text: "Texto descripcion",
                    onLoad: () => {
                        console.log('Photo loaded');
                    },
                    status: null,
                    date: +new Date(),
                    onReplyMessageClick: () => {
                        console.log('onReplyMessageClick');
                    },
                    avatar: you,
                };
            case 'chat':
                return {
                    id: String(Math.random()),
                    avatar: you,
                    avatarFlexible: true,
                    statusColor: 'lightgreen',
                    statusColorType: 'encircle',
                    alt: "Imagen de perfil",
                    title: "Titulo del chat",
                    date: new Date(),
                    subtitle: "Ultimo mensaje recibido",
                    unread: 0,
                };
        }
    }

    addMessage() {
        var list = this.state.messageList;
        list.push(this.random('message'));
        this.setState({
            messageList: list,
        });
    }

    render() {
        var arr = [];
        for (var i = 0; i < 5; i++)
            arr.push(i);

        var chatSource = arr.map(x => this.random('chat'));
        var meetingSource = arr.map(x => this.random('meeting'));

        return (
            <div className='container'>
                <div className='chat-list'>
                    <SideBar
                        top={
                            <div>
                                
                            </div>
                        }
                        center={
                            <ChatList className='chat-list' dataSource={chatSource}/>
                        }
                        bottom={
                            <div>
                                
                            </div>
                        }/>
                </div>
                <div
                    className='right-panel'>
                    <MessageList
                        className='message-list'
                        lockable={false}
                        downButtonBadge={10}
                        dataSource={this.state.messageList}
                    />

                    <Input
                        placeholder="Escribe tu mensaje."
                        defaultValue=""
                        ref='input'
                        multiline={true}
                        // buttonsFloat='left'
                        onKeyPress={(e) => {
                            if (e.shiftKey && e.charCode === 13) {
                                return true;
                            }
                            if (e.charCode === 13) {
                                this.refs.input.clear();
                                this.addMessage();
                                e.preventDefault();
                                return false;
                            }
                        }}
                        rightButtons={
                            <Button
                                color='white'
                                backgroundColor='black'
                                text='Enviar'
                                onClick={this.addMessage.bind(this)} />
                        } />
                </div>
            </div>
        );
    }
}

export default App;

/**
import React, { useState, Component } from 'react';
import './EstiloChat.css'
import {
    MessageBox,
    ChatItem,
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

import you from './Miniatura.png'

import FaSearch from 'react-icons/lib/fa/search';
import FaComments from 'react-icons/lib/fa/comments';
import FaClose from 'react-icons/lib/fa/close';
import FaMenu from 'react-icons/lib/md/more-vert';
import FaSquare from 'react-icons/lib/md/crop-square';

//import loremIpsum from 'lorem-ipsum';
//import Identicon from './identicon.js';  

export function Chat(){
    
    function random(tipo) {
        switch (tipo) {
            case 'message':

                return {
                    position: 'right',
                    forwarded: false,
                    replyButton: true,
                    reply: /*this.token() >= 1 ? ({
                        photoURL: this.token() >= 1 ? you : null,
                        title: "Titulo x",
                        titleColor: "#EB7887",
                        message: "Mensaje x",
                    }) : null,
                    meeting: null,
                    type: "text",
                    theme: 'white',
                    view: 'list',
                    title: "Fernando Lopez",
                    titleColor: "#EB7887",
                    text: "Texto descripcion",
                    onLoad: () => {
                        console.log('Photo loaded');
                    },
                    status: null,
                    date: +new Date(),
                    onReplyMessageClick: () => {
                        console.log('onReplyMessageClick');
                    },
                    avatar: you,
                };
            case 'chat':
                return {
                    id: String(Math.random()),
                    avatar: you,
                    avatarFlexible: true,
                    statusColor: 'lightgreen',
                    statusColorType: 'encircle',
                    alt: "Imagen de perfil",
                    title: "Titulo del chat",
                    date: new Date(),
                    subtitle: "Ultimo mensaje recibido",
                    unread: 0,
                };
        }
    }
    const [mensajes, setMensajes] = useState([random('message')]);
    const [chatSource, setchatSource] = useState([random('chat')]);

    function addMessage() {
        let x = random('message');
        setMensajes([...mensajes, x]);
    }

    
    //var meetingSource = arr.map(x => random('meeting'));

    return (
        <div className='container'>
            <div className='chat-list'>
                <SideBar
                    top={
                        <div>
                            
                        </div>
                    }
                    center={
                        <ChatList className='chat-list' dataSource={chatSource}/>
                    }
                    bottom={
                        <div>
                            
                        </div>
                    }/>
            </div>
            <div
                className='right-panel'>
                <MessageList
                    className='message-list'
                    lockable={true}
                    downButtonBadge={10}
                    dataSource={mensajes}
                />

                <Input
                    placeholder="Escribe tu mensaje."
                    defaultValue=""
                    ref='input'
                    multiline={true}
                    // buttonsFloat='left'
                    onKeyPress={(e) => {
                        if (e.shiftKey && e.charCode === 13) {
                            return true;
                        }
                        if (e.charCode === 13) {
                            addMessage();
                            e.preventDefault();
                            return false;
                        }
                    }}
                    rightButtons={
                        <Button
                            color='white'
                            backgroundColor='black'
                            text='Enviar'
                            onClick={()=>{addMessage()}} />
                    } />
            </div>
        </div>
    );
    
}

export default Chat;

 */
