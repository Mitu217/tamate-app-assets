import * as React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import {withStyles, StyledComponentProps} from 'material-ui/styles';
import Dialog, {DialogContent, DialogContentText, DialogTitle, DialogActions} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = theme => ({
    textField: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
});

interface Props extends StyledComponentProps {
    isOpen: boolean
    isNew: boolean
    onSubmit: PropTypes.func
    onClose: PropTypes.func
}

interface State {
    inputName: string
    inputDescription: string
}

class EditConfigDialog extends React.Component<Props, State> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            inputName: '',
            inputDescription: '',
        };
    }

    handleChangeInputName = (el: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            inputName: el.currentTarget.value,
        })
    }

    handleChangeInputDescription = (el: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            inputDescription: el.currentTarget.value,
        })
    }

    onSubmit = () => {
        // Switch Config
        this.props.onSubmit();
    }

    render() {
        const classes = this.props.classes;

        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Delete Project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create project, please enter name and description here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        id="name"
                        label="Peoject Name"
                        className={classes.textField}
                        onChange={this.handleChangeInputName}
                        fullWidth
                    />
                    <TextField
                        id="name"
                        label="Description"
                        className={classes.textField}
                        onChange={this.handleChangeInputDescription}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.onSubmit} color="primary">
                        {this.props.isNew ? 'Create' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(EditConfigDialog)
