
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./BusinessFormat.module.css"
import { useState } from "react";

// import { ProfileInfoContext } from "../../ProfileInfoContext";
// import { useContext } from "react";
import { useEffect } from "react";

const BusinessFormat = (props) => {

  // const { profileInfo } = useContext(ProfileInfoContext)

  const [ businessLogin, setBusinessLogin ] = useState(true)

  const pathToBusinessPage = '/BusinessPage';

  if (businessLogin) {
    return (
      <div className="col-12 d-flex flex-wrap justify-content-around pt-4 pb-4 mt-2 mb-2">

        <div className="col-12 d-flex flex-wrap gap-5 justify-content-center align-items-start">

          <div className="card border-light">
            <div className="d-flex justify-content-center">
              <img src={ props.profileImg ? `data:image/jpeg;base64,${props.profileImg}` : "./logo512.png" } className={ styles.img } alt="..." />
            </div>
          </div>

          <div className="card col-md-3 col-10 border-light">
            <div className="card-body">
              <h5 className="card-title">{ props.business_name }</h5>
              <p className="card-text">{ props.business_description }</p>
              <p className="card-text"><small className="text-muted">{ props.lastTouch }</small></p>
            </div>
          </div>

          <div className="card col-md-3 col-10 border-light" >
            <div className="card text-dark">
              <div className="border-dark card-header">
                <h5>
                  Contact:
                </h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item "><p>{ props.tel }</p></li>
                <li className="list-group-item "><p>{ props.address }</p></li>
                <li className="list-group-item "><p>{ props.email }</p></li>
              </ul>
              <Link className="btn btn-outline-primary"
                to={ pathToBusinessPage }
                id={ props.business_name }
                state={ props }
              >
                Go To Service
              </Link>
            </div>
          </div>
        </div>

      </div>
    )
  }
  else {
    return (
      <div className="d-flex flex-wrap justify-content-around p-4 mt-2 mb-5">

        <div className="d-flex flex-wrap gap-5 justify-content-center align-items-start">

          <div className="card border-light ">
            <div className="d-flex justify-content-center">
              <img src="./logo512.png" className={ styles.img } alt="..." />
            </div>
          </div>

          <div className="card col-lg-4 col-md-6 border-light ">
            <div className="card-body">
              <h5 className="card-title">{ props.businessName }</h5>
              <p className="card-text">{ props.businessDescription }</p>
              <p className="card-text"><small className="text-muted">{ props.lastTouch }</small></p>
            </div>
          </div>

          <div className="card border-light" >
            <div className="card text-dark">
              <div className="border-dark card-header">
                <h5>
                  Contact:
                </h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item "><p>{ props.tel }</p></li>
                <li className="list-group-item "><p>{ props.address }</p></li>
                <li className="list-group-item "><p>{ props.email }</p></li>
              </ul>
              <Link className="btn btn-outline-primary"
                to={ pathToBusinessPage }
                id={ props.businessName }
                state={ props }
              >
                Go To Service
              </Link>
            </div>
          </div>

        </div>
      </div>
    )
  }

}

export default BusinessFormat;