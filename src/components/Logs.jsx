import React, {Fragment, useState} from "react";
import {Container, Paper, Typography} from "@material-ui/core";

/* components */
import LayoutWrapper from "./layout/LayoutWrapper";
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

export default LayoutWrapper(Logs);