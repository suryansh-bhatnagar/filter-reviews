import React, { useContext } from 'react'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { SidebarContext } from '../contexts/SidebarContext';

const Header = () => {
    
  const { handleSidebarToggle } = useContext(SidebarContext);
  return (
    <div className='flex fixed bg-white w-screen shadow-xl sm:gap-56 gap-4 p-2'>
        <div  onClick={()=>handleSidebarToggle()}>
         <KeyboardDoubleArrowRightIcon />
        </div>
         <p>FeedLens assignment - Filter Review app</p>
         </div>
  )
}

export default Header