import React from 'react';
import PhotoBox from './PhotoBox';
import ModalPhotoDetails from "./ModalPhotoDetails";
import $ from 'jquery/dist/jquery';
export default class Body extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            photos: [],
            modalPhoto: undefined
        }
        this.getAllPhotos()

        this.doModal = this.doModal.bind(this);
    }

    doModal(photo)
    {
        $( '#modalImage' ).attr('src', `/image/${photo.fileName}`);

        this.setState({modalPhoto: photo})

        $( '.modal' ).modal('toggle');
    }

    getAllPhotos()
    {
        let request = fetch("/image");
        request
            .then(
                res => res.json()
            )
            .then(
                fulfill => this.setState({photos: fulfill}),
                error => {}
            );
    }

    componentDidMount()
    {

    }

    render()
    {
        let pics = this.state.photos.map(x => {
            return <PhotoBox clickFunction={this.doModal} photo={x}></PhotoBox>
        })

        return (
            <div>
                <div className={'modal fade bd-example-modal-xl'} tabIndex={'-1'} role={'dialog'}>
                    <div className={'modal-dialog modal-xl modal-dialog-centered'} role={'document'}>
                        <div className={'modal-content'}>
                            <div className={'modal-body'}>
                                <img id={'modalImage'} width={'100%'} src={''} />
                            </div>
                            <div className={'modal-footer'}>
                                <ModalPhotoDetails modalPhoto={this.state.modalPhoto} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={'row'}>
                    {pics}
                </div>
            </div>
        )
    }

}


