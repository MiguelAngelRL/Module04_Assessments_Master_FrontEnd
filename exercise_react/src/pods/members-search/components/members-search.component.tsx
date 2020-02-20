import * as React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {MemberEntity, allMembersAPI} from 'pods';

interface Props {
    view: {
        members: MemberEntity[], 
        page:number, 
        buttonDisabled:boolean,
        lastOrgFetched:string
    };
    setView: any;
    setAlertDialogError: any;
    handleAlertOpen: any;
}

export const SearchOrganization = (props: Props) => {
    const {view, setView, setAlertDialogError, handleAlertOpen} = props;
    const handleOnClick = () => {
        allMembersAPI.loadAllMembers(view, setView, setAlertDialogError, handleAlertOpen);
    }

    return (
        <>
            <TextField id="organization" label="Organization name" placeholder="Enter an organization name"
                        style={{margin: 8, width: '95%'}} margin="normal" 
                        InputLabelProps={{shrink: true}} variant="outlined"/>
            <Button onClick={handleOnClick} startIcon={<CloudDownloadIcon />} size="small" 
                    variant="outlined" style={{margin: 8, width: '95%'}}
                    color="secondary"  disabled={props.view?props.view.buttonDisabled:false}>
                  LOAD
            </Button>
        </>
    )
}