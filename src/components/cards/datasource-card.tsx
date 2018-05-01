import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { ReduxState, ReduxAction } from 'store';

import { browserHistory } from 'react-router'

import { cardHeader, card, cardHeaderAction } from 'assets/styles/card';
import { defaultFont } from 'assets/styles/font';
import {
    Card,
    CardHeader,
    CardContent,
    Button,
} from 'material-ui';
import {
    MoreVert,
} from 'material-ui-icons';

import { DatasourceList } from 'components';
import { Datasource } from 'modules/datasource';

const styles = theme => ({
    card: {
        ...card,
        display: 'block',
        width: 'calc(100% - ' + (theme.spacing.unit * 4) + 'px)',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 6,
    },
    cardHeader: {
        flex: 'none',
        ...cardHeader,
        ...defaultFont,
        background: 'rgb(226,226,226)',
        //...primaryBoxShadow
    },
    cardTitle: {
        fontSize: '1.3rem',
    },
    cardHeaderAction: {
        ...cardHeaderAction,
        marginTop: '18px',
    },
});

interface Props extends StyledComponentProps {
    datasources: Datasource[]
    onClickNewButton: PropTypes.func
    onClickListItem: PropTypes.func
}

const DatasourceCard = (props: Props) => {
    const classes = props.classes;

    return (
        <Card className={classes.card}>
            <CardHeader
                classes={{
                    root: classes.cardHeader,
                    title: classes.cardTitle,
                    //content: classes.cardHeaderContent
                }}
                title='Datasources'
                action={
                    <div>
                        <Button size='medium' variant='raised' color='secondary' className={classes.cardHeaderAction} onClick={props.onClickNewButton.bind(this)}>
                            New Datasource
                        </Button>
                    </div>
                }
            >
            </CardHeader>
            <CardContent>
                <DatasourceList
                    datasources = { props.datasources }
                    dense = { true }
                    onClick = { props.onClickListItem }
                />
            </CardContent>
        </Card>
    );
}

export default withStyles(styles)<Props>(DatasourceCard)