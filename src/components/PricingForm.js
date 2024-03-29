import React, { useState, useEffect } from 'react'
import { addPricing, postNewPricing } from '../features/prices/pricesSlice'
import styled from 'styled-components'
import 'bulma/css/bulma.css'
import FormRowSelect from './FormRowSelect'
import {
  materiales,
  reimpresion,
  tintas,
  acabados,
  prorrateo,
} from '../utils/selectData'
import useData from '../hooks/useData'
import FormRow from './FormRow'
import { useDispatch } from 'react-redux'
import { calculateUtility } from '../utils/calculateUtility'

export const initState = {
  medidaEje: '',
  medidaDesarrollo: '',
  tipoCambio: '',
  totalEtiquetas: '',
  numeroTintas: 1,
  etiquetaNueva: 0,
  material: 0.5107,
  acabado: 0,
  prorrateo: 'prorrateo',
  suaje: '',
  grabados: '',
  utilidad: 80,
}

const PricingForm = () => {
  const [values, setValues] = useState(initState)
  const [suajeDisplay, setSuajeDisplay] = useState(false)
  const dispatch = useDispatch()

  const { precioDeVenta, totalDeMetrosCuadrados, comision } = useData({
    ...values,
  })

  const utilidadSugerida = calculateUtility(
    values.numeroTintas,
    totalDeMetrosCuadrados
  )
  useEffect(() => {
    setValues({ ...values, utilidad: utilidadSugerida })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [utilidadSugerida])

  const handleChange = (e) => {
    console.log(e.target.value)
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const resetValues = () => {
    setValues(initState)
  }

  const handleSuajeChange = (e) => {
    if (!suajeDisplay) {
      setValues({ ...values, suaje: '' })
    } else {
      setValues({ ...values, suaje: '' })
    }
    setSuajeDisplay(!suajeDisplay)
  }

  const sendPricings = () => {
    dispatch(addPricing(values))
    dispatch(postNewPricing())
    resetValues()
  }

  const addNewPricing = () => {
    dispatch(addPricing(values))
    resetValues()
  }

  return (
    <Wrapper className='section is-medium content'>
      <form className='pricing-form'>
        <FormRowSelect
          labelText='Etiqueta Nueva o Reimpresión'
          name='etiquetaNueva'
          id='etiquetaNueva'
          handleChange={handleChange}
          list={reimpresion}
          value={values.etiquetaNueva}
        />
        {values.etiquetaNueva === '1' && (
          <div>
            <label htmlFor='suajeDisplay'>Cobrar Suaje</label>
            <input
              type='checkbox'
              value={suajeDisplay}
              name='suajeDisplay'
              onChange={handleSuajeChange}
              id='suajeDisplay'
            />
          </div>
        )}

        {values.etiquetaNueva === '1' && (
          <>
            {suajeDisplay && (
              <FormRow
                labelText='Suaje'
                type='text'
                name='suaje'
                id='suaje'
                placeholder='0'
                value={values.suaje}
                handleChange={handleChange}
              />
            )}
            <FormRow
              labelText='Grabados'
              type='text'
              name='grabados'
              id='grabados'
              placeholder='0'
              value={values.grabados}
              handleChange={handleChange}
            />
          </>
        )}

        {values.etiquetaNueva === '1' && ( //cambiar por checkboxes suaje y grabado individual
          <FormRowSelect
            labelText='Proratear suaje y grabados'
            name='prorrateo'
            id='prorrateo'
            handleChange={handleChange}
            list={prorrateo}
            value={values.prorrateo}
          />
        )}

        <FormRowSelect
          labelText='Material'
          name='material'
          id='material'
          handleChange={handleChange}
          list={materiales}
          value={values.material}
        />
        <FormRowSelect
          labelText='Acabado'
          name='acabado'
          id='acabado'
          handleChange={handleChange}
          list={acabados}
          value={values.acabado}
        />

        <FormRowSelect
          labelText='Número de Tintas'
          name='numeroTintas'
          id='numeroTintas'
          handleChange={handleChange}
          list={tintas}
          value={values.numeroTintas}
        />

        <FormRow
          labelText='Medida al Eje'
          type='text'
          name='medidaEje'
          id='medidaEje'
          placeholder='0'
          value={values.medidaEje}
          handleChange={handleChange}
        />
        <FormRow
          labelText='Medida al Desarrollo'
          type='text'
          name='medidaDesarrollo'
          id='medidaDesarrollo'
          placeholder='0'
          value={values.medidaDesarrollo}
          handleChange={handleChange}
        />

        <FormRow
          labelText='Total de etiquetas individuales'
          type='text'
          name='totalEtiquetas'
          id='totalEtiquetas'
          placeholder='0'
          value={values.totalEtiquetas}
          handleChange={handleChange}
        />
        <FormRow
          labelText='Tipo de Cambio'
          type='text'
          name='tipoCambio'
          id='tipoCambio'
          placeholder='0'
          value={values.tipoCambio}
          handleChange={handleChange}
        />
        <div>
          <h6>Utilidad Sugerida: {utilidadSugerida}%</h6>
          <label>Utilidad: {values.utilidad}</label>
          <input
            type='range'
            name='utilidad'
            value={values.utilidad}
            max={200}
            min={30}
            step={5}
            onChange={handleChange}
          />
        </div>

        <div className='buttons'>
          <button
            className='button is-info'
            type='button'
            onClick={addNewPricing}
          >
            Guardar y Cotizar otra etiqueta
          </button>
          <button
            className='button is-success'
            type='button'
            onClick={sendPricings}
          >
            Generar Cotización
          </button>
          <span className='has-text-weight-bold is-size-3'>
            Precio de venta:
          </span>{' '}
          <span>{precioDeVenta}</span>
          <span className='has-text-weight-bold is-size-3'>Comisión:</span>
          <span>{comision}</span>
        </div>
      </form>
      {totalDeMetrosCuadrados < 200 && values.totalEtiquetas && (
        <div>
          <span className='has-text-danger is-size-3'>
            El total de metros cuadrados en el pedido es menor a 200.
          </span>
        </div>
      )}
    </Wrapper>
  )
}

export default PricingForm

const Wrapper = styled.section`
  display: grid;
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

  .m2-error {
    color: red;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr;
    .pricing-form {
      justify-items: center;
      gap: 1.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
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

    .computed-value-div {
      display: grid;
      justify-content: center;
    }
  }
`
