import { tintasCantidad } from './selectData'

const utilidadesMap = {
  '0-1S': 80,
  '2S': 120,
  '0-1M': 50,
  '2M': 80,
  '0-1G': 30,
  '2G': 40,
}

export const calculateUtility = (tintas, metrosCuadradosTotales) => {
  if (!metrosCuadradosTotales || isNaN(metrosCuadradosTotales)) {
    return 80
  }
  let queryString = ''
  if (tintas[tintasCantidad] <= 1) {
    queryString = '0-1'
  } else {
    queryString = '2'
  }

  if (metrosCuadradosTotales < 800) {
    queryString += 'S'
  } else if (metrosCuadradosTotales < 1800 && metrosCuadradosTotales >= 800) {
    queryString += 'M'
  } else {
    queryString += 'G'
  }

  return utilidadesMap[queryString]
}
