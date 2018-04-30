import * as React from 'react';
import { TextField, Button, Paper } from 'material-ui';
import { withStyles, StyledComponentProps } from 'material-ui/styles';

const styles = theme => ({
    form: {
        display: 'flex',
        flexFlow: 'column',
    }
});

interface Props extends StyledComponentProps {
    onSubmit: (projectName: string, description: string) => void
}

interface State {
    projectName: string
    description: string
}

export class ProjectEditForm extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            description: '',
        }
    }

    onChangeProjectname(e) {
        this.setState({
            ...this.state,
            projectName: e.target.value,
        })
    }

    onChangeDescription(e) {
        this.setState({
            ...this.state,
            description: e.target.value,
        })
    }

    render() {
        const {classes} = this.props

        const onSubmit = () => {
            this.props.onSubmit(this.state.projectName, this.state.description)
        }

        return (
            <form className={classes.form} autoComplete="off">
                <TextField
                    id="projectName"
                    label="Project name"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.onChangeProjectname.bind(this)}
                />
                <TextField
                    multiline
                    id="description"
                    label="Description"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.onChangeDescription.bind(this)}
                />
                <Button variant="raised" color="primary" onClick={onSubmit}>
                    Create
                </Button>
            </form>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ProjectEditForm)