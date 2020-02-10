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
        },() => {
            if (!this.state.showDetails) {
                document.getElementById('root').scrollIntoView({
                    behavior: "smooth"
                });
            }
            if (this.state.showDetails) {
                document.getElementById('modalDetails').scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    }

    render() {
        let detailsClass = this.state.showDetails ? 'slideDown' : '';
        let showDetailsButton = !this.state.showDetails ?
            <i className={'fas fa-info'} onClick={this.togglePhotoInfo}></i> :
            <i className={'fas fa-times-circle'} onClick={this.togglePhotoInfo}></i>
        let upArrowToClose = <i onClick={this.props.closeModalButton} className={'fas fa-arrow-up'}></i>

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
                        {upArrowToClose}
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        {showDetailsButton}
                        <div className={`photoModalDetails ${detailsClass}`}>
                            <ModalPhotoDetails modalPhoto={this.props.modalPhoto} />
                        </div>
                    </div>
                </div>
            </div>

        return div;
    }
}