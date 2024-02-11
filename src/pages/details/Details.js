import React from 'react'
import "./style.scss"
import DetailsBanner from './detailsBanner/DetailsBanner'
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Cast from './cast/Cast';
import VideosSection from './videoSection/VideoSection';
import Similar from './carousels/Similar';
import Recommendation from "./carousels/Recommendation"
const Details = () => {
  const {mediaType,id}=useParams();
  console.log(mediaType + "TYPES")
  const {data,loading}=useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits,loading:creditsLoading}=useFetch(`/${mediaType}/${id}/credits`)
  return (
    <div>
    <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
    <div></div>
    <Cast data={credits?.cast} loading={creditsLoading}/>
    <div></div>
    <VideosSection data={data} loading={loading} />
    <Similar mediaType={mediaType} id={id}/>
    <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details