import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Verificado from '@material-ui/icons/CheckCircleOutline';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width:100,
    height:100,
    padding:0,
    margin:"auto",
    paddingTop:20
  },
});

export default function BotonCategoria({nombre, imagen}) {
  const classes = useStyles();
  
  return (
    <IconButton className={classes.root}>
      <Typography variant="h2" justify="center" align="center">
        <Verificado color="secondary" fontSize="inherit"/>
      </Typography>
    </IconButton>
  );
}