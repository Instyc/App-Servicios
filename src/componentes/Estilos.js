import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Estilos = makeStyles((theme) => ({
    mostrarFlex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 20
    },
    margenArriba:{
        marginTop: 10,
    },
    filaPublicacion:{
        padding: 20,
        marginTop: 10,
    },
    imagenPublicacion:{
        borderRadius: "8px",
        objectFit: "cover",
        width: "100%",
        minWidth: 250,
        minHeight: 200,
    },
    gridRegistro:{
        width:550, 
        padding: 20,
        marginTop: 10,
    },
    inputAncho:{
        width: "100%",
        padding: 10
    },
    papelFondo:{
        backgroundColor: "white",
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
    
}));

export default Estilos;