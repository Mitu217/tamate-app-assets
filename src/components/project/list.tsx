import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Project} from 'modules/project';
import {withStyles, WithStyles} from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Dialog, {DialogContent, DialogContentText, DialogTitle, DialogActions} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import * as ReactDOM from 'react-dom';
import { Input } from 'material-ui';

const styles = theme => ({
    card: {
        padding: '16px 8px !important'
    },
    cardInner: {
        margin: 4,
    },
    media: {
        height: 180,
    },
    gridList: {
        padding: '16px',
        height: `calc(100vh - 64px - 32px)`,
        width: `calc(100% - 16px)`,
        overflowY: 'scroll' as 'scroll',
    },
    fab: {
        position: 'absolute' as 'absolute',
        bottom: theme.spacing.unit * 4,
        right: theme.spacing.unit * 4,
    },
    textField: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    }
});

interface Props {
    projects: Array<Project>
    onClickItem: PropTypes.func
    onSubmit: PropTypes.func
    classes?: PropTypes.classesContext
}

interface State {
    openDialog: boolean

    // for TextField
    inputName: string
    inputDescription: string
}

class ProjectList extends React.Component<Props, State> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            openDialog: false,
            inputName: '',
            inputDescription: '',
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.state.openDialog) {
            this.handleCloseDialog();
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    handleOpenDialog() {
        this.setState({
            ...this.state,
            openDialog: true,
        });
    }

    handleCloseDialog() {
        this.setState({
            ...this.state,
            openDialog: false,
        });
    }

    handleChangeInputName(el: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            inputName: el.currentTarget.value,
        })
    }

    handleChangeInputDescription(el: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            inputDescription: el.currentTarget.value,
        })
    }

    handleSubmit() {
        this.props.onSubmit(this.state.inputName, this.state.inputDescription)
    }

    render() {
        const props = this.props;
        const classes = props.classes
        const projects = props.projects

        return (
            <div>
                <GridList cols={3} cellHeight={'auto'} className={classes.gridList} spacing={0}>
                    {projects.map(project => (
                        <GridListTile className={classes.card} key={project.id} onClick={props.onClickItem.bind(this, '/projects/' + project.id)}>
                            <Card className={classes.cardInner}>
                                <CardMedia
                                    className={classes.media}
                                    image="http://localhost:3000/assets/project.png"
                                />
                                <CardContent>
                                    <Typography variant='headline' component='h2'>
                                        {project.name}
                                    </Typography>
                                    <Typography component='p'>
                                        {project.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                            </CardActions>
                        </Card>
                    </GridListTile>
                    ))}
                </GridList>

                <Button variant="fab" className={classes.fab} color="secondary" onClick={this.handleOpenDialog.bind(this)}>
                    <AddIcon />
                </Button>

                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleCloseDialog.bind(this)}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">New Project</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create project, please enter name and description here.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            id="name"
                            label="Peoject Name"
                            className={classes.textField}
                            onChange={this.handleChangeInputName.bind(this)}
                            fullWidth
                        />
                        <TextField
                            id="name"
                            label="Description"
                            className={classes.textField}
                            onChange={this.handleChangeInputDescription.bind(this)}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog.bind(this)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit.bind(this)} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(ProjectList)
