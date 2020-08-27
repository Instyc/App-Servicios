import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import PhoneIcon from '@material-ui/icons/Phone';
import Button from '@material-ui/core/Button';


import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'scroll',
    position: 'sticky',
    top: 10,
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
    marginBottom: 9,
  },
  imagenPerfil: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  lista: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  itemLista: {
    paddingLeft: theme.spacing(4),
  },
  grid: {
    padding: 20,
  },
}));

export default function PublicacionInfo() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={5}>
        <Grid className={classes.grid} container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={12}>
              <div align="center">
                <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR7Mt8wp9lo-dd73xpvjzPMcspQ8uwAThLitQ&usqp=CAU" className={classes.imagenPerfil} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h3">
                Andres Manuel Lopez Obrador
              </Typography>
           </Grid>
           <Grid item xs={12}>
           <Divider/> 
              <Typography variant="body1" component="p" align="justify"> 
                ¿Otra vez con mi ropa interior oni-chan?
                Me parece un poco desagradable que te metas a mi habitación solo para robar mis bragas y es repulsivo pensar lo que haces con ellas. No se lo he dicho a nuestros padres por miedo a que te obliguen a irte de casa, después de todo tienes 22 años y es bastante raro que tengas esas intenciones con tu hermanita de 15 años.
                Encontrar mi ropa interior toda pegajosa debajo de tu cama no es lindo oni-chan, tampoco es lindo que me espies mientras me baño o que guardes toda mi basura en tu habitación, mucho menos que tengas fotografías mías pegadas en revistas eroticas.
                Me das miedo oni-chan, yo te quiero mucho pero me das demasiado miedo... El otro día te metiste a mi cama en la madrugada y olfateaste mi cabello, besaste en mi cuello, acariciaste mis piernas y no parabas de repetirme al oído lo hermosa que era, todo mientras dormía; las cartas de amor que he encontrado debajo de mi almohada se que son tuyas, los chocolates, el dinero...
                Se que deseas mi cuerpo pero no recuerda que somos familia baka, así que lo nuestro no puede ser... No te hagas falsas esperanzas conmigo, lo que tu necesitas es conseguir una novia y olvidarte de mi, soy tu hermana y nada más.
                Me dueles oni-chan, me das un poco de lástima.
              </Typography>
           </Grid>   
           <Grid item xs={12}>
                <Divider/> 
                <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Servicios ofrecidos
                    </ListSubheader>
                }
                className={classes.lista}
                >
                    <Divider/> 
                    <Categorias nombre="Categoria 1" />   
                    <Divider/> 
                    <Categorias nombre="Categoria 2" /> 
                    <Divider/> 
                </List>         
           </Grid>
           <Grid item xs={12}>
               Ubicacion
           </Grid>
           <Grid item xs={12}>
              <Button startIcon={<PhoneIcon/>}>
                  +54 9 3735 448855
              </Button>
           </Grid>
        </Grid>
      </Paper>

    </div>
  );
}



function Categorias({nombre}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div>
            
            <ListItem button onClick={handleClick}>
                <ListItemText primary={nombre} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Divider/>
                    <Typography variant="h6" component="h5" align="left">Servicio 1</Typography>
                    <Typography variant="h6" component="h5" align="left">Servicio 2</Typography>
                    <Typography variant="h6" component="h5" align="left">Servicio 3</Typography>
                    <Typography variant="h6" component="h5" align="left">Servicio 4</Typography>
                    <Divider/>
                </List>
            </Collapse>
            
        </div>
    )
}
