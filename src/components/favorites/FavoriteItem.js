import { Link } from "react-router-dom";

const FavoriteItem = (props) => {

  const pathToBusinessPage = '/BusinessPage';

  return (
    <li className="d-flex flex-wrap justify-content-between align-items-center border rounded border-secondary m-1 p-2">

      <div className="d-flex justify-content-between align-items-baseline ">
        <p className="p-1"> { props.business_name }</p>
        <p className="p-1">{ props.service }</p>
      </div>
      <div className="d-flex">
        <div>
          <Link className="btn"
            to={ pathToBusinessPage }
            id={ props.business_name }
            state={ props }
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
          <button className="btn " value={ props.id } onClick={ () => {
            props.deleteFavItem(props.email)
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
