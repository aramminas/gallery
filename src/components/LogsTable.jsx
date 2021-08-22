import React, {useState, useRef, useEffect, useCallback, Fragment} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {useParams} from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Loader from "react-loader-spinner";
import useFetch from "./general/useFetch";
import {MoreHorizOutlined} from '@material-ui/icons';

import {limitLogs} from "../helpers/constants";

const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LogsTable = ({setImage, setEmpty}) => {
    const { id } = useParams();
    const { addToast } = useToasts();
    const [page, setPage] = useState(0);
    const [loadMore, setLoadMore] = useState(true);
    const {loading, error, logs, finish} = useFetch(limitLogs, page, id, setImage, setEmpty);
    const loader = useRef(null);

    useEffect(_ => {
        if(window.innerHeight < document.getElementById('root').clientHeight) setLoadMore(false);
    },[logs]);

    useEffect(_ => {
        if(!page){
            setPage(0);
        }
        if(error){
            addToast( error, { appearance: 'error' });
        }
    }, [error]);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + limitLogs);
        }
    }, []);

    useEffect(_ => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
    }, [handleObserver]);

    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell align="right">Width</TableCell>
                            <TableCell align="right">Height</TableCell>
                            <TableCell align="center">Coordinate x</TableCell>
                            <TableCell align="center">Coordinate y</TableCell>
                            <TableCell align="right">Percentage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow
                                key={log.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{log.type}</TableCell>
                                <TableCell align="right">{log.width ? `${Math.floor(log.width)} px` : '-'}</TableCell>
                                <TableCell align="right">{log.height ? `${Math.floor(log.height)} px` : '-'}</TableCell>
                                <TableCell align="center">{log.x ? `${Math.floor(log.x)}` : '-'}</TableCell>
                                <TableCell align="center">{log.y ? `${Math.floor(log.y)}` : '-'}</TableCell>
                                <TableCell align="right">{log.percentage ? `${Math.floor(log.percentage)} %` : '-'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            { (loadMore && !finish) &&
                <div className="load-more-logs">
                    <Button variant="contained" color="primary" onClick={ _ => setPage(page + limitLogs)}>
                        Load more &nbsp; <MoreHorizOutlined/>
                    </Button>
                </div>
            }
            <div>
                {loading && <div className="infinity-loader-content"><span>Loading</span> <Loader type="ThreeDots" color="#000" height={25} width={50}/></div>}
                <div ref={loader} />
            </div>
            {finish && <div className="no-data"><Alert severity="warning">No more data!</Alert></div>}
        </Fragment>
    );
}

export default LogsTable;
