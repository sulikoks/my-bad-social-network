import React from 'react';
import s from './ProfileInfo.module.css';
import defaultUserPhoto from '../../../assets/user.png';
import Status from "../../../components/form/StatusForm";

function ProfileInfo(props) {
    return (
        <>
            <h1>Profile</h1>
            <div className={s.profile}>
                <div className={s.profile_img}>
                    <img src={props.user.photos.small !== null
                        ? props.user.photos.small
                        : defaultUserPhoto} alt="cat"/>

                    {props.editMode
                        ? <Status onSubmit={(data) => props.setNewStatus(data)} type="text" value={props.status} autoFocus/>
                        : <span onDoubleClick={() => props.toggleEditMode(true)}>{props.status}</span>
                    }

                </div>
                <div className={s.profile_info}>
                    <h2>{props.user.fullName}</h2>
                    <br/>
                    <p>Обо мне:</p>
                    <p>{props.user.aboutMe}</p>
                    <br/>
                    <p>Описание работы мечты:</p>
                    <p>{props.user.lookingForAJobDescription}</p>
                </div>
            </div>
        </>
    );
}

export default ProfileInfo;