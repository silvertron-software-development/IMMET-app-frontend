import React, { useState } from 'react'
import styled from 'styled-components'
import 'bulma/css/bulma.css'
import FormRowSelect from './FormRowSelect'
import { materiales, reimpresion, tintas } from '../utils/selectData'
import useData from '../hooks/useData'
import FormRow from './FormRow'

const PricingForm = ({ step }) => {
  const [firstStep, setFirstStep] = useState(true)
  const [values, setValues] = useState({
    medidaEje: '',
    medidaDesarrollo: '',
    gapEje: '',
    gapDesarrollo: '',
    totalEtiquetas: '',
    numeroTintas: 1.1,
    etiquetaNueva: 0,
    material: 'thermal_transfer',
  })

  const {
    m2Factor,
    mtsLinealesTotales,
    merma,
    tiempoHoras,
    costoPorMilUnitario,
    costoMO,
    costoFijoTotal,
    costoFijoPorMil,
    precioVenta,
    utMillar,
    utPedido,
    utHoras,
    ventaTotal,
    comision,
  } = useData({
    ...values,
  })

  const handleChange = (e) => {
    console.log(e.target.value)
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <Wrapper className='section is-medium content'>
      <form className={`pricing-form ${firstStep && 'step-one'}`}>
        {firstStep ? (
          <>
            <FormRowSelect
              labelText='Número de Tintas'
              name='numeroTintas'
              id='numeroTintas'
              handleChange={handleChange}
              list={tintas}
              value={values.numeroTintas}
            />
            <FormRowSelect
              labelText='Etiqueta Nueva o Reimpresión'
              name='etiquetaNueva'
              id='etiquetaNueva'
              handleChange={handleChange}
              list={reimpresion}
              value={values.etiquetaNueva}
            />
            <FormRowSelect
              labelText='Material'
              name='material'
              id='material'
              handleChange={handleChange}
              list={materiales}
              value={values.material}
            />
          </>
        ) : (
          <>
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
              labelText='Gap al Eje'
              type='text'
              name='gapEje'
              id='gapEje'
              placeholder='0'
              value={values.gapEje}
              handleChange={handleChange}
            />
            <FormRow
              labelText='Gap al Desarrollo'
              type='text'
              name='gapDesarrollo'
              id='gapDesarrollo'
              placeholder='0'
              value={values.gapDesarrollo}
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
          </>
        )}
        <div className='buttons'>
          <button
            className='button is-info'
            type='button'
            onClick={() => setFirstStep(!firstStep)}
          >
            {firstStep ? 'Ir a Medidas' : 'Ir a especifiaciones'}
          </button>
          <button
            className='button is-success'
            type='button'
            onClick={() => console.log(values)}
          >
            Generar Cotización
          </button>
        </div>
      </form>
      {!firstStep && (
        <div className='computed-value-div content'>
          <div className='computed-div'>Factor de M2: {m2Factor}</div>
          <div className='computed-div'>
            Metros lineales totales: {mtsLinealesTotales.toFixed(2)}
          </div>
          <div className='computed-div'>Factor de Merma: {merma}</div>
          <div className='computed-div'>
            TIempo total en horas: {tiempoHoras.toFixed(2)}
          </div>
          <div className='computed-div'>
            Costo del material (USD) por cada millar:{' '}
            {costoPorMilUnitario.toFixed(2)}
          </div>
          <div className='computed-div'>
            Costo de la mano de obra: {costoMO.toFixed(2)}
          </div>
          <div className='computed-div'>
            Costo fijo total: {costoFijoTotal.toFixed(2)}
          </div>
          <div className='computed-div'>
            Costo fijo por cada millar: {costoFijoPorMil.toFixed(2)}
          </div>
          <div className='computed-div'>Precio: {precioVenta.toFixed(2)}</div>
          <div className='computed-div'>
            Utilidad po millar: {utMillar.toFixed(2)}
          </div>
          <div className='computed-div'>
            Utilidad del pedido: {utPedido.toFixed(2)}
          </div>
          <div className='computed-div'>
            Utilidad por horas: {utHoras.toFixed(2)}
          </div>
          <div className='computed-div'>Venta: {ventaTotal.toFixed(2)}</div>
          <div className='computed-div'>Comsión: {comision.toFixed(2)}</div>
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

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    .pricing-form {
      justify-items: center;
      gap: 1.5rem;
    }

    .step-one {
      grid-column: 1 / 3;
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
