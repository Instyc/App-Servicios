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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In aperiam amet quaerat rem quo repellendus vitae ad labore nam facere! Magnam numquam sit recusandae tenetur harum! Animi facilis natus minima!
                        Labore omnis sint quis nisi, porro atque minus consequatur eius sed alias odit explicabo rerum mollitia laboriosam excepturi. Rerum, numquam tenetur! Asperiores sequi magni error quis blanditiis voluptate. Animi, maxime.
                        Veniam facilis eaque hic cum voluptatum doloribus fuga debitis dolore doloremque ut, voluptatem consequatur, accusantium fugit blanditiis laborum autem similique optio quas dolor. Consequuntur soluta officia eius natus facilis reiciendis!
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