import React, {createContext, useContext, useState } from 'react'
//contextApi - Clean and easy way to share state between components

const StateContext = createContext();

const initialState = { //state of different thing that we can click and open up and start they are all set to false
    chat: false, //  is our chat window currently closed or open
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({children}) => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState) //for our chat, cart, profile and notification
    const [screenSize, setScreenSize] = useState(undefined); // for our screen sizes(pc or mobile)

    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentMode, setCurrentMode] = useState('Light');

    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
        setThemeSettings(false);
    }
    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
        setThemeSettings(false);
    }
    // here we are using color instead of e.target.value because value we are getting is already a string
    const [themeSettings, setThemeSettings] = useState(false)

    const handleClick = (clicked) => {
        setIsClicked({...initialState, [clicked] :true});
    } // here we cant just pass the string we have to pass object and retriveing the previous values(using spread operator) and changing the value of only the clicked one



    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize, 
                setScreenSize,
                currentColor,
                currentMode,
                setCurrentColor,
                setCurrentMode,
                themeSettings, setThemeSettings,
                setColor,
                setMode

            }}  // values pass here they will be passed through all of our components through our app
        >
            {children} {/*Whatever you wrap your context with will be displayed*/}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext); //we specify which context to use