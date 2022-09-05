import React from 'react';

const AdminLayout = (props) => {
    return (
        <div>
            <div className={props.class}>
                {props.children}
            </div>
        </div>
    );
};

export default AdminLayout;
