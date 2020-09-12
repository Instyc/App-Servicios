import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Estrellas from '../Estrellas.js';
import Like from '@material-ui/icons/ThumbUpAltTwoTone';
import Dislike from '@material-ui/icons/ThumbDownAltTwoTone';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import Estilos from '../Estilos.js';

export default function Opiniones() {
  const classes = Estilos();
  return (
    <div className={classes.mostrarFlex}>
      <Paper elevation={5}>
        <Grid className={classes.padding} container direction="row" justify="flex-start" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h4" component="h2" align="left">
                    Reseñas
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" component="h2" align="center" align="left">
                <Estrellas/> 5.0 en base a 300 reseñas
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Reseña/>
                <Reseña/>
                <Reseña/>
                <Reseña/>
            </Grid>
        </Grid>
      </Paper>
    </div>
  );
}


function Reseña() {
    const classes = Estilos();
    return (
        <Paper variant="outlined" square>
            <Grid className={classes.padding} container direction="row" justify="space-around" alignItems="baseline">
                <Grid item xs={6}>
                    <Typography variant="h5" component="h2" align="left">
                        Titulo de la reseña
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Estrellas/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="p" align="justify"> 
                        ¿Otra vez con mi ropa interior oni-chan?
                        Me parece un poco desagradable que te metas a mi habitación solo para robar mis bragas y es repulsivo pensar lo que haces con ellas. No se lo he dicho a nuestros padres por miedo a que te obliguen a irte de casa, después de todo tienes 22 años y es bastante raro que tengas esas intenciones con tu hermanita de 15 años.
                        Encontrar mi ropa interior toda pegajosa debajo de tu cama no es lindo oni-chan, tampoco es lindo que me espies mientras me baño o que guardes toda mi basura en tu habitación, mucho menos que tengas fotografías mías pegadas en revistas eroticas.
                    </Typography> 
                </Grid>
                <Grid item xs={6}>
                    <Tooltip title="Me sirve">
                        <Button startIcon={<Like/>}>
                            42
                        </Button>
                    </Tooltip>
                    <Tooltip title="No me sirve">
                        <Button color="secondary" startIcon={<Dislike/>}>
                            17
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={6}>
                    17/05/2020 (Hace 5 años)
                </Grid>
            </Grid>
        </Paper>
    );
  }