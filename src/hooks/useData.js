import { calculateUtility } from '../utils/calculateUtility'
import { tintasCantidad } from '../utils/selectData'

const useData = ({
  medidaEje,
  medidaDesarrollo,
  tipoCambio,
  totalEtiquetas,
  numeroTintas,
  etiquetaNueva,
  suaje,
  grabados,
  material,
  acabado,
  prorrateo,
  utilidad,
}) => {
  // TODO: implementar log files
  medidaEje = Number(medidaEje)
  medidaDesarrollo = Number(medidaDesarrollo)
  tipoCambio = Number(tipoCambio)
  totalEtiquetas = Number(totalEtiquetas)
  numeroTintas = Number(numeroTintas)
  etiquetaNueva = Number(etiquetaNueva)
  suaje = Number(suaje)
  grabados = Number(grabados)
  material = Number(material)
  acabado = Number(acabado)
  utilidad = Number(utilidad) / 100 + 1

  console.log(utilidad)
  console.log(acabado)
  console.log(etiquetaNueva)

  //Blanca es 0 tinttas todo lo demás es impresa
  const isBlanca = tintasCantidad[numeroTintas] < 1
    const isFondeada = tintasCantidad[numeroTintas] < 2

    const gapEje = !isBlanca ? 10 : 8

    const gapDesarrollo = 4

    tipoCambio = tipoCambio + 0.5

    const factorDeConversionMetrosCuadrados = 1000000

    const factorDeConversionEtiquetasAMillares = 1000

    const factorMetrosCuadrados =
      ((medidaEje + gapEje) * (medidaDesarrollo + gapDesarrollo)) /
      factorDeConversionMetrosCuadrados

    const totalMillares = totalEtiquetas / factorDeConversionEtiquetasAMillares

    const medidaDePasoDeEtiquetaEstandar = 177

    // const medidaDePasoDeEtiquetaExpress = 254

    //const numeroDeEtiquetasAlPaso = tintas[numeroTintas] < 1 ? Math.floor(254 / (medidaEje + gapEje)) : Math.floor(177 / (medidaEje + gapEje))

    // TODO: revisar bien las medidas de los pasos, no concuerdan con excel
    const numeroDeEtiquetasAlPaso = Math.floor(
      medidaDePasoDeEtiquetaEstandar / (medidaEje + gapEje)
    )

    const totalDeMetrosCuadrados = factorMetrosCuadrados * totalEtiquetas

    //Contempla ya los pasos con 7 pulgadas
    const metrosLinealesTotales =
      ((medidaDesarrollo + gapDesarrollo) * totalMillares) /
      numeroDeEtiquetasAlPaso

    let factorDeMerma = 1
    console.log(
      factorDeMerma,
      tintasCantidad[numeroTintas],
      150 / metrosLinealesTotales
    )
    console.log(isBlanca, !isBlanca)
    if (!isBlanca && 150 / metrosLinealesTotales <= 0.1) {
      factorDeMerma += 0.1
      console.log(factorDeMerma)
    } else if (!isBlanca && 150 / metrosLinealesTotales > 0.1) {
      factorDeMerma += 150 / metrosLinealesTotales
      console.log(factorDeMerma)
    } else if (isBlanca && 150 / metrosLinealesTotales <= 0.05) {
      factorDeMerma += 0.05
      console.log(factorDeMerma)
    } else if (isBlanca && 150 / metrosLinealesTotales > 0.05) {
      factorDeMerma += 150 / metrosLinealesTotales
      console.log(factorDeMerma)
    }

    const metrosCuadradosMasMerma = totalDeMetrosCuadrados * factorDeMerma

    const factorDeImpresion = numeroTintas

    const metrosCuadradosMasImpresion =
      metrosCuadradosMasMerma * factorDeImpresion

    const materialMasAcabado = material + acabado

    const importeTotal = metrosCuadradosMasImpresion * materialMasAcabado

    const importePorMillar = importeTotal / totalMillares

    const tiempoAproximado = metrosLinealesTotales / 30 / 60

    const horasExtraSumaManoDeObra = isBlanca ? 1 : 2

    const tiempoHorasManoDeObra = tiempoAproximado + horasExtraSumaManoDeObra

    // const tiempoTotal = tiempoAproximado + horasExtraSumaManoDeObra

    const importePorMillarPesos = importePorMillar * tipoCambio

    const calculatePrice = (cost, newTag) => {
      let extraProrrateo = 0
      if (prorrateo === 'prorrateo') {
        extraProrrateo = (suaje + grabados) / totalMillares
      }
      newTag = Number(newTag)
      let price = cost
      if (newTag === 0) {
        return price
      } else {
        return price + extraProrrateo
      }
    }

    const precio = calculatePrice(importePorMillarPesos, etiquetaNueva)

    const sueldoManoDeObraBlancas = 400

    const sueldoManoDeObraImpresas = 700

    const manoDeObraFija = isBlanca
      ? sueldoManoDeObraBlancas
      : sueldoManoDeObraImpresas

    const horasDia = 8

    const costoManoDeObra = (manoDeObraFija / horasDia) * tiempoHorasManoDeObra

    let costoMetroCuadradoPorMaquina = 0

    if (
      (!isBlanca && !isFondeada) &&
      totalDeMetrosCuadrados < 800
    ) {
      costoMetroCuadradoPorMaquina = 7.5
    } else if (
      (!isBlanca && !isFondeada) &&
      totalDeMetrosCuadrados >= 800 &&
      totalDeMetrosCuadrados < 1800
    ) {
      costoMetroCuadradoPorMaquina = 6
    } else if ((!isBlanca && !isFondeada) && totalDeMetrosCuadrados >= 1800) {
      costoMetroCuadradoPorMaquina = 4
    } else if (
      (isBlanca || isFondeada) &&
      totalDeMetrosCuadrados < 800
    ) {
      costoMetroCuadradoPorMaquina = 4
    } else if (
      (isBlanca || isFondeada) &&
      totalDeMetrosCuadrados >= 800 &&
      totalDeMetrosCuadrados < 1800
    ) {
      costoMetroCuadradoPorMaquina = 2.5
    } else if ((isBlanca || isFondeada) && totalDeMetrosCuadrados >= 1800) {
      costoMetroCuadradoPorMaquina = 1
    }

    const costoFijoTotal =
      metrosCuadradosMasImpresion * costoMetroCuadradoPorMaquina

    const costoFijoTotalPorMillar =
      (costoFijoTotal + costoManoDeObra) / totalMillares

    const costoFinal = precio + costoFijoTotalPorMillar

    const precioDeVenta = costoFinal * utilidad


  const utilidadSugerida = calculateUtility(
    numeroTintas,
    totalDeMetrosCuadrados
  )
  console.log('utilidad sugierida:', utilidadSugerida)

  const utilidadPorMillar = precioDeVenta - costoFinal

  const utilidadDelPedido = utilidadPorMillar * totalMillares

  // const utHoras = utPedido / tiempoHoras

  // const ventaTotal = precioVenta * (totalEtiquetas / 1000)

  const comision = utilidadDelPedido * 0.13

  return {
    precioDeVenta,
    totalDeMetrosCuadrados,
    utilidadSugerida,
    comision
  }
}

export default useData
