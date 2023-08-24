import { Layout } from 'antd'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage.jsx'
import Exchanges from './Pages/Exchanges/Exchanges.jsx'
import Cryptocurrencies from './Pages/Cryptocurrencies/Cryptocurrencies.jsx'
import CryptoDetails from './Pages/CryptoDetails/CryptoDetails.jsx'
import News from './Pages/News/News.jsx'

const App = () => {
  return (
    <div className='App'>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/exchanges' element={<Exchanges />} />
              <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
              <Route path='/crypto/:coinId' element={<CryptoDetails />} />
              <Route path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>
      </div>


      <p className='footer'>
        - Made with 💖 by Prashant Sharma
      </p>
    </div>
  )
}

export default App