import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const PricingForm = ({ step }) => {
  const [firstStep, setFirstStep] = useState(true)
  const [values, setValues] = useState({
    medidaEje: '',
    medidaDesarrollo: '',
    gapEje: '',
    gapDesarrollo: '',
    totalEtiquetas: '',
    numeroTintas: '',
    etiquetaNueva: false,
    material: 'thermal_transfer',
    ejeporDesarrollo: 0,
  })

  useEffect(() => {
    let product = values.medidaEje * values.medidaDesarrollo

    setValues({ ...values, ejeporDesarrollo: product })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.medidaEje, values.medidaDesarrollo])

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    console.log(values)
  }

  // const medidaFinal = useMemo(() => {
  //   let product = values.medidaEje * values.medidaDesarrollo
  //   return product
  // }, [values.medidaEje, values.medidaDesarrollo])

  return (
    <Wrapper>
      <form className='pricing-form'>
        {firstStep ? (
          <>
            <label className='input-label' htmlFor='numeroTintas'>
              Número de Tintas{' '}
            </label>
            <select
              className='form-select'
              value={values.numeroTintas}
              name='numeroTintas'
              id='numeroTintas'
              onChange={handleChange}
            >
              <option value={'1'}>1</option>
              <option value={'2'}>2</option>
              <option value={'3'}>3</option>
              <option value={'4'}>4</option>
              <option value={'5'}>5</option>
            </select>
            <label className='input-label' htmlFor='etiquetaNueva'>
              Etiqueta Nueva o Reimpresión{' '}
            </label>
            <select
              className='form-select'
              value={values.etiquetaNueva}
              name='etiquetaNueva'
              id='etiquetaNueva'
              onChange={handleChange}
            >
              <option value={false}>Reimpresión</option>
              <option value={true}>Nueva</option>
            </select>
            <label className='input-label' htmlFor='material'>
              Material
            </label>
            <select
              className='form-select'
              value={values.material}
              name='material'
              id='material'
              onChange={handleChange}
            >
              <option value={'thermal_transfer'}>Thermal Transfer</option>
              <option value={'couche_satin'}>Couche Satin</option>
              <option value={'p_blanca'}>Película Blanca</option>
              <option value={'t_p'}>Transparante y plata</option>
            </select>
          </>
        ) : (
          <>
            <div>{values.ejeporDesarrollo}</div>
            <label className='input-label' htmlFor='medidaEje'>
              Medida al Eje (mm){' '}
            </label>
            <input
              placeholder='0'
              type='text'
              value={values.medidaEje}
              className='number-input'
              name='medidaEje'
              id='medidaEje'
              onChange={handleChange}
            />
            <label className='input-label' htmlFor='medidaDesarrollo'>
              Medida al Desarrollo (mm){' '}
            </label>
            <input
              placeholder='0'
              type='text'
              value={values.medidaDesarrollo}
              className='number-input'
              name='medidaDesarrollo'
              id='medidaDesarrollo'
              onChange={handleChange}
            />
            <label className='input-label' htmlFor='gapEje'>
              Gap al eje (mm){' '}
            </label>
            <input
              placeholder='0'
              type='text'
              value={values.gapEje}
              className='number-input'
              name='gapEje'
              id='gapEje'
              onChange={handleChange}
            />
            <label className='input-label' htmlFor='gapEje'>
              Gap al Desarrollo (mm){' '}
            </label>
            <input
              placeholder='0'
              type='text'
              value={values.gapDesarrollo}
              className='number-input'
              name='gapDesarrollo'
              id='gapDesarrollo'
              onChange={handleChange}
            />
            <label className='input-label' htmlFor='totalEtiquetas'>
              Total de Etiquetas{' '}
            </label>
            <input
              placeholder='0'
              type='text'
              value={values.totalEtiquetas}
              className='number-input'
              name='totalEtiquetas'
              id='totalEtiquetas'
              onChange={handleChange}
            />
          </>
        )}
        <button
          type='button'
          className='btn submit-btn'
          onClick={() => setFirstStep(!firstStep)}
        >
          {firstStep ? 'Ir a Medidas' : 'Ir a especifiaciones'}
        </button>
        <button
          className='btn toggle-btn'
          type='button'
          onClick={() => console.log(values)}
        >
          Generar Cotización
        </button>
      </form>
    </Wrapper>
  )
}

export default PricingForm

const Wrapper = styled.section`
  .pricing-form {
    display: grid;
    gap: 1rem;
  }

  .form-select {
    height: 1.6rem;
    background-color: grey;
    border-radius: 0.4rem;
    color: white;
    font-weight: 600;
    border: none;
    box-shadow: rgb(1, 113, 181) 0px 3px 8px;
    cursor: pointer;
  }

  .input-label {
    font-weight: bold;
  }

  .number-input {
    height: 1.5rem;
    font-weight: bold;
    background-color: grey;
    border-radius: 0.5rem;
    color: white;
    border: none;
    box-shadow: rgb(1, 113, 181) 0px 3px 8px;
  }

  .btn {
    width: fit-content;
    justify-self: center;
    margin-top: 0.5rem;
    background-color: rgb(1, 113, 181);
    color: beige;
    border-radius: 0.5rem;
    padding: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border: 1px solid grey;
    cursor: pointer;
    font-weight: bold;
  }

  .toggle-btn {
    background-color: rgb(63, 115, 71);
  }

  .submit-btn {
    background-color: rgb(1, 113, 181);
  }

  @media (min-width: 900px) {
    .pricing-form {
      justify-items: center;
      gap: 1.5rem;
    }

    .form-select {
      width: 30%;
      height: 2rem;
    }

    .number-input {
      width: 50%;
      height: 1.5rem;
      font-size: 1rem;
      padding: 0.4rem;
    }
  }
`
