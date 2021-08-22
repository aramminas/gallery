import React , { useState, useEffect } from "react";
import {Button, Container, Paper, ButtonGroup, Grid} from '@material-ui/core';
import {useParams, Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { useToasts } from "react-toast-notifications";

/* actions */
import {getImageById} from "../store/actions/imagesAction";

/* components */
import Crop from "./Crop";
import Blur from "./Blur";
import Resize from "./Resize";
import ImageInfo from "./ImageInfo";

/* other */
import api from "../api/api";
import {errorMessage} from "../helpers/helpers";
import {defaultImage, defaultType, blurType, cropType, resizeType} from "../helpers/constants";

const Image = () => {
    const { addToast } = useToasts();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [image, setImage] = useState(defaultImage);
    const [type, setType] = useState(defaultType);
    const [imageInfo, setImageInfo] = useState(null);
    const images = useSelector(state => state.images);

    useEffect(async () => {
        const data = images.filter(item => item.id === id)[0];
        if(data){
            setImage(data.url);
        }else {
            dispatch(getImageById(id)).then(data => errorMessage(data, addToast));
        }
        const response = await api.getLastImageInfoById(id, type);
        if(response.data && response.data.data){
            setImageInfo(response.data.data)
        }else if(response.error){
            addToast( response.error, { appearance: 'error' });
        }
    }, [images, type]);

    const changeType = (data) => {
        setType(data);
        setImageInfo(null);
    }

    return (
        <Container fixed>
            <Paper elevation={3} className="image-content">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Link to={`/`}>
                            <Button variant="contained" color="primary">
                                Home
                            </Button>
                        </Link>
                        <hr/>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="image-buttons">
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button onClick={() => changeType(cropType)}>Crop</Button>
                                <Button onClick={() => changeType(blurType)}>Blur</Button>
                                <Button onClick={() => changeType(resizeType)}>Resize</Button>
                            </ButtonGroup>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={image} alt="gallery item"/>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className="image-action-block">
                            {{
                                crop: <Crop id={id} image={image} imageInfo={imageInfo}/>,
                                blur: <Blur id={id} image={image} imageInfo={imageInfo}/>,
                                resize: <Resize id={id} image={image} imageInfo={imageInfo}/>,
                            }[type]}
                        </Paper>
                    </Grid>
                    {imageInfo ? <ImageInfo imageInfo={imageInfo} /> : null}
                </Grid>
            </Paper>
        </Container>
    );
}

export default Image;