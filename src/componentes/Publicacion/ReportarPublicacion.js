import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Reportar from '@material-ui/icons/PriorityHigh';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Tooltip from '@material-ui/core/Tooltip';

import Estilos from '../Estilos.js';

export default function ReportarPublicacion({esDePerfil}) {
  const classes = Estilos();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title={esDePerfil?"Reportar proveedor de servicios":"Reportar publicación"}>
        <Button
            onClick={handleOpen}
        ><Reportar/>
        </Button>
      </Tooltip>
            
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
          <div className={classes.papelFondo}>
            <Typography variant="h5" component="h2" align="center">
                Seleccione los motivos:
            </Typography>
            <FormGroup>
            <FormControlLabel
                control={
                <Checkbox
                    color="primary"
                />
                }
                label="Motivo 1"
            />
            <FormControlLabel
                control={
                <Checkbox
                    color="primary"
                />
                }
                label="Motivo 2"
            />
            <FormControlLabel
                control={
                <Checkbox
                    color="primary"
                />
                }
                label="Motivo 3"
            />
            </FormGroup>
            
            <TextField id="filled-basic" label="Informacion adicional" variant="filled" multiline/>
            <Divider/>
            <Button className={classes.margenArriba} size="large" variant="contained" color="primary">Reportar</Button>   
          </div>
        </Fade>
      </Modal>
    </div>
  );
}