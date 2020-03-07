import React from 'react';

export default function Welcome() {
    
    document.title = "MY HOME | HOMETEL";

    return (  
        <div className="uk-background-cover" style={{backgroundImage:"url(media/welcome-bg.png)"}} uk-height-viewport="expand: true">
            <div className="uk-overlay uk-overlay-default uk-position-top uk-width-1-1 uk-text-center uk-margin-medium-top">
                <div className="uk-width-1-2@s uk-align-center">
                    <h1 style={{ color: "dodgerblue", fontWeight: "bold" }}>AST6 Airline Online Services</h1>
                </div>
            </div>
        </div>

    )
}