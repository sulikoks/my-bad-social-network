import React from 'react'
import {Route, withRouter} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ProfileContainer from './pages/Profile/ProfileContainer'
import MessagesContainer from './pages/Messages/MessagesContainer'
import UsersContainer from './pages/Users/UsersContainer'
import HeaderContainer from "./components/Header/HeaderContainer"
import LoginContainer from "./pages/Login/LoginContainer"
import {compose} from "redux";
import {connect} from "react-redux";
import {initApp} from "./store/appReducer";
import Preloader from "./components/other/Preloader";

class App extends React.Component {
    componentDidMount() {
        this.props.initApp()
    }

    render() {
        if(!this.props.isInit)
            return <Preloader/>
        return <div className="App">
            <HeaderContainer/>
            <Navbar/>
            <div className="content">
                <Route path='/login' render={() => <LoginContainer/>}/>
                <Route path='/profile/:UID?' render={() => <ProfileContainer/>}/>
                <Route path='/messages' component={MessagesContainer}/>
                <Route path='/users' component={UsersContainer}/>
            </div>
            <Footer/>
        </div>
    }
}
const mapStateToProps = (state) => ({
    isInit: state.app.isInit
})
const mapDispatchToProps = {
    initApp
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter)(App)