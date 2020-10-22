import React, { useReducer, useEffect, createContext} from "react";

const estadoInicial = {
    servidor:"http://localhost:1337",
    id:"",
    jwt:"",
    email: "",
    confirmed: 0,
    blocked: 0,
    role: "",
    tipo: 0,
    nombre:"",
    apellido:"",
    ubicacion:"",
    telefono:"",
    url_imagen:"",
    permiso: 0,
    estado: false,
    dni:"",
    fecha_creacion:"",
    mostrar_telefono: false,
    descripcion:""
};

const reducer = (state, action) => {
    switch (action.type) {
        case "setUsuario":
            return {...state, tipo: 1};
        default:
            return { ...state };
    }
};

const ObtenerEstadoUsuario = createContext(estadoInicial);

function ProveerEstadoUsuario({ children }) {
    const [state, dispatch] = useReducer(reducer, estadoInicial);

    return (
        <ObtenerEstadoUsuario.Provider value={{ state, dispatch }}>
            {children}
        </ObtenerEstadoUsuario.Provider>
    );
}

export { ObtenerEstadoUsuario, ProveerEstadoUsuario };
