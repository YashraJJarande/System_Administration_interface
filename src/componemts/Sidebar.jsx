import React from 'react'
import {Link, NavLink} from 'react-router-dom';  //<Link />: Provides declarative, accessible navigation around your application.
  //<NavLink /> A special version of the <Link> that will add styling attributes to the rendered element when it matches the current URL

import {SiShopware} from 'react-icons/si';
import {MdOutlineCancel} from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links } from '../data/dummy'
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const {activeMenu, setActiveMenu, screenSize, currentColor} = useStateContext(); //from contextprovider
  // const activeMenu = true;

  const handleClosedSideBar = () => {
    if(activeMenu && screenSize <= 900){
      setActiveMenu(false);
    }
  }
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-md text-gray-700 dark:text-gray-200:hover:text-black hover:bg-light-gray m-2'; 

  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      {activeMenu && (<>
        <div className="flex justify-between items-center">

          <Link to="/" onClick={handleClosedSideBar} className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'>
            <SiShopware /> <span>Shoppy</span>
          </Link> 

          <TooltipComponent content="Menu" position="BottomCenter">
          <button type="button" onClick={() => setActiveMenu((prevActivemenu) => !prevActivemenu)} className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block">
            <MdOutlineCancel />
          </button>
          </TooltipComponent>

        </div>
        <div className="mt-10">
          {links.map((item) => ( // traversing through all titles in links(dummy.js) object
            <div key={item.title}>
              <p className="text-gray-400 m-3 mt-4 uppercase">
                {item.title}
              </p>
              {item.links.map((link) => ( // traversing through every link of an every object in links
                <NavLink to={`/${link.name}`} key={link.name}
                
                onClick={handleClosedSideBar}///for the mobile devices if we click on any link the sidebar should be closed
                
                style={({ isActive}) =>  ({
                  backgroundColor: isActive ? currentColor : ''
                })}

                className={({ isActive }) => isActive ? activeLink : normalLink}> {/* Here isActive is a state which we are destructuring and it will be given to us by NavLink component */}
                {link.icon}
                <span className='capitalize'>
                  {link.name}
                </span>

                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </>)}
    </div>
  )
}

export default Sidebar