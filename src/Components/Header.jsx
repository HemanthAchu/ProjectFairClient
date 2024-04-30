import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header({insideDashboard}) {
  return (
    <div>
      <Navbar style={{zIndex:'1'}} className="card border shadow top-0 position-fixed w-100">
        <Container>
          <Navbar.Brand >
          <Link style={{textDecoration:"none"}} to={'/'}>
          <i class="fa-solid fa-arrow-trend-up me-2 "></i>
            Project Fair
          </Link>
          </Navbar.Brand>
          { insideDashboard &&
          <div>
            <button className='btn btn-link' >Logout <i className='fa-soloid fa-arrow-right'></i> </button>
          </div>

          }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
