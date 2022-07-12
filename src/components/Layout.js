import React from 'react'
import 'bulma/css/bulma.css'

const Layout = ({ children }) => {
  return (
    <>
      <nav class="navbar has-shadow" role='navigation' style={{backgroundColor: '#005A8D'}}>
        <div class="navbar-brand">
          <h1 class="navbar-item">
          <img src="./../../imgs/IMMET_dot_no_background.png" alt="Logo" />
          </h1>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item has-text-white">
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
