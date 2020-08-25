import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 300
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: "1 0 auto",
    alignContent: "left",
  },
  cover: {
    width: 250,
    maxWidth: 200,
    maxHeight: 250,
  },
  Ti:{
    maxBlockSize: 2
  }
}));

export default function FilaPublicacion() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image="data:image/png;base64,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"
        title="Live from space album cover"
      />
      <Grid container >
        <Grid item xs={12} justify="flex-start" >
          <Typography align="left" variant="h5" color="textPrimary" component="h5">
            Proveedor de servicios
          </Typography>
        </Grid>

        <Grid item item xs={12} justify="flex-start">
          <CardActionArea>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography align="left" component="h5" variant="h5">
                        Titulo publicacion
                    </Typography>
                    <Typography align="justify" variant="body1" color="textSecondary" nowrap className={classes.Ti}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem eaque culpa corrupti quos iusto optio doloremque dolore odit? Ad aliquid expedita debitis veniam placeat beatae amet obcaecati impedit sit iure?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, dolores. Aut voluptatum velit magni quibusdam tempora, voluptates earum enim, exercitationem dolor itaque sunt molestiae, ducimus blanditiis rem adipisci! Eius, esse?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse consectetur aspernatur iste itaque delectus doloribus earum totam officiis nesciunt? A dolorem iure rerum laborum reiciendis ipsam impedit error quidem temporibus!
                    </Typography>
                </CardContent>
            </div>
          </CardActionArea>
        </Grid>
          
        <Grid item item xs={3} direction="row" justify="space-between" alignItems="flex-start">
        <Typography align="left" component="h6" variant="h6" color="secondary">
          Precio estimado: $400
        </Typography>
        </Grid>  
        <Grid item item xs={3} direction="row" justify="space-between" alignItems="flex-start">
          <Chip clickable variant="outlined" color="primary" label="Servicio"/>
        </Grid>  
        <Grid item item xs={3} direction="row"  alignItems="flex-start">
          <Puntuacion/>
        </Grid>   
        <Grid item item xs={3} direction="row"  alignItems="flex-start">
          <Button variant="outlined" color="secondary">Contactar</Button>
        </Grid>
         
      </Grid>
    </Card>
  );
}




const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

function Puntuacion() {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
    </div>
  );
}

