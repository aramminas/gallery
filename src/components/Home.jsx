import React, {useState, useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {TextField, Container, Paper, Button} from '@material-ui/core';
import { useToasts } from "react-toast-notifications";
import {errorMessage} from "../helpers/helpers";

/* components */
import LayoutWrapper from "./layout/LayoutWrapper";
import LoaderBlock from "./LoaderBlock";
import ImagesTable from "./ImagesTable";
import Modal from "./Modal";

/* actions */
import {addImage, getAllImages} from "../store/actions/imagesAction";
import {toggleLoader} from "../store/actions/loaderAction";

const Home = () => {
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const [url, setUrl] = useState('');
    const images = useSelector(state => state.images);
    const loader = useSelector(state => state.loader);
    const {limit, offset} = useSelector(state => state.pagination);

    useEffect(() => {
        dispatch(getAllImages(limit, offset)).then(data => errorMessage(data, addToast));
    }, [offset, limit]);

    const handleChange = (e) => {
        setUrl(e.target.value);
    }

    const saveUrl = () => {
        dispatch(addImage(url)).then(data => errorMessage(data, addToast));
        dispatch(toggleLoader(''));
        setUrl("");
    }

    return (
        <Fragment>
            <Container fixed>
                <Paper elevation={3} className="home-content">
                    <form className="image-form" noValidate autoComplete="off">
                        <TextField onChange={(e) => handleChange(e)}
                            id="url" label="URL" variant="outlined" value={url} />
                        <Button type="button" className="save-image" variant="contained" color="primary" onClick={saveUrl}>
                            Save
                        </Button>
                    </form>
                </Paper>
                {
                   images.length > 0 ?
                        <Paper elevation={3} className="home-content">
                           <ImagesTable />
                        </Paper>
                        : null
                }
                <Modal />
                { loader.state && <LoaderBlock/> }
            </Container>
        </Fragment>
    );
}

export default LayoutWrapper(Home);