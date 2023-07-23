import React, {useEffect} from 'react' //use 'rafce' to get boiler plate
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';; //Tooltips display informative text when users hover over, focus on, or tap an element


import {Navbar, Footer, Sidebar, ThemeSettings} from './components'
import {Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Line} from './pages'
import './App.css'

import  {useStateContext} from './contexts/ContextProvider'


const App = () => {

  const {activeMenu, themeSettings, setThemeSettings, currentColor, currentMode} = useStateContext();

  // const activeMenu = true;
  return (
    //  <h1 className='underline text-3xl'>App</h1>  //Here we are using tailwind css: underline- which will underline our h1 and text3xl: will make our text 30px
    <div className={currentMode === "Dark" ? 'dark' : ''}>
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'> {/* using tail wind- */}
          <div className='fixed right-4 bottom-4' style={{zIndex:'1000'}}> {/* using tail wind- right-4 is used to controlling the placement of positioned elements*/}
            <TooltipComponent content="settings" position="Top">
              <button type='button' className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white'
              onClick={() => setThemeSettings(true)}
              style={{background: currentColor, borderRadius: '50%'}}> {/*to change background-color dynamically later therefore we have written inline css instead of tailwind*/}
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {/*Checking if the menu is open or not*/}
          {/* Side Bar */}
          {activeMenu ? (
            <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
              <Sidebar />
            </div>
          ) : (
            <div className='w-0 dark:bg-secondary-dark-bg'>
            <Sidebar />
            </div>
          )}
          {/* Navbar */}
          <div className={
            `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full 
            ${activeMenu 
            ? 'md:ml-72' 
            : 'flex-2'}`
          }>
            
            <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
              <Navbar />
            </div>
         

          {/* Routes */}
          <div>
            {themeSettings && <ThemeSettings />}

            <Routes>
              {/* Dashboard */}
              <Route path='/' element={<Ecommerce/>} /> 
              <Route path='/ECommerce' element={<Ecommerce/>} />

              {/* Pages */}
              <Route path='/orders' element={<Orders />} />
              <Route path='/employees' element={<Employees />} />
              <Route path='/customers' element={<Customers />} />

              {/* Apps */}
              <Route path='/kanban' element={<Kanban />} />
              <Route path='/editor' element={<Editor />} />
              <Route path='/calendar' element={<Calendar />} />
              <Route path='/color-picker' element={<ColorPicker />} />

              {/* Charts */}
              <Route path='/line' element={<Line />} />
              <Route path='/area' element={<Area />} />
              <Route path='/bar' element={<Bar />} />
              <Route path='/pie' element={<Pie />} />
              <Route path='/financial' element={<Financial />} />
              <Route path='/color-mapping' element={<ColorMapping />} />
              <Route path='/pyramid' element={<Pyramid />} />  
              <Route path='/stacked' element={<Stacked />} />
              
              

            </Routes>
          </div>
          </div>
        </div>
      </BrowserRouter>
    </div>

  )
}

export default App