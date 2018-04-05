import * as React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import {withStyles} from 'material-ui/styles';
import Dialog, {DialogContent, DialogContentText, DialogTitle, DialogActions} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const styles = theme => ({
    
});

interface Props {
    classes?: PropTypes.classesContext
    open: boolean
    onSubmit: PropTypes.func
    onClose: PropTypes.func
}

const DeleteProjectDialog = (props: Props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Delete Project</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To create project, please enter name and description here.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.onSubmit} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(DeleteProjectDialog)
