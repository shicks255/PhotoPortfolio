import React from 'react';

export default function ModalPhotoDetails(props)
{
    let content = '';

    if (props.modalPhoto) {

        let tagList = props.modalPhoto.tags.map((tag, index) =>
            <span key={index}>{tag.name}</span>
        );



        let dateTaken = new Date(props.modalPhoto.taken);
        let dateAdded = new Date(props.modalPhoto.addedOn);
        content =
            <div>
                <table border={1}>
                    <tbody>
                    <tr>
                        <td colSpan={2}>
                            <i className={'fas fa-map-marker-alt'}></i>
                            {props.modalPhoto.description}
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
                {tagList}
            </div>
    }
    return content
}
