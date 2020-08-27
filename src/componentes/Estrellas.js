import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

const useStyle = makeStyles((theme) => ({
root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
    marginTop: theme.spacing(1),
    },
},
}));

export default function Puntuacion() {
    const classes = useStyle();

    return (
        <div className={classes.root}>
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
        </div>
    );
}