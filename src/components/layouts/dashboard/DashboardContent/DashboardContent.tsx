import React, { ReactNode, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Drawer, Grid, Hidden, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

import { DrawerItems } from './DrawerItems';

import { Head } from '@/components';
import { theme } from '@/lib';


const drawerWidth = 240;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    contentBody: {
      marginTop: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
    },
  }),
);

interface Props {
  children: React.ReactNode;
  title: string;
  breadcrumb?: ReactNode;
  actions?: ReactNode;
}

export const DashboardContent: React.FC<Props> = ({ children, title, breadcrumb, actions }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <Head title={title} />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            鉄拳やろうよ.com
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <DrawerItems />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <DrawerItems />
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item>
            <Typography variant="h1">{title}</Typography>
            {breadcrumb && <Grid item>{breadcrumb}</Grid>}
          </Grid>
          {actions && <Grid item>{actions}</Grid>}
        </Grid>
        <div className={classes.contentBody}>{children}</div>
      </main>
    </div>
  );
};
