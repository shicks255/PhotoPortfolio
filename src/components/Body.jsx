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
        this.carouselLeft = this.carouselLeft.bind(this);
        this.carouselRight = this.carouselRight.bind(this);
    }

    carouselLeft(currentIndex) {
        console.log(currentIndex);
        this.setState({modalPhoto: this.state.photos.find((t) => t.number = currentIndex-1)})
        // this.doModal(this.state.modalPhoto);
    }

    carouselRight(currentIndex) {
        console.log(currentIndex);
        this.setState({modalPhoto: this.state.photos.find((t) => t.number = currentIndex+1)})
        // this.doModal(this.state.modalPhoto);
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
                photos => photos.map((t,i) => {
                    t.num = i;
                    return t;
                })
            )
            .then(
                photos => this.setState({ photos: photos }),
                error => { }
            );
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
                                    <a className={"carousel-control-prev"} onClick={() => this.carouselLeft(this.state.modalPhoto.num)} href="#carouselExampleControls" role="button" data-slide="prev">
                                        <span className={"carousel-control-prev-icon"} aria-hidden="true"></span>
                                        <span className={"sr-only"}>Previous</span>
                                    </a>
                                    <a className={"carousel-control-next"} onClick={() => this.carouselRight(this.state.modalPhoto.num)} href="#carouselExampleControls" role="button" data-slide="next">
                                        <span className={"carousel-control-next-icon"} aria-hidden="true"></span>
                                        <span className={"sr-only"}>Next</span>
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


