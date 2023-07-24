import React,{useContext, useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckboxElement from '../utils/CheckboxElement';
import { APP_VERSIONS_DATA, RATINGS_DATA, REVIEW_TYPE_DATA, REVIEW_DATA, SORT_DATA } from '../constants/constants';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { SidebarContext } from '../contexts/SidebarContext';
import { dynamicSort } from '../utils/helperFunctions';



const Sidebar = ({setListData}) => {

  const [firstIsExpanded, setFirstIsExpanded] = useState(false);
  const [secondIsExpanded, setSecondIsExpanded] = useState(false);
  const [thirdIsExpanded, setThirdIsExpanded] = useState(false);
  const [fourthIsExpanded, setFourthIsExpanded] = useState(false);


  const [ratings, setRatings] = useState(RATINGS_DATA);
  const [reviewTypes, setReviewTypes] = useState(REVIEW_TYPE_DATA);
  const [appVersions, setAppVersions] = useState(APP_VERSIONS_DATA);
  const [sortTypes, setSortTypes] = useState(SORT_DATA);

  
  const { isSidebarOpen, handleSidebarToggle } = useContext(SidebarContext);


  //Function to apply filters to the review list
  const applyFilter =()=>{
    let filteredList = REVIEW_DATA;

    //Sort review list
    const checkedSortTypes = sortTypes.filter(item=>item.checked).map((item)=>item.property);
    console.log("Checked sort types",checkedSortTypes)
    let counter = 0;
    while(checkedSortTypes.length && counter < checkedSortTypes.length){
    //  filteredList = checkedSortTypes.map(item=> filteredList.sort(dynamicSort(item)))[0];
    filteredList = [...filteredList].sort(dynamicSort(checkedSortTypes[counter]));
    counter++;
    }
  
    //Rating filter
    const checkedRating = ratings.filter(item=>item.checked).map((item)=>item.id);
    console.log("Checked rating",checkedRating)
    if(checkedRating.length){
      filteredList = filteredList.filter((item)=> checkedRating.includes(item.starRating));
    }
  
    //ReviewType filter
    const checkedReviewTypes = reviewTypes.filter(item=>item.checked).map((item)=>item.label.toLowerCase());
    console.log("Checked review type",checkedReviewTypes)
    if(checkedReviewTypes.length){
      filteredList = filteredList.filter((item)=> checkedReviewTypes.includes(item.reviewType.toLowerCase()));
    }
  
    //App Version filter
    const checkedAppVersions = appVersions.filter(item=>item.checked).map((item)=>item.label);
    console.log("Checked app version",checkedAppVersions)
    if(checkedAppVersions.length){
      filteredList = filteredList.filter((item)=> checkedAppVersions.includes(item.appVersion));
    }
  
    console.log("Filtered list",filteredList);
    if(window.innerWidth<768){
      handleSidebarToggle()
    }
    setListData(filteredList);
  }

  //Function to reset filters
  const resetFilter =()=>{
    setRatings(RATINGS_DATA);
    setReviewTypes(REVIEW_TYPE_DATA);
    setAppVersions(APP_VERSIONS_DATA);
    setSortTypes(SORT_DATA);
    if(window.innerWidth<768){
      handleSidebarToggle()
    }
    setListData(REVIEW_DATA);
  }








  //Function to display the checked item
  const showCheckedItems =(stateArray,setStateArray)=>{
    const checkedRating = stateArray.filter(item=>item.checked).map((item)=>item.id);
    if(checkedRating){
      return <span className='flex my-1 flex-wrap'> {checkedRating.map((item,index)=><span key={index} className='flex flex-row items-center gap-1 mb-1 px-1 py-1 rounded-md bg-white mx-1'>
        <p className='text-xs'>{stateArray.filter((element)=>element.id ===item ?  element.label : null)[0].label}</p>
      <button className='text-gray-500 text-xs' onClick={(e)=>removeCheckedItem(e,item,stateArray,setStateArray)}>x</button></span>)}</span>
    }
    return null
  }

  

  //Function to uncheck the checked item 
  const removeCheckedItem =(e,item,stateArray,setStateArray)=>{
    const updatedRatings = stateArray.map(element=>{
      if(element.id===item){
        element.checked = false
      }
      return element
    })
    setStateArray(updatedRatings); 
  }
  

  //Function to handle checkbox state
const handleCheckboxChange =(id,stateArray,setStateArray)=>{
  const stateList = stateArray;
  const changeCheckedRating = stateList.map(item=>item.id === id ? {...item ,checked:!item.checked}:item);
  setStateArray(changeCheckedRating)
}

//Function to handle accordian state
const handleAccordianChange =(isExpanded,setIsExpanded)=>{
  setIsExpanded(!isExpanded)
}


if(!isSidebarOpen){
 return null
}


  return (
    <div className='w-full bg-gray-200  fixed top-0 h-full overflow-y-auto  md:w-56  z-20 '>
      <div>
        <div className='flex justify-between bg-white shadow-xl border-b border-b-gray-300  py-2 px-4 mb-4 mr-2'>
          <p>Filters</p>
          <p onClick={handleSidebarToggle}><KeyboardDoubleArrowLeftIcon/> </p>
        </div>
        <div className='sm:mt-2 mt-8 lg:px-4 px-2'>
        <Accordion disableGutters style={{margin:0,}} expanded={fourthIsExpanded} onChange={()=>handleAccordianChange(fourthIsExpanded,setFourthIsExpanded)} >
           <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
        >
            <Typography>Sort</Typography>
           </AccordionSummary>
           <AccordionDetails style={{paddingRight:0 ,marginLeft:8,borderTop:"1px solid gray", borderBottom:"1px solid gray"}}>
              {sortTypes.map((item)=>{
            return   <CheckboxElement 
                        key={item.id}
                        option={item}
                        stateArray={sortTypes}
                        setStateArray={setSortTypes}
                        changeChecked={handleCheckboxChange}/>
              })}
           </AccordionDetails>
        </Accordion>
        {
        !fourthIsExpanded && showCheckedItems(sortTypes,setSortTypes)
          }
        <Accordion disableGutters style={{margin:0}} expanded={firstIsExpanded} onChange={()=>handleAccordianChange(firstIsExpanded,setFirstIsExpanded)} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Rating</Typography>
          </AccordionSummary>
          <AccordionDetails style={{paddingRight:0 ,marginLeft:8,borderTop:"1px solid gray", borderBottom:"1px solid gray"}}>
              {ratings.map((item)=>{
            return   <CheckboxElement 
                        key={item.id}
                        option={item}
                        stateArray={ratings}
                        setStateArray={setRatings}
                        changeChecked={handleCheckboxChange}/>
              })}
          </AccordionDetails>
        </Accordion>
        {
        !firstIsExpanded && showCheckedItems(ratings,setRatings)
          }
      <Accordion disableGutters style={{margin:0}}expanded={secondIsExpanded} onChange={()=>handleAccordianChange(secondIsExpanded,setSecondIsExpanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Review Type</Typography>
        </AccordionSummary>
        <AccordionDetails style={{paddingRight:0,marginLeft:8 ,borderTop:"1px solid gray", borderBottom:"1px solid gray"}}>
        {reviewTypes.map((item)=>{
   return   <CheckboxElement
              key={item.id}
              option={item} 
              stateArray={reviewTypes} 
              setStateArray={setReviewTypes} 
              changeChecked={handleCheckboxChange}/>
    })}
        </AccordionDetails>
      </Accordion>
        {
        !secondIsExpanded && showCheckedItems(reviewTypes,setReviewTypes)
          }

      <Accordion disableGutters expanded={thirdIsExpanded} onChange={()=>handleAccordianChange(thirdIsExpanded,setThirdIsExpanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>App version</Typography>
        </AccordionSummary>
        <AccordionDetails style={{paddingRight:0,marginLeft:8 ,borderTop:"1px solid gray", borderBottom:"1px solid gray"}}>
        {appVersions.map((item)=>{
   return   <CheckboxElement 
              key={item.id}
              option={item}
              stateArray={appVersions}
              setStateArray={setAppVersions}
              changeChecked={handleCheckboxChange}/>
    })}
        </AccordionDetails>
      </Accordion>
        {
        !thirdIsExpanded && showCheckedItems(appVersions,setAppVersions)
          }

        </div>
        <div className='lg:px-4 px-2'>
          <button onClick={applyFilter} className='w-full bg-blue-800 p-1 my-1 rounded-sm text-white'>Apply</button>
          <button onClick={resetFilter} className='w-full  p-1 my-1 border border-blue-800 text-blue-800'>Reset All</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar