import React from 'react';
import s from './Users.module.css';
import defaultUserPhoto from '../../assets/user.png';
import {NavLink} from "react-router-dom";
import Preloader from "../../components/other/Preloader";

let Users = (props) => {
    let pageCount = Math.ceil(props.state.usersTotalCount / props.state.usersPageSize);
    let p = [];
    for (let pageNum = 1; pageNum <= pageCount; pageNum++)
        p.push(<span onClick={() => props.onPageChanged(pageNum)}
                     className={props.state.usersCurrentPage === pageNum ? s.current : null}> {pageNum} </span>);
    return <>
        <div>{p}</div>
        <div>
            {props.state.isUsersLoad
                ? <Preloader/>
                : props.state.users.map(u => {
                    return <div>
                        <div className={s.ava}>
                            <NavLink to={`/profile/${u.id}`}>
                                <img src={u.photos.small != null
                                    ? u.photos.small
                                    : defaultUserPhoto} alt="avatar"/>
                            </NavLink>
                        </div>
                        <div>
                            {u.name}
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.state.isButtonsDisabled.some(UID => UID === u.id)}
                                          onClick={() => { props.unFollow(u.id) }}>Unfollow</button>
                                : <button disabled={props.state.isButtonsDisabled.some(UID => UID === u.id)}
                                          onClick={() => { props.follow(u.id) }}>Follow</button>
                            }
                        </div>
                    </div>
                })}
        </div>
    </>
}

export default Users;