import "./formInput.css";

const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  return (
    <div className="formInput">
      <label className="form-label">{ label }</label>
      <input className="form-control"
        { ...inputProps }
        onChange={ onChange }
      />
      <span>{ errorMessage }</span>
    </div>
  );
};

export default FormInput;