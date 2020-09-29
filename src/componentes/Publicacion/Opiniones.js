import React,{useState, useEffect} from 'react';
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

    const [opiniones, setOpiniones] = useState({
        promedio: 4.5,
        cantidad: 250,
        resena:[
            {
                titulo:"Reseña 1",
                fecha:"05/10/2020",
                estrella: 3.5,
                descripcion:"Me sirvio pero no estoy tan conforme",
                likes: 20,
                dislikes: 23
            },
            {
                titulo:"Reseña 2",
                fecha:"5/6",
                estrella: 4.3,
                descripcion:"Muy feo todo",
                likes: 2,
                dislikes: 4
            }
        ]
    });

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
                <Estrellas valor={opiniones.promedio}/> {`${opiniones.promedio} en base a ${opiniones.cantidad} reseñas`}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {
                    opiniones.resena.map((opinion, i)=>(
                        <Resena opinion={opinion} key={i}/>
                    ))
                }
            </Grid>
        </Grid>
      </Paper>
    </div>
  );
}


function Resena({opinion}) {
    const classes = Estilos();
    return (
        <Paper variant="outlined" square>
            <Grid className={classes.padding} container direction="row" justify="space-around" alignItems="baseline">
                <Grid item xs={6}>
                    <Typography variant="h5" component="h2" align="left">
                        {opinion.titulo}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Estrellas valor={opinion.estrella}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="p" align="justify"> 
                        {opinion.descripcion}
                    </Typography> 
                </Grid>
                <Grid item xs={6}>
                    <Tooltip title="Me sirve">
                        <Button startIcon={<Like/>}>
                            {opinion.likes}
                        </Button>
                    </Tooltip>
                    <Tooltip title="No me sirve">
                        <Button color="secondary" startIcon={<Dislike/>}>
                            {opinion.dislikes}
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={6}>
                    {opinion.fecha} (Hace 5 años //hacer calculo)
                </Grid>
            </Grid>
        </Paper>
    );
  }