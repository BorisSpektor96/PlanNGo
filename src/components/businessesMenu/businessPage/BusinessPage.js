import "bootstrap/dist/css/bootstrap.css";
import styles from "./BusinessPage.module.css"
import Review from "../../review/Review";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const BusinessPage = (props) => {



  const location = useLocation();
  const businessDetails = location.state;
  console.log(businessDetails);

  const pathToBackMenu = '/BusinessesMenu';

  return (
    <Fragment>
      <div className="d-flex justify-content-between p-5">
        <Link className="btn border-dark rounded pt-2" to={ pathToBackMenu }>
          <lord-icon
            src="https://cdn.lordicon.com/iiueiwdd.json"
            trigger="hover"
            colors="primary:#121331,secondary:#08a88a"
            styles="width:250px;height:250px">
          </lord-icon>
        </Link>
      </div>

      <div className="d-flex flex-wrap justify-content-around p-4 mt-2 mb-5">
        <div className="card border-light ">
          <div className="d-flex justify-content-center">
            <img className={ styles.img } src="./logo512.png" alt="..." />
          </div>
        </div>

        <div className="d-flex flex-wrap gap-5 justify-content-center align-items-start">

          <div className="card col-lg-4 col-lg-8 border-light ">
            <div className="card-body">
              <h5 className="card-title">{ businessDetails.businessName }</h5>
              <p className="card-text">{ businessDetails.businessDescription }</p>
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
                <li className="list-group-item "><p>{ businessDetails.tel }</p></li>
                <li className="list-group-item "><p>{ businessDetails.address }</p></li>
                <li className="list-group-item "><p>{ businessDetails.email }</p></li>
              </ul>
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-around col-lg-8 gap-3">
            <button className="d-flex btn btn-outline-primary align-items-center">
              <lord-icon
                src="https://cdn.lordicon.com/kbtmbyzy.json"
                trigger="loop"
                colors="primary:#121331,secondary:#e83a30"
                state="loop"
                styles="width:250px;height:250px">
              </lord-icon>
              <p className="m-0 ms-2">
                Schedule appointment
              </p>
            </button>
            <button className="d-flex btn btn-outline-success align-items-center">
              <lord-icon
                src="https://cdn.lordicon.com/puvaffet.json"
                trigger="loop"
                colors="primary:#121331,secondary:#e88c30"
                styles="width:250px;height:250px">
              </lord-icon>
              <p className="m-0 ms-2">Add Review</p>
            </button>
            <button className="d-flex btn btn-outline-warning align-items-center">
              <lord-icon
                src="https://cdn.lordicon.com/ytuosppc.json"
                trigger="loop"
                colors="primary:#4030e8,secondary:#c71f16"
                stroke="80"
                styles="width:350px;height:350px;"
              >
              </lord-icon>
              <p className="m-0 ms-2">
                add to favorite
              </p>
            </button>
          </div>

          <div>
            <div className="mt-5">
              <h3>Reviews</h3>
              <Review />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default BusinessPage; 