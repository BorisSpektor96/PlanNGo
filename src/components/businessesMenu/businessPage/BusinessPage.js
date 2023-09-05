import { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Review from "../../review/Review";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Calendar from "../../Calendar/AppointmentCalendar";
import AddReview from "../../review/AddReview";
import { PopupMessageContext } from "../../../PopupMessage";
import Recommendations from "../recommendations/Recomendations"
import MessageForm from "../../messages/MessageForm";
import { useDispatch, useSelector } from "react-redux";
import { updateFavorites } from '../../../profileInfoSlice'
import CustomAlert from "../../UI/CustomAlert ";
import styles from "./BusinessPage.module.css"
import { addBusinessToFavorite, deleteBusinessFromFavorites } from '../../favorites/FavoriteService';

const BusinessPage = () => {
  const { showMessage } = useContext(PopupMessageContext)
  const [ showConfirmation, setShowConfirmation ] = useState(false);

  const location = useLocation();
  const businessDetails = location.state;

  const profileInfo = useSelector(state => state.profileInfo)
  const dispatch = useDispatch()
  const [ isFavorite, setIsFavorite ] = useState(false);

  const [ addReviewIsShown, setAddReviewIsShown ] = useState(false);
  const [ calendarIsShown, setCalendarIsShown ] = useState(false);
  const [ addMassageIsShown, setAddMassageIsShown ] = useState(false);

  const [ workingHours, setWorkingHours ] = useState('')
  const [ appointmentsDef, setAppointmentDef ] = useState({})
  const [ currentStep, setCurrentStep ] = useState(0);

  const [ cartList, setCartList ] = useState([])

  let type = "user"
  if (profileInfo.isBusiness) {
    type = "business"
  }

  const sendCartListToServer = async (cart) => {
    try {
      const response = await fetch("http://localhost:3001/business/incrementProductQuantityArray", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: businessDetails.email,
          productsArray: cart,
        }),
      });

      if (!response.ok) {
        throw new Error("Server request failed");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error("Server request failed");
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [ businessDetails ]);

  useEffect(() => {
    if (businessDetails.appointmentsDef.businessHours) {
      setWorkingHours({
        start: businessDetails.appointmentsDef.businessHours.start,
        end: businessDetails.appointmentsDef.businessHours.end
      })
      setAppointmentDef(businessDetails.appointmentsDef)
    } else {
      setWorkingHours({ start: "--:--", end: "--:--" })
    }
    if (profileInfo.favorites) {
      profileInfo.favorites.forEach(fav => {
        if (fav.email === businessDetails.email) {
          setIsFavorite(true)
        }
      })
    }
  }, [])

  const addBusinessToFavoriteReq = async () => {
    try {
      const data = await addBusinessToFavorite(profileInfo.email, businessDetails.email);
      setIsFavorite(true);
      showMessage(data.message, data.type);
      dispatch(updateFavorites(data.favorites));
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const deleteBusinessFromFavoritesReq = async () => {
    try {
      const data = await deleteBusinessFromFavorites(profileInfo.email, businessDetails.email);
      setIsFavorite(false);
      showMessage(data.message, data.type);
      dispatch(updateFavorites(data.favorites));
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const hideCalendarHandler = async () => {
    if (currentStep === 5) {
      setCalendarIsShown(false);
      handleStepChange(0)
      setShowConfirmation(false);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleAlertConfirm = async () => {
    if (currentStep !== 5) {
      setCalendarIsShown(false);
    }
    handleStepChange(0)
    setShowConfirmation(false);
    await sendCartListToServer(cartList)
    setCartList([])
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const postReviewToBusiness = async (reviewer, content, rating, date, userEmail) => {
    try {
      const formValues = {
        email: businessDetails.email,
        reviewer: reviewer,
        content: content,
        rating: rating,
        date: date,
        userEmail: userEmail
      };
      const response = await fetch('http://localhost:3001/business/addReviewToBusiness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      showMessage(data.message, data.type)
      businessDetails.reviews = data.reviews
    } catch (error) {
      console.error('Add review failed:', error);
    }
  };

  const handleReviewUpdate = async (name, reviewContent, reviewRate, reviewDate, userEmail) => {
    await postReviewToBusiness(name, reviewContent, reviewRate, reviewDate, userEmail)
  }

  const pathToBackMenu = "/BusinessesMenu";

  return (
    <div>

      <CustomAlert
        isOpen={ showConfirmation }
        toggle={ () => setShowConfirmation(false) }
        message="Are you sure you want to close? Any unsaved changes will be lost."
        onConfirm={ handleAlertConfirm }
      />

      { calendarIsShown &&
        <Calendar
          sendCartListToServer={ sendCartListToServer }
          profileInfo={ profileInfo }
          workingHours={ workingHours }
          businessDetails={ businessDetails }
          onClose={ hideCalendarHandler }
          appointmentsDef={ appointmentsDef }
          onStepChange={ handleStepChange }
          currentStep={ currentStep }
          cartList={ cartList }
          setCartList={ setCartList }
        />
      }

      <div className="d-flex justify-content-between  p-3 ">
        <Link className="btn border-dark rounded pt-2" to={ pathToBackMenu }>
          <lord-icon
            src="https://cdn.lordicon.com/iiueiwdd.json"
            trigger="hover"
            colors="primary:#121331,secondary:#08a88a"
            styles="width:250px;height:250px"
          ></lord-icon>
        </Link>
      </div>

      <div className="d-flex row flex-wrap justify-content-center  ">

        <div className="  col-lg-5 m-4 pb-4">

          <div className="d-flex justify-content-center pb-2  ">
            <img className=" rounded-circle border " src={ businessDetails.profileImg ? `data:image/jpeg;base64,${businessDetails.profileImg}` : "./logo512.png" } alt="..." />
          </div>
          <div className="d-flex  flex-column ">
            <h5 className="card-title d-flex justify-content-center">{ businessDetails.business_name }</h5>
            <p className="card-text pt-1 d-flex justify-content-center">{ businessDetails.business_description }</p>
          </div>

          <div className="hstack gap-1 pt-2  d-flex justify-content-center">
            { businessDetails.phoneNumber }
            <div className="vr"></div>
            { businessDetails.email }
            <div className="vr"></div>
            { businessDetails.address }
            <div className="vr"></div>
            { workingHours.start } - { workingHours.end }
          </div>
        </div>

        <div className="d-flex flex-wrap gap-5 justify-content-center align-items-start">
          <div className="d-flex flex-wrap justify-content-around col-lg-8 gap-3">
            <button
              onClick={ () => setAddReviewIsShown(true) }
              className={ `d-flex btn btn-outline-success align-items-center ${styles.btn}` }            >
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
                className={ `d-flex btn btn-outline-warning align-items-center  ${styles.btn} ${isFavorite ? "active" : ""
                  }` }
                onClick={ deleteBusinessFromFavoritesReq }
              >

                <lord-icon
                  src="https://cdn.lordicon.com/ytuosppc.json"
                  trigger="loop"
                  delay="1200"
                  colors="primary:#c71f16,secondary:#c71f16"
                  stroke="80"
                >
                </lord-icon>
                <p className="m-0 ms-2 text-center">Is Favorite</p>

              </button>)
              :
              (<button
                className={ `d-flex btn btn-outline-warning align-items-center ${styles.btn} ${isFavorite ? "active" : ""
                  }` }
                onClick={ addBusinessToFavoriteReq }
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

            <button
              onClick={ () => setAddMassageIsShown(true) }
              className={ `d-flex btn btn-outline-info align-items-center ${styles.btn}` }            >
              <lord-icon
                src="https://cdn.lordicon.com/rhvddzym.json"
                trigger="loop"
                colors="primary:#121331,secondary:#08a88a"
                styles="width:250px;height:250px">
              </lord-icon>

              <p className="m-0 ms-2">Send Message</p>
            </button>

            <button
              className={ `d-flex btn btn-outline-primary align-items-center ${styles.btn}` }
              onClick={ () => setCalendarIsShown(true) }
            >
              <lord-icon
                src="https://cdn.lordicon.com/kbtmbyzy.json"
                trigger="loop"
                colors="primary:#121331,secondary:#e83a30"
                state="loop"
                styles="width:250px;height:250px"
              ></lord-icon>
              <p className="m-0 ms-2">Schedule Appointment</p>
            </button>
          </div>

        </div>

        <div className="d-flex flex-column col-10 mt-4">
          <Review reviews={ businessDetails.reviews } />
        </div>
      </div>

      { addMassageIsShown && (
        <MessageForm
          from={ profileInfo.email }
          to={ businessDetails.email }
          type={ type }
          onClose={ () => setAddMassageIsShown(false) }
        />
      ) }

      { addReviewIsShown &&
        <AddReview
          profileInfo={ profileInfo }
          businessDetails={ businessDetails }
          onClose={ () => setAddReviewIsShown(false) }
          handleReviewUpdate={ handleReviewUpdate }
        />
      }
      <Recommendations
        currentBusiness={ businessDetails.email }
      />
    </div>
  );
};

export default BusinessPage;