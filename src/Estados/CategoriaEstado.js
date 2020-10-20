import React, { useReducer, useEffect, createContext} from "react";

const initialState = {
    estadoEditado: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "setFalso":
            return {...state, estadoEditado: false};
        case "setVerdad":
            return {...state, estadoEditado: true};
        default:
            return { ...state };
    }
};

const ObtenerEstado = createContext(initialState);

function ProveerEstadoCategoria({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ObtenerEstado.Provider value={{ state, dispatch }}>
            {children}
        </ObtenerEstado.Provider>
    );
}

export { ObtenerEstado, ProveerEstadoCategoria };
