import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Resizer from "react-image-file-resizer";
import {makeStyles} from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import {useToasts} from 'react-toast-notifications';
import {v4 as uuidv4} from "uuid";

/* components */
import SaveButton from "./general/SaveButton";

/* actions */
import {setCurrentParameters} from "../store/actions/ongoingParametersAction";

/* other */
import {resizeType, errorMsg, successMsg, defaultImage} from "../helpers/constants";
import api from "../api/api";

const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const Resize = ({id, image, imageInfo, parameters, toggleInfo}) => {
    const classes = useStyles();
    const {addToast} = useToasts();
    const dispatch = useDispatch();
    const [newImage, setNewImage] = useState(defaultImage);
    const [fileData, setFileData] = useState(null);
    const [defaultSizes, setDefaultSizes] = useState({});
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(300);

    useEffect(async _ => {
        const {resize: resizeParams} = parameters;

        if (image !== "" && newImage === defaultImage) {
            const data = await fetch(image);
            const blob = await data.blob();
            let metadata = {
                type: 'image/jpeg'
            };
            let file = new File([blob], `${id}.jpg`, metadata);
            getDefaultSizes(file);
            setResizeFileData(file);
            setFileData(file);
        }

        if(Object.keys(resizeParams).length > 2){
            const {url, width: widthParam, height: heightParam} = resizeParams;
            setNewImage(url);

            widthParam ? setWidth(widthParam) : imageInfo ? setWidth(imageInfo.width) : setWidth(width);
            heightParam ? setHeight(heightParam) : imageInfo ? setHeight(imageInfo.height) : setHeight(height);

        } else if (imageInfo){
            setWidth(imageInfo.width);
            setHeight(imageInfo.height);
        }

    }, [image, imageInfo]);

    useEffect(_ => {
        if (fileData) {
            setResizeFileData(fileData);
        }
    }, [width, height]);

    const getDefaultSizes = file => {
        const fr = new FileReader();

        fr.onload = _ => {
            const img = new Image();

            img.onload = _ => {
                setDefaultSizes({
                    width: img.width, height: img.height
                });

                if(img.width < width) setWidth(img.width);
                if(img.height < height) setHeight(img.height);
            };

            img.src = fr.result;
        };

        fr.readAsDataURL(file);
    }

    const saveResizeData = async _ => {
        const data = {
            id: uuidv4(),
            imageId: id,
            type: resizeType,
            height,
            width,
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

    const fileChangedSize = event => {
        const {value, name} = event.target;
        if(value > defaultSizes[name]){
            addToast( 'You have specified a parameter greater than the default!', { appearance: 'warning' });
            return false;
        }
        dispatch(setCurrentParameters({...parameters.resize, type: resizeType, [name]: +value}));
        name === 'width' ? setWidth(+value) : setHeight(+value);
    }

    const setResizeFileData = files => {
        if (files) {
            try {
                Resizer.imageFileResizer(
                    files,
                    width,
                    height,
                    "JPEG",
                    100,
                    0,
                    (url) => {
                        dispatch(setCurrentParameters({...parameters.resize, type: resizeType, url}));
                        setNewImage(url);
                    },
                    "base64",
                    200,
                    200
                );
            } catch (error) {
                addToast(error.message, {appearance: 'error'});
            }
        }
    }

    return (
        <div>
            {Object.keys(defaultSizes).length ?
                <div className="default-file-parameters">
                    <Alert severity="info">
                        Default Picture Parameters - Width / Height  &nbsp;{` ${defaultSizes.width}px / ${defaultSizes.height}px`}
                        <br/>
                        <sup>The picture cannot be larger than these parameters.</sup>
                    </Alert>
                </div> : null
            }
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        label="Width"
                        name="width"
                        type="number"
                        value={width}
                        onChange={fileChangedSize}
                        variant="outlined"
                    />
                    <TextField
                        label="Height"
                        name="height"
                        type="number"
                        value={height}
                        onChange={fileChangedSize}
                        variant="outlined"
                    />
                </div>
                <SaveButton saveData={saveResizeData}/>
            </form>
            <div className="resize-image-content">
                <img src={newImage} alt="resize"/>
            </div>
        </div>
    );
}

export default Resize;