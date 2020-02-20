import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Dialog from '@material-ui/core/Dialog';
import { MemberDetails, SearchOrganization, MembersTableHead, MembersTableBody } from 'pods';
import { Spinner, ErrorDialog, useStyles } from 'common';

interface Props {}

export const MembersTable = (props: Props) => {
  const [view, setView] = React.useState({members: [], page:0, buttonDisabled:false, lastOrgFetched:""});
  const [classes] = React.useState(useStyles());
  const [rowsPerPageOptions] = React.useState([5, 10, 25, 100]);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertDialogError, setAlertDialogError] = React.useState("");
  const [memberDetails, setMemberDetails] = React.useState({open: false, member_login:""});

  const handleAlertOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleMemberDetailsClose = () => {
    setMemberDetails({open:false, member_login:""});
  };

  const handleChangePage = (event, newPage) => {
    setView({...view, page:newPage});
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setView({...view, page:0});
  };

  return (
      <div className={classes.myStyle}>     
        <Paper className={classes.root}>
          <div style={{textAlign:"center"}}><h2> GITHUB Organizations Members List</h2></div>
          <SearchOrganization view={view} setView={setView}
                              setAlertDialogError={setAlertDialogError}
                              handleAlertOpen={handleAlertOpen}/>
          <TableContainer className={classes.container}>
            <Table stickyHeader>
              <MembersTableHead />
              <MembersTableBody setMemberDetails={setMemberDetails} view={view} rowsPerPage={rowsPerPage}/>
            </Table>
            <Spinner msg="Loading github organization members....."/>
            <Dialog open={memberDetails.open} onClose={handleMemberDetailsClose} scroll={"body"}>
              <MemberDetails member_login={memberDetails.member_login}/>
            </Dialog>
            <TablePagination rowsPerPageOptions={rowsPerPageOptions} component="div"
                              count={view.members.length} rowsPerPage={rowsPerPage}
                              page={view.page} onChangePage={handleChangePage}
                              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
          <ErrorDialog openAlert={openAlert} handleAlertClose={handleAlertClose} 
                        alertDialogError={alertDialogError}
          />
        </Paper>     
      </div>
  );
}
