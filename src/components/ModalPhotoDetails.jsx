import React from 'react';

export default function ModalPhotoDetails(props)
{
    let content = '';

    if (props.modalPhoto) {
        let dateTaken = new Date(props.modalPhoto.taken);
        let dateAdded = new Date(props.modalPhoto.added);
        content =
            <div>
                <div className={'row'}>
                    <div className={'col-sm-6-auto col-md-4-auto col-lg-2-auto'}>
                        {props.modalPhoto.description}
                    </div>
                    <div className={'col-sm-6-auto col-md-4-auto col-lg-2-auto'}>
                        <b>Exposure:</b> {props.modalPhoto.exposureTime} s
                    </div>
                    <div className={'col-sm-6-auto col-md-4-auto col-lg-2-auto'}>
                        <b>Fstop:</b> {props.modalPhoto.fnumber}
                    </div>
                    <div className={'col-sm-6 col-md-4 col-lg-2'}>
                        <b>Focal length:</b> {props.modalPhoto.focalLength}
                    </div>
                    <div className={'col-sm-6 col-md-4 col-lg-2'}>
                        <b>Iso:</b> {props.modalPhoto.iso}
                    </div>
                    <div className={'col-sm-6 col-md-4 col-lg-2'}>
                        <b>Lens:</b> {props.modalPhoto.lensModel}
                    </div>
                    <div className={'col-sm-6 col-md-4 col-lg-2'}>
                        <b>Added:</b> {dateAdded.toDateString()}
                    </div>
                    <div className={'col-sm-6 col-md-4 col-lg-2'}>
                        <b>Date taken:</b> {dateTaken.toLocaleDateString()}
                    </div>
                </div>
            </div>
    }
    return content
}
