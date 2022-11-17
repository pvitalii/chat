import { Route, Routes } from "react-router-dom"
import AuthPage from "../pages/auth/Auth";
import HomePage from "../pages/home/Home";
import Chat from "./chat/chat";
import Chats from "./chats/chats";

function AppRouter() {
    return (
        <Routes>
            <Route path="/home" element={<HomePage></HomePage>}>
                <Route path="chats" element={<Chats></Chats>}>
                    <Route path=":chatId" element={<Chat></Chat>} />
                </Route>
            </Route>
            <Route path="/signin" element={<AuthPage></AuthPage>} />
            <Route path="/signup" element={<AuthPage></AuthPage>} />
        </Routes>
    )
}

export default AppRouter;