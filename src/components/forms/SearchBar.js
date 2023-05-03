const SearchBar = () => {
  return (
    <form class="form-inline justify-content-center pt-5">
      <label class="sr-only" for="inlineFormInputName2"></label>
      <input
        type="text"
        class="form-control mb-2 mr-sm-2"
        id="inlineFormInputName2"
        placeholder="business name"
      />

      <div class="input-group mb-2 mr-sm-2">
        <input
          type="text"
          class="form-control"
          id="inlineFormInputGroupService"
          placeholder="Service"
        />
      </div>

      <div class="form-check mb-2 mr-sm-2">
        <select class="custom-select font-weight-lighter form-control" >
          <option selected>region</option>
          <option value="Jerusalem">Jerusalem</option>
          <option value="Tel Aviv">Tel Aviv</option>
          <option value="Haifa">Three</option>
        </select>
      </div>

      <button type="submit" class="btn btn-outline-info mb-2">
        filter
      </button>
    </form>
  );
};
export default SearchBar;
