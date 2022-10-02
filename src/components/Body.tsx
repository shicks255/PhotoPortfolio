/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect, useCallback } from 'react';

import { usePhotos } from 'api';
import { IPhoto } from 'models/Photo';
import { Routes, Route, useNavigate } from 'react-router-dom';

import CarouselModal from './carousel/CarouselModal';
import FilterControls from './FilterControls';
import Photos from './photo/Photos';

interface ICords extends Omit<Touch, 'target'> {
  startTime?: number;
  target?: EventTarget;
}

let startCoords: ICords = {
  clientX: 0,
  clientY: 0,
  force: 0,
  identifier: 0,
  pageX: 0,
  pageY: 0,
  radiusX: 0,
  radiusY: 0,
  rotationAngle: 0,
  screenX: 0,
  screenY: 0,
  startTime: undefined,
  target: undefined
};

const Body: React.FC = () => {
  const [allPhotos, setAllPhotos] = useState<IPhoto[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [modalPhoto, setModalPhoto] = useState<IPhoto | undefined>();
  const [tagFilters, setTagFilters] = useState<string[]>([]);

  const { data, isLoading } = usePhotos();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setAllPhotos(data);

      const tags: string[] = Array.from(new Set(data.flatMap((i) => i.tags).map((k) => k.name)));
      tags.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));
      setAllTags(tags);
    }
  }, [data, allPhotos]);

  useEffect(() => {
    if (modalPhoto) {
      document.body.classList.add('dontOverflow');
    } else {
      document.body.classList.remove('dontOverflow');
    }
  }, [modalPhoto]);

  const photoTagsContainFilterTags = (photo: IPhoto) => {
    const photoTags = photo.tags.map((tag) => tag.name.toLowerCase());
    if (tagFilters.length > 0) {
      return tagFilters.every((t) => photoTags.includes(t.toLowerCase()));
    }
    return true;
  };

  const photosToDisplay = allPhotos
    .filter((photo) => {
      if (tagFilters.length === 0) {
        return true;
      }

      if (photoTagsContainFilterTags(photo)) {
        return true;
      }
      return false;
    })
    .map((photo, indx) => ({
      ...photo,
      num: indx
    }));

  const carouselLeft = useCallback(() => {
    if (modalPhoto && modalPhoto.num > 0) {
      const photo = photosToDisplay.find((t) => t.num === modalPhoto?.num - 1);
      if (photo) {
        changeModalPhoto(photo);
      }
    }
  }, [modalPhoto, photosToDisplay]);

  const carouselRight = useCallback(() => {
    if (modalPhoto && modalPhoto.num < photosToDisplay.length - 1) {
      const photo = photosToDisplay.find((t) => t.num === modalPhoto?.num + 1);
      if (photo) {
        changeModalPhoto(photo);
      }
    }
  }, [modalPhoto, photosToDisplay]);

  const closeModal = useCallback(() => {
    setModalPhoto(undefined);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (!e.repeat) {
        if (modalPhoto) {
          if (e.keyCode === 27) closeModal();
          if (e.keyCode === 37) carouselLeft();
          if (e.keyCode === 39) carouselRight();
        }
      }
    });

    const imageHolder = document.getElementById('modalImage');

    imageHolder?.addEventListener('touchstart', (e) => {
      startCoords = e.changedTouches[0];
      startCoords.startTime = new Date().getTime();
    });

    imageHolder?.addEventListener('touchend', (e) => {
      const touchObj = e.changedTouches[0];
      const distanceX = Math.abs(touchObj.pageX - startCoords.pageX);
      const distanceY = Math.abs(touchObj.pageY - startCoords.pageY);
      const elapsed = new Date().getTime() - (startCoords?.startTime || 0);
      if (elapsed <= 200)
        if (distanceX >= 100 && distanceY < 100) {
          if (startCoords.pageX > touchObj.pageX) carouselRight();
          else carouselLeft();
        }
      // if (distanceY > 100 && distanceX < 100)
      //     this.closeModal();
    });
  }, [carouselLeft, carouselRight, closeModal, modalPhoto]);

  if (!data || isLoading) {
    return <div>LOADING</div>;
  }

  const doModal = (photo: IPhoto) => {
    setModalPhoto(photo);
    navigate('/carousel');
  };

  const changeModalPhoto = (photo: IPhoto) => {
    setModalPhoto(photo);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/carousel"
          element={
            <>
              <CarouselModal
                closeModal={closeModal}
                carouselLeft={carouselLeft}
                carouselRight={carouselRight}
                modalPhoto={photosToDisplay[0]}
                photos={photosToDisplay}
              />
            </>
          }
        />
      </Routes>

      <FilterControls allTags={allTags} tags={tagFilters} setTags={setTagFilters} />

      <Photos photos={photosToDisplay} clickFunction={doModal} />
    </div>
  );
};

export default Body;
