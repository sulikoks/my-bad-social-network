import React from 'react'
import Profile from './Profile'
import {connect} from "react-redux"
import {initProfile, putStatusProfile} from "../../store/profileReducer"
import {withRouter} from "react-router-dom"
import {compose} from "redux"
import Preloader from "../../components/other/Preloader";

class ProfileContainer extends React.Component {
    toggleEditMode = (b) => {
        this.setState({editMode: b})
        if (!b) console.log('Privet')
    }
    setNewStatus = (data) => {
        this.toggleEditMode(false)
        this.props.putStatusProfile(data.status)
    }
    state = {
        editMode: false,
        toggleEditMode: this.toggleEditMode,
        setNewStatus: this.setNewStatus
    }

    componentDidMount() {
        const UID = this.props.match.params.UID
            ? this.props.match.params.UID
            : this.props.auth.id
                ? this.props.auth.id
                : this.props.history.push('/login') //Так себе решение
        this.props.initProfile(UID)
    }

    render() {
        debugger
        if(!this.props.state.isInit) return <Preloader />
        return <Profile {...this.props} edit={this.state}/>
    }
}

let mapStateToProps = (state) => ({
    state: state.profilePage,
    auth: state.auth
})
let mapDispatchToProps = {
    initProfile,
    putStatusProfile
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter)(ProfileContainer)