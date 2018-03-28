import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import {State} from 'modules/tab';
import {ReduxState, ReduxAction} from 'store';

// Material-UI
import {withStyles} from 'material-ui/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormLabel, FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import ChipInput from 'material-ui-chip-input';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import AddIcon from 'material-ui-icons/Add';
import Divider from 'material-ui/Divider';
import CompareArrows from 'material-ui-icons/CompareArrows';

interface Props {
    values: ReduxState
    actions: ActionDispatcher
    classes: PropTypes.classesContext
    history: PropTypes.historyContext
}

const styles = theme => ({
    contentRoot: {
        padding: '24px',
    },
    formRoot: {
        padding: '24px',
        paddingBottom: '8px',
        display: 'inline-block',
        width: `calc(100% - 48px)`,
    },
    formControl: {
        marginBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: 120,
        maxWidth: `calc(100% - 32px)`,
    },
    formProject: {
        marginBottom: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit * 10,
        minWidth: 120,
    },
    
    // ChipInput
    input: {
        display: 'inline-block',
        width: 0,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
    },
    chip: {
        
    },
    buttonRoot: {
        display: 'inline-block',
        verticalAlign: 'bottom',
        marginLeft: '-16px',
        marginBottom: '4px',
        width: 0,
    },
    plusButton: {
    },

    // Footer
    footerRoot: {
        display: 'flex',
        justifyContent: 'flex-end' as 'flex-end',
    },
    button: {
        margin: theme.spacing.unit,
        marginRight: theme.spacing.unit * 2,
    },
});

export class Diff extends React.Component<Props, {}> {
    state = {
        open: false,
    }

    handleChangeLocation = (uri: string) => {
        this.props.history.push(uri);
    };

    handleChange = () => {
        console.log('test');
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    
    handleOpen = () => {
        this.setState({ open: true });
    };


    render() {
        const classes = this.props.classes;
        const schemas = this.props.values.schema.schemas;

        const names = [
            'Sample',
        ];

        const selectedNames = [
            'Sample',
            'Sample',
            'Sample',
            'Sample',
            'Sample',
            'Sample',
            'Sample',
            'Sample',
            'Sample',
            'Sample',
            'Sample',
        ];

        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };

        return (
            <div className={classes.contentRoot}>
                <Paper>
                    <form className={classes.formRoot} autoComplete="off">
                        <div className={classes.formChild}>
                            
                            <FormControl className={classes.formProject}>
                                <InputLabel shrink={true}>Project</InputLabel>
                                <Select
                                    value={''}
                                    onChange={this.handleChange}
                                    input={<Input name="age" id="age-helper" />}
                                >
                                    <MenuItem value={10}>Project1</MenuItem>
                                    <MenuItem value={20}>Project2</MenuItem>
                                </Select>
                            </FormControl>
                            
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink={true}>Target</InputLabel>
                                <Select
                                    value={''}
                                    onChange={this.handleChange}
                                    input={<Input name="age" id="age-helper" />}
                                >
                                    <MenuItem value={10}>SpreadSheets</MenuItem>
                                    <MenuItem value={20}>SQL</MenuItem>
                                </Select>
                            </FormControl>
                            <CompareArrows />
                            <FormControl className={classes.formControl}>
                                <Select
                                    value={0}
                                    onChange={this.handleChange}
                                    input={<Input name="age" id="age-helper" />}
                                >
                                    <MenuItem value={10}>SpreadSheets</MenuItem>
                                    <MenuItem value={20}>SQL</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.formChild}>
                            <FormControl className={classes.formControl}>
                                <ChipInput
                                    label="Table"
                                    value={selectedNames}
                                    onAdd={this.handleChange}
                                    onDelete={this.handleChange}
                                    classes={classes}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </FormControl>
                            <div className={classes.buttonRoot}>
                                <IconButton className={classes.button} aria-label="Add" color="primary">
                                    <AddIcon />
                                </IconButton>
                            </div>
                        </div>
                    </form>
                    <Divider />
                    <div className={classes.footerRoot}>
                        <Button variant="raised" color="primary" className={classes.button}>
                            Diff
                        </Button>
                    </div>
                </Paper>
            </div>
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
}

export default compose(
    withStyles(styles, { name: 'Content' }),
    connect(
        (state: ReduxState) => ({values: state}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(Diff)
