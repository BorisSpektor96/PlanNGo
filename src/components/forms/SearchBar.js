import styles from './SearchBar.module.css'
const SearchBar = () => {
  return (
    <form className="d-flex flex-wrap align-items-center justify-content-center mt-3 p-2">

      <div className="d-flex flex-wrap justify-content-center">
        <div className={ styles.boxinputwidth } class="p-2">
          <input
            type="text"
            className="form-control border-primary"
            id="inlineFormInputName2"
            placeholder="business name"
          />
        </div>

        <div className={ styles.boxinputwidth } class="p-2 ">
          <input
            type="text"
            className="form-control border-primary"
            id="inlineFormInputGroupService"
            placeholder="Service"
          />
        </div>
      </div>

      <div className={ styles.boxinputwidth } class="p-2">
        <select className="custom-select font-weight-lighter form-contro btn btn-dark" >
          <option selected="">choose location</option>
          <option value="Jerusalem">Jerusalem</option>
          <option value="Tel Aviv">Tel Aviv</option>
          <option value="Haifa">Three</option>
        </select>
      </div>

      <div className={ styles.boxinputwidth } class="d-flex justify-content-center p-2 ">
        <button type="button" class="btn btn-success">
          filter
        </button>
      </div>
    </form>
  );
};
export default SearchBar;
