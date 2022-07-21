import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import PricingPage from './pages/PricingPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<PricingPage />} />
        <Route path='/cotizaciones' element={<PricingPage />} />
      </Routes>
    </Layout>
  )
}

export default App
