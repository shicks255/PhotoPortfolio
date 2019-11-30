import React from 'react';

export default function ModalPhotoDetails(props)
{
    let content = '';

    if (props.modalPhoto) {
        let dateTaken = new Date(props.modalPhoto.taken);
        let dateAdded = new Date(props.modalPhoto.addedOn);
        content =
            <div>
                <table>
                    <tbody>
                    <tr>
                        <i class={'fas fa-map-marker-alt'}></i>
                        <td colSpan={2}>{props.modalPhoto.description}</td>
                    </tr>
                    <tr>
                        <td>
                            <i class={'fas fa-clock'}></i>
                            <b>Exposure:</b> {props.modalPhoto.exposureTime}
                        </td>
                        <td>
                            <i class={'fas fa-asterisk'}></i>
                            <b>Fstop:</b> {props.modalPhoto.fnumber}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <i class={'fas fa-ruler'}></i>
                            <b>Focal length:</b> {props.modalPhoto.focalLength}
                        </td>
                        <td>
                            <i class={'fas fa-cloud-sun'}></i>
                            <b>Iso:</b> {props.modalPhoto.iso}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <i class={'fas fa-camera'}></i>
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
            </div>
    }
    return content
}
