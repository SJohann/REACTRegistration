'use strict';

import React from 'react';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button} from 'react-bootstrap/lib';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap/lib';



export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show : false,
            tried : false,
            email: '',
            password: ''
        };

        this.getInitialState = this.getInitialState.bind(this);

        this.clearStates = this.clearStates.bind(this);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

        this.onTryLogin = this.onTryLogin.bind(this);
        this.onShowRegister = this.onShowRegister.bind(this);

        this.getValidationForEmail = this.getValidationForEmail.bind(this);
        this.getValidationForPassword = this.getValidationForPassword.bind(this);

        this.handleChangeForEmail = this.handleChangeForEmail.bind(this);
        this.handleChangeForPassword = this.handleChangeForPassword.bind(this);
    }

    getInitialState() {
        return {
            show: false,
            tried : false,
            email: '',
            password: ''
        };
    }

    clearStates() {
        this.setState({show: false, tried : false, email: '', password: ''});
    }

    showModal() {
        this.setState({show: true, tried : false, email: '', password: ''});
    }

    hideModal() {
        this.setState({show: false});
        this.props.hideLogin();
    }


    onTryLogin(e) {
        this.setState({tried: true});

        // Check Validation
        if(this.getValidationForEmail() == 'success' && this.getValidationForPassword() == 'success') {
            this.props.tryLogin();
        }
    }

    onShowRegister(e) {
        this.props.openRegister(e);
        this.hideModal();
    }

    getValidationForEmail() {
        const length = this.state.email.length;
        if (length >= 6) return 'success';
        else if (this.state.tried == true && length == 0) return 'error';
        else if (length < 6 && length > 0) return 'warning';
    }

    getValidationForPassword() {
        const length = this.state.password.length;
        if (length >= 8) return 'success';
        else if (length < 8 && length > 0) return 'warning';
        else if (this.state.tried == true && length == 0) return 'error';
    }

    handleChangeForEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleChangeForPassword(e) {
        this.setState({ password: e.target.value });
    }


    render() {
        return (
            <Modal show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal" >
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="form_style">
                        <div className="login-box-title">
                            <span>Sign in</span>
                        </div>
                        <FormGroup controlId="email" validationState={this.getValidationForEmail()} >
                            <ControlLabel>Email Address</ControlLabel>
                            <FormControl type="text" value={this.state.email} onChange={this.handleChangeForEmail} />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="password" validationState={this.getValidationForPassword()} >
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" value={this.state.password} onChange={this.handleChangeForPassword} />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Form>
                    <span className="form_error_msg">{this.props.message}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.hideModal}>Close</Button>
                    <Button bsStyle="primary" onClick={this.onTryLogin}>Login</Button>
                    <Button bsStyle="primary" onClick={this.onShowRegister}>Register new account</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}