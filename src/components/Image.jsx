import React , { useState, useEffect } from "react";
import {Button, Container, Paper} from '@material-ui/core';
import {useParams, Link} from 'react-router-dom';
import {useSelector} from "react-redux";

const Image = () => {
    const { id } = useParams();
    const [image, setImage] = useState('');
    const images = useSelector(state => state.images);

    useEffect(() => {
        const data = images.filter(item => item.id === id)[0];
        setImage(data.url);
    }, []);

    return (
        <Container fixed>
            <Paper elevation={3} className="image-content">
                <img src={image} alt="gallery item"/>
                <hr/>
                <Link to={`/`}>
                    <Button variant="contained" color="primary">
                        Home
                    </Button>
                </Link>
            </Paper>
        </Container>
    );
}

export default Image;