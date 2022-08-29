import React, { useRef, useState } from 'react';
import { useEffect } from 'react';

import { IPhoto } from 'models/Photo';

import useClickOutside from '../hooks/useClickOutside';
import ModalPhotoDetails from './ModalPhotoDetails';

interface IProps {
  closeModal: () => void;
  carouselLeft: () => void;
  carouselRight: () => void;
  modalPhoto: IPhoto;
}

const CarouselModal: React.FC<IProps> = (props) => {
  const { closeModal, carouselLeft, carouselRight, modalPhoto } = props;

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!showDetails) {
      document.getElementById('root')?.scrollIntoView({
        behavior: 'smooth'
      });
    }

    if (showDetails) {
      setTimeout(() => {
        document.getElementById('modalDetails')?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 650);
    }
  }, [showDetails]);

  const ref = useRef(null);

  useClickOutside(ref, () => {
    closeModal();
  });

  const togglePhotoInfo = () => {
    setShowDetails((curr) => !curr);
  };

  const detailsClass = showDetails ? 'slideDown' : '';
  const showDetailsButton = !showDetails ? (
    <i className={'fas fa-info'} onClick={togglePhotoInfo}></i>
  ) : (
    <i className={'fas fa-times-circle'} onClick={togglePhotoInfo}></i>
  );
  const upArrowToClose = <i onClick={closeModal} className={'fas fa-arrow-up'}></i>;

  const div = (
    <div id={'myModal'} className={'myModal'}>
      <div className={'modalImageContainer'} ref={ref}>
        <div className={'modalLeft'} onClick={carouselLeft}>
          <a className={'clickable'} onClick={carouselLeft}>
            <span className={'previous carousel-control-prev-icon'} aria-hidden="true"></span>
          </a>
        </div>
        <img
          id={'modalImage'}
          alt="pix"
          className={'modalImage'}
          src={`https://photosapi.shicks255.com/image/${modalPhoto.fileName}`}
          style={{ maxWidth: '1250px' }}
        />
        <div className={'modalRight'} onClick={carouselRight}>
          <a className={'clickable'} onClick={carouselRight}>
            <span className={'next carousel-control-next-icon'} aria-hidden="true"></span>
          </a>
        </div>
      </div>
      <div className={'detailsButton'}>
        {upArrowToClose}
        &nbsp; &nbsp; &nbsp; &nbsp;
        {showDetailsButton}
        <div className={`photoModalDetails ${detailsClass}`}>
          <ModalPhotoDetails modalPhoto={modalPhoto} />
        </div>
      </div>
    </div>
  );

  return div;
};

export default CarouselModal;
