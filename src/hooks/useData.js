const useData = ({
  medidaEje,
  medidaDesarrollo,
  totalEtiquetas,
  numeroTintas,
  etiquetaNueva,
  tipoCambio,
  material,
}) => {
  const suaje = 5000
  const grabados = 4000
  const currencyExchange = Number(tipoCambio) + 0.5
  const gapEje = numeroTintas >= 1 ? 10 : 8
  const gapDesarrollo = 4

  numeroTintas = Number(numeroTintas)
  etiquetaNueva = Number(etiquetaNueva)

  const m2Factor =
    ((Number(medidaEje) + Number(gapEje)) *
      (Number(medidaDesarrollo) + Number(gapDesarrollo))) /
    1000000

  const mtsLinealesTotales =
    ((Number(medidaDesarrollo) + Number(gapDesarrollo)) / 1000) *
    Number(totalEtiquetas)

  const merma = 150 / mtsLinealesTotales < 0.1 ? 0.1 : 150 / mtsLinealesTotales

  const tiempoHoras = mtsLinealesTotales / 30 / 60 + 1

  const costoPorMilUnitario =
    ((m2Factor * totalEtiquetas * (1 + merma) * numeroTintas * 0.51) /
      (totalEtiquetas / 1000)) *
    currencyExchange

  const calculatePrice = (cost, newTag, grabado, sua) => {
    newTag = Number(newTag)
    let price = cost
    if (newTag === 0) {
      console.log(cost)
      console.log(price)
      return price
    } else {
      return price + grabado + sua
    }
  }

  const precio = calculatePrice(
    costoPorMilUnitario,
    etiquetaNueva,
    grabados,
    suaje
  )

  const costoMO = (700 / 8) * tiempoHoras

  const costoFijoTotal =
    m2Factor * totalEtiquetas * numeroTintas * (merma + 1) * 2.5

  const costoFijoPorMil = (costoFijoTotal + costoMO) / (totalEtiquetas / 1000)

  const precioVenta = (precio + costoFijoPorMil) * 1.3

  const utMillar = precioVenta - (costoFijoPorMil + precio)

  const utPedido = utMillar * (totalEtiquetas / 1000)

  const utHoras = utPedido / tiempoHoras

  const ventaTotal = precioVenta * (totalEtiquetas / 1000)

  const comision = utPedido * 0.2

  return {
    m2Factor,
    mtsLinealesTotales,
    suaje,
    grabados,
    currencyExchange,
    merma,
    tiempoHoras,
    costoPorMilUnitario,
    precio,
    costoMO,
    costoFijoTotal,
    costoFijoPorMil,
    precioVenta,
    utMillar,
    utPedido,
    utHoras,
    ventaTotal,
    comision,
  }
}

export default useData
