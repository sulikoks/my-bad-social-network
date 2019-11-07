import React from 'react'
import {connect} from "react-redux"
import LoginForm from '../../components/form/LoginForm'
import {login} from "../../store/authReducer";
import {compose} from "redux";
import {withLoginRedirect} from "../../hoc/withRedirect";

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
        props.login(formData)
    }
    return <>
        <h1>Login</h1>
        <LoginForm onSubmit={onSubmit}/>
    </>
}

const mdt = {login}
export default compose(
    connect(null, mdt),
    withLoginRedirect,
    React.memo)(Login)
