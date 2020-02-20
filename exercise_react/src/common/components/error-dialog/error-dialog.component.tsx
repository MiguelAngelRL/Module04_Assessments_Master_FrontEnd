import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

interface Props {
    openAlert: boolean;
    handleAlertClose: any;
    alertDialogError:string;
}

export const ErrorDialog = (props:Props) => {
    const {openAlert, handleAlertClose, alertDialogError} = props;
    return (
        <Dialog open={openAlert} onClose={handleAlertClose}>
            <DialogTitle>{"ERROR"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {alertDialogError}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAlertClose} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
    );

}