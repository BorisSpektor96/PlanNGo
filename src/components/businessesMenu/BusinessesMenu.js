import { Fragment } from "react";
import styles from "./BusinessesMenu.module.css";
import "bootstrap/dist/css/bootstrap.css";
import SearchBar from '../forms/SearchBar';
import { Link, useNavigate } from "react-router-dom";

const BusinessesMenu = () => {
  const pathToBusinessPage = '/BusinessPage';

  const theBusiness = (

    <div className="d-flex flex-wrap justify-content-around p-4 mt-2 mb-5">

      <div class="d-flex flex-wrap gap-5 justify-content-center align-items-start">

        <div class="card border-light ">
          <div class="d-flex justify-content-center">
            <img src="./logo512.png" className={ styles.img } alt="..." />
          </div>
        </div>

        <div class="card col-lg-4 col-md-6 border-light ">
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
            <Link className="btn btn-outline-primary" to={ pathToBusinessPage }>Go To Service</Link>
          </div>
        </div>

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