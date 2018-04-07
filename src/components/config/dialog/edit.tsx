import * as React from 'react';
import PropTypes from 'prop-types';
import Constantiate from 'constantiate';

import { Config, SQLConfig, SpreadSheetsConfig } from 'modules/config';

// Material-UI
import {withStyles, StyledComponentProps} from 'material-ui/styles';
import Dialog, {DialogContent, DialogContentText, DialogTitle, DialogActions} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

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
    selectType: number
    inputDSN: string
}

class EditConfigDialog extends React.Component<Props, State> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectType: 0,
            inputDSN: '',
        };
    }

    handleChangeType = (e: any) => {
        this.setState({
            ...this.state,
            selectType: e.target.value,
        });
    }

    handleInputDSN = (el: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            inputDSN: el.currentTarget.value,
        })
    }

    onSubmit = () => {
        switch(this.state.selectType) {
            case Constantiate.CONFIG_TYPE_MYSQL:
                const sqlConfig: SQLConfig = {
                    id: null,
                    name: 'サンプル',
                    configType: Constantiate.CONFIG_TYPE_MYSQL,
                    driverName: 'mysql',
                    dsn: '',
                    databaseName: '',
                    tableName: '',
                }
                this.props.onSubmit(sqlConfig);
                break;
            case Constantiate.CONFIG_TYPE_SPREAD_SHEETS:
                break;
        }
    }

    render() {
        const classes = this.props.classes;

        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {this.props.isNew ? 'Create' : 'Edit'}
                </DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={this.state.selectType}
                            onChange={this.handleChangeType}
                        >
                            {Constantiate.ConfigType.map((configType) => {
                                return (
                                    <MenuItem key={configType.index} value={configType.index}>
                                        {configType.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    {(() => {
                        if (this.state.selectType === 1) {
                            return (
                                <TextField
                                    label="DSN"
                                    className={classes.textField}
                                    onChange={this.handleInputDSN}
                                    fullWidth
                                />
                            );
                        }
                    })()}
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
