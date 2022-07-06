import React from 'react'
import styled from 'styled-components'
import { FaBars } from 'react-icons/fa'

const Layout = ({ children }) => {
  return (
    <>
      <NavContainer>
        <div className='nav-center'>
          <div className='nav-header'>
            <h1>Immet App</h1>
            {/* <Link to='/'><img src={logo} alt='Bike terrain' /></Link> */}
            <button type='button' className='nav-toggle'>
              <FaBars />
            </button>
          </div>
          <ul className='nav-links'>
            <li className='nav-item'>Nueva Cotización</li>
          </ul>
        </div>
      </NavContainer>
      <main>{children}</main>
    </>
  )
}

export default Layout

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #025d90;
  color: beige;
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 150px;
      height: 78px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: beige;
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
    }

    .nav-item {
      margin: 0 0.5rem;
      color: beige;
      font-size: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      padding: 0.5rem;
      transition: all 0.2s linear;
      cursor: pointer;
      &:hover {
        border-bottom: 2px solid beige;
      }
    }
  }
`
