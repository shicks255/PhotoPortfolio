import React from 'react';
import PhotoBox from './PhotoBox';
import ModalPhotoDetails from "./ModalPhotoDetails";
import $ from 'jquery/dist/jquery';
export default class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            modalPhoto: undefined
        }
        this.getAllPhotos()

        this.doModal = this.doModal.bind(this);
    }

    doModal(photo) {
        $('#modalImage')
            .attr('src', `/image/${photo.fileName}`)
            .attr('alt', photo.name);

        this.setState({ modalPhoto: photo })

        $('.modal').modal('toggle');
    }

    getAllPhotos() {
        let request = fetch("/image");
        request
            .then(
                res => res.json()
            )
            .then(
                fulfill => this.setState({ photos: fulfill }),
                error => { }
            );
    }

    componentDidMount() {

    }

    render() {
        let pics = this.state.photos.map(x => {
            return <PhotoBox key={x.fileName} clickFunction={this.doModal} photo={x}></PhotoBox>
        })

        return (
            <div>
                <div className={'modal fade bd-example-modal-xl'} tabIndex={'-1'} style={{ paddingRight: "0" }} role={'dialog'}>
                    <div className={'modal-dialog modal-xl modal-dialog-centered'} role={'document'}>
                        <div className={'modal-content'}>
                            <div className={'modal-body'}>
                                <div id={'carouselControls'} className={'carousel slide'}>
                                    <div className={'carousel-inner'}>
                                        <img id={'modalImage'} alt={''} width={'100%'} src={''} />
                                        <ModalPhotoDetails modalPhoto={this.state.modalPhoto} />
                                    </div>
                                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                            {/* <div className={'modal-body'}>
                                <img id={'modalImage'} alt={''} width={'100%'} src={''} />
                            </div>
                            <div className={'modal-footer'}>
                                <ModalPhotoDetails modalPhoto={this.state.modalPhoto} />
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className={'row'} style={{ marginBottom: "5px" }}>
                    {pics}
                </div>
            </div>
        )
    }

}


