import React from 'react'
import Estilos from './Estilos.js';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


function Alerta(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function AlertaMensaje() {
    const classes = Estilos();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
    }
    
        setOpen(false);
      };
    return (
       <div>
           <Grid container>
                <Button className={classes.inputAncho} size="large" variant="contained" color="primary" onClick={handleClick}>Enviar</Button>

                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alerta onClose={handleClose} severity="success">
                        ¡Mensaje enviado con éxito!
                    </Alerta>
                </Snackbar>
            </Grid>
       </div>
    )
}