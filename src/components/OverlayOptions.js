import React from 'react';
// Material-ui Import
import Button from '@material-ui/core/Button';
// Import Group
import ColorPicker from './ColorPicker';
import IconPicker from './IconPicker';
import EditOverlay from './EditOverlay';
import DeleteOverlay from './DeleteOverlay';
import OverlayTask from './OverlayTask'
import WeatherAffectRice from './WeatherAffectRice'

// CSS Import
import './OverlayOptions.css';

/*const styles = theme => ({
    drawerPaper: {
        drawerPaper: {
            position: 'relative',
            width: '25vw',
            hiegth: '25vw',
        },
    },
    card: {
        maxWidth: 345,
    },
    media: {
        // ⚠️ object-fit is not supported by IE11.
        objectFit: 'cover',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
});*/

class OverlayOptions extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isEditOverlayOpen: false,
            isDeleteOverlayOpen: false,
            isOverlayTaskOpen: false,
        };
    }
    onToggleEditoverlayOpen = () => {
        this.setState({ isEditOverlayOpen: !this.state.isEditOverlayOpen })
    }
    renderEditOverlayDetailModal = () => {
    }
    onToggleDeleteOverlayOpen = () => {
        this.setState({ isDeleteOverlayOpen: !this.state.isDeleteOverlayOpen })
    }
    onToggleOverlayTaskOpen = () => {
        this.setState({ isOverlayTaskOpen: !this.state.isOverlayTaskOpen })
    }
    drawOverlayDetail = () => {
        const { selectedOverlay, onRedoCoords, onUndoCoords } = this.props;
        return (
            <div className="FrameTaskData">
                <div>
                    ชื่อ : {selectedOverlay.overlayName}
                    <br />
                </div>
                <div>
                    รายละเอียด : {selectedOverlay.overlayDetail}
                    <br />
                </div>
                <Button variant="contained" className="buttonaddwork" onClick={this.onToggleOverlayTaskOpen} disabled={selectedOverlay.overlaySource === 'server' ? false : true}>
                    จัดการงาน
                </Button>
                <Button variant="contained" className="buttoneditwork" onClick={this.onToggleEditoverlayOpen} disabled={selectedOverlay.overlaySource === 'server' ? false : true}>
                    แก้ไข
                </Button>
                <Button variant="contained" className="buttondeletework" onClick={this.onToggleDeleteOverlayOpen} >
                    ลบ
                </Button>
                <Button variant="contained" className="buttonundowork" onClick={() => onUndoCoords(selectedOverlay)}>
                    Undo
                </Button>
                <Button variant="contained" className="buttonredowork" onClick={() => onRedoCoords(selectedOverlay)}>
                    Redo
                </Button>
                <WeatherAffectRice 
                selectedOverlay={selectedOverlay}
                onEditOverlayPlantDate={this.props.onEditOverlayPlantDate}
                />
                <EditOverlay
                    isEditOverlayOpen={this.state.isEditOverlayOpen}
                    selectedOverlay={selectedOverlay}
                    onToggleEditoverlayOpen={this.onToggleEditoverlayOpen}
                    onEditOverlayDetail={this.props.onEditOverlayDetail}
                />
                <DeleteOverlay
                    isDeleteOverlayOpen={this.state.isDeleteOverlayOpen}
                    selectedOverlay={selectedOverlay}
                    onToggleDeleteOverlayOpen={this.onToggleDeleteOverlayOpen}
                    onDeleteOverlay={this.props.onDeleteOverlay}
                />
                <OverlayTask
                    {...this.state}
                    onAddTask={this.props.onAddTask}
                    onToggleOverlayTaskOpen={this.onToggleOverlayTaskOpen}
                    selectedPlan={this.props.selectedPlan}
                    selectedOverlay={selectedOverlay}
                    overlayTaskShow={this.props.overlayTaskShow}
                    onToggleIsTaskDone={this.props.onToggleIsTaskDone}
                    onFilterTask={this.props.onFilterTask}
                    filterTaskType={this.props.filterTaskType}
                    onEditTask={this.props.onEditTask}
                    onDeleteTask={this.props.onDeleteTask}
                    isWaitingForTaskToggle={this.props.isWaitingForTaskToggle}
                    overlAllFiltertask={this.props.overlAllFiltertask}
                />
            </div >
        )
    }
    render() {
        return (
            <div>

                {
                    this.props.selectedOverlay ?
                        this.drawOverlayDetail()
                        :
                        null
                }
                {
                    this.props.overlayOptionsType === 'marker' ?
                        <div>
                            <IconPicker
                                onAddListenerGrabBtn={this.props.onAddListenerGrabBtn}
                                onSetSelectedIcon={this.props.onSetSelectedIcon}
                                handleDrawerToggle={this.props.handleDrawerToggle}
                            />
                        </div>
                        :
                        <div>

                            <ColorPicker
                                onAddListenerGrabBtn={this.props.onAddListenerGrabBtn}
                                onChangePolyStrokeColor={this.props.onChangePolyStrokeColor}
                                onChangePolyFillColor={this.props.onChangePolyFillColor}
                                selectedOverlay={this.props.selectedOverlay}
                                fillColor={this.props.fillColor}
                                strokeColor={this.props.strokeColor}
                                handleDrawerToggle={this.props.handleDrawerToggle}
                            />
                            {
                                (!this.props.isFirstDraw) ?
                                    <div className="FrameTaskData">
                                        <Button
                                            variant="contained"
                                            className="buttonundoonwork"
                                            disabled={false}
                                            onClick={this.props.onUndoDrawingCoords}
                                        >
                                            Undo
                                        </Button>
                                        <Button
                                            variant="contained"
                                            className="buttonredoonwork"
                                            disabled={false}
                                            onClick={this.props.onRedoDrawingCoords}
                                        >
                                            Redo
                                        </Button>
                                    </div>

                                    :
                                    null
                            }
                        </div>
                }
            </div>
        )
    }
}

export default (OverlayOptions);
