import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { ReduxState, ReduxAction } from 'store';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import WorkIcon from 'material-ui-icons/Work';
import { Project } from 'modules/project';

interface Props extends StyledComponentProps {
    projects: Array<Project>
    dense: boolean
    onClick: PropTypes.func
}

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const ProjectList = (props: Props) => {
    return (
        <div className={props.classes.root}>
            <List dense={props.dense}>
                {props.projects.map((project: Project) => {
                    return (
                        <ListItem key={project.id} onClick={props.onClick.bind(this, project.id)}>
                        <Avatar>
                            <WorkIcon />
                        </Avatar>
                        <ListItemText primary={project.name} />
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}

export default withStyles(styles)<Props>(ProjectList)