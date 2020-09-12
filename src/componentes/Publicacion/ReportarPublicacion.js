import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Reportar from '@material-ui/icons/PriorityHigh';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "white",
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form:{
      marginBottom: 20
  }
}));

export default function ReportarPublicacion() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        
        <Button
            onClick={handleOpen}
        ><Reportar/>
        </Button>
            
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
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
            
            <TextField id="filled-basic" label="Informacion adicional" variant="filled"/>
            <Divider/>
                    
          </div>
        </Fade>
      </Modal>
    </div>
  );
}