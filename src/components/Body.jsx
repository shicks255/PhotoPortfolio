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
            filteredTags: [],
            tempTagSearch: '',
            tagToSearch: '',
            loading: true
        }

        this.loadPhotosAndTags()

        this.doModal = this.doModal.bind(this);
        this.setModal = this.setModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.carouselLeft = this.carouselLeft.bind(this);
        this.carouselRight = this.carouselRight.bind(this);
        this.togglePhotoInfo = this.togglePhotoInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filterByTag = this.filterByTag.bind(this);
        this.filter = this.filter.bind(this);
        this.showTags = this.showTags.bind(this);
        this.hideTags = this.hideTags.bind(this);
        this.clickTag = this.clickTag.bind(this);
    }

    async loadPhotosAndTags() {
        var result = await this.getAllPhotos();
        this.getAllTags();
    }

    filterByTag(e) {
        e.preventDefault();
        this.setState({
            tagToSearch: this.state.tempTagSearch,
            tempTagSearch: ''
        }, () => this.filter(this.state.tagToSearch));
    }

    clickTag(e) {
        let tag = e.currentTarget.dataset.id;
        this.setState({
            tagToSearch: tag
        });
        this.filter(tag);
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

    handleChange(e) {
        let input = e.target.value;

        let filteredTags = this.state.allTags.filter( s => s.toLowerCase().includes(input.toLowerCase()));
        this.setState({
            tempTagSearch: input,
            filteredTags: filteredTags
        });
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

    showTags() {
        $( '#tagComboBox' ).addClass('visible').removeClass('invisible');
    }

    hideTags(e) {
        console.log('hi');
        setTimeout( () => {
            $( '#tagComboBox' ).addClass('invisible').removeClass('visible');
            }, 150);
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
            filteredTags: Array.from(new Set(tags)),
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

        let selectedTag = this.state.tagToSearch.length > 0 ?
            <span>
                Photos tagged with:
                <span href={'#'} className={'badge badge-pill badge-primary'}>
                    {this.state.tagToSearch}&nbsp;
                    <span className={'oi oi-x'} title={'x'} ></span>
                </span>
            </span> : '';

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
                    filteredTags={this.state.filteredTags}
                    tempTagSearch={this.state.tempTagSearch}
                    onTagClick={this.clickTag}
                    onFormSubmit={this.filterByTag}
                    onFormChange={this.handleChange}
                    onFocus={this.showTags}
                    onBlur={this.hideTags}/>

                {selectedTag}

                <div className={'row'} style={{ marginBottom: "5px" }}>
                    {pics}
                </div>
            </div>
        )
    }

}


