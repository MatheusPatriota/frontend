import React from 'react';
import Helmet from 'react-helmet';
import clsx from 'clsx';
import { Avatar, Paper, Grid, Card, CardActions, CardContent,
  Button, Hidden, Box, Link, Typography, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import WebIcon from '@material-ui/icons/Web';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Link as RouterLink } from 'found';
import { Width } from '../ui';
import _ from 'lodash';
import PageTitle from '../lib/PageTitle.js';
import EdibilityBadge from './EdibilityBadge.js'
import RankDisplay from './RankDisplay.js'
import RevisionBox from '../revisions/RevisionBox.js'
import NotFound from '../pages/NotFound.js'
import ImgDefault from './PlantImgDefault.js';
import { TabsRoute, TabRoute } from '../lib/Tabs.js';
import ImageThumbnail from '../lib/ImageThumbnail.js';
import { hasPerm } from '../lib/perms.js';
import  WishItem from './buttons/WishItem.js';

function Plant(props) {
  const {classes, plant, children} = props
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  if (!plant) {
    return <NotFound />
  }

  const baseUrl = `/${plant.slug}-p${plant.idInt}`;
  const mainImage = _.get(plant, 'mainImage.edges[0].node');

  const commonName = _.get(plant, 'commonName.name');

  let pageTitle = plant.title;
  if (commonName) {
    pageTitle = `${pageTitle} (${commonName})`
  }

  return <Width>
    <Helmet
      title={pageTitle}
    />
    {commonName ?
      <PageTitle className={classes.pageTitle}>{commonName} <small className={classes.binomialTitle}>{plant.title}</small></PageTitle>
    : <PageTitle className={classes.pageTitle}>{plant.title}</PageTitle>}
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Paper className={classes.root}>
          <div>
            {mainImage ? <ImageThumbnail
              alt={plant.title}
              image={mainImage}
              src={mainImage.smallImage.url}
              className={classes.mainImage}
            /> : <ImgDefault alt={plant.title} className={classes.mainImage} />}
          </div>
          <EdibilityBadge plant={plant} />
            <Hidden smUp>
              <Button variant="contained" color="primary" className={classes.sidebarBtn} fullWidth={true}>
                <PlaylistAddIcon className={classes.leftIcon} />
                Adicionar à lista
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.sidebarBtn}
                fullWidth={true}
                onClick={handleClickOpen}>
                <AddIcon className={classes.leftIcon} />
                Tenho semente
              </Button>
            </Hidden>
        </Paper>
        <Paper className={classes.marginBottom}>
          <RankDisplay plant={plant} />
        </Paper>
        <Paper className={classes.root}>
          <RevisionBox document={plant.document}>
            {hasPerm(plant, 'edit') && <Link to={`${baseUrl}/editar`} component={RouterLink}>editar</Link>}
          </RevisionBox>   
        </Paper>
      </Grid>  
      <Grid item xs={12} md={9}>
        <Paper>
          <div className={classes.plantActionBar}>
            <Button variant="contained"
              color="primary"
              size="small"
              className={clsx(classes.plantActionBtn, classes.haveBtn)}>
              <CheckIcon className={classes.leftIcon} />
              Tenho
            </Button>
            <WishItem plant={plant} />
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={clsx(classes.plantActionBtn, classes.createAdBtn)}
              onClick={handleClickOpen}>
              <WebIcon className={classes.leftIcon} />
              Criar anúncio
            </Button>
          </div>   
        </Paper>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Card>
              <CardContent className={classes.haveListContent}>
                <Typography variant="h6">
                  Tem
                </Typography>
                <div className={classes.inlineAvatarList}>
                  <Avatar>A</Avatar>
                  <Avatar>C</Avatar>
                  <Avatar>G</Avatar>
                  <Avatar>M</Avatar>
                </div>
              </CardContent>
              <CardActions className={classes.haveListAction}>
                <Button size="small" to={`${baseUrl}/listas/quero-ter`} component={RouterLink}>ver mais</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={6}>
            <Card>
              <CardContent className={classes.haveListContent}>
                <div className={classes.inlineAvatarList}>
                  <Avatar>A</Avatar>
                  <Avatar>C</Avatar>
                  <Avatar>G</Avatar>
                  <Avatar>M</Avatar>
                  <Avatar>Z</Avatar>
                  <Avatar>M</Avatar>
                </div>               
              </CardContent>
              <CardActions className={classes.haveListAction}>
                <Typography variant="body2" component="p" color="textSecondary">
                  234 pessoas tem essa planta. <Button size="small" to={`${baseUrl}/listas/quero-ter`} component={RouterLink}>ver mais</Button>
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <Paper className={classes.marginBottom}>
          <TabsRoute
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabs}
          >
            <TabRoute label="Descrição" wrapped value={baseUrl} />
            <TabRoute label="Mapa" wrapped value={`${baseUrl}/mapa`} />
            <TabRoute label="Fotos" wrapped value={`${baseUrl}/fotos`} />
            {/*<TabRoute label="Usos" wrapped />
            <TabRoute label="Listas" wrapped />
            <TabRoute label="Trocas e Vendas" wrapped />*/}
          </TabsRoute>
          <Typography
            component="div"
            role="tabpanel"
          >
            <Box p={3}>{children}</Box>
          </Typography>
        </Paper>
      </Grid>  
    </Grid>  
  </Width>
}

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  pageTitle: {
    textTransform: 'capitalize',
  },
  binomialTitle: {
    color: '#797979',
  },
  mainImage: {
    width: '100%',
  },
  tabs: {
    padding: theme.spacing(1),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  plantActionBar: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  plantActionBtn: {
    margin: theme.spacing(1,0,1,1),
  },
  haveBtn: {
    color: '#FFF',
  },
  createAdBtn: {
    color: '#FFF',
  },
  sidebarBtn: {
    marginBottom: theme.spacing(1),
    textAlign: "left",
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  dialog: {
    overflow: 'hidden !important',
  },
  dialogContent: {
    padding: theme.spacing(1,3,3,3)
  },
  inlineAvatarList:{
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  haveListContent: {
    padding: theme.spacing(1),
  },
  haveListAction: {
    textAlign: 'right',
    fontSize: '12px'
  }
})

export default withStyles(styles)(Plant)
