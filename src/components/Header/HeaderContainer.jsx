import React from 'react'
import Header from "./Header"
import {connect} from "react-redux"
import {logout, setAuthUser, setAuthUserAPI} from "../../store/authReducer"

class HeaderContainer extends React.Component {
    // componentDidMount() {
    //     this.props.setAuthUserAPI(this.props.state.isAuth)
    // }
    logout = () => {
        this.props.logout()
    }
    render() {
        return <Header {...this.props.state} logout={this.logout} />
    }
}

const mapStateToProps = state => ({
    state: state.auth
})
const mapDispatchToProps = {
    setAuthUser,
    setAuthUserAPI,
    logout
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)

// function Header2() {
//     return (
//         <div>
//             This is Header
//             Hello, World
//         </div>
//     );
// }