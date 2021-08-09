import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from '@material-ui/core';

/* actions */
import {toggle_modal} from "../store/actions/modalAction";
import {remove_image} from "../store/actions/imagesAction";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal() {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal);

    const handleClose = () => {
        dispatch(toggle_modal(''));
    };

    const handleDelete = () => {
        dispatch(remove_image(modal.id));
        dispatch(toggle_modal(''));
    };

    return (
        <div>
            <Dialog
                open={modal.state}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Delete image"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this image?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}