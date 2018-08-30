import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Login from './Login';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import Pic from './Picture/Ling logo.png';
import firebase, { auth, provider, provider2 } from '../config/firebase';
import '../App.css';
import ColorPicker from './ColorPicker';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import OverlayOptions from './OverlayOptions';


const drawerWidth = '350px'

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
});

class PermanentDrawer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        console.log()
    }
    logout = () => {
        firebase.auth().signOut();
        this.props.onSetUserNull()
    }

    renderDrawer = () => {
        const { classes, user, onSetUser } = this.props;

        return (
            user ?
                <div>
                    <ListItem>
                        <Avatar
                            alt={user.email}
                            src={user.photoURL || Pic}
                            className={classNames(classes.bigAvatar)}
                        />
                        <ListItemText primary={user.email} secondary={user.displayName} />
                    </ListItem>
                    <div>
                        <Divider />
                        <List>
                            {this.props.currentPlanData.planName}
                        </List>
                        <Divider />
                        {this.props.planData.map(value => {
                            return (
                                <ListItem
                                    button
                                    key={value.planId}
                                    onClick={() => this.props.onSelectCurrentPlanData(value)}>
                                    <ListItemText primary={value.planName}>
                                    </ListItemText>
                                </ListItem>
                            )
                        })}
                        <Divider />
                        <button onClick={this.props.onSaveToFirestore}>
                            บันทึก
                    </button>
                        <button className="logout logout--L" onClick={this.logout}>
                            logout
                        </button>
                    </div>
                </div>
                :
                <Login
                    onSetUser={onSetUser}
                    onQueryPlanFromFirestore={this.props.onQueryPlanFromFirestore}
                />

        )
    }
    drawerPageRender = () => {
        const { drawerPage,
            selectedOverlay,
            onChangePolyStrokeColor,
            onChangePolyFillColor,
            onSetSelectedIcon,
            overlayOptionsType,
            handleDetailEdit,

        } = this.props;
        switch (drawerPage) {
            case 'homePage':
                return (
                    this.renderDrawer()
                )
            case 'option':
                return (
                    <OverlayOptions
                        selectedOverlay={selectedOverlay}
                        onChangePolyStrokeColor={onChangePolyStrokeColor}
                        onChangePolyFillColor={onChangePolyFillColor}
                        onSetSelectedIcon={onSetSelectedIcon}
                        overlayOptionsType={overlayOptionsType}
                        handleDetailEdit={handleDetailEdit}
                    />
                )
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Drawer
                variant="persistent"
                anchor='left'
                open={this.props.openSide}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {this.drawerPageRender()}
            </Drawer>
        );
    }
}

PermanentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawer);
