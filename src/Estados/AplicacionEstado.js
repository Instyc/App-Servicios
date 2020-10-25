import React, { useReducer, useEffect, createContext} from "react";

const estadoInicial = {
    servidor:"http://localhost:1337",
    jwt:"",
    guardar: false,
    datosSesion:{
        apellido: "",
        blocked: "",
        confirmed: false,
        created_at: "",
        descripcion: "",
        dni: "",
        email: "",
        estado: "",
        fecha_creacion: "",
        id: null,
        mostrar_telefono: false,
        nombre: "",
        permiso: 0,
        provider: "local",
        role: {
            id: 1, name: "Authenticated", 
            description: "Default role given to authenticated user.", 
            type: "authenticated"
        },
        telefono: "",
        tipo: 0,
        ubicacion: "",
        updated_at: "",
        username: "",
        identidad_verificada: false
    }
};

const reducer = (state, action) => {
    let valor = action.value;

    switch (action.type) {
        case "setDatos":
            return {...state, datosSesion: valor};
        case "setJwt":
            return {...state, jwt: valor};
        case "setGuardar":
            return {...state, guardar: valor};
        default:
            return { ...state };
    }
};

const ObtenerEstadoAplicacion = createContext(estadoInicial);

function ProveerEstadoAplicacion({ children }) {
    const [state, dispatch] = useReducer(reducer, estadoInicial);

    return (
        <ObtenerEstadoAplicacion.Provider value={{ state, dispatch }}>
            {children}
        </ObtenerEstadoAplicacion.Provider>
    );
}

export { ObtenerEstadoAplicacion, ProveerEstadoAplicacion };
