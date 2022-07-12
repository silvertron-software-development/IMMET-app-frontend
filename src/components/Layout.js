import React from 'react'
import 'bulma/css/bulma.css'

const Layout = ({ children }) => {
  return (
    <>
      <nav
        className='navbar has-shadow'
        role='navigation'
        style={{ backgroundColor: '#005A8D' }}
      >
        <div className='navbar-brand'>
          <h1 className='navbar-item'>
            <img src='./../../imgs/IMMET_dot_no_background.png' alt='Logo' />
          </h1>
        </div>
        <div className='navbar-menu'>
          <div className='navbar-end'>
            <div className='navbar-item has-text-white'>Cotizador IMMET</div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  )
}

export default Layout
