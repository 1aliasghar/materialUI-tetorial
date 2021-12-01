import { ClassNames } from '@emotion/react'
import { makeStyles } from '@material-ui/core'
import React from 'react'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material'
import { useHistory, useLocation } from 'react-router'
import { AppBar } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
import { typography } from '@mui/system'
import format from 'date-fns/format'
import { Avatar } from '@material-ui/core'


const drawerWidth = 240

const useStyle = makeStyles ((theme) => {
    return {
        page: {
            background: "#f9f9f9",
            width: "100%",
            padding: theme.spacing(3)
        },
        drawer:{
            width: drawerWidth
        },
        drawerPaper:{
            width: drawerWidth
        },
        root: {
            display: "flex"
        },
        active: {
            background: "#f4f4f4"
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }

    }
})

export default function Layout({children}) {
    const classes = useStyle()
    const history = useHistory()
    const location = useLocation()

    const menuItems = [
        {
            text: "My Notes",
            icon: <SubjectOutlined color="secondary" />,
            path: "/"
        },
        {
            text: "Create Note",
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: "/create"
        }
    ]

  return (
    <div className={classes.root}>
    {/* app bar  */}

    <AppBar
        className={classes.appbar}
        elevation={0}
    >
        <Toolbar>
            <Typography className={classes.date}>
               Today is {format(new Date(), 'do MMMM Y')}
            </Typography>
            <Typography>
                Shelby
            </Typography>
            <Avatar src="/peaky.jpg" className={classes.avatar}/>
        </Toolbar>
    </AppBar>
    
    {/* side drawer */}
        <Drawer 
           className={classes.drawer}
           variant="permanent"
           anchor="left"
           classes={{ paper: classes.drawerPaper}}
        >
            <div>
                <Typography variant="h5" className={classes.title}>
                   ➕ NotePad
                </Typography>
            </div>

            {/* list /links */}
            <List>
                {menuItems.map(item => (
                    <ListItem
                    button
                    key={item.text}
                    onClick={() => history.push(item.path)}
                    className={location.pathname == item.path ? classes.active : null}
                    >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>

        </Drawer>

        <div className={classes.page}>
        <div className={classes.toolbar}></div>
             {children}

        </div>
    </div>
  )
}
