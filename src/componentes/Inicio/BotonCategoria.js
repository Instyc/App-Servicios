import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140,
    margin: "auto"
  },
});

export default function BotonCategoria({nombre, imagen}) {
  const classes = useStyles();
  let url = "/static/images/cards/"+imagen;
  
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={url}
          title={nombre}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {nombre}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}