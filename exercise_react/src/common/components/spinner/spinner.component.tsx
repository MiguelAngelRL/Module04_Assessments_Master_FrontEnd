import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./spinner.css";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export const Spinner = props => {
  const { promiseInProgress } = usePromiseTracker({ area: props.area, delay: 0 });

  return (
    promiseInProgress && (
        <Dialog open={true} fullWidth={true} maxWidth={'sm'}>
          <DialogTitle>{props.msg ? props.msg : "LOADING...."}</DialogTitle>
          <DialogContent>
            <div className="spinner">
              <Loader type="Circles" color="#2BAD60" height={180} width={180} />
            </div>
          </DialogContent>
        </Dialog>
    )
  );
};