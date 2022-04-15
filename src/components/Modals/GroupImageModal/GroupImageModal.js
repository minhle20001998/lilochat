import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import './GroupImageModal.css'
export default function GroupImageModal(props) {
    const backgroundColor = '#212121';
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const handleFileInput = (e) => {
        const types = ['image/jpeg', 'image/png', 'image/jpg'];
        const file = e.target.files[0];
        if (types.includes(file.type)) {
            setImage(URL.createObjectURL(file))
            setFile(file);
        }
    }

    const handleClose = () => {
        props.handleClose();
        setImage(null);
        setFile(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    {image && <img style={{ height: '300px', width: '100%', marginBottom: '20px' }} src={image} alt="preview" />}
                    {!image && <div className='file-drag-wrapper d-flex flex-column align-items-center'>
                        <input type="file"
                            id="avatar" name="avatar"
                            accept="image/png, image/jpeg, image/jpg" onChange={handleFileInput}
                        />
                        <p>Drop your image here</p>
                    </div>}
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: backgroundColor }}>
                    <Button variant="danger" style={{ background: 'transparent', border: 'none' }} onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="outline-danger"
                        style={{ background: 'transparent', border: 'none' }}
                        type='submit'
                        disabled={file ? false : true}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
