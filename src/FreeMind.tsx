import React, {useState} from "react";
import useSound from "use-sound";
import {useNavigate} from "react-router-dom";

export const FreeMind = () => {

    const [isPlaying, setIsPlaying] = useState(false);

    const mySound = require("./audio/freemind.mp3");
    const [play, {stop}] = useSound(mySound);

    const togglePlay = () => {
        if (isPlaying) {
            stop();
        } else {
            play();
        }
        setIsPlaying(!isPlaying);
    };

    const navigate = useNavigate();

    return (
        <div className="App">
            <div className="App-header">
                <div style={{display: "flex", flexDirection: "row", gap: "4px"}}>
                    <button onClick={() => navigate("/login")}>Login</button>
                    <button>Register</button>
                </div>
            </div>
            <div className="App-body">
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{width: "50px", display: "flex", flexDirection: "column", gap: "4px", color: "#FFF"}}>
                        <button>Upload</button>
                        <button>Share</button>
                    </div>
                    <div style={{alignItems: "center"}}>
                        <p>
                            You need to be free, because you will see that a mind that is free
                            has the essence of humility. Such a mind, which is free and therefore
                            has humility, can learn-- not a mind that resists. Learning is an
                            extraordinary thing-- to learn , not to accumulate knowledge.
                            Accumulating knowledge is quite a different thing. What we call
                            knowledge is comparatively easy, because that is a movement from the
                            known to the known. But to learn is a movement from the known to the
                            unknown--you learn only like that, do you not?
                        </p>
                        <div style={{display: "flex", flexDirection: "row", gap: "4px", justifyContent: "center"}}>
                            <button>Previous</button>
                            <button onClick={togglePlay}>
                                {isPlaying ? "Pause" : "Play"}
                            </button>
                            <button>Next</button>
                        </div>
                    </div>
                    <div style={{width: "50px", display: "flex", flexDirection: "column", gap: "4px"}}>
                        <button>Follow</button>
                        <button>Like</button>
                        <button>Bookmark</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
