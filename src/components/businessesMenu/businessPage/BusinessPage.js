import { Fragment, useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./BusinessPage.module.css";
import Review from "../../review/Review";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Calendar from "../../Calendar/AppointmentCalendar";
import AddReview from "../../review/AddReview";
import { ProfileInfoContext } from "../../../ProfileInfoContext";
import { PopupMessageContext } from "../../../PopupMessage";

const BusinessPage = () => {

  const { showMessage } = useContext(PopupMessageContext)

  const location = useLocation();
  const businessDetails = location.state;

  const { profileInfo, dispatch } = useContext(ProfileInfoContext)

  const [ isFavorite, setIsFavorite ] = useState(false);

  const [ addReviewIsShown, setAddReviewIsShown ] = useState(false);
  const [ calendarIsShown, setCalendarIsShown ] = useState(false);

  const addBusinessToFavorite = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/addToFavorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: profileInfo.email,
          businessEmail: businessDetails.email
        })
      });
      const data = await response.json()
      if (response.ok) {
        setIsFavorite(true)
        showMessage(data.message, data.type)
        await dispatch({ type: 'UPDATE_FAVORITES', payload: data.user.favorites })
      } else {
        showMessage(data.message, data.type)
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const deleteBusinessFromFavorites = async () => {
    console.log(businessDetails)
    try {
      const response = await fetch('http://localhost:3001/users/deleteFromFavoriteById', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: profileInfo.email,
          favoriteId: businessDetails.id
        })
      });
      const data = await response.json()

      if (response.ok) {
        setIsFavorite(false)
        showMessage(data.message, data.type)
        dispatch({ type: 'UPDATE_FAVORITES', payload: data.user.favorites })
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const scheduleOpenView = () => {
    showCalendarHandler()
  };

  const showCalendarHandler = () => {
    setCalendarIsShown(true)
  }
  const hideCalendarHandler = () => {
    setCalendarIsShown(false);
  };

  const showAddReview = () => {
    setAddReviewIsShown(true);
  };
  const hideFormHandler = () => {
    setAddReviewIsShown(false);
  };

  useEffect(() => {
    profileInfo.favorites.forEach(favorite => {
      console.log(favorite)
      if (favorite.email === businessDetails.email) {
        setIsFavorite(true)
      } else {
        setIsFavorite(false)
      }
    });
  }, [])

  const pathToBackMenu = "/BusinessesMenu";

  return (
    <Fragment>
      { calendarIsShown && <Calendar onClose={ hideCalendarHandler } /> }

      <div className="d-flex justify-content-between pt-3 ps-5 p-1">
        <Link className="btn border-dark rounded pt-2" to={ pathToBackMenu }>
          <lord-icon
            src="https://cdn.lordicon.com/iiueiwdd.json"
            trigger="hover"
            colors="primary:#121331,secondary:#08a88a"
            styles="width:250px;height:250px"
          ></lord-icon>
        </Link>
      </div>

      <div className="d-flex flex-wrap justify-content-around p-2 mt-1 mb-5">


        <div className="card border-light">
          <div className="d-flex justify-content-center">
            <img src={ businessDetails.profileImg ? `data:image/jpeg;base64,${businessDetails.profileImg}` : "./logo512.png" } className={ styles.img } alt="..." />
          </div>
        </div>

        <div className="d-flex flex-wrap gap-5 justify-content-center align-items-start">

          <div className="card col-lg-5 border-info">
            <div className="card-body">
              <h5 className="card-title">{ businessDetails.business_name }</h5>
              <p className="card-text">{ businessDetails.business_description }</p>
            </div>
          </div>

          <div className="card border-dark">
            <div className="card text-dark">
              <div className="border-dark card-header">
                <h5>Contact:</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item ">
                  <p>{ businessDetails.tel }</p>
                </li>
                <li className="list-group-item ">
                  <p>{ businessDetails.address }</p>
                </li>
                <li className="list-group-item ">
                  <p>{ businessDetails.email }</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-around col-lg-8 gap-3">
            <button
              className="d-flex btn btn-outline-primary align-items-center"
              onClick={ scheduleOpenView }
            >
              <lord-icon
                src="https://cdn.lordicon.com/kbtmbyzy.json"
                trigger="loop"
                colors="primary:#121331,secondary:#e83a30"
                state="loop"
                styles="width:250px;height:250px"
              ></lord-icon>
              <p className="m-0 ms-2">Schedule appointment</p>
            </button>

            <button
              onClick={ showAddReview }
              className="d-flex btn btn-outline-success align-items-center"
            >
              <lord-icon
                src="https://cdn.lordicon.com/puvaffet.json"
                trigger="loop"
                colors="primary:#121331,secondary:#e88c30"
                styles="width:250px;height:250px"
              ></lord-icon>
              <p className="m-0 ms-2">Add Review</p>
            </button>
            { isFavorite ?
              (<button
                className={ `d-flex btn btn-outline-warning align-items-center ${isFavorite ? "active" : ""
                  }` }
                onClick={ deleteBusinessFromFavorites }
              >
                <lord-icon
                  src="https://cdn.lordicon.com/ytuosppc.json"
                  trigger="loop"
                  delay="1200"
                  colors="primary:#c71f16,secondary:#c71f16"
                  stroke="80"
                  styles="width:350px;height:350px;"
                >
                </lord-icon>
              </button>)
              :
              (<button
                className={ `d-flex btn btn-outline-warning align-items-center ${isFavorite ? "active" : ""
                  }` }
                onClick={ addBusinessToFavorite }
              >
                <lord-icon
                  src="https://cdn.lordicon.com/ytuosppc.json"
                  trigger="loop"
                  delay="1200"
                  colors="primary:#4030e8,secondary:#c71f16"
                  stroke="80"
                  styles="width:350px;height:350px;"
                >
                </lord-icon>
                <p className="m-0 ">Add to favorites</p>
              </button>)
            }
          </div>

        </div>
        <div className="d-flex flex-column col-10 mt-4">
          <div  >
            <h3>Reviews</h3>
          </div>
          <Review reviews={ businessDetails.reviews } />
        </div>
      </div>
      { addReviewIsShown &&
        <AddReview
          profileInfo={ profileInfo }
          businessDetails={ businessDetails }
          onClose={ hideFormHandler }
        />
      }
    </Fragment>
  );
};

export default BusinessPage;
