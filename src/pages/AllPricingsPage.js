import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { materialesMap, tintasCantidad } from '../utils/selectData'
import { AiFillDelete } from 'react-icons/ai'
import { removePricing } from '../features/prices/pricesSlice'

const AllPricingsPage = () => {
  const { cotizaciones } = useSelector((store) => store.prices)
  const dispatch = useDispatch()

  return (
    <section>
      <div className='block'>
        <h2 className='title'>
          {cotizaciones.length < 1
            ? 'No hay cotizaciones por el momento'
            : 'Cotizaciones realizadas'}
        </h2>
      </div>
      <div className='block'>
        {cotizaciones.map((etiqueta) => {
          console.log(etiqueta)
          const { id, material, numeroTintas, medidaEje, medidaDesarrollo } =
            etiqueta
          return (
            <article key={id} className='box columns is-mobile'>
              <div className='column'>
                <h4 className='title is-6'>Material:</h4>
                <span>{materialesMap[material]}</span>
              </div>
              <div className='column'>
                <h4 className='title is-6'>Tintas:</h4>
                <span>{tintasCantidad[numeroTintas]}</span>
              </div>
              <div className='column'>
                <h4 className='title is-6'>Medidas:</h4>
                <span>
                  {medidaEje}X{medidaDesarrollo}
                </span>
              </div>
              <div className='column'>
                <span className='react-icons'>
                  <AiFillDelete
                    onClick={() => dispatch(removePricing(id))}
                    className='icon react-icons pointer'
                  />
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default AllPricingsPage
