import React, {useEffect} from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';

import { RiNotification3Fill } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg'
import {Cart, Chat, Notification, UserProfile} from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => ( // a component with instant return which will have few properities
  <TooltipComponent content={title} position="BottomCenter"> {/*appears when a user hovers over any button in your app. */}
    <button 
    type="button" 
    onClick={customFunc} 
    style={{color}} 
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span 
      style={{background: dotColor}} 
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
        {icon}
    </button>
  </TooltipComponent>
)

const NavBar = () => {
  const {activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize, currentColor} = useStateContext();

  useEffect(() => { // to track our screen size
    const handleReSize = () => setScreenSize(window.innerWidth);// setting the size of current window

    window.addEventListener('resize', handleReSize);// if the size changes handleReSize will be called

    handleReSize(); // to figure out initial width

    // in react whenever we add something like addEventListner we have to remove it also
    return() => window.removeEventListener('resize', handleReSize);

  }, []);

  useEffect(() => {
    if(screenSize <= 900){
      setActiveMenu(false);
    }else{
      setActiveMenu(true);
    }
  }, [screenSize]); // this will run only when the screen size changes

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton 
      title="Menu" 
      customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} 
      color={currentColor}
      icon={<AiOutlineMenu />} /> {/* Here we could'nt put customFunc into above NavButton Component directly because other NavButton won't do the same action as this one does*/}
      <div className='flex'>

        <NavButton 
          title="Cart" 
          customFunc={() => handleClick('cart')} 
          color={currentColor} 
          icon={<FiShoppingCart />} 
        />

        <NavButton 
          title="Chat" 
          dotColor='#03C9D7'
          customFunc={() => handleClick('chat')} 
          color={currentColor}
          icon={<BsChatLeft />} 
        />

        <NavButton 
          title="Notification" 
          dotColor='#03C9D7'
          customFunc={() => handleClick('notification')} 
          color={currentColor}
          icon={<RiNotification3Fill />} 
        />
        
        <TooltipComponent
        content='profile' position='BottomCenter'
        >
          <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg' onClick={() => handleClick('userProfile')}>
            <img 
              className='rounded-full w-8 h-8'
              src={avatar}
            />
            <p>
              <span className='text-gray-400 text-14'>Hi, </span> {' '}
              <span className='text-gray-400 font-bold ml-1 text-14'>Michael</span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14'/>
          </div>
        </TooltipComponent>
        
        {/* Checking if any icon is selected or not*/}
        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  )
}

export default NavBar