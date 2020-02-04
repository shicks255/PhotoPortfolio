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
            allTags: [],
            loading: true
        }

        this.loadPhotosAndTags()

        this.doModal = this.doModal.bind(this);
        this.changeModalPhoto = this.changeModalPhoto.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.carouselLeft = this.carouselLeft.bind(this);
        this.carouselRight = this.carouselRight.bind(this);
        this.filter = this.filter.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            if (!e.repeat) {
                if (this.state.modalPhoto) {
                    if (e.keyCode === 27)
                        this.closeModal();
                    if (e.keyCode === 37)
                        this.carouselLeft();
                    if (e.keyCode === 39)
                        this.carouselRight();
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.id === 'myModal')
                this.closeModal();
        });

        let startCoords = {};
        const imageHolder = document.getElementById('modalImage');
        imageHolder.addEventListener('touchstart', (e) => {
            startCoords = e.changedTouches[0];
            startCoords.startTime = new Date().getTime();
            e.preventDefault();
        });
        imageHolder.addEventListener('touchend', (e) => {
            e.preventDefault();
            var touchObj = e.changedTouches[0];
            const distanceX = Math.abs(touchObj.pageX - startCoords.pageX);
            const distanceY = Math.abs(touchObj.pageY - startCoords.pageY);
            const elapsed = new Date().getTime() - startCoords.startTime;
            if (elapsed <= 200)
                if (distanceX >= 100 && distanceY < 100) {
                    if (startCoords.pageX > touchObj.pageX)
                        this.carouselRight();
                    else
                        this.carouselLeft();
                }
            if (distanceY > 100 && distanceX < 100)
                this.closeModal();
        });

        /**
        window.addEventListener("beforeunload", function(event) {
            event.preventDefault();
            console.log('hi');
            event.returnValue = '';
        });
         */
    }

    async loadPhotosAndTags() {
        await this.getAllPhotos();
        this.getAllTags();
    }

    filter(tag) {
        let photosToDisplay;
        if (tag === '')
            photosToDisplay = this.state.allPhotos;
        else {
            photosToDisplay = this.state.allPhotos.filter(photo =>
            {
                return photo.tags.map(tag => tag.name.toLowerCase()).includes(tag.toLowerCase())
            }).map((t, i) =>
            {
                t.num = i;
                return t
            });
        }
        this.setState({
            photosToDisplay: photosToDisplay
        });
    }

    carouselLeft() {
        if (this.state.modalPhoto.num > 0) {
            let photo = this.state.photosToDisplay.find((t) => t.num === this.state.modalPhoto.num-1)
            this.changeModalPhoto(photo);
        }
    }

    carouselRight() {
        if (this.state.modalPhoto.num < this.state.photosToDisplay.length-1) {
            let photo = this.state.photosToDisplay.find((t) => t.num === this.state.modalPhoto.num+1)
            this.changeModalPhoto(photo);
        }
    }

    closeModal() {
        $( '#myModal' ).addClass('hidden');
        this.setState({
            modalPhoto: undefined
        });
        $('body').removeClass('dontOverflow');
    }

    doModal(photo) {
        $('#modalImage')
            .attr('src', '')
            .attr('src', `/image/${photo.fileName}`)
            .attr('alt', photo.name);

        $('body').addClass('dontOverflow');

        this.setState({ modalPhoto: photo })

        $('#myModal').removeClass('hidden');
    }

    changeModalPhoto(photo) {
        $('#modalImage')
            .attr('src', `/image/${photo.fileName}`)
            .attr('alt', photo.name);


        this.setState({ modalPhoto: photo })
    }

    getAllPhotos() {
        return (
            fetch("/image")
                .then(
                    res => res.json(),
                    error => console.log(error)
                )
                .then(
                    photos => photos.map((t,i) => {
                        t.num = i;
                        return t;
                    }),
                    error => console.log(error)
                )
                .then(
                    photos => this.setState({
                        allPhotos: photos,
                        photosToDisplay: photos,
                        loading: false
                    }),
                    error => console.log(error)
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


