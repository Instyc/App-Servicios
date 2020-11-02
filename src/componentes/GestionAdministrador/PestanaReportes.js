import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import GestionarReportes from './GestionarReportes.js'

import Nuevo from '@material-ui/icons/Announcement';
import Reloj from '@material-ui/icons/QueryBuilder';
import Check from '@material-ui/icons/AssignmentTurnedIn';

import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 10,
    minHeight:"calc(100vh - 130px)",
  },
}));

export default function PestanaReportes() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [reportes, setreportes] = useState([]);

  const { state, dispatch } = useContext(ObtenerEstadoAplicacion);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    if (state.jwt!=="" || state.publico===true){
        //setcargando(true)
        let auth = 'Bearer '+state.jwt;

        axios.get(state.servidor+"/api/reportes",{
          headers: {'Authorization': auth}})
        .then(response => {
          setreportes(response.data)
          //setcargando(false)
        })
        .catch(error => {
            alert("Un error ha ocurrido al cargar las categorías.")
            console.log(error.response)
        })
    }
  },[state.jwt, state.publico])

  function modificarReporte(report){
    console.log(report)
    setreportes(
      reportes.map((reporte)=>{
        if(report.id===reporte.id){
          return report
        }else{
          return reporte
        }
    }))
  }

  return (
    <div className={classes.root} style={{margin:"10px 0px", padding:"20px"}}>
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
            centered
          >
            <Tab label="Gestionar nuevos reportes" icon={<Nuevo />} {...a11yProps(0)} />
            <Tab label="Reportes en espera" icon={<Reloj />} {...a11yProps(1)} />
            <Tab label="Historial de reportes" icon={<Check />} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <GestionarReportes estadoReporte={0} modificarReporte={modificarReporte} reportes={reportes.filter((reporte)=>(reporte.estado===0))}/>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <GestionarReportes estadoReporte={1} modificarReporte={()=>{}} reportes={reportes.filter((reporte)=>(reporte.estado===1))}/>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <GestionarReportes estadoReporte={2} modificarReporte={()=>{}} reportes={reportes.filter((reporte)=>(reporte.estado>=2))}/>
        </TabPanel>
        </div>
    </div>
  );
}
