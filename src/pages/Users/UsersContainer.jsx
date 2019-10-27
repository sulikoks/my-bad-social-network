import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {
    onSetUsersCurrentPage,
    setUsers, unFollow, follow
} from "../../store/usersReducer";
import {withRedirect} from "../../hoc/withRedirect";
import {compose} from "redux";

//////////////////////////////////////////////////////////   CREATE USER CONTAINER   ///////////////////////////////////

class UsersContainer extends React.Component {
    componentDidMount() {
        this.onPageChanged(this.props.state.usersCurrentPage)
    }
    onPageChanged = (p) => {
        this.props.setUsers(this.props.state.usersPageSize, p);
    }
    render() {
        return <Users {...this.props}
                      onPageChanged={this.onPageChanged}/>
    }
}

//////////////////////////////////////////////////////////   MSP AND MDP FOR CONTAINER PROPS   /////////////////////////

const mapStateToProps = (state) => ({
    state: state.usersPage
})
const mapDispatchToProps = {
    onSetUsersCurrentPage,
    setUsers,
    unFollow,
    follow
}

//////////////////////////////////////////////////////////   OTHER MAP DISPATCH TO PROPS   /////////////////////////////

// const mapDispatchToProps = (dispatch) => ({
//     onFollow: (userId) => {
//         dispatch(followAC(userId))
//     },
//     onUnfollow: (userId) => {
//         dispatch(unfollowAC(userId))
//     },
//     onSetUsers: (users) => {
//         dispatch(setUsersAC(users))
//     },
//     onSetUsersTotalCount: (totalCount) => {
//         dispatch(setUsersTotalCountAC(totalCount))
//     },
//     onSetUsersCurrentPage: (pageNumber) => {
//         dispatch(setUsersCurrentPageAC(pageNumber))
//     },
//     onIsUsersLoad: (isLoad) => {
//         dispatch(setIsUsersLoadAC(isLoad))
//     }
// });

//////////////////////////////////////////////////////////   CONNECT FROM STORE MSP AND MDP WITH CONTAINER   ///////////
export default compose(
    connect(mapStateToProps, mapDispatchToProps))(UsersContainer)