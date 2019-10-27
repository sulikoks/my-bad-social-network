import React from 'react';
import {Field, reduxForm} from "redux-form";
import {validateLogin} from "../../validate/validateForm";
import {Input} from "./Form";
///////////////////////////////////////////////////////
const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name='email' label='Email' type="text" component={Input}/>
        </div>
        <div>
            <Field name='password' label='Password' type="password" component={Input}/>
        </div>
        <div>
            <Field name='rememderMe' type="checkbox" component='input'/>Remember me
        </div>
        <button type='submit'>Submit</button>
    </form>
}
///////////////////////////////////////////////////////
export default reduxForm({form:'login', validate: validateLogin})(LoginForm)
