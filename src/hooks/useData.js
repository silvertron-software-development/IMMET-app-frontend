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
  suaje = Number(etiquetaNueva)
  grabados = Number(etiquetaNueva)
  material = Number(material)
  acabado = Number(acabado)
  utilidad = Number(utilidad) / 100 + 1

  console.log(utilidad)
  console.log(acabado)
  console.log(etiquetaNueva)

  //Blanca es 0 tinttas todo lo demás es impresa
  const isBlanca = tintasCantidad[numeroTintas] < 1
  const isFondeada = tintasCantidad[numeroTintas] < 2

  // console.log('Is Blanca: ', isBlanca)

  const gapEje = !isBlanca ? 10 : 8

  // console.log('Gap al eje: ', gapEje)

  const gapDesarrollo = 4

  tipoCambio = tipoCambio + 0.5

  const factorDeConversionMetrosCuadrados = 1000000

  const factorDeConversionEtiquetasAMillares = 1000

  const factorMetrosCuadrados =
    ((medidaEje + gapEje) * (medidaDesarrollo + gapDesarrollo)) /
    factorDeConversionMetrosCuadrados

  // console.log('factor M2: ', factorMetrosCuadrados)

  const totalMillares = totalEtiquetas / factorDeConversionEtiquetasAMillares

  // console.log('Total de millares: ', totalMillares)

  const medidaDePasoDeEtiquetaEstandar = 177

  // const medidaDePasoDeEtiquetaExpress = 254

  //const numeroDeEtiquetasAlPaso = tintas[numeroTintas] < 1 ? Math.floor(254 / (medidaEje + gapEje)) : Math.floor(177 / (medidaEje + gapEje))

  // TODO: revisar bien las medidas de los pasos, no concuerdan con excel
  const numeroDeEtiquetasAlPaso = Math.floor(
    medidaDePasoDeEtiquetaEstandar / (medidaEje + gapEje)
  )

  // console.log('Etiquetas al paso: ', numeroDeEtiquetasAlPaso)

  const totalDeMetrosCuadrados = factorMetrosCuadrados * totalEtiquetas

  // console.log('Total M2: ', totalDeMetrosCuadrados)

  // TODO: no esta funcionando este error custom
  // if (totalDeMetrosCuadrados < 200) {
  //    throw new BadRequestError('El minimo de m2 a cotizar son 200')
  // }

  //Contempla ya los pasos con 7 pulgadas
  const metrosLinealesTotales =
    ((medidaDesarrollo + gapDesarrollo) * totalMillares) /
    numeroDeEtiquetasAlPaso

  // console.log('Metros lineales totales: ', metrosLinealesTotales)

  let factorDeMerma = 1

  if (!isBlanca && 150 / metrosLinealesTotales <= 0.1) {
    factorDeMerma += 0.1
  } else if (!isBlanca && 150 / metrosLinealesTotales > 0.1) {
    factorDeMerma += 150 / metrosLinealesTotales
  } else if (isBlanca && 150 / metrosLinealesTotales <= 0.05) {
    factorDeMerma += 0.05
  } else if (isBlanca && 150 / metrosLinealesTotales > 0.05) {
    factorDeMerma += 150 / metrosLinealesTotales
  }

  // console.log('Factor de Merma: ', factorDeMerma)

  const metrosCuadradosMasMerma = totalDeMetrosCuadrados * factorDeMerma

  // console.log('M2 mas merma: ', metrosCuadradosMasMerma)

  const factorDeImpresion = numeroTintas

  // console.log('Factor de Impresion: ', factorDeImpresion)

  const metrosCuadradosMasImpresion =
    metrosCuadradosMasMerma * factorDeImpresion

  // console.log('M2 mas impresion: ', metrosCuadradosMasImpresion)

  // console.log('material', material)
  // console.log('acabado', acabado)

  const materialMasAcabado = material + acabado

  // console.log('factor de material: ', materialMasAcabado)

  const importeTotal = metrosCuadradosMasImpresion * materialMasAcabado

  // console.log('Importe total: ', importeTotal)

  const importePorMillar = importeTotal / totalMillares

  // console.log('Importe por millar: ', importePorMillar)

  const utilidadSugerida = calculateUtility(
    numeroTintas,
    totalDeMetrosCuadrados
  )
  console.log('utilidad sugierida:', utilidadSugerida)

  const tiempoAproximado = metrosLinealesTotales / 30 / 60

  // console.log('tiempo aprox', tiempoAproximado)

  const horasExtraSumaManoDeObra = isBlanca ? 1 : 2

  // console.log('horas extra', horasExtraSumaManoDeObra)

  const tiempoHorasManoDeObra = tiempoAproximado + horasExtraSumaManoDeObra

  // console.log('tiempo total', tiempoHorasManoDeObra)

  // const tiempoTotal = tiempoAproximado + horasExtraSumaManoDeObra

  const importePorMillarPesos = importePorMillar * tipoCambio

  // console.log('importe por millar en pesos', importePorMillarPesos)

  const calculatePrice = (cost, newTag) => {
    let extraProrrateo = 0
    if (prorrateo === 'prorrateo') {
      extraProrrateo = (suaje + grabados) / totalMillares
    }
    newTag = Number(newTag)
    let price = cost
    if (newTag === 0) {
      console.log('newtag: ', newTag);
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

  // console.log('mano de obra fija', manoDeObraFija)

  const horasDia = 8

  const costoManoDeObra = (manoDeObraFija / horasDia) * tiempoHorasManoDeObra

  // console.log('costo mano de obra', costoManoDeObra)

  let costoMetroCuadradoPorMaquina = 0

  // Preguntar por los rangos de 600 a 800 m2 y de 1600 a 2000 m2 ya que no estan definidos

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

  // console.log('costo M2 por maquina', costoMetroCuadradoPorMaquina)

  const costoFijoTotal =
    metrosCuadradosMasImpresion * costoMetroCuadradoPorMaquina

  const costoFijoTotalPorMillar =
    (costoFijoTotal + costoManoDeObra) / totalMillares

  const costoFinal = precio + costoFijoTotalPorMillar

  const precioDeVenta = costoFinal * utilidad

  let sPrecioDeVenta = precioDeVenta.toString

  // console.log(precioDeVenta)

  const utilidadPorMillar = precioDeVenta - costoFinal

  const utilidadDelPedido = utilidadPorMillar * totalMillares

  // const utHoras = utPedido / tiempoHoras

  // const ventaTotal = precioVenta * (totalEtiquetas / 1000)

  const comision = utilidadDelPedido * 0.13

  let sComision = comision.toString

  return {
    sPrecioDeVenta,
    totalDeMetrosCuadrados,
    utilidadSugerida,
    sComision
  }
}

export default useData
