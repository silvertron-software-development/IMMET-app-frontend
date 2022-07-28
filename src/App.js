import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import PricingPage from './pages/PricingPage'
import AllPricingsPage from './pages/AllPricingsPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<PricingPage />} />
        <Route path='/cotizaciones' element={<AllPricingsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
