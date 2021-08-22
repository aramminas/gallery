import React, {useState, useEffect} from "react";
import BlurReact from "react-blur";
import {v4 as uuidv4} from "uuid";
import { useToasts } from 'react-toast-notifications';
import api from "../api/api";

import {blurType, successMsg, errorMsg} from "../helpers/constants";

/* components */
import SaveButton from "./general/SaveButton";

const Blur = ({id, image, imageInfo}) => {
    const { addToast } = useToasts();
    const [percent, setPercent] = useState(0);

    useEffect( _ => {
        if(imageInfo && imageInfo.percentage){
            setPercent( +imageInfo.percentage);
        }
    }, [imageInfo]);

    const onChangePercent = (event) => {
        setPercent(parseInt(event.target.value, 10));
    }

    const saveBlurData = async () => {
        const data = {
            id: uuidv4(),
            imageId: id,
            type: blurType,
            percentage: percent,
        };

        const response = await api.saveImageInfo(data);
        if(response.status){
            addToast(successMsg, { appearance: 'success' });
        }else {
            let error = response.error ? response.error : errorMsg;
            addToast( error, { appearance: 'error' });
        }
    }

    return (
        <div className="image-blur-block">
            <BlurReact className='blur-demo' img={image} blurRadius={percent}>
                BLUR PERCENT: {percent}%
            </BlurReact>
            <input className='blur-input' type='range' value={percent} onChange={onChangePercent} min={0} max={100} />
            <hr/>
            <SaveButton saveData={saveBlurData}/>
        </div>
    );

}

export default Blur;
