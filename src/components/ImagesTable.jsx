import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
Button } from '@material-ui/core';

/* actions */
import {toggleModal} from "../store/actions/modalAction";
import {changeLimit, changeOffset} from "../store/actions/paginationAction";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function ImagesTable() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const {total, limit} = useSelector(state => state.pagination);
    const rows = useSelector(state => state.images);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(changeOffset(newPage*limit));
    };

    const handleChangeRowsPerPage = (event) => {
        const val = +event.target.value;
        setRowsPerPage(val);
        setPage(0);
        dispatch(changeLimit(val));
    };

    const openModal = (id) => {
        dispatch(toggleModal(id));
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="right">Option</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Link to={`/log/${row.id}`}>
                                            <img src={row.url} alt={row.url} className="table-icons"/>
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="secondary" onClick={() => openModal(row.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={total}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10]}
            />
        </Paper>
    );
}