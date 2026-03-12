import React from "react";

function CreativeCard({ title, description, images }) {

    return (

        <div className="creative-card">

            <div className="creative-image-wrapper">
                <img
                    src={images[0]}
                    alt={title}
                    className="creative-image"
                />
            </div>

            <div className="creative-content">

                <h3 className="creative-title">
                    {title}
                </h3>

                <p className="creative-description">
                    {description}
                </p>

            </div>

        </div>

    );

}

export default CreativeCard;