import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';

const LogsTable = ({logs}) => {

    return (
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
    );
}

export default LogsTable;
