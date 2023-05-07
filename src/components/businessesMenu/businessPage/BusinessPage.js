import "bootstrap/dist/css/bootstrap.css";
import styles from "./BusinessPage.module.css"
import Review from "../../review/Review";
import { Fragment } from "react";
const BusinessPage = () => {

  return (
    <Fragment>
      <div className="d-flex flex-wrap justify-content-around p-4 mt-2 mb-5">

        <div class="card border-light ">
          <div class="d-flex justify-content-center">
            <img src="./logo512.png" alt="..." />
          </div>
        </div>

        <div class="d-flex flex-wrap gap-5 justify-content-center align-items-start">

          <div class="card col-lg-4 col-lg-8 border-light ">
            <div class="card-body">
              <h5 class="card-title">Business Name</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>

          <div class="card border-light" >
            <div class="card text-dark">
              <div class="border-dark card-header">
                <h5>
                  Contact:
                </h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item "><p>+9720541245678</p></li>
                <li class="list-group-item "><p>somewhere around the world</p></li>
                <li class="list-group-item "><p>mail@gmail.com</p></li>
              </ul>
            </div>
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
  );
}

export default BusinessPage;