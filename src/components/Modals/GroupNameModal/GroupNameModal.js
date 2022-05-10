import { Button, Form, Modal } from 'react-bootstrap'
import React, { useState } from 'react'

export default function GroupNameModal(props) {
    const backgroundColor = '#212121';
    const maxLength = 50;
    const [input, setInput] = useState('');
    const [textLength, setTextLength] = useState(0);

    const handleOnInput = (e) => {
        if (e.target.value.length <= maxLength) {
            setInput(e.target.value);
            setTextLength(e.target.value.length);
        }
    }

    const handleClose = () => {
        props.handleClose();
        setInput('');
        setTextLength(0);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setGroupName(input);
        handleClose();
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
                <Modal.Title>Group Name</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body style={{ backgroundColor: backgroundColor, paddingBottom: '20px' }}>
                    <span>{textLength}/{maxLength}</span>
                    <input
                        className='w-100'
                        style={{
                            height: '40px',
                            color: 'white',
                            background: 'black',
                            border: '1px solid #681818'
                        }}
                        placeholder="Enter new Group Name"
                        onInput={handleOnInput}
                        value={input}
                    >
                    </input>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: backgroundColor }}>
                    <Button variant="danger" style={{ background: 'transparent', border: 'none' }} onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="outline-danger"
                        disabled={(textLength === 0) ? true : false}
                        style={{ background: 'transparent', border: 'none' }}
                        type='submit'
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
