import React, { useContext } from 'react'
import ListItem from './ListItem'
import { SidebarContext } from '../contexts/SidebarContext';

const ListContainer = ({listData}) => {
  
  const { isSidebarOpen } = useContext(SidebarContext);
  if(!listData){
    <p>Loading...</p>
  }
  return (
    <div className={`${isSidebarOpen ?"pl-56" :"pl-5" }  py-8 pr-5 w-full flex flex-col gap-6 bg-gray-200`}>{
        listData.map((item) => <ListItem data={item} key={item.id}/>)
        }</div>
  )
}

export default ListContainer