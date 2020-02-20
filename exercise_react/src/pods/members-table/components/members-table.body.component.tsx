import * as React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {MemberEntity} from 'pods';
import { columns } from 'core';
import { useValidateUrl } from 'common'

interface Props {
  setMemberDetails: any;
  view: {
      members: MemberEntity[], 
      page:number, 
      buttonDisabled:boolean,
      lastOrgFetched:string
  };
  rowsPerPage: number;
}

export const MembersTableBody = (props: Props) => {
  const {members, page} = props.view;
  const rowsPerPage = props.rowsPerPage;
  const setMemberDetails = props.setMemberDetails;
  return(
    <TableBody>
      {members.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(member => {
        return (
          <TableRow style={{cursor: 'pointer'}} hover key={member.id} 
                  onClick={() => setMemberDetails({open:true, member_login:member.login})}>
            {columns.map(column => {
              const value = member[column.id];
              return (
                <TableCell key={column.id} align="center" style={{padding:'1%'}}>
                  {useValidateUrl(value) ? <img src={value} style={{maxWidth: '3rem', borderRadius:'50%'}}/> : value}
                </TableCell>
              );
            })
            }       
          </TableRow>
        );
      })}
    </TableBody>
  );
}