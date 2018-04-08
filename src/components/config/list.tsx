import * as React from 'react';
import PropTypes from 'prop-types';
import { Config } from 'modules/config';
//Material-UI
import {withStyles, WithStyles, StyledComponentProps} from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
//Dialog
import EditConfigDialog from 'components/config/dialog/edit';
import DeleteConfigDialog from 'components/config/dialog/delete';

const styles = theme => ({
fab: {
        position: 'absolute' as 'absolute',
        bottom: theme.spacing.unit * 4,
        right: theme.spacing.unit * 4,
    },
});

interface Props extends StyledComponentProps {
    configs: Config[]
    onSubmitCreate: PropTypes.func
    onSubmitDelete: PropTypes.func
    onSubmitUpdate: PropTypes.func
}

interface State {
    menuAnchorEl: HTMLElement
    dialogAnchorEl: HTMLElement
    expandListKey: number
}

class ConfigList extends React.Component<Props, State> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            menuAnchorEl: null,
            dialogAnchorEl: null,
            expandListKey: null,
        };
    }

    handleOpenMenu = (e:any) => {
        this.setState({
            ...this.state,
            menuAnchorEl: e.target,
        });
    }

    handleCloseMenu = () => {
        this.setState({
            ...this.state,
            menuAnchorEl: null
        })
    }

    handleOpenDialog = (e: any) => {
        this.setState({
            ...this.state,
            dialogAnchorEl: e.target,
        });
    }

    handleCloseDialog = () => {
        this.setState({
            ...this.state,
            dialogAnchorEl: null,
        });
    }

    handleExpandList = (expandListKey: number) => {
        this.setState({
            ...this.state,
            expandListKey: !this.state.expandListKey ? expandListKey : (this.state.expandListKey !== expandListKey ? expandListKey : null),
        });
    }

    render() {
        const classes = this.props.classes;

        // Get DialogContent.
        const name = this.state.dialogAnchorEl ? this.state.dialogAnchorEl.getAttribute('name') : '';
        const dialogContent = (
            <div>
                <EditConfigDialog
                    isOpen={name === 'create'}
                    isNew={true}
                    onSubmit={this.props.onSubmitCreate}
                    onClose={this.handleCloseDialog}
                />
                <EditConfigDialog
                    isOpen={name === 'edit'}
                    isNew={false}
                    onSubmit={this.props.onSubmitUpdate}
                    onClose={this.handleCloseDialog}
                />
                <DeleteConfigDialog
                    isOpen={name === 'delete'}
                    onSubmit={this.props.onSubmitDelete}
                    onClose={this.handleCloseDialog}
                />
            </div>
        );

        return (
            <div>
                {this.props.configs.map((config: Config) => {
                    return (
                        <ExpansionPanel
                            expanded={this.state.expandListKey === config.id}
                            onChange={this.handleExpandList.bind(this, config.id)}
                        >
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>{config.name}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>

                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })}
                <Button
                    variant="fab"
                    color="secondary"
                    className={classes.fab}
                    onClick={this.handleOpenDialog}
                    name="create"
                >
                    <AddIcon/>
                </Button>
                {dialogContent}
            </div>
        )
    }
}

export default withStyles(styles)(ConfigList)
