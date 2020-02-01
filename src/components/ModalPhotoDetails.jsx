import React from 'react';
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

export default function ModalPhotoDetails(props)
{
    let content = '';

    if (props.modalPhoto) {

        let mapBundle = '';
        let mapColClassName = '';

        if (props.modalPhoto.lat && props.modalPhoto.long) {
            let lat = props.modalPhoto.lat.slice(0, props.modalPhoto.lat.length-1);
            let lng = props.modalPhoto.long.slice(0, props.modalPhoto.long.length-1);
            mapColClassName = 'col';

            mapBundle =
                <LoadScript
                    id='script-loader'
                    googleMapsApiKey='AIzaSyC_jRqgK_p6CexqFvc8zAKYFc4oobvs3-U'>
                    <GoogleMap
                        id='my-map'
                        mapContainerStyle={{
                            height: "300px",
                            width: "600px"
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
            <div id={'modalDetails'} className={'container-fluid'}>
                <div className={'row justify-content-center'}>
                    <div className={mapColClassName}>
                        {mapBundle}
                    </div>
                    <div className={'col'}>
                        <table className={'table'}>
                            <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <i>
                                        <p className={'h3'}>
                                            {props.modalPhoto.description}
                                        </p>
                                    </i>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i className={'fas fa-clock'}></i>&nbsp;
                                    <b>Exposure:</b> {props.modalPhoto.exposureTime}
                                </td>
                                <td>
                                    <i className={'fas fa-asterisk'}></i>&nbsp;
                                    <b>Fstop:</b> {props.modalPhoto.fnumber}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i className={'fas fa-ruler'}></i>&nbsp;
                                    <b>Focal length:</b> {props.modalPhoto.focalLength}
                                </td>
                                <td>
                                    <i className={'fas fa-cloud-sun'}></i>&nbsp;
                                    <b>Iso:</b> {props.modalPhoto.iso}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <i className={'fas fa-camera'}></i>&nbsp;
                                    <b>Lens:</b> {props.modalPhoto.lensModel}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i className={'fas fa-calendar-alt'}></i>&nbsp;
                                    <b>Added:</b> {dateAdded.toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                                </td>
                                <td>
                                    <i className={'fas fa-calendar-alt'}></i>&nbsp;
                                    <b>Date taken:</b> {dateTaken.toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        Tags:
                        {tagList}
                        <br/>
                    </div>
                </div>
            </div>
    }
    return content
}
