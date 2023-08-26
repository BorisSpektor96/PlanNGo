import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./BusinessFormat.module.css"

const BusinessFormat = (props) => {
  const pathToBusinessPage = '/BusinessPage';

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
            <h5 className="card-title text-center">{ props.business_name }</h5>
            <p className="card-text text-center">{ props.business_description }</p>
            <p className="card-text"><small className="text-muted">{ props.lastTouch }</small></p>
          </div>
        </div>

        <div className="card col-md-3 col-10 border-light" >
          <div className="card text-dark">
            <div className="border-dark card-header">
              <h5 className="text-center">
                Contact:
              </h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item text-center"><p>{ props.phoneNumber }</p></li>
              <li className="list-group-item text-center"><p>{ props.address }</p></li>
              <li className="list-group-item text-center"><p>{ props.email }</p></li>
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

export default BusinessFormat;