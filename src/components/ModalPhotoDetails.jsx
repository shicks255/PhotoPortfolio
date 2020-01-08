import React from 'react';
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

export default function ModalPhotoDetails(props)
{
    let content = '';
    let g = '908-391-7530';

    if (props.modalPhoto) {

        let mapBundle = '';

        if (props.modalPhoto.lat && props.modalPhoto.long) {
            let lat = props.modalPhoto.lat.slice(0, props.modalPhoto.lat.length-1);
            let lng = props.modalPhoto.long.slice(0, props.modalPhoto.long.length-1);

            mapBundle =
                <LoadScript
                    id='script-loader'>
                    <GoogleMap
                        id='my-map'
                        mapContainerStyle={{
                            height: "400px",
                            width: "800px"
                        }}
                        zoom={15}
                        center={{
                            lat: parseFloat(lat),
                            lng: parseFloat(-lng)
                        }}>
                        <Marker
                            position={{
                                lat: parseFloat(lat),
                                lng: parseFloat(-lng)
                            }}/>
                    </GoogleMap>
                </LoadScript>
        }

        let tagList = props.modalPhoto.tags.map((tag, index) =>
            <span className={'badge badge-pill badge-primary'} key={index}>{tag.name}</span>
        );

        let dateTaken = new Date(props.modalPhoto.taken);
        let dateAdded = new Date(props.modalPhoto.addedOn);
        content =
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className={'col'}>
                        {mapBundle}
                    </div>
                    <div className={'col'}>

                        <table border={1}>
                            <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <i>
                                        {props.modalPhoto.description}
                                    </i>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i className={'fas fa-clock'}></i>
                                    <b>Exposure:</b> {props.modalPhoto.exposureTime}
                                </td>
                                <td>
                                    <i className={'fas fa-asterisk'}></i>
                                    <b>Fstop:</b> {props.modalPhoto.fnumber}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i className={'fas fa-ruler'}></i>
                                    <b>Focal length:</b> {props.modalPhoto.focalLength}
                                </td>
                                <td>
                                    <i className={'fas fa-cloud-sun'}></i>
                                    <b>Iso:</b> {props.modalPhoto.iso}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <i className={'fas fa-camera'}></i>
                                    <b>Lens:</b> {props.modalPhoto.lensModel}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i className={'fas fa-calendar-alt'}></i>
                                    <b>Added:</b> {dateAdded.toDateString()} {dateAdded.toLocaleTimeString()}
                                </td>
                                <td>
                                    <i className={'fas fa-calendar-alt'}></i>
                                    <b>Date taken:</b> {dateTaken.toDateString()} {dateTaken.toLocaleTimeString()}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        Tags:
                        {tagList}
                    </div>
                </div>
            </div>
    }
    return content
}
