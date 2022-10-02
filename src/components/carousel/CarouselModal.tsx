/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';

import { IPhoto } from 'models/Photo';

import { useClickOutsideMulti } from '../../hooks/useClickOutside';
import useIsMobile from '../../hooks/useIsMobile';
import ModalPhotoDetails from './ModalPhotoDetails';

interface IProps {
  closeModal: () => void;
  carouselLeft: () => void;
  carouselRight: () => void;
  modalPhoto: IPhoto;
  photos: IPhoto[];
}

interface ICarouselPlacement {
  leftPhoto: IPhoto | undefined;
  centerPhoto: IPhoto;
  rightPhoto: IPhoto | undefined;
  rightAmount: number;
}

const CarouselModal: React.FC<IProps> = (props) => {
  const { closeModal, carouselLeft, carouselRight, photos } = props;
  const { modalPhoto } = props;

  const [showDetails, setShowDetails] = useState(false);
  const isMobile = useIsMobile();

  const [centerPhoto, setCenterPhoto] = useState(modalPhoto);

  const [carouselState, setCarouselState] = useState<ICarouselPlacement>({
    centerPhoto: modalPhoto,
    rightAmount: 0,
    rightPhoto: undefined,
    leftPhoto: undefined
  });

  useEffect(() => {
    const initialState: ICarouselPlacement = {
      centerPhoto: modalPhoto,
      rightAmount: 0,
      leftPhoto: undefined,
      rightPhoto: undefined
    };

    if (centerPhoto.num > 0) {
      const left = photos.find((p) => p.num == centerPhoto.num - 1);
      initialState.leftPhoto = left;
    }

    if (centerPhoto.num < photos.length) {
      const right = photos.find((p) => p.num == centerPhoto.num + 1);
      initialState.rightPhoto = right;
    }

    setCarouselState(initialState);
  }, []);

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
  const leftButton = useRef(null);
  const rightButton = useRef(null);

  useClickOutsideMulti(
    [modalRef, detailsRef, detailsButtonRef, backButtonRef, exitButtonRef, leftButton, rightButton],
    () => {
      closeModal();
    }
  );

  const togglePhotoInfo = () => {
    setShowDetails((curr) => !curr);
  };

  let detailsClass = 'w-96';
  if (isMobile) {
    detailsClass = 'w-full';
  }

  const [touchStart, setTouchStart] = useState(0);
  const [touchMove, setTouchMove] = useState(0);
  const [mover, setMover] = useState('');

  useEffect(() => {
    if (Math.abs(carouselState.rightAmount) < 1) {
      setTimeout(() => {
        setMover('');
      }, 600);
    }
  }, [carouselState.rightAmount]);

  const start = (e) => {
    // setMover('mover');
    setTouchStart(e.changedTouches[0].clientX);
  };

  const move = (e) => {
    setTouchMove(e.changedTouches[0].clientX);
    setCarouselState((prev) => {
      return {
        ...prev,
        rightAmount: Math.round(touchStart - touchMove)
      };
    });
  };

  const goLeft = () => {
    setCarouselState((prev) => ({
      ...prev,
      rightAmount: -window.innerWidth + 22
    }));

    setTimeout(() => {
      setCarouselState((prev) => ({
        ...prev,
        centerPhoto: prev.leftPhoto || prev.centerPhoto
      }));
    }, 300);

    setTimeout(() => {
      setMover('');
    }, 300);

    setTimeout(() => {
      setCarouselState((prev) => {
        return {
          ...prev,
          rightAmount: 0,
          leftPhoto: photos.find((p) => p.num === prev.centerPhoto.num - 1),
          rightPhoto: photos.find((p) => p.num == prev.centerPhoto.num + 1)
        };
      });
    }, 500);
  };

  const goRight = () => {
    setCarouselState((prev) => ({
      ...prev,
      rightAmount: window.innerWidth + 22
    }));

    setTimeout(() => {
      setCarouselState((prev) => ({
        ...prev,
        centerPhoto: prev.rightPhoto || prev.centerPhoto
      }));
    }, 300);

    setTimeout(() => {
      setMover('');
    }, 300);

    setTimeout(() => {
      setCarouselState((prev) => {
        return {
          ...prev,
          rightAmount: 0,
          leftPhoto: photos.find((p) => p.num == prev.centerPhoto.num - 1),
          rightPhoto: photos.find((p) => p.num == prev.centerPhoto.num + 1)
        };
      });
    }, 500);
  };

  const end = (e) => {
    //if we haven't gone past half the screen, set back to 0;
    setMover('mover');
    const totalMoved = Math.abs(touchStart - touchMove);
    const width = window.innerWidth;
    if (totalMoved < width / 2) {
      setCarouselState((prev) => ({ ...prev, rightAmount: 0 }));
    } else {
      //need to switch either left or right.
      if (touchStart > touchMove && carouselState.rightPhoto) {
        console.log('going right');
        goRight();
      } else {
        console.log('going left');
        goLeft();
      }
    }
  };

  if (!carouselState) {
    return null;
  }

  const div = (
    <div id={'myModal'} className={'myModal'}>
      <div
        className={`flex justify-center h-full items-center modalImageContainer ${
          showDetails && !isMobile ? 'showDetails' : ''
        }`}
      >
        <div className="flex-1">
          <div
            onTouchStart={start}
            onTouchMove={move}
            onTouchEnd={end}
            className={`relative ${mover}`}
            style={{ border: '1px solid white', right: `${carouselState?.rightAmount}px` }}
          >
            <img
              ref={modalRef}
              id={'modalImage'}
              alt="pix"
              className={`modalImage absolute -top-[550px]`}
              src={`https://photosapi.shicks255.com/image/${carouselState.centerPhoto.fileName}`}
            />
            {carouselState.leftPhoto && (
              <img
                id={'leftImage'}
                alt="pixLeft"
                style={{ left: `-${window.innerWidth + 22}px` }}
                className={`modalImage absolute -top-[550px]`}
                src={`https://photosapi.shicks255.com/image/${carouselState.leftPhoto.fileName}`}
              />
            )}
            {carouselState.rightPhoto && (
              <img
                id={'rightImage'}
                alt="pixLeft"
                style={{ right: `-${window.innerWidth + 22}px` }}
                className="modalImage absolute -top-[550px]"
                src={`https://photosapi.shicks255.com/image/${carouselState.rightPhoto.fileName}`}
              />
            )}
          </div>
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
          <div className="absolute bottom-10 left-10 text-white">
            {carouselState.centerPhoto.num + 1} / {photos.length}
          </div>
          {!isMobile && (
            <>
              <div
                ref={leftButton}
                onClick={() => {
                  setMover('mover');
                  goLeft();
                }}
                className="absolute top-1/2 left-10 cursor-pointer rounded-full px-4 py-2 hover:bg-slate-500 hover:opacity-70"
              >
                <i className="fas fa-arrow-left text-white"></i>
              </div>
              <div
                ref={rightButton}
                onClick={() => {
                  setMover('mover');
                  goRight();
                }}
                className={`absolute top-1/2 ${
                  showDetails ? 'right-[406px]' : 'right-10'
                } cursor-pointer rounded-full px-4 py-2 hover:bg-slate-500 hover:opacity-70 mover`}
              >
                <i className="fas fa-arrow-right text-white"></i>
              </div>
            </>
          )}
        </div>
      </div>
      <div
        ref={detailsRef}
        className={`absolute h-full modalDetails ${
          showDetails ? 'showDetails' : ''
        } bg-red-200 z-40 overflow-y-auto`}
      >
        <i
          className={'fas fa-times-circle absolute top-5 left-5 cursor-pointer'}
          onClick={togglePhotoInfo}
          ref={exitButtonRef}
        ></i>
        <ModalPhotoDetails modalPhoto={carouselState.centerPhoto} />
      </div>
    </div>
  );

  return div;
};

export default CarouselModal;
