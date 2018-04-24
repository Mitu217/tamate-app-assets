import * as React from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import { ReduxState, ReduxAction } from 'store';
import { withStyles, StyledComponentProps } from 'material-ui/styles';

import {
    Paper,
    TextField,
    Button,
} from 'material-ui';
import {
    Add,
} from 'material-ui-icons';
import { Column } from 'modules/schema';

const styles = (theme: any) => ({
    root: {
        maxWidth: '650px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    container: {
        padding: theme.spacing.unit * 2,
        display: 'flex',
        flexFlow: 'column',
    },
    submit: {
        marginLeft: 'auto',
    }
});

const defaultJson = JSON.stringify({
    name: 'ClassData',
    primaryKey: 'id',
    columns: [
        {
            name: 'id',
            type: 'bigint',
            notNull: true,
            autoIncrement: true,
        },
        {
            name: 'name',
            type: 'varchar(256)',
            notNull: true,
            autoIncrement: false,
        },
        {
            name: 'age',
            type: 'int',
            notNull: true,
            autoIncrement: false,
        },
    ],
});

interface Props extends StyledComponentProps {
    onSubmit: PropTypes.func
}

interface State {
    name: string
    primaryKey: string
    columns: Array<Column>
}

export class SchemaForm extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            primaryKey: '',
            columns: [],
        };
    }

    onChangeJson(e) {
        const schema = JSON.parse(e.target.value !== '' ? e.target.value : '{}');
        this.setState({
            name: schema.name,
            primaryKey: schema.primaryKey,
            columns: schema.columns,
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root} elevation={4}>
                <form className={classes.container} noValidate autoComplete="off" >
                    <TextField
                        id="schema-json"
                        label="json"
                        multiline
                        rowsMax="20"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.onChangeJson.bind(this)}
                    />
                    <Button variant="raised" color="primary" className={classes.submit} onClick={this.props.onSubmit.bind(this, this.state.name, this.state.primaryKey, this.state.columns)}>
                        Create
                    </Button>
                </form>
                <p>Memo:</p>
                <p>{defaultJson}</p>
            </Paper>
        );
    }
}

export default withStyles(styles, { withTheme: true })(SchemaForm)