import { Fragment } from "react";
import styles from "./BusinessesMenu.module.css";
import "bootstrap/dist/css/bootstrap.css";
import SearchBar from '../forms/SearchBar'
const BusinessesMenu = () => {

  const theBusiness = (
    <div class="d-flex border border-secondary flex-wrap justify-content-center p-4 mt-2 mb-5">

      <div class="card mb-3 col-lg-8 me-2 border-light">
        <div class="row g-0">
          <div class="d-flex justify-content-center col-md-4">
            <img src="./logo192.png" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title">Business Name</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>

      <div class="card text-dark bg-info ms-2 border-primary">
        <div class="border-dark card-header">
          <h5>
            Contact:
          </h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item bg-info"><p>+9720541245678</p></li>
          <li class="list-group-item bg-info"><p>somewhere around the world</p></li>
          <li class="list-group-item bg-info"><p>mail@gmail.com</p></li>
        </ul>
      </div>


    </div>
  )

  return (
    <Fragment className={ styles.height }>
      <SearchBar />
      <div class='d-flex flex-column p-3'>

        { theBusiness }
        { theBusiness }

      </div>
    </Fragment>
  );

}

export default BusinessesMenu;