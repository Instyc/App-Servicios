import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import GestionarReportes from './GestionarReportes.js'
import ReportesAtendidos from './ReportesAtendidos.js'

import Estilos from '../Estilos.js'
import Nuevo from '@material-ui/icons/Announcement';
import Reloj from '@material-ui/icons/QueryBuilder';
import Check from '@material-ui/icons/AssignmentTurnedIn';

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
          <Typography>{children}</Typography>
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

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
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
        <GestionarReportes/>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <ReportesAtendidos/>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <ReportesAtendidos/>
      </TabPanel>
    </div>
  );
}