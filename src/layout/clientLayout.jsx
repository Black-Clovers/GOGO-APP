import React from 'react';

const ClientLayout = (props) => {
    return (
        <div>
            <div className={props.class}>
                {props.children}
            </div>
        </div>
    );
};


export default ClientLayout;
