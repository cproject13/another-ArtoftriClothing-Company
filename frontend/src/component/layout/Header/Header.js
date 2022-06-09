import { useState } from "react";
import { Link } from "react-router-dom"
import { IoMdSearch } from "react-icons/io"
import { useSelector } from "react-redux";
const Header = () => {

  const [active,setActive] = useState('/');
  const { isAuthenticated } = useSelector((state) => state.user); 

  return (
    <nav className="navbar">
      <div className="title"><Link to="/"><img src="/images/nav-logo.png" alt="logo" /></Link></div>
      <ul>
        <div className="items">
          <li className={ active === '/' ? "active-link" : '' }><Link onClick={() => setActive('/')}  to="/">Home</Link></li>
          <li className={ active === '/products' ? "active-link" : '' }><Link onClick={() => setActive('/products')} to="/products">Products</Link></li>
          <li className={ active === '/custom' ? "active-link" : '' }><Link onClick={() => setActive('/custom')} to="/custom">Customization</Link></li>
          <li className={ active === '/About' ? "active-link" : '' }><Link onClick={() => setActive('/About')} to="/About">About</Link></li>
        </div>
        <li className="icons">
          { isAuthenticated ? 
          <>
          { window.localStorage.getItem('user') !== null ? <span className="nav-login">Hi {window.localStorage.getItem('user')}!</span> : '' }
          </>
          : <a className="nav-login" href='/login'>Login</a> }
          <span><Link onClick={() => setActive('')} to="/search"><IoMdSearch size={30} /></Link></span>
        </li>
      </ul>
    </nav>
  )
};

export default Header;
