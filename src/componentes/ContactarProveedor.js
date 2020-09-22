import React from 'react'
import Estilos from './Estilos.js';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Mail from '@material-ui/icons/Mail';
import AlertaMensaje from './AlertaMensaje.js';
import Backdrop from '@material-ui/core/Backdrop';

function ContactarProveedor() {
    const classes = Estilos();
    return (
        <div>
            <Grid  container direction="row" justify="center" alignItems="stretch" spacing={2}>
                <Grid item xs={12}>
                    <div align="center">
                        <Avatar alt="Nombre proveedor" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR7Mt8wp9lo-dd73xpvjzPMcspQ8uwAThLitQ&usqp=CAU" className={classes.imagenPublicacion} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h2" align="center" className={classes.form}>
                        Nombre proveedor
                    </Typography>
                </Grid>

                <TextField className={classes.inputAncho} id="filled-basic" label="Escribe tu mensaje" variant="filled" multiline/>

                <Grid item>
                  <AlertaMensaje/>
                </Grid>
            </Grid>
        </div>
    )
}

export function BotonContratar({fijo}) {
    const classes = Estilos();
    const [open, setOpen] = React.useState(false);
    const [botonFijo, setbotonFijo] = React.useState(fijo);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
          <div className={fijo?classes.botonFijo:classes.botonNoF}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Mail/>}
              onClick={handleOpen}
            >
              Contactar
            </Button>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.mostrarFlex}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.contactarProveedor}>
              <ContactarProveedor/>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }