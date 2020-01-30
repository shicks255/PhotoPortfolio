import React from 'react';
import ModalPhotoDetails from "./ModalPhotoDetails";

export default class CarouselModal extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            showDetails: false,
        }

        this.togglePhotoInfo = this.togglePhotoInfo.bind(this);
    }

    togglePhotoInfo() {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }

    render() {
        let details = this.state.showDetails ?
            <ModalPhotoDetails modalPhoto={this.props.modalPhoto} /> : '';
        let showDetailsButton = !this.state.showDetails ?
            <i className={'fas fa-info'} onClick={this.togglePhotoInfo}></i> :
            <i className={'fas fa-times-circle'} onClick={this.togglePhotoInfo}></i>

        const div =
            <div id={'myModal'} className={'myModal hidden'}>
                <div className={'modalImageContainer'}>
                    <div className={'modalLeft'} onClick={this.props.carouselLeft}>
                        <a className={'clickable'} onClick={this.props.carouselLeft}>
                            <span className={"previous carousel-control-prev-icon"} aria-hidden="true"></span>
                        </a>
                    </div>
                    <img id={'modalImage'} className={'modalImage'} src={''} style={{ maxWidth: "1250px" }}/>
                    <div className={'modalRight'} onClick={this.props.carouselRight}>
                        <a className={'clickable'} onClick={this.props.carouselRight}>
                            <span className={"next carousel-control-next-icon"} aria-hidden="true"></span>
                        </a>
                    </div>
                    <div className={'detailsButton'}>
                        {showDetailsButton}
                    </div>
                </div>
                <div className={'photoModalDetails'}>
                    {details}
                </div>
            </div>
        // <div className={'modal fade bd-example-modal-xl'} tabIndex={'-1'} style={{ paddingRight: "0" }} role={'dialog'}>
        //     <div className={'modal-dialog modal-xl modal-dialog-centered'} role={'document'}>
        //         <div className={'modal-content'}>
        //             <div className={'modal-body'}>
        //                 <button type={'button'} onClick={this.props.closeModalButton} className={'close'} aria-label={'Close'}>
        //                     <span className={'oi oi-x'} title={'x'} aria-hidden={'true'}></span>
        //                 </button>
        //                 <div id={'carouselControls'} className={'carousel slide'}>
        //                     <div className={'carousel-inner'}>
        //                         <img className={'img-fluid'} id={'modalImage'} alt={''} width={'100%'} src={''} />
        //                     </div>
        //                     <a className={"carousel-control-prev"} onClick={this.props.carouselLeft} role="button" data-slide="prev">
        //                         <span className={"carousel-control-prev-icon"} aria-hidden="true"></span>
        //                         <span className={"sr-only"}>Previous</span>
        //                     </a>
        //                     <a className={"carousel-control-next"} onClick={this.props.carouselRight} role="button" data-slide="next">
        //                         <span className={"carousel-control-next-icon"} aria-hidden="true"></span>
        //                         <span className={"sr-only"}>Next</span>
        //                     </a>
        //                 </div>
        //                 {details}
        //                 {showDetailsButton}
        //             </div>
        //         </div>
        //     </div>s
        // </div>

        return div;
    }
}