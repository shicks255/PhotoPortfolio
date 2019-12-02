import React from 'react';
import PhotoBox from './PhotoBox';
import ModalPhotoDetails from "./ModalPhotoDetails";
import close from 'open-iconic/svg/x.svg';
import $ from 'jquery/dist/jquery';
export default class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            modalPhoto: undefined,
            showDetails: false
        }
        this.getAllPhotos()

        this.doModal = this.doModal.bind(this);
        this.setModal = this.setModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.carouselLeft = this.carouselLeft.bind(this);
        this.carouselRight = this.carouselRight.bind(this);
        this.togglePhotoInfo = this.togglePhotoInfo.bind(this);
    }

    carouselLeft(currentIndex) {
        let photo = this.state.photos.find((t) => t.num === currentIndex-1)
        this.setModal(photo);
    }

    carouselRight(currentIndex) {
        let photo = this.state.photos.find((t) => t.num === currentIndex+1)
        this.setModal(photo);
    }

    closeModal() {
        $( '.modal' ).modal('toggle');
    }

    doModal(photo) {
        $('#modalImage')
            .attr('src', `/image/${photo.fileName}`)
            .attr('alt', photo.name);

        this.setState({ modalPhoto: photo })

        $('.modal').modal('toggle');
    }

    setModal(photo) {
        $('#modalImage')
            .attr('src', `/image/${photo.fileName}`)
            .attr('alt', photo.name);

        this.setState({ modalPhoto: photo })
    }

    togglePhotoInfo() {
        this.setState({
            showDetails: !this.state.showDetails
        });
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
            return <PhotoBox
                key={x.fileName}
                clickFunction={this.doModal}
                photo={x}
                showDetails={this.state.showDetails}
                togglePhotoDetails={this.togglePhotoInfo}>
            </PhotoBox>
        })

        let details = this.state.showDetails ?
            <ModalPhotoDetails modalPhoto={this.state.modalPhoto} /> : '';
        let showDetailsButton = !this.state.showDetails ?
            <button type={'button'} className={'btn btn-success'} onClick={() => this.togglePhotoInfo()}>Info...</button> :
            <button type={'button'} className={'btn btn-success'} onClick={() => this.togglePhotoInfo()}>Hide info...</button>

        return (
            <div>
                <div className={'modal fade bd-example-modal-xl'} tabIndex={'-1'} style={{ paddingRight: "0" }} role={'dialog'}>
                    <div className={'modal-dialog modal-xl modal-dialog-centered'} role={'document'}>
                        <div className={'modal-content'}>
                            <div className={'modal-body'}>
                                <button type={'button'} onClick={() => this.closeModal()} className={'close'} aria-label={'Close'}>
                                    <span className={'oi oi-x'} title={'x'} aria-hidden={'true'}></span>
                                </button>
                                <div id={'carouselControls'} className={'carousel slide'}>
                                    <div className={'carousel-inner'}>
                                        <img id={'modalImage'} alt={''} width={'100%'} src={''} />
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
                                {details}
                                {showDetailsButton}
                            </div>
                        </div>
                    </div>s
                </div>

                <form>
                    <div className={'form-group'}>
                        <label htmlFor={''}>Photos with tag:</label>
                        <input type={''} className={'form-control'} aria-describedby={''}></input>
                        <small id={''} className={'form-text text-muted'}>Test</small>
                    </div>
                </form>


                Photos with tag:

                <div className={'row'} style={{ marginBottom: "5px" }}>
                    {pics}
                </div>
            </div>
        )
    }

}


