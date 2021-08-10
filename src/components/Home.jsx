import React, {useState, useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {TextField, Container, Paper, Button} from '@material-ui/core';

/* components */
import LoaderBlock from "./LoaderBlock";
import ImagesTable from "./ImagesTable";
import Modal from "./Modal";

/* actions */
import {addImage, getAllImages} from "../store/actions/imagesAction";
import {toggleLoader} from "../store/actions/loaderAction";
import {changeTotal} from "../store/actions/paginationAction";

const Home = () => {
    const dispatch = useDispatch();
    const [url, setUrl] = useState('');
    const images = useSelector(state => state.images);
    const loader = useSelector(state => state.loader);
    const {total, limit, offset} = useSelector(state => state.pagination);

    useEffect(() => {
        dispatch(getAllImages(limit, offset));
    }, [offset, limit]);

    const handleChange = (e) => {
        setUrl(e.target.value);
    }

    const saveUrl = () => {
        dispatch(addImage(url));
        dispatch(toggleLoader(''));
        setUrl("");
        dispatch(changeTotal(total+1));
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

export default Home;