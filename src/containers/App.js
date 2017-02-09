import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initData, refreshData, sendLogin, sendLogout, sendRegister } from '../actions/actions'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, NavbarBrand, NavbarHeader, NavbarCollapse} from 'react-bootstrap/lib';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';


class App extends Component {

    constructor(props) {
        super(props);

        this.handleData = this.handleData.bind(this);
        this.clearData = this.clearData.bind(this);

        this.showLoginForm = this.showLoginForm.bind(this);
        this.hideLoginForm = this.hideLoginForm.bind(this);
        this.onHideLoginForm = this.onHideLoginForm.bind(this);

        this.showRegForm = this.showRegForm.bind(this);
        this.hideRegForm = this.hideRegForm.bind(this);
        this.onHideRegForm = this.onHideRegForm.bind(this);

        this.onTryLogin = this.onTryLogin.bind(this);
        this.onTryRegister = this.onTryRegister.bind(this);
    }

    componentWillMount() {
        this.handleData();
    }

    handleData() {
        const { dispatch } = this.props;

        dispatch(
            initData()
        );
    }

    showLoginForm(e) {
        const { allData } = this.props;

        if(allData.data.app_status != 1) {
            this._loginForm.showModal();
        }
        else{
            const { dispatch } = this.props;
            dispatch(
                sendLogout(allData.data.app_status, this._loginForm.state.email)
            );
        }
    }

    hideLoginForm() {
        this._loginForm.hideModal();
    }

    onHideLoginForm() {
        this.clearData();
    }

    onHideRegForm() {
        this.clearData();
    }

    clearData() {
        const { allData } = this.props;
        const { dispatch } = this.props;

        dispatch(
            refreshData(allData.data.app_status)
        );
    }

    showRegForm(e) {
        this._registerForm.showModal();
    }

    hideRegForm() {
        this._registerForm.hideModal();
    }

    onTryLogin(e) {
        const { dispatch } = this.props;

        dispatch(
            sendLogin(this._loginForm.state.email, this._loginForm.state.password)
        );
    }

    onTryRegister(e) {
        const { allData } = this.props;
        const { dispatch } = this.props;

        dispatch(
            sendRegister(
                allData.data.app_status,
                this._registerForm.state.email,
                this._registerForm.state.password,
                this._registerForm.state.fname,
                this._registerForm.state.lname,
                this._registerForm.state.addr,
                this._registerForm.state.city,
                this._registerForm.state.stat,
                this._registerForm.state.zip,
                this._registerForm.state.phone
            )
        );
    }

    render() {
        const { allData } = this.props;
        if(allData.data.app_status == 1) {
            this._loginForm.clearStates();
        }

        if(allData.data.reg_status == 1) {
            this._registerForm.clearStates();
            this.clearData();
        }

        return (
            <div className="app-container">
                <Navbar collapseOnSelect fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Weather App</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem href="#">Get Weather</NavItem>
                            <NavItem href="#">About</NavItem>
                            <NavItem href="#">Examples</NavItem>
                            <NavItem href="#">Timer</NavItem>
                            <NavItem href="#">Countdown</NavItem>
                            <NavItem onClick={this.showLoginForm}>{allData.data.app_status == 1 ? "Logout" : "Login"}</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <div className="app-content" onClick={this.showLoginForm}>{this.props.children}</div>

                <LoginForm
                    app_status={allData.data.app_status}
                    message={allData.data.msg}
                    ref={(loginForm) => { this._loginForm = loginForm; }}
                    tryLogin={this.onTryLogin}
                    hideLogin={this.onHideLoginForm}
                    openRegister={this.showRegForm}/>
                <RegisterForm
                    reg_status={allData.data.reg_status}
                    message={allData.data.msg}
                    ref={(registerForm) => { this._registerForm = registerForm; }}
                    tryRegister={this.onTryRegister}
                    hideRegister={this.onHideRegForm}
                    openLogin={this.showLoginForm}/>
            </div>
        )
    }
}

function matStateToProps(state) {
    const { allData } = state;
    const { data } = allData || { data : { app_status:0, reg_status:0, code:"", msg:"" } }

    return {
        allData
    }
}

const ReduxUIApp = connect(matStateToProps)(App);
export default ReduxUIApp;