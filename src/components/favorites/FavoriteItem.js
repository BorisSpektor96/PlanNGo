
const FavoriteItem = (props) => {

  return (
    <li className="d-flex border m-1  align-items-center">

      <div className="d-flex align-items-baseline ">
        <p className="m-3"> { props.name }</p>
        <p>{ props.service }</p>
      </div>
      <div>
        <button className="btn ">
          <lord-icon
            src="https://cdn.lordicon.com/kbtmbyzy.json"
            trigger="loop"
            colors="primary:#121331,secondary:#e83a30"
            state="loop"
            styles="width:250px;height:250px"
          ></lord-icon>
        </button>
      </div>
      <div>
        <button className="btn " value={ props.id } onClick={ () => {
          props.deleteFavItem(props.id)
        } }>
          <lord-icon
            src="https://cdn.lordicon.com/gclzwloa.json"
            trigger="hover"
            colors="primary:#4030e8,secondary:#c71f16"
            styles="width:250px;height:250px"
          ></lord-icon>
        </button>
      </div>
    </li>
  );
};
export default FavoriteItem;
