import * as React from 'react';
import { TextField, Button, Select, Input, MenuItem, FormControl, InputLabel } from 'material-ui';
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { Config } from 'modules/datasource';

const styles = theme => ({
    form: {
        display: 'flex',
        flexFlow: 'column',
    }
});

interface Props extends StyledComponentProps {
    onSubmit: (datasourceName: string, type: string, config: Config) => void
}

interface State {
    datasourceName: string
    type: number,

    // SQL
    driver: number,
    dsn: string,
}

export class DatasourceEditForm extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            datasourceName: '',
            type: 0,

            // SQL
            driver: 0,
            dsn: '',
        }
    }

    onChangeDatasourceName(e) {
        this.setState({
            ...this.state,
            datasourceName: e.target.value,
        })
    }

    onChangeType(e) {
        this.setState({
            ...this.state,
            type: e.target.value,
        })
    }

    onChangeDriver(e) {
        this.setState({
            ...this.state,
            driver: e.target.value,
        })
    }

    onChangeDSN(e) {
        this.setState({
            ...this.state,
            dsn: e.target.value,
        })
    }

    render() {
        const {classes} = this.props

        const onSubmit = () => {
            var type = "";
            var config = {};
            if (this.state.type === 10) {
                type = "SQLTable";
                if (this.state.driver === 10) {
                    config = {
                        driverName: "mysql",
                        dsn: this.state.dsn,
                    }
                }
            }
            if (this.state.type === 20) {
                type = "SpreadsheetTable";
            }
            this.props.onSubmit(this.state.datasourceName, type, config)
        }

        return (
            <form className={classes.form} autoComplete="off">
                <TextField
                    id="datasourceName"
                    label="Datasource name"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.onChangeDatasourceName.bind(this)}
                />

                <FormControl margin="normal">
                    <InputLabel shrink={true} >Type</InputLabel>
                    <Select
                        onChange={this.onChangeType.bind(this)}
                        input={<Input value={this.state.type} name="type" id="type-helper"/>}
                    >
                        <MenuItem value={0}>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>SQL</MenuItem>
                        <MenuItem value={20}>SpreadSheet</MenuItem>
                    </Select>
                </FormControl>

                {(() => {
                    if(this.state.type === 10) {
                        return (
                            <div className={classes.form}>
                                <FormControl margin="normal">
                                    <InputLabel shrink={true} >Driver</InputLabel>
                                    <Select
                                        onChange={this.onChangeDriver.bind(this)}
                                        input={<Input value={this.state.driver} name="driver" id="driver-helper"/>}
                                    >
                                        <MenuItem value={0}>
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>MySQL</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    id="config"
                                    label="DSN"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.onChangeDSN.bind(this)}
                                />
                            </div>
                        );
                    }
                })()}

                <Button variant="raised" color="primary" onClick={onSubmit}>
                    Create
                </Button>
            </form>
        );
    }
}

export default withStyles(styles, { withTheme: true })(DatasourceEditForm)