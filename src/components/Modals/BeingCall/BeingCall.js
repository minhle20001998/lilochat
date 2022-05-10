import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export default function BeingCall(props) {
    const navigate = useNavigate();
    const backgroundColor = '#212121';

    const handleClose = () => {
        props.handleClose();
    }

    const handleSubmit = (e) => {
        handleClose();
        navigate('/call/1?type=answer')
    }

    return (
        <Modal
            onHide={handleClose}
            show={props.show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Header
                style={{ backgroundColor: backgroundColor, justifyContent: 'center' }}
                closeButton
                closeVariant='white'
            >
                <Modal.Title>Being Call</Modal.Title>
            </Modal.Header>
            <Modal.Footer style={{ backgroundColor: backgroundColor }}>
                <Button variant="danger" style={{ background: 'transparent', border: 'none' }} onClick={handleClose}>
                    Decline
                </Button>
                <Button
                    variant="outline-danger"
                    style={{ background: 'transparent', border: 'none' }}
                    type='submit'
                    onClick={handleSubmit}
                >
                    Accept
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
