import Loader from "react-loader-spinner";
import React from "react";

const LoaderBlock = () => {
    return (
        <div className="loader-content">
            <Loader type="Oval" color="#000" height={100} width={100}/>
        </div>
    );
}

export default LoaderBlock;