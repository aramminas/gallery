import React, {useState, useEffect} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {Button} from "@material-ui/core";
import { useToasts } from 'react-toast-notifications';
import { v4 as uuidv4 } from 'uuid';
import api from "../api/api";

const type = 'crop';

const Crop = ({id, image, imageInfo}) => {
    const { addToast } = useToasts();
    const [src, setSrc] = useState(null);
    const [imageRef, setImageRef] = useState(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const [crop, setCrop] = useState({
        unit: 'px', // '%'
        width: 30,
        aspect: 3 / 2, //  16 / 9
    });

    useEffect(async _ => {
        if(image !== ""){
            const data = await fetch(image);
            const blob = await data.blob();
            let metadata = {
                type: 'image/jpeg'
            };
            let file = new File([blob], `${id}.jpg`, metadata);
            onSelectFileBlob(file);
        }

        if(imageInfo){
            setCrop({...crop, ...imageInfo});
        }

    },[image, imageInfo]);

    const saveCropData = async () => {
        const {height, width, x, y} = crop;
        const data = {
            id: uuidv4(),
            imageId: id,
            type,
            height,
            width,
            x,
            y,
        };

        const response = await api.saveImageInfo(data);
        if(response.status){
            addToast('Saved Successfully', { appearance: 'success' });
        }else {
            addToast( 'Error while saving data!', { appearance: 'error' });
        }
    }

    const onSelectFileBlob = files => {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setSrc(reader.result)
            );
            reader.readAsDataURL(files);
    };

    // const onSelectFile = e => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         const reader = new FileReader();
    //         reader.addEventListener('load', () =>
    //             setSrc(reader.result)
    //         );
    //
    //         reader.readAsDataURL(e.target.files[0]);
    //     }
    // };

    const onImageLoaded = image => {
        setImageRef(image);
    };

    const onCropComplete = crop => {
        makeClientCrop(crop);
    };

    const onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // setCrop(percentCrop);
        setCrop(crop)
    };

    const makeClientCrop = async (crop) => {
        if (imageRef && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
                imageRef,
                crop,
                'newFile.jpeg'
            );
            setCroppedImageUrl(croppedImageUrl);
        }
    }

    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    return (
        <div className="App">
            {/*<div>*/}
            {/*    <input type="file" accept="image/*" onChange={onSelectFile} />*/}
            {/*</div>*/}
            {src && (
                <ReactCrop
                    src={src}
                    crop={crop}
                    ruleOfThirds
                    onImageLoaded={onImageLoaded}
                    onComplete={onCropComplete}
                    onChange={onCropChange}
                />
            )}
            {croppedImageUrl && (
                <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
            )}
            <hr/>
            <Button variant="contained" color="primary" onClick={saveCropData}>
                Save
            </Button>
        </div>
    );
}

export default Crop;