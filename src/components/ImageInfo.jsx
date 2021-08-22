import React, {Fragment}  from "react";
import {Grid, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Typography} from '@material-ui/core';
import {Crop, PhotoSizeSelectLarge, TabUnselected, BlurOn, Flip} from '@material-ui/icons';
import {blue} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import {defaultType, blurType} from "../helpers/constants";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
    },
    bg : {
        backgroundColor: blue['A700'],
    }
}));

const ImageInfo = ({imageInfo}) => {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Paper className="image-history-block">
                <Typography gutterBottom variant="h4">
                    Image Options
                </Typography>
                <List className={classes.root}>
                    {imageInfo.type === defaultType
                        ?
                        <Fragment>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={classes.bg}>
                                        <Crop />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Type" className="info-title" secondary={imageInfo.type} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PhotoSizeSelectLarge />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Width" secondary={`${Math.floor(imageInfo.width)} px`} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PhotoSizeSelectLarge />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Height" secondary={`${Math.floor(imageInfo.height)} px`} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <TabUnselected />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="x Coordinate" secondary={Math.floor(imageInfo.x)} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <TabUnselected />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="y Coordinate" secondary={Math.floor(imageInfo.y)} />
                            </ListItem>
                        </Fragment>
                        :
                        imageInfo.type === blurType
                            ?
                            <Fragment>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.bg}>
                                            <BlurOn />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Type" className="info-title" secondary={imageInfo.type} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Flip />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Percentage" secondary={`${imageInfo.percentage}%`} />
                                </ListItem>
                            </Fragment>
                            :
                            <Fragment>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.bg}>
                                            <BlurOn />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Type" className="info-title" secondary={imageInfo.type} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PhotoSizeSelectLarge />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Width" secondary={`${Math.floor(imageInfo.width)} px`} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PhotoSizeSelectLarge />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Height" secondary={`${Math.floor(imageInfo.height)} px`} />
                                </ListItem>
                            </Fragment>
                    }
                </List>
            </Paper>
        </Grid>
    );
}

export default ImageInfo;