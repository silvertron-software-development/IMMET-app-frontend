import React, { useState } from 'react'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom'

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    // TODO: menu responsive no se ve
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
          <button
            type='button'
            className='navbar-burger has-text-white'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </button>
        </div>
        <div
          className={menuOpen ? 'navbar-menu is-active' : 'navbar-menu'}
          style={{ backgroundColor: '#005A8D' }}
        >
          <div className='navbar-item has-text-white'>
            <Link to='/'>Nueva cotizacion</Link>
          </div>
          <div className='navbar-item has-text-white'>
            <Link to='/cotizaciones'>Cotizaciones hechas</Link>
          </div>
          <div className='navbar-end'>
            <div className='navbar-item has-text-white is-hidden-mobile'>
              Cotizador IMMET
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  )
}

export default Layout
