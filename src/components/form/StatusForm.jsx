import React from 'react'
import {Field, reduxForm} from "redux-form"
///////////////////////////////////////////////////////
const StatusForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name='status' type="text" component='input'/>
        </div>
        <button>Save</button>
    </form>
}
///////////////////////////////////////////////////////
export default reduxForm({form:'status', validate: null})(StatusForm)
