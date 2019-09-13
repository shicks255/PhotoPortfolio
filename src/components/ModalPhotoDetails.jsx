import React from 'react';

export default function ModalPhotoDetails(props) {
    let content = '';

    if (props.modalPhoto)
        content = <table>
            <tr>
                {props.modalPhoto.description}
            </tr>
            <tr>
                Exposure Time:  {props.modalPhoto.exposureTime} s
            </tr>
            <tr>
                fstop:  {props.modalPhoto.fnumber}
            </tr>
            <tr>
                Focal length: {props.modalPhoto.focalLength}
            </tr>
            <tr>
                Iso:  {props.modalPhoto.iso}
            </tr>
            <tr>
                Lens:  {props.modalPhoto.lensModel}
            </tr>
            <tr>
                Uploaded:  {props.modalPhoto.addedOn}
            </tr>
            <tr>
                Date taken:  {props.modalPhoto.taken}
            </tr>
        </table>

    return(content)

}


