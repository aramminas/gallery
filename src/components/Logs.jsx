import React, {Fragment, useEffect, useState} from "react";
import {useParams, Link} from 'react-router-dom';
import {Button, Container, Paper, Typography} from "@material-ui/core";
import api from "../api/api";

/* components */
import LogsTable from "./LogsTable";
import Card from "./Card";

const Logs = () => {
    const { id } = useParams();
    const [logs, setLogs] = useState([]);
    const [image, setImage] = useState({});

    useEffect( async _ => {
        if(Object.keys(image).length === 0){
            const result = await api.getImageLogsById(id);
            if(result.status){
                setLogs(result.logs);
            }
            if(result.image){
                setImage(result.image);
            }
        }
    }, []);

    return (
        <Fragment>
            <Container fixed>
                <Paper elevation={3} className="home-content">
                    <Typography variant="h5" gutterBottom component="div" className="logs-title">
                        <span>List of image changes</span>
                        <Link to={`/`}>
                            <Button variant="contained" color="primary">
                                Home
                            </Button>
                        </Link>
                    </Typography>
                    <hr/>
                    { Object.keys(image).length > 0
                        ?
                        <Card image={image} />
                        : null
                    }
                    <hr/>
                    {logs.length > 0
                        ?
                        <LogsTable logs={logs} />
                        :
                        <Typography variant="h6" gutterBottom component="div">
                            List of logs is empty.
                        </Typography>
                    }
                </Paper>
            </Container>
        </Fragment>
    );
}

export default Logs;