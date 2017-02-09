'use strict';

import React from 'react';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button} from 'react-bootstrap/lib';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap/lib';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap/lib';

export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show    : false,
            tried   : false,
            fname   : '',
            lname   : '',
            addr    : '',
            city    : '',
            stat    : '',
            zip     : '',
            phone   : '',
            email   : '',
            password: '',
            cpasswd : ''
        };

        this.getInitialState = this.getInitialState.bind(this);
        this.clearStates = this.clearStates.bind(this);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

        this.onTryRegister = this.onTryRegister.bind(this);
        this.onShowLogin = this.onShowLogin.bind(this);

        // For Validation
        this.getValidationForFName      = this.getValidationForFName.bind(this);
        this.getValidationForLName      = this.getValidationForLName.bind(this);
        this.getValidationForAddr       = this.getValidationForAddr.bind(this);
        this.getValidationForCity       = this.getValidationForCity.bind(this);
        this.getValidationForState      = this.getValidationForState.bind(this);
        this.getValidationForZip        = this.getValidationForZip.bind(this);
        this.getValidationForPhone      = this.getValidationForPhone.bind(this);
        this.getValidationForEmail      = this.getValidationForEmail.bind(this);
        this.getValidationForPassword   = this.getValidationForPassword.bind(this);
        this.getValidationForCPasswd    = this.getValidationForCPasswd.bind(this);

        // For Change Event
        this.handleChangeForFName   = this.handleChangeForFName.bind(this);
        this.handleChangeForLName   = this.handleChangeForLName.bind(this);
        this.handleChangeForAddr    = this.handleChangeForAddr.bind(this);
        this.handleChangeForCity    = this.handleChangeForCity.bind(this);
        this.handleChangeForState   = this.handleChangeForState.bind(this);
        this.handleChangeForZip     = this.handleChangeForZip.bind(this);
        this.handleChangeForPhone   = this.handleChangeForPhone.bind(this);
        this.handleChangeForEmail   = this.handleChangeForEmail.bind(this);
        this.handleChangeForPassword= this.handleChangeForPassword.bind(this);
        this.handleChangeForCPasswd = this.handleChangeForCPasswd.bind(this);
    }

    getInitialState() {
        return {
            show    : false,
            tried   : false,
            fname   : '',
            lname   : '',
            addr    : '',
            city    : '',
            stat    : '',
            zip     : '',
            phone   : '',
            email   : '',
            password: '',
            cpasswd :''
        };
    }

    clearStates() {
        this.setState({
            show    : false,
            tried   : false,
            fname   : '',
            lname   : '',
            addr    : '',
            city    : '',
            stat    : '',
            zip     : '',
            phone   : '',
            email   : '',
            password: '',
            cpasswd :''
        });
    }

    showModal() {
        this.setState({
            show    : true,
            tried   : false,
            fname   : '',
            lname   : '',
            addr    : '',
            city    : '',
            stat    : '',
            zip     : '',
            phone   : '',
            email   : '',
            password: '',
            cpasswd : ''
        });
    }

    hideModal() {
        this.setState({show: false});
        this.props.hideRegister();
    }

    onTryRegister(e) {
        this.setState({tried: true});
        this.props.tryRegister(e);
    }

   onShowLogin(e) {
        this.props.openLogin(e);
        this.hideModal();
    }

    getValidationForFName() {
        const length = this.state.fname.length;
        if (length > 3) return 'success';
        else if (length < 3 && length > 0) return 'warning';
        else if (this.state.tried == true && length == 0) return 'error';
    }

    getValidationForLName() {
        const length = this.state.lname.length;
        if (length > 3) return 'success';
        else if (length < 3 && length > 0) return 'warning';
        else if (this.state.tried == true && length == 0) return 'error';
    }

    getValidationForAddr() {
        const length = this.state.addr.length;
        if (length > 3) return 'success';
        else if (length < 3 && length > 0) return 'warning';
    }

    getValidationForCity() {
        const length = this.state.city.length;
        if (length > 3) return 'success';
        else if (length < 3 && length > 0) return 'warning';
        else if (this.state.tried == true && length == 0) return 'error';
    }

    getValidationForState() {
        const length = this.state.stat.length;
        if (length > 0) return 'success';
        else if (this.state.tried == true && length == 0) return 'error';
    }

    getValidationForZip() {
        const length = this.state.zip.length;
        if (length >= 5) return 'success';
        else if (this.state.tried == true && length == 0) return 'error';
        else if (length < 5 && length > 0) return 'warning';
    }

    getValidationForPhone() {
        const length = this.state.phone.length;
        if (length >= 5) return 'success';
        else if (this.state.tried == true && length == 0) return 'error';
        else if (length < 5 && length > 0) return 'warning';
    }

    getValidationForEmail() {
        const length = this.state.email.length;
        if (length >= 6) return 'success';
        else if (this.state.tried == true && length == 0) return 'error';
        else if (length < 6 && length > 0) return 'warning';
        else if (this.state.tried == true && length == 0) return 'error';
}

    getValidationForPassword() {
        const length = this.state.password.length;
        if (length >= 8) return 'success';
        else if (length < 8 && length > 0) return 'warning';
        else if (this.state.tried == true && length == 0) return 'error';
    }

    getValidationForCPasswd() {
        if (this.state.cpasswd.length > 0 && this.state.cpasswd === this.state.password) return 'success';
        else if(this.state.cpasswd.length > 0 && this.state.cpasswd != this.state.password) return 'error';
        else if (this.state.tried == true && length == 0) return 'error';
    }

    handleChangeForFName(e) {
        this.setState({ fname: e.target.value });
    }

    handleChangeForLName(e) {
        this.setState({ lname: e.target.value });
    }

    handleChangeForAddr(e) {
        this.setState({ addr: e.target.value });
    }

    handleChangeForCity(e) {
        this.setState({ city: e.target.value });
    }

    handleChangeForState(e) {
        this.setState({ stat: e.target.value });
    }

    handleChangeForZip(e) {
        this.setState({ zip: e.target.value });
    }

    handleChangeForPhone(e) {
        this.setState({ phone: e.target.value });
    }

    handleChangeForEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleChangeForPassword(e) {
        this.setState({ password: e.target.value });
    }

    handleChangeForCPasswd(e) {
        this.setState({ cpasswd: e.target.value });
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal" >
                <Modal.Header closeButton>
                    <Modal.Title>Register Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="form_style">
                        <Row className="show-grid">
                            <Col xs={6} md={6}>
                                <FormGroup controlId="fname" validationState={this.getValidationForFName()} >
                                    <ControlLabel>First Name</ControlLabel>
                                    <FormControl type="text" value={this.state.fname} onChange={this.handleChangeForFName} />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                            <Col xs={6} md={6}>
                                <FormGroup controlId="lname" validationState={this.getValidationForLName()} >
                                    <ControlLabel>Last Name</ControlLabel>
                                    <FormControl type="text" value={this.state.lname} onChange={this.handleChangeForLName} />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup controlId="addr" validationState={this.getValidationForAddr()} >
                            <ControlLabel>Address</ControlLabel>
                            <FormControl type="text" value={this.state.addr} onChange={this.handleChangeForAddr} />
                            <FormControl.Feedback />
                        </FormGroup>
                        <Row className="show-grid">
                            <Col xs={6} md={6}>
                                <FormGroup controlId="city" validationState={this.getValidationForCity()} >
                                    <ControlLabel>City</ControlLabel>
                                    <FormControl type="text" value={this.state.city} onChange={this.handleChangeForCity} />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                            <Col xs={6} md={6}>
                                <FormGroup controlId="stat" validationState={this.getValidationForState()}  onChange={this.handleChangeForState}>
                                    <ControlLabel>State</ControlLabel>
                                    <FormControl componentClass="select" placeholder="select">
                                        <option value="">Please select a state</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KA">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="KS">Kansas</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </FormControl>
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={6} md={6}>
                                <FormGroup controlId="zip" validationState={this.getValidationForZip()} >
                                    <ControlLabel>Zip Code</ControlLabel>
                                    <FormControl type="text" value={this.state.zip} onChange={this.handleChangeForZip} />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                            <Col xs={6} md={6}>
                                <FormGroup controlId="phone" validationState={this.getValidationForPhone()} >
                                    <ControlLabel>Phone Number</ControlLabel>
                                    <FormControl type="text" value={this.state.phone} onChange={this.handleChangeForPhone} />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </Row>
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
                        <FormGroup controlId="cpasswd" validationState={this.getValidationForCPasswd()} >
                            <ControlLabel>Confirm Password</ControlLabel>
                            <FormControl type="password" value={this.state.cpasswd} onChange={this.handleChangeForCPasswd} />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Form>
                    <span className="form_error_msg">{this.props.message}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.hideModal}>Close</Button>
                    <Button bsStyle="primary" onClick={this.onShowLogin}>Already a member</Button>
                    <Button bsStyle="primary" onClick={this.onTryRegister}>Submit</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
