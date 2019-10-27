import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

export const withRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.auth.isAuth) return <Redirect to='/login'/>
            return <Component {...this.props}/>
        }
    }
    const mapStateToProps = (state) => ({
        auth: state.auth
    })

    return connect(mapStateToProps)(RedirectComponent)
}

export const withLoginRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (this.props.auth.isAuth) return <Redirect to='/profile'/>
            return <Component {...this.props}/>
        }
    }
    const mapStateToProps = (state) => ({
        auth: state.auth
    })

    return connect(mapStateToProps)(RedirectComponent)
}
