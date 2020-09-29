import { makeStyles } from '@material-ui/core/styles';

const Estilos = makeStyles((theme) => ({
    mostrarFlex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 10,
    },
    fondo:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 10,
        minHeight:"calc(100vh - 130px)",
    },
    proveedorSticky:{
        display: 'scroll',
        position: 'sticky',
        top: 10,
        flexWrap: 'wrap',
        marginBottom: 10,
        marginTop:10
    },
    margenArriba:{
        marginTop: 10,
    },
    padding:{
        padding: 20
    },
    padding2:{
        padding: 10
    },
    filaPublicacion:{
        padding: 10,
        marginTop: 10,
    },
    imagenPublicacion:{
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid #000",
        width: 200,
        height: 200,
        margin: "auto",
        marginBottom: 15
    },
    gridRegistro:{
        maxWidth:550, 
        padding: 20,
        marginBottom: 10,
    },
    inputAncho:{
        width: "100%",
    },
    papelFondo:{
        backgroundColor: "white",
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    pantallaMedia:{
        maxWidth: 800, 
        minWidth: 360,
    },
    botonFijo: {
        display: "scroll",
        position: "fixed",
        left: "50%",
        top: "calc(100% - 80px)",
        transform: "translate(-50%, -50%)",
        zIndex: 100
    },
    contactarProveedor:{
        backgroundColor: "white",
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button:{
        textTransform: "none"
    },
    margenAuto:{
        margin: "auto"
    },
    reporte:{
        padding: 10,
        marginTop: 10,
    },
    botonesNav:{
        textDecoration:"none",
        color: "white",
        display: 'inline',
        '@media (max-width:1075px)': {
          display: 'none',
        },
      },
      EstiloMovil:{
        display: 'none',
        '@media (max-width:1075px)': {
          display: 'inline',
        },
      },
      EstiloPC:{
        display: 'inline',
        '@media (max-width:1075px)': {
          display: 'none',
        },
    }
    
}));

export default Estilos;