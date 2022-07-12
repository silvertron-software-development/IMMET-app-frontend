const FormRowSelect = ({ labelText, name, id, value, handleChange, list }) => {
  return (
    <>
      {/* <div class="field"> */}
      <label className='label' htmlFor={id}>
        {labelText || name}
      </label>
      <div className='control'>
        <div className='select'>
          <select
            className=''
            name={name}
            id={name}
            value={value}
            onChange={handleChange}
          >
            {list.map((item) => {
              const { itemName, itemValue } = item
              return (
                <option key={itemValue} value={itemValue}>
                  {itemName}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}
export default FormRowSelect
