import React from "react";
import {Button} from "@material-ui/core";
import {SaveTwoTone} from '@material-ui/icons';

const SaveButton = ({saveData}) => (<Button variant="contained" color="primary" onClick={saveData}><SaveTwoTone/> &nbsp; Save</Button>);

export default SaveButton;
