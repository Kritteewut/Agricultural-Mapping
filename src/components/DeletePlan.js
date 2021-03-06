import React from 'react'

// Material-ui Import
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

// CSS Import
import './DeletePlan.css';

/*const styles = theme => ({
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

class DeletePlan extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { planData, isDeletePlanOpen,
            onToggleDeletePlanModal, handleAcceptToDeletePlan } = this.props
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={isDeletePlanOpen}
                onClose={onToggleDeletePlanModal}
            >
                <div className="paperdeleteplan">
                    <div>
                        แปลงที่จะลบ : {planData ? planData.planName : ''}
                    </div>
                    <br/>
                    <div>
                        หากท่านลบแปลงที่เลือก ข้อมูลทั้งหมดที่ถูกบันทึกไว้จะถูกลบและไม่สามารถกู้คืนได้
                    </div>
                    <br/>
                    <Button className="buttoncontinuedelete" onClick={() => handleAcceptToDeletePlan(planData.planId)}>
                        ตกลง
                    </Button>
                    <Button className="buttoncanceldelete" onClick={onToggleDeletePlanModal}>
                        ยกเลิก
                    </Button>
                </div>
            </Modal>
        )
    }
}

export default (DeletePlan);