const SearchBar = ({
  filterName,
  filterService,
  filterLocation,
  setFilterName,
  setFilterService,
  setFilterLocation,
  handleFilter,
}) => {

  const handleFilterClick = () => {
    handleFilter();
  };

  return (
    <form className="d-flex flex-wrap align-items-center justify-content-center mt-3 p-2">
      <div className="d-flex flex-wrap justify-content-center">
        <div className="p-2">
          <input
            type="text"
            className="form-control border-primary"
            id="inlineFormInputName2"
            placeholder="Business Name"
            value={ filterName }
            onChange={ (e) => setFilterName(e.target.value) }
          />
        </div>

        <div className="p-2">
          <input
            type="text"
            className="form-control border-primary"
            id="inlineFormInputGroupService"
            placeholder="Service"
            value={ filterService }
            onChange={ (e) => setFilterService(e.target.value) }
          />
        </div>
      </div>

      <div className="p-2">
        <input
          type="text"
          className="form-control border-primary"
          id="inlineFormInputLocation"
          placeholder="City"
          value={ filterLocation }
          onChange={ (e) => setFilterLocation(e.target.value) }
        />
      </div>

      <div className="d-flex justify-content-center p-2">
        <button
          type="button"
          className="btn btn-success"
          onClick={ handleFilterClick }
        >
          Filter
        </button>
      </div>
    </form>
  );
};
export default SearchBar;