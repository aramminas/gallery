import React, {useState, useEffect} from "react";
import BlurReact from "react-blur";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";
import { useToasts } from 'react-toast-notifications';
import api from "../api/api";

import {blurType, successMsg, errorMsg} from "../helpers/constants";

/* actions */
import {setCurrentParameters} from "../store/actions/ongoingParametersAction";

/* components */
import SaveButton from "./general/SaveButton";

const Blur = ({id, image, imageInfo, parameters, toggleInfo}) => {
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const [percent, setPercent] = useState(0);

    useEffect( _ => {
        const {blur: blurParams} = parameters;
        if(Object.keys(blurParams).length === 0){
            if(imageInfo && imageInfo.percentage){
                setPercent( +imageInfo.percentage);
            }
        } else {
            setPercent( blurParams.percent);
        }
    }, [imageInfo]);

    const onChangePercent = (event) => {
        const {value} = event.target;
        dispatch(setCurrentParameters({type: blurType, percent: parseInt(value, 10)}));
        setPercent(parseInt(value, 10));
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
            toggleInfo();
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
