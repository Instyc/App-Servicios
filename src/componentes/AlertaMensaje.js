import React from 'react'
import Estilos from './Estilos.js';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


function Alerta(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function AlertaMensaje({mensaje, setabrir, abrir}) {
    const classes = Estilos();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setabrir(false);
    };
    
    return (
       <div>
           <Grid container>
                <Snackbar open={abrir} autoHideDuration={4000} onClose={handleClose}>
                    <Alerta onClose={handleClose} severity="success">
                        {mensaje}
                    </Alerta>
                </Snackbar>
            </Grid>
       </div>
    )
}