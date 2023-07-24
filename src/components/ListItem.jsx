import React from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
const ListItem = ({data}) => {
    
const {starRating,username,datePosted,reviewType,reviewText,numLikes,deviceType,appVersion} = data;


const getColorByReviewType = (reviewType,elementType) =>{

  if(elementType === "border"){
    switch (reviewType) {
      case "Feature request":
        return "border-b-yellow-400";
      case "Bug":
        return "border-b-red-400";
      case "Appreciation":
        return "border-b-green-500";
      default:
        break;
    }
  }else{
    switch (reviewType) {
      case "Feature request":
        return "text-yellow-400";
      case "Bug":
        return "text-red-400";
      case "Appreciation":
        return "text-green-500";
      default:
        break;
    }
  }
}

  return (
    <div className='shadow-md bg-white px-8 py-6'>
        <section className={`flex flex-col sm:flex-row justify-between  border-b  ${getColorByReviewType(reviewType,"border")} pb-4 mb-4`}>
          <div className='flex'>
          <div className='flex w-32'>

        {Array(parseInt(starRating))
          .fill("")
          .map((e, index) =><StarIcon fontSize='sm' key={index} /> )}
        {Array(5 - parseInt(starRating))
          .fill("")
          .map((e, index) =><StarBorderIcon fontSize='sm' key={index} />)}
       
          </div>
        <p className='text-xs font-medium mr-4'>{username}</p>
        <p className=' text-xs'>{datePosted}</p>
          </div>
          <p className={`mt-2 sm:mt-0 font-medium text-xs ${getColorByReviewType(reviewType,"text")}`}>{reviewType}</p>
        </section>
       <section className='grid grid-flow-col grid-cols-4 gap-12'>
        <div className='col-span-3 text-xs text-gray-500'>
            {reviewText}
        </div>
        <div className=' col-span-1 '>
            <ul>
              <li className=' text-xs mb-2'>{numLikes} <ThumbUpOffAltIcon fontSize='sm'/></li>
              <li className=' text-xs mb-2'>Version : {appVersion}</li>
              <li className=' text-xs'>Device Type : {deviceType}</li>
           
            </ul>
        </div>
       </section>
    </div>
  )
}

export default ListItem