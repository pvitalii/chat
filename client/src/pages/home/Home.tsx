import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store";
import { getUser, signout } from "../../store/auth/auth.thunks";
import "./home-page.scss"
import chatIcon from "../../assets/bubble-speech.png"
import contactIcon from "../../assets/contact.png"
import settingsIcon from "../../assets/settings.png"
import signoutIcon from "../../assets/shutdown.png"
import { User } from "../../interfaces/user.interface";
import authApi from "../../axios/auth-api";

function HomePage() {

    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.auth.currentUser);

    const [currUser, setCurrUser] = useState({} as User)

    const navigate = useNavigate();

    const logout = () => {
        dispatch(signout()).then(() => navigate('/signin'))
    }

    useEffect(() => {
        dispatch(getUser())
    }, [])

    return (
        <div className="home-page">
            <div className="profile">
                <div className="user-info">
                    <img className="avatar" src={user.picture} alt="" />
                    <span>{user.name}</span>
                </div>
                <div className="options">
                    <button className="profile-option" onClick={() => {navigate('/home/chats')}}><img className="icons" src={chatIcon} alt="chat" />Chats</button>
                    <button className="profile-option"><img className="icons" src={contactIcon} alt="chat" />Contacts</button>
                    <button className="profile-option"><img className="icons" src={settingsIcon} alt="chat" />Settings</button>
                </div>

                <button className="profile-option logout-btn" onClick={() => logout()}><img className="icons" src={signoutIcon} alt="chat" />Sign Out</button>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default HomePage;