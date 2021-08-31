import React , { useState, useEffect } from "react";
import {Button, Container, Paper, ButtonGroup, Grid} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { useToasts } from "react-toast-notifications";

/* actions */
import {getImageById} from "../store/actions/imagesAction";
import {resetAllParameters} from "../store/actions/ongoingParametersAction";

/* components */
import LayoutWrapper from "./layout/LayoutWrapper";
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
    const [refreshInfo, setRefreshInfo] = useState(false);
    const images = useSelector(state => state.images);
    const parameters = useSelector(state => state.parameters);

    useEffect( () => {
        return function () {
            dispatch(resetAllParameters());
        }
    }, []);

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
    }, [images, type, refreshInfo]);

    const toggleInfo = () => {
        setRefreshInfo(!refreshInfo);
    }

    const changeType = (data) => {
        setType(data);
        setImageInfo(null);
    }

    return (
        <Container fixed>
            <Paper elevation={3} className="image-content">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className="image-buttons">
                            <ButtonGroup aria-label="outlined primary button group">
                                <Button color={(type === cropType) ? 'primary' : null} onClick={() => changeType(cropType)}>Crop</Button>
                                <Button color={(type === blurType) ? 'primary' : null} onClick={() => changeType(blurType)}>Blur</Button>
                                <Button color={(type === resizeType) ? 'primary' : null} onClick={() => changeType(resizeType)}>Resize</Button>
                            </ButtonGroup>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className="image-action-block">
                            {{
                                crop: <Crop id={id} image={image} imageInfo={imageInfo} parameters={parameters} toggleInfo={toggleInfo}/>,
                                blur: <Blur id={id} image={image} imageInfo={imageInfo} parameters={parameters} toggleInfo={toggleInfo}/>,
                                resize: <Resize id={id} image={image} imageInfo={imageInfo} parameters={parameters} toggleInfo={toggleInfo}/>,
                            }[type]}
                        </Paper>
                    </Grid>
                    {imageInfo ? <ImageInfo imageInfo={imageInfo} /> : null}
                </Grid>
            </Paper>
        </Container>
    );
}

export default LayoutWrapper(Image);