import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Like from '@material-ui/icons/ThumbUpAltTwoTone';
import Dislike from '@material-ui/icons/ThumbDownAltTwoTone';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Estilos from '../Estilos.js'

export default function GestionarReportes() {
  const classes = Estilos();
  return (
    <div className={classes.margenArriba}>
      <Paper elevation={5}>
        <Grid className={classes.filaPublicacion} container justify="flex-start">
            <Grid item xs={12}>
                <Typography variant="h4" component="h1" align="left">
                    Reportes
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Reporte/>
                <Reporte/>
                <Reporte/>
                <Reporte/>
            </Grid>
        </Grid>
      </Paper>
    </div>
  );
}


function Reporte() {
    const classes = Estilos();
    const motivos = [
        "Motivo 1",
        "Motivo 2",
        "Motivo 3",
        "Motivo 4",
        "Motivo 5",
        "Motivo 6",
    ]
    return (
        <Paper className={classes.filaPublicacion} variant="outlined" square>
            <Grid container direction="row" justify="space-around">
                <Grid item xs={12}>
                    <Typography variant="h5" component="h2" align="left">
                        Publicacion X
                    </Typography>
                    <Typography variant="h5" component="h3" align="left">
                        Proveedor de servicios Y
                    </Typography>
                </Grid>
                
                <Grid item xs={12}>
                    <Typography variant="h6" component="h5" align="left">
                        Opciones señaladas
                    </Typography>
                </Grid>
                
                <Grid container direction="row" justify="space-around">
                    {
                        motivos.map((motivo, i)=>(
                            <Grid item xs={3}>
                                <Typography key={i} variant="h7" component="h3" align="left">
                                    {
                                        motivo
                                    }
                                </Typography>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="p" align="justify"> 
                        ¿Otra vez con mi ropa interior oni-chan?
                        Me parece un poco desagradable que te metas a mi habitación solo para robar mis bragas y es repulsivo pensar lo que haces con ellas. No se lo he dicho a nuestros padres por miedo a que te obliguen a irte de casa, después de todo tienes 22 años y es bastante raro que tengas esas intenciones con tu hermanita de 15 años.
                        Encontrar mi ropa interior toda pegajosa debajo de tu cama no es lindo oni-chan, tampoco es lindo que me espies mientras me baño o que guardes toda mi basura en tu habitación, mucho menos que tengas fotografías mías pegadas en revistas eroticas.
                    </Typography> 
                </Grid>

                <FormControl component="fieldset" align="left">
                    <FormLabel component="legend">Acción</FormLabel>
                    <RadioGroup aria-label="Accion">
                        <FormControlLabel value="Pausar" control={<Radio />} label="Pausar publicacion" />
                        <FormControlLabel value="Nada" control={<Radio />} label="No hacer nada" />
                    </RadioGroup>
                </FormControl>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="Agregar mensaje" multiline variant="outlined" size="medium" fullWidth > 
                        
                    </TextField> 
                </Grid>

                <Grid item xs={12}>
                    <Tooltip title="Aceptar reclamo">
                        <Button startIcon={<Like/>}>
                            Aceptar reclamo
                        </Button>
                    </Tooltip>
                    <Tooltip title="Descartar reclamo">
                        <Button color="secondary" startIcon={<Dislike/>}>
                            Descartar reclamo
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>
        </Paper>
    );
  }