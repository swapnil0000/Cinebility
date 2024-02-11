import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
    console.log(mediaType)
    const { data, loading,error } = useFetch(`/${mediaType}/${id}/similar`);
    console.log("SMILLIAR ", data)
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
    if (loading) return <div>Loading...</div>;
    return (
        <Carousel
            title={title}
            data={data?.results}  
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Similar;