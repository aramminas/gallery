import React, {Fragment, useState} from "react";
import {Link} from 'react-router-dom';
import {Button, Container, Paper, Typography} from "@material-ui/core";

/* components */
import LogsTable from "./LogsTable";
import Card from "./Card";

const Logs = () => {
    const [empty, setEmpty] = useState(false);
    const [image, setImage] = useState({});

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
                    { !empty
                        ?
                        <LogsTable setImage={setImage} setEmpty={setEmpty}/>
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