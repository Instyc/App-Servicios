import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import Cargando from '@material-ui/core/LinearProgress';

export default function Alerta({titulo, funcionAceptar, mensaje}) {
  const [open, setOpen] = useState(true);
  const [cargando, setcargando] = useState(false)
  
  const handleClose = (boole) => {
    setcargando(true)
    funcionAceptar(boole)
    setcargando(false)
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={()=>{handleClose(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {mensaje}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose(false)}} color="primary">
            Cancelar
          </Button>
          <Button onClick={()=>{handleClose(true)}} color="primary" autoFocus>
            Aceptar
          </Button>
          {cargando && <Cargando/>}
        </DialogActions>
      </Dialog>
    </div>
  );
}