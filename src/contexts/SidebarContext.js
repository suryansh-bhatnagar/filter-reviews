import React, { createContext, useState } from 'react';

export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
      
}
return <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, handleSidebarToggle }}>
  {children}
</SidebarContext.Provider>;
};

export default SidebarProvider;