import React , { useState, useEffect } from "react";
import {Button, Container, Paper, ButtonGroup, Grid} from '@material-ui/core';
import {useParams, Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getImageById} from "../store/actions/imagesAction";
import Crop from "./Crop";
import Blur from "./Blur";
import ImageInfo from "./ImageInfo";
import api from "../api/api";

const Image = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [image, setImage] = useState('');
    const [type, setType] = useState('crop');
    const [imageInfo, setImageInfo] = useState(null);
    const images = useSelector(state => state.images);

    useEffect(async () => {
        const data = images.filter(item => item.id === id)[0];
        if(data){
            setImage(data.url);
        }else {
            dispatch(getImageById(id));
        }
        const response = await api.getLastImageInfoById(id, type);
        if(response.data && response.data.data){
            setImageInfo(response.data.data)
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
                        <div className="image-buttons">
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button onClick={() => changeType('crop')}>Crop</Button>
                                <Button onClick={() => changeType('blur')}>Blur</Button>
                            </ButtonGroup>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={image} alt="gallery item"/>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className="image-action-block">
                            {type === "crop" ?
                                <Crop id={id} image={image} imageInfo={imageInfo}/>
                                :
                                <Blur id={id} image={image} imageInfo={imageInfo}/>
                            }
                        </Paper>
                    </Grid>
                    {imageInfo ? <ImageInfo imageInfo={imageInfo} /> : null}
                    <Grid item xs={12}>
                        <hr/>
                        <Link to={`/`}>
                            <Button variant="contained" color="primary">
                                Home
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Image;