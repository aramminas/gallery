import React from 'react';

const Card = ({image}) => {

    return (
        <div className="log-image-content">
            <img src={image.url} alt={image.id}/>
        </div>
    );
}

export default Card;