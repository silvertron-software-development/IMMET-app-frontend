import React from 'react'
import { useSelector } from 'react-redux'

const AllPricingsPage = () => {
  const { cotizaciones } = useSelector((store) => store.prices)
  console.log(cotizaciones)
  return (
    <section>
      <h2>
        {cotizaciones.length < 1
          ? 'No hay cotizaciones por el momento'
          : 'Cotizaciones realizadas'}
      </h2>
      <div>
        {cotizaciones.map((etiqueta) => {
          const { id, material, tintas } = etiqueta
          return (
            <article key={id}>
              <div>
                <h4>Material:</h4>
                <span>{material}</span>
              </div>
              <div>
                <h4>Tintas:</h4>
                <span>{tintas}</span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default AllPricingsPage
