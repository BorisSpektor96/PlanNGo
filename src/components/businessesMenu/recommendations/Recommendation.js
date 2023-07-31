import React from 'react';

const Recommendation = ({ business }) => {
    return (
        <div className="e-card e-custom-card p-1 m-2 ">
            <div className="e-card-header">
                <div className="e-card-header-caption center">
                    <div className="e-card-header-title name">{business.business_name}</div>
                    <div className="e-card-sub-title p-1">{business.phoneNumber}</div>
                </div>
            </div>
            <div className="e-card-content p-2">
                <p className="avatar-content">{business.address}</p>

            </div>
            <div className=' d-flex justify-content-center'>
                <button type="button" class="btn btn-link  btn-sm"> visit</button>

            </div>

        </div>
    );
};

export default Recommendation;
