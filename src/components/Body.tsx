/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from 'react';

import { usePhotos } from 'api';
import { IPhoto, ITag } from 'models/Photo';

import CarouselModal from './CarouselModal';
import FilterControls from './FilterControls';
import Photos from './Photos';

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
  }, []);

  if (!data || isLoading) {
    return <div>LOADING</div>;
  }

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

  const carouselLeft = () => {
    if (modalPhoto && modalPhoto.num > 0) {
      const photo = photosToDisplay.find((t) => t.num === modalPhoto?.num - 1);
      if (photo) {
        changeModalPhoto(photo);
      }
    }
  };

  const carouselRight = () => {
    if (modalPhoto && modalPhoto.num < photosToDisplay.length - 1) {
      const photo = photosToDisplay.find((t) => t.num === modalPhoto?.num + 1);
      if (photo) {
        changeModalPhoto(photo);
      }
    }
  };

  const closeModal = () => {
    setModalPhoto(undefined);
  };

  const doModal = (photo: IPhoto) => {
    setModalPhoto(photo);
  };

  const changeModalPhoto = (photo: IPhoto) => {
    setModalPhoto(photo);
  };

  return (
    <div>
      {modalPhoto && (
        <CarouselModal
          closeModal={closeModal}
          carouselLeft={carouselLeft}
          carouselRight={carouselRight}
          modalPhoto={modalPhoto}
        />
      )}

      <FilterControls allTags={allTags} tags={tagFilters} setTags={setTagFilters} />

      <Photos photos={photosToDisplay} clickFunction={doModal} />
    </div>
  );
};

export default Body;
