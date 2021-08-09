import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {TextField, Container, Paper, Button} from '@material-ui/core';

/* components */
import LoaderBlock from "./LoaderBlock";
import ImagesTable from "./ImagesTable";
import Modal from "./Modal";

/* actions */
import {add_image, add_all_images} from "../store/actions/imagesAction";
import {toggle_loader} from "../store/actions/loaderAction";

const Home = () => {
    const dispatch = useDispatch();
    const [url, setUrl] = useState('');
    const images = useSelector(state => state.images);
    const loader = useSelector(state => state.loader);

    useEffect(() => {
        dispatch(add_all_images());
    }, []);

    const handleChange = (e) => {
        setUrl(e.target.value);
    }

    const saveUrl = () => {
        dispatch(add_image(url));
        dispatch(toggle_loader(''));
        setUrl("");
    }

    return (
        <>
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
                           <ImagesTable images={images} />
                        </Paper>
                        : null
                }
                <Modal />
                { loader.state && <LoaderBlock/> }
            </Container>
        </>
    );
}

export default Home;