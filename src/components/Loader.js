import { useEffect } from 'react';
import BeatLoader from "react-spinners/BeatLoader";

function Loader(loading) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className='blob-section'>
            <div className="loader">
                    <BeatLoader className="loading-clip" color={'#E7D4F6'} loading={loading} size={30} />
                    <h1 className="loader-heading">Loading...</h1>
                </div>
            <div className='blob'>
                <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ "stop-color": "rgb(254, 0, 242" }}></stop>
                            <stop offset="100%" style={{ "stop-color": "rgb(255, 195, 113" }}></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#gradient)">
                        <animate
                            attributeName='d'
                            dur={'10000ms'}
                            repeatCount={'indefinite'}
                            values='M442,314Q402,378,344,415.5Q286,453,223.5,428.5Q161,404,117.5,359Q74,314,46.5,240Q19,166,85.5,123.5Q152,81,220.5,56Q289,31,364,61Q439,91,460.5,170.5Q482,250,442,314Z; 
                            
                            M446.5,326.5Q432,403,358.5,424.5Q285,446,205,456Q125,466,95,391.5Q65,317,56.5,247Q48,177,104,135.5Q160,94,222.5,74Q285,54,343,89Q401,124,431,187Q461,250,446.5,326.5Z;
                            
                            M449.5,313Q400,376,343.5,418.5Q287,461,212.5,452.5Q138,444,100,381Q62,318,55,247Q48,176,95,119Q142,62,212,64Q282,66,352,85.5Q422,105,460.5,177.5Q499,250,449.5,313Z;
                            
                            M426,307Q385,364,336,411.5Q287,459,219.5,439.5Q152,420,116.5,366Q81,312,59,242Q37,172,83.5,107Q130,42,206.5,53Q283,64,346,90.5Q409,117,438,183.5Q467,250,426,307Z;
                            
                            M427,312.5Q399,375,341.5,407.5Q284,440,210,444Q136,448,89.5,386.5Q43,325,30,245Q17,165,73,103Q129,41,205.5,56Q282,71,348,91.5Q414,112,434.5,181Q455,250,427,312.5Z;
                            
                            M448.5,327Q434,404,358.5,421Q283,438,211,440.5Q139,443,101.5,380.5Q64,318,62.5,249.5Q61,181,109.5,136Q158,91,222.5,66.5Q287,42,354.5,73.5Q422,105,442.5,177.5Q463,250,448.5,327Z;
                            
                            M442,314Q402,378,344,415.5Q286,453,223.5,428.5Q161,404,117.5,359Q74,314,46.5,240Q19,166,85.5,123.5Q152,81,220.5,56Q289,31,364,61Q439,91,460.5,170.5Q482,250,442,314Z'
                        ></animate>
                    </path>
                </svg>
            </div>

            <div className='blob'>
                <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ "stop-color": "rgb(254, 0, 242" }}></stop>
                            <stop offset="100%" style={{ "stop-color": "rgb(255, 195, 113" }}></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#gradient)">
                        <animate
                            attributeName='d'
                            dur={'10000ms'}
                            repeatCount={'indefinite'}
                            values='M442,314Q402,378,344,415.5Q286,453,223.5,428.5Q161,404,117.5,359Q74,314,46.5,240Q19,166,85.5,123.5Q152,81,220.5,56Q289,31,364,61Q439,91,460.5,170.5Q482,250,442,314Z; 
                            
                            M446.5,326.5Q432,403,358.5,424.5Q285,446,205,456Q125,466,95,391.5Q65,317,56.5,247Q48,177,104,135.5Q160,94,222.5,74Q285,54,343,89Q401,124,431,187Q461,250,446.5,326.5Z;
                            
                            M449.5,313Q400,376,343.5,418.5Q287,461,212.5,452.5Q138,444,100,381Q62,318,55,247Q48,176,95,119Q142,62,212,64Q282,66,352,85.5Q422,105,460.5,177.5Q499,250,449.5,313Z;
                            
                            M426,307Q385,364,336,411.5Q287,459,219.5,439.5Q152,420,116.5,366Q81,312,59,242Q37,172,83.5,107Q130,42,206.5,53Q283,64,346,90.5Q409,117,438,183.5Q467,250,426,307Z;
                            
                            M427,312.5Q399,375,341.5,407.5Q284,440,210,444Q136,448,89.5,386.5Q43,325,30,245Q17,165,73,103Q129,41,205.5,56Q282,71,348,91.5Q414,112,434.5,181Q455,250,427,312.5Z;
                            
                            M448.5,327Q434,404,358.5,421Q283,438,211,440.5Q139,443,101.5,380.5Q64,318,62.5,249.5Q61,181,109.5,136Q158,91,222.5,66.5Q287,42,354.5,73.5Q422,105,442.5,177.5Q463,250,448.5,327Z;
                            
                            M442,314Q402,378,344,415.5Q286,453,223.5,428.5Q161,404,117.5,359Q74,314,46.5,240Q19,166,85.5,123.5Q152,81,220.5,56Q289,31,364,61Q439,91,460.5,170.5Q482,250,442,314Z'
                        ></animate>
                    </path>
                </svg>
            </div>
        </div>
    )
}

export default Loader;
