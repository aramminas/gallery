import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
Button } from '@material-ui/core';

/* actions */
import {toggle_modal} from "../store/actions/modalAction";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function ImagesTable(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = props.images;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const openModal = (id) => {
        dispatch(toggle_modal(id));
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}