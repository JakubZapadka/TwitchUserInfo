import React, { useState /*, useEffect */ } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import api from "./apiconnect.js";

const App = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [timeout, setTimeoutt] = useState(0);

    const typeEvent = (e, delay = 500) => {
        clearTimeout(timeout)
        setTimeoutt(setTimeout(() => {
          fetchData(e.target.value);
        }, delay))
        //console.log(e.target.value);
        //console.log(timeout)
    };

    const fetchData = async (name) => {
        const result2 = await api.get(
            "https://api.twitch.tv/helix/users?login=" + name
        ).catch((error) => {if (error.response && error.response.status === 404) {console.clear();alert("error 404")}})
        if (result2.data.data[0]) {
            setUserInfo(result2.data.data[0]);
        }
    };

    return (
        <div className="text-white bg-dark">
            <nav>
                <h1 className="h1 text-center pt-2">Twitch User Info</h1>
                <input
                    type="text"
                    id="input-text"
                    className="form-control bg-dark text-white"
                    placeholder="Twitch User nickname"
                    onChange={typeEvent}
                />
            </nav>
            <div className="container-fluid row m-0">
                <div className="col-md-9 border-end border-2">
                    <div className="row">
                        <p className="col-6 border-end border-1">
                            User’s login name:
                        </p>
                        <p className="col-6 border-1">{userInfo.login}</p>
                    </div>
                    <div className="row">
                        <p className="col-6 border-end border-1">
                            User’s display name:
                        </p>
                        <p className="col-6 border-1">
                            {userInfo.display_name}
                        </p>
                    </div>
                    <div className="row">
                        <p className="col-6 border-end border-1">
                            User’s channel description:
                        </p>
                        <p className="col-6 border-1">{userInfo.description}</p>
                    </div>
                    <div className="row">
                        <p className="col-6 border-end border-1">User’s ID:</p>
                        <p className="col-6 border-1">{userInfo.id}</p>
                    </div>
                    <div className="row">
                        <p className="col-6 border-end border-1">
                            User’s broadcaster type: "partner", "affiliate", or
                            "":
                        </p>
                        <p className="col-6 border-1">
                            {userInfo.broadcaster_type}
                        </p>
                    </div>
                    <div className="row">
                        <p className="col-6 border-end border-1">
                            URL of the user’s offline image:
                        </p>
                        <p className="col-6 border-1">
                            <a
                                href={userInfo.offline_image_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {userInfo.offline_image_url}
                            </a>
                        </p>
                    </div>
                    <div className="row">
                        <p className="col-6 border-end border-1">
                            URL of the user’s profile image:
                        </p>
                        <p className="col-6 border-1">
                            <a
                                href={userInfo.profile_image_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {userInfo.profile_image_url}
                            </a>
                        </p>
                    </div>
                    <div className="row">
                        <p className="col-6 border-end border-1">
                            User’s type: "staff", "admin", "global_mod", or "":
                        </p>
                        <p className="col-6 border-1">{userInfo.type}</p>
                    </div>
                    <div className="row">
                        <p className="col-6 border-end border-1">
                            Total number of views of the user’s channel:
                        </p>
                        <p className="col-6 border-1">{userInfo.view_count}</p>
                    </div>
                    <div className="row">
                        <p className="col-6 border-end border-1">
                            User’s verified email address. Returned if the
                            request includes the user:read:email scope:
                        </p>
                        <p className="col-6 border-1">{userInfo.email}</p>
                    </div>
                    <div className="row">
                        <p className="col-6 border-end border-1">
                            Date when the user was created:
                        </p>
                        <p className="col-6 border-1">{userInfo.created_at}</p>
                    </div>
                    <div className="row">
                        <p className="col-6 border-end border-1"></p>
                        <p className="col-6 border-1"></p>
                    </div>
                </div>
                <div className="col-md-3">in production...</div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
