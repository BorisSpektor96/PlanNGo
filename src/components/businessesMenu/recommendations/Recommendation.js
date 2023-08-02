import React from 'react';
import { Link } from 'react-router-dom';

const Recommendation = (props) => {

    return (
        <div style={ { maxWidth: '200px', width: '100%' } }
            className="e-card e-custom-card p-1 m-2 d-flex flex-column justify-content-between">
            <div className="e-card-header">
                <div className="e-card-header-caption center">
                    <div className="e-card-header-title name">{ props.business_name }</div>
                    <div className="e-card-sub-title p-1">{ props.phoneNumber }</div>
                </div>
            </div>
            <div className="e-card-content p-2">
                <p className="avatar-content">{ props.address }</p>
            </div>
            <div className=' d-flex justify-content-center'>
                <Link className="btn btn-link"
                    to='/BusinessPage'
                    id={ props.id }
                    state={ props }
                >
                    Go To Service
                </Link>
            </div>

        </div>
    );
};

export default Recommendation;
