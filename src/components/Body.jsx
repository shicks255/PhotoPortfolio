import React from 'react';
import PhotoBox from './PhotoBox';
import FilterControls from "./FilterControls";
import CarouselModal from "./CarouselModal";
import $ from 'jquery/dist/jquery';
export default class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allPhotos: [],
            photosToDisplay: [],
            modalPhoto: undefined,
            showDetails: false,
            allTags: [],
            loading: true
        }

        this.loadPhotosAndTags()

        this.doModal = this.doModal.bind(this);
        this.setModal = this.setModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.carouselLeft = this.carouselLeft.bind(this);
        this.carouselRight = this.carouselRight.bind(this);
        this.togglePhotoInfo = this.togglePhotoInfo.bind(this);
        this.filter = this.filter.bind(this);
    }

    async loadPhotosAndTags() {
        var result = await this.getAllPhotos();
        this.getAllTags();
    }

    filter(tag) {
        if (tag) {
            let photosToDisplay = this.state.allPhotos.filter( photo => {
                return photo.tags.map( tag => tag.name.toLowerCase()).includes(tag.toLowerCase())
            }).map((t,i) => {
                t.num = i;
                return t
            });
            this.setState({
                photosToDisplay: photosToDisplay
            });
        }
    }

    carouselLeft() {
        if (this.state.modalPhoto.num > 0) {
            let photo = this.state.photosToDisplay.find((t) => t.num === this.state.modalPhoto.num-1)
            this.setModal(photo);
        }
    }

    carouselRight() {
        if (this.state.modalPhoto.num < this.state.photosToDisplay.length-1) {
            let photo = this.state.photosToDisplay.find((t) => t.num === this.state.modalPhoto.num+1)
            this.setModal(photo);
        }
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
        return (fetch("/image")
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
                photos => this.setState({
                    allPhotos: photos,
                    photosToDisplay: photos,
                    loading: false
                }),
                error => { }
            ));
    }

    getAllTags() {
        const tags = this.state.allPhotos
            .flatMap(i => i.tags
                .flatMap(k => k.name));
        tags.sort( (a,b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1);

        this.setState({
            allTags: Array.from(new Set(tags)),
        });
    }

    render() {
        let pics = this.state.photosToDisplay.map(x => {
            return <PhotoBox
                key={x.fileName}
                clickFunction={this.doModal}
                photo={x}
                showDetails={this.state.showDetails}
                togglePhotoDetails={this.togglePhotoInfo}>
            </PhotoBox>
        });

        return (
            <div>
                <CarouselModal
                    closeModalButton={this.closeModal}
                    carouselLeft={this.carouselLeft}
                    carouselRight={this.carouselRight}
                    modalPhoto={this.state.modalPhoto}
                    showDetails={this.state.showDetails}
                    togglePhotoInfo={this.togglePhotoInfo}
                />

                <FilterControls
                    allTags={this.state.allTags}
                    onTagClick={this.filter}
                    onFormChange={this.handleChange}
                    photos={this.state.allPhotos}
                />

                <div className={'row'} style={{ marginBottom: "5px" }}>
                    {pics}
                </div>
            </div>
        )
    }

}


