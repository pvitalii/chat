import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authApi from "../../axios/auth-api";
import { Credentials } from "../../interfaces/credentials.interface";
import { RootState, useAppDispatch } from "../../store";
import { getUser, signin, signout, signup } from "../../store/auth/auth.thunks";
import "./auth-page.scss"
import googleIcon from "../../assets/google.png";

function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();
    const isSignin = location.pathname === '/signin';
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const error = useSelector((state: RootState) => state.auth.error)

    const auth = async (credentials: Credentials) => {
        if (isSignin) {
            dispatch(signin(credentials)).then(() => dispatch(getUser()))
        } else {
            dispatch(signup(credentials))
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-wrap">
                <h1>
                    {isSignin ? "Signin" : "Signup"}
                </h1>
                <button className="google-btn"><img className="google-icon" src={googleIcon} alt="google" />{isSignin ? "Sign in" : "Sign up"} with Google</button>
                <div className="or-email-inscription">
                    <hr />
                    <p>OR VIA EMAIL</p>
                    <hr />
                </div>
                <div className="credentials">
                    <span>Email</span><input type="text" placeholder="@mail.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <span>Password</span><input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button className="auth-btn" onClick={() => auth({ email, password }).then(() => navigate("/home"))}>{isSignin ? "Sign in" : "Sign up"}</button>
                <p className="have-account-insription">{isSignin ? "If you don't have an account " : "If you already have an account "}
                    <Link to={isSignin ? "/signup" : "/signin"}>{isSignin ? "Sign up" : "Sign in"}</Link>
                </p>
                {
                    error ?
                        <p>{error}</p>
                        :
                        null
                }
            </div>
        </div>
    )
}

export default AuthPage;