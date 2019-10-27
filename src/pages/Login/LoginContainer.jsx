import React from 'react'
import {connect} from "react-redux"
import Login from '../../components/form/LoginForm'
import {login} from "../../store/authReducer";
import {compose} from "redux";
import {withLoginRedirect} from "../../hoc/withRedirect";

class LoginContainer extends React.Component {
    onSubmit = (formData) => {
        console.log(formData)
        this.props.login(formData)
    }
    render() {
        return <>
            <h1>Login</h1>
            <Login onSubmit={this.onSubmit}/>
        </>
    }
}

const mdt = {login}
export default compose(
    connect(null , mdt),
    withLoginRedirect)(LoginContainer)
