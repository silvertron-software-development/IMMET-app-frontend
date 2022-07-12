const FormRow = ({
  type,
  name,
  id,
  value,
  handleChange,
  labelText,
  placeholder,
}) => {
  return (
    <div className='field'>
      <label htmlFor={id} className='label'>
        {labelText || name}
      </label>
      <div className='control'>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className='input'
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
export default FormRow
