import React from 'react';

export default function ModalPhotoDetails(props)
{
    let content = '';

    if (props.modalPhoto) {
        let dateTaken = new Date(props.modalPhoto.taken);
        let dateAdded = new Date(props.modalPhoto.added);
        content =
            <div>
                <table>
                    <tr>
                        <td colSpan={2}>{props.modalPhoto.description}</td>
                    </tr>
                    <tr>
                        <td><b>Exposure:</b> {props.modalPhoto.exposureTime}</td>
                        <td><b>Fstop:</b> {props.modalPhoto.fnumber}</td>
                    </tr>
                    <tr>
                        <td><b>Focal length:</b> {props.modalPhoto.focalLength}</td>
                        <td><b>Iso:</b> {props.modalPhoto.iso}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}><b>Lens:</b> {props.modalPhoto.lensModel}</td>
                    </tr>
                    <tr>
                        <td><b>Added:</b> {dateAdded.toDateString()}</td>
                        <td><b>Date taken:</b> {dateTaken.toLocaleDateString()}</td>
                    </tr>

                </table>
            </div>
    }
    return content
}
