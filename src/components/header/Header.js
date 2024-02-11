import React, { useEffect, useState } from 'react'
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import "./style.scss"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import logo from "../../assets/movix-logo.svg"
import { useLocation, useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  const [lastScrollY,setLastScrollY]=useState(0);
  const [show, setShow] = useState("top")
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showSearch, setShowSearch] = useState("");
  const [query, setQuery] = useState("")
  const location=useLocation()

  useEffect(()=>{
    window.scrollTo(0,0);
  },[location])


  const controlNavbar=()=>{
       if(window.scrollY>200)
       {
        if(window.scrollY>lastScrollY && !mobileMenu)
        {
          setShow("hide");
        }
        else{
          setShow("show");
        }
       }
       else{
        setShow("top");
       }
       setLastScrollY(window.scrollY)
  }

  useEffect(()=>{
      window.addEventListener("scroll",controlNavbar)
      return ()=>{
        window.removeEventListener ("scroll",controlNavbar)
      }
  },[lastScrollY])

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)
      setTimeout(() => {
        setShowSearch(false);
      }, 1000)
    }
  }

  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  }
  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  }
  const navigationHandler=(type)=>{
       if(type==="movie")
       {
           navigate("/explore/movie");
       }
       else{
           navigate("/explore/tv");
       }
       setMobileMenu(false);
  }
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className='logo'>
          <img onClick={()=>{navigate("/")}} src={logo} alt='' />
        </div>

        <ul className='menuItems'>
          <li className='menuItem' onClick={()=>navigationHandler("movie")}>Movies</li>
          <li className='menuItem' onClick={()=>navigationHandler("tv")}>TV shows</li>
          <li className='menuItem'>
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className='mobileMenuItems'>
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className='searchBar'>
          <ContentWrapper>
            <div className='searchInput'>
              <input
                onKeyUp={searchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
                type='text'
                placeholder='Search for a movie or tv show...' />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  )
}

export default Header