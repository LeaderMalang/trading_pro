import React from "react";
import NetworkList from "./NetworkList";
import AddNetworkModal from "./AddNetworkModal";

const Network = ({ setShowImage, setImageSrc }) => {
    return (
        <div className="h-fit">
            <NetworkList setShowImage={setShowImage} setImageSrc={setImageSrc}/>
        </div>
    );
};

export default Network;
