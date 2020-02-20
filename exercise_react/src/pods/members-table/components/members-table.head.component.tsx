import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { columns } from 'core';

export const MembersTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                {columns.map(column => (
                    <TableCell key={column.id} align="center" style={{width: column.width}}>
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

