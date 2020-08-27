import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import ProveedorInfo from './ProveedorInfo';
import PublicacionInfo from './PublicacionInfo';
import Opiniones from './Opiniones';

import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Mail from '@material-ui/icons/MailOutlined';

const useStyles = makeStyles((theme) => ({ 
  root:{
      
  },
  boton: {
    left: "43%",
    top: "90%",
    display: "scroll",
    position: "fixed",
  }
}));

export default function Publicacion() {
    const classes = useStyles();
    return (
        <div>
            <Grid  container direction="row" justify="center" alignItems="stretch">
                <Grid item md={8} xs={12}>
                    <PublicacionInfo/>
                    <Opiniones/>
                </Grid>  
                <Grid item md={4} xs={12} >
                    <ProveedorInfo/>
                </Grid>  
                <Contratar/> 
            </Grid>
        </div>
    )
}

function Contratar() {
  const classes = useStyles();

  return (
    <div className={classes.boton}>
       <Button
        variant="contained"
        color="primary"
        startIcon={<Mail/>}
      >
        Contactar
      </Button>
    </div>
  );
}
