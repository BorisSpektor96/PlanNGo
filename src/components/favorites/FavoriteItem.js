import { Link } from "react-router-dom";

const FavoriteItem = ({ Business, deleteFavItem }) => {

  const pathToBusinessPage = '/BusinessPage';

  return (
    <li className="d-flex flex-wrap justify-content-between align-items-center border rounded border-secondary m-1 p-2">

      <div className="d-flex justify-content-between align-items-baseline ">
        <p className="p-1"> { Business.business_name }</p>
        <p className="p-1">{ Business.service }</p>
      </div>
      <div className="d-flex">
        <div>
          <Link className="btn"
            to={ pathToBusinessPage }
            id={ Business.business_name }
            state={ Business }
          >
            <lord-icon
              src="https://cdn.lordicon.com/kbtmbyzy.json"
              trigger="loop"
              colors="primary:#121331,secondary:#e83a30"
              state="loop"
              styles="width:250px;height:250px"
            ></lord-icon>
          </Link>
        </div>
        <div>
          <button className="btn " value={ Business.id } onClick={ () => {
            deleteFavItem(Business.email)
          } }>
            <lord-icon
              src="https://cdn.lordicon.com/gclzwloa.json"
              trigger="hover"
              colors="primary:#4030e8,secondary:#c71f16"
              styles="width:250px;height:250px"
            ></lord-icon>
          </button>
        </div>
      </div>
    </li>
  );
};
export default FavoriteItem;
