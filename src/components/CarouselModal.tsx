import React, { useRef, useState } from 'react';
import { useEffect } from 'react';

import { IPhoto } from 'models/Photo';

import useClickOutside, { useClickOutsideMulti } from '../hooks/useClickOutside';
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

  const modalRef = useRef(null);
  const detailsRef = useRef(null);
  const detailsButtonRef = useRef(null);
  const backButtonRef = useRef(null);
  const exitButtonRef = useRef(null);

  useClickOutsideMulti(
    [modalRef, detailsRef, detailsButtonRef, backButtonRef, exitButtonRef],
    () => {
      closeModal();
    }
  );

  const togglePhotoInfo = () => {
    setShowDetails((curr) => !curr);
  };

  const div = (
    <div id={'myModal'} className={'myModal'}>
      <div className={`flex justify-center h-full items-center ${showDetails ? 'mr-96' : ''}`}>
        <div className="">
          <img
            ref={modalRef}
            id={'modalImage'}
            alt="pix"
            className={'modalImage'}
            src={`https://photosapi.shicks255.com/image/${modalPhoto.fileName}`}
          />
          {!showDetails && (
            <div
              ref={detailsButtonRef}
              className={
                'absolute top-10 right-10 cursor-pointer px-4 py-2 rounded-full opacity-70 hover:bg-red-200'
              }
              onClick={togglePhotoInfo}
            >
              <i className={'fas fa-info text-white'}></i>
            </div>
          )}
          <div
            ref={backButtonRef}
            className={
              'absolute top-10 left-10 cursor-pointer px-4 py-2 rounded-full opacity-70 hover:bg-red-200'
            }
            onClick={closeModal}
          >
            <i className={'fas fa-arrow-left text-white'}></i>
          </div>
        </div>
      </div>
      {showDetails && (
        <div ref={detailsRef} className="absolute right-0 top-0 h-screen w-96 bg-red-200 z-40">
          <i
            className={'fas fa-times-circle absolute top-10 left-10 cursor-pointer'}
            onClick={togglePhotoInfo}
            ref={exitButtonRef}
          ></i>
          <ModalPhotoDetails modalPhoto={modalPhoto} />
        </div>
      )}
    </div>
  );

  return div;
};

export default CarouselModal;
