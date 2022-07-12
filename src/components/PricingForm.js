import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import 'bulma/css/bulma.css'

const PricingForm = ({ step }) => {
  const [firstStep, setFirstStep] = useState(true)
  const [values, setValues] = useState({
    medidaEje: '',
    medidaDesarrollo: '',
    gapEje: '',
    gapDesarrollo: '',
    totalEtiquetas: '',
    numeroTintas: 1.1,
    etiquetaNueva: false,
    material: 'thermal_transfer',
    ejeporDesarrollo: 0,
  })

  const suaje = 5000
  const grabados = 4000
  const currencyExchange = 21

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const m2Factor = useMemo(() => {
    return (
      ((Number(values.medidaEje) + Number(values.gapEje)) *
        (Number(values.medidaDesarrollo) + Number(values.gapDesarrollo))) /
      1000000
    )
  }, [
    values.medidaEje,
    values.gapEje,
    values.medidaDesarrollo,
    values.gapDesarrollo,
  ])

  const mtsLinealesTotales = useMemo(() => {
    return (
      ((Number(values.medidaDesarrollo) + Number(values.gapDesarrollo)) /
        1000) *
      Number(values.totalEtiquetas)
    )
  }, [values.medidaDesarrollo, values.gapDesarrollo, values.totalEtiquetas])

  const merma = useMemo(() => {
    let tempWaste = 150 / mtsLinealesTotales
    console.log(tempWaste)
    if (tempWaste < 0.1) {
      tempWaste = 0.1
    }
    return tempWaste
  }, [mtsLinealesTotales])

  const tiempoHoras = useMemo(() => {
    return mtsLinealesTotales / 30 / 60 + 1
  }, [mtsLinealesTotales])

  const costoPorMilUnitario = useMemo(() => {
    let precioUnitario = m2Factor * values.totalEtiquetas
    precioUnitario = precioUnitario * (1 + merma) * values.numeroTintas
    precioUnitario = precioUnitario * 0.51
    precioUnitario = precioUnitario / (values.totalEtiquetas / 1000)
    precioUnitario = precioUnitario * currencyExchange
    return precioUnitario
  }, [values.totalEtiquetas, m2Factor, merma, values.numeroTintas])

  const precio = useMemo(() => {
    console.log('recalculando normal')
    let tempPrice = costoPorMilUnitario
    console.log(values.etiquetaNueva)
    console.log(costoPorMilUnitario)
    if (values.etiquetaNueva) {
      tempPrice = tempPrice + suaje + grabados
    }
    console.log(tempPrice)

    return tempPrice
  }, [costoPorMilUnitario, values.etiquetaNueva])

  const costoMO = useMemo(() => {
    return (700 / 8) * tiempoHoras
  }, [tiempoHoras])

  const costoFijoTotal = useMemo(() => {
    return (
      m2Factor * values.totalEtiquetas * values.numeroTintas * (merma + 1) * 2.5
    )
  }, [m2Factor, values.totalEtiquetas, values.numeroTintas, merma])

  const costoFijoPorMil = useMemo(() => {
    return (costoFijoTotal + costoMO) / (values.totalEtiquetas / 1000)
  }, [costoFijoTotal, costoMO, values.totalEtiquetas])

  const precioVenta = useMemo(() => {
    console.log('recalculando')
    return (precio + costoFijoPorMil) * 1.3
  }, [precio, costoFijoPorMil])

  const utMillar = useMemo(() => {
    return precioVenta - (costoFijoPorMil + precio)
  }, [precioVenta, costoFijoPorMil, precio])

  const utPedido = useMemo(() => {
    return utMillar * (values.totalEtiquetas / 1000)
  }, [utMillar, values.totalEtiquetas])

  const utHoras = useMemo(() => {
    return utPedido / tiempoHoras
  }, [tiempoHoras, utPedido])

  const ventaTotal = useMemo(() => {
    return precioVenta * (values.totalEtiquetas / 1000)
  }, [precioVenta, values.totalEtiquetas])

  const comision = useMemo(() => {
    return utPedido * 0.2
  }, [utPedido])

  return (
    <Wrapper className='section is-medium content'>
      <form className={`pricing-form ${firstStep && 'step-one'}`}>
        {firstStep ? (
          <>
            {/* <div class="field"> */}
              <label class="label" htmlFor='numeroTintas'>Número de Tintas</label>
                <div class="control">
                <div class="select">
                  <select
                    className=''
                    value={values.numeroTintas}
                    name='numeroTintas'
                    id='numeroTintas'
                    onChange={handleChange}
                  >
                    <option value={1.1}>1</option>
                    <option value={1.15}>2</option>
                    <option value={1.19}>3</option>
                    <option value={1.24}>4</option>
                    <option value={1.29}>5</option>
                  </select>
                </div>
                </div>
            {/* </div> */}

            {/* <div class="field"> */}
              <label class="label" htmlFor='etiquetaNueva'>Etiqueta Nueva o Reimpresión</label>
                <div class="control">
                <div class="select">
                  <select
                    className=''
                    value={values.etiquetaNueva}
                    name='etiquetaNueva'
                    id='etiquetaNueva'
                    onChange={handleChange}
                  >
                    <option value={false}>Reimpresión</option>
                    <option value={true}>Nueva</option>
                  </select>
                </div>
                </div>
            {/* </div> */}

            {/* <div class="field"> */}
              <label class="label" htmlFor='material'>Material</label>
                <div class="control">
                <div class="select">
                  <select
                    className=''
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
                </div>
                </div>
            {/* </div> */}
          </>
        ) : (
          <>
            <div class="field">
              <label class="label" htmlFor='medidaEje'>Medida al Eje (mm)</label>
                <div class="control">
                  <input class="input" value={values.medidaEje} type="text" placeholder="0" name='medidaEje' id='medidaEje' onChange={handleChange}/>
                </div>
            </div>
            <div class="field">
              <label class="label" htmlFor='medidaEje'>Medida al Desarrollo (mm)</label>
                <div class="control">
                  <input class="input" value={values.medidaDesarrollo} type="text" placeholder="0" name='medidaDesarrollo' id='medidaDesarrollo' onChange={handleChange}/>
                </div>
            </div>
            <div class="field">
              <label class="label" htmlFor='gapEje'>Gap al eje (mm){' '}</label>
                <div class="control">
                  <input class="input" value={values.gapEje} type="text" placeholder="0" name='gapEje' id='gapEje' onChange={handleChange}/>
                </div>
            </div>
            <div class="field">
              <label class="label" htmlFor='gapDesarrollo'>Gap al Desarrollo (mm)</label>
                <div class="control">
                  <input class="input" value={values.gapDesarrollo} type="text" placeholder="0" name='gapDesarrollo' id='gapDesarrollo' onChange={handleChange}/>
                </div>
            </div>
            <div class="field">
              <label class="label" htmlFor='totalEtiquetas'>Total de etiquetas individuales</label>
                <div class="control">
                  <input class="input" value={values.totalEtiquetas} type="text" placeholder="0" name='totalEtiquetas' id='totalEtiquetas' onChange={handleChange}/>
                </div>
            </div>
          </>
        )}
        <div class="buttons">
          <button class="button is-info" type='button' onClick={() => setFirstStep(!firstStep)}>{firstStep ? 'Ir a Medidas' : 'Ir a especifiaciones'}</button>
          <button class="button is-success" type='button' onClick={() => console.log(values)}>Generar Cotización</button>
        </div>
      </form>
      {!firstStep && (
        <div className='computed-value-div content'>
          <div className='computed-div'>
            Factor de M2: {m2Factor.toFixed(2)}
          </div>
          <div className='computed-div'>
            Metros lineales totales: {mtsLinealesTotales.toFixed(2)}
          </div>
          <div className='computed-div'>
            Factor de Merma: {merma.toFixed(2)}
          </div>
          <div className='computed-div'>
            TIempo total en horas: {tiempoHoras.toFixed(2)}
          </div>
          <div className='computed-div'>
            Costo del material (USD) por cada millar: {costoPorMilUnitario.toFixed(2)}
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
          <div className='computed-div'>Utilidad po millar: {utMillar.toFixed(2)}</div>
          <div className='computed-div'>Utilidad del pedido: {utPedido.toFixed(2)}</div>
          <div className='computed-div'>Utilidad por horas: {utHoras.toFixed(2)}</div>
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
