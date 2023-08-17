import React from "react";
const Services = (props) => {
  const { businessDetails, setServiceAndShowCalendar } = props;
if(props.currentStep !== 0) return null;

  return (
    <div className="d-flex justify-content-center">
              {/* <p className="text-center display-6">Choose a service</p> */}

      <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
        {businessDetails.services.map((service) => (
          <div className="card" key={service.id}>
            <div className="card-body">
              <h5 className="card-title">{service.name}</h5>
              <p className="card-text">
                <strong>Service Type:</strong> {service.serviceType}
                <br />
                <strong>Price:</strong> ${service.price}
                <br />
                <strong>Duration:</strong> {service.duration} hour(s)
              </p>
            </div>
            <div className="p-2 d-flex justify-content-center">
              <button
                onClick={() => {
                  setServiceAndShowCalendar(service);
                }}
                className="btn btn-success"
              >
                Take
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;