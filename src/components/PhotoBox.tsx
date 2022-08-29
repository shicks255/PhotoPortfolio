import React, { useState } from 'react';

import { IPhoto } from 'models/Photo';

interface IProps {
  photo: IPhoto;
  clickFunction: (x: IPhoto) => void;
}

const PhotoBox: React.FC<IProps> = ({ photo, clickFunction }: IProps) => {
  const thumbnailSrc = 'https://photosapi.shicks255.com/image/' + photo.fileName + '/thumbnail/';
  const imageSrc = 'https://photosapi.shicks255.com/image/' + photo.fileName;

  const [smallLoaded, setSmallLoaded] = useState(false);
  const [largeLoaded, setLargeLoaded] = useState(false);

  return (
    <div key={photo.fileName} className="image-placeholder">
      <div className={'relative'}>
        <img
          src={thumbnailSrc}
          className={`image-small ${smallLoaded ? 'loaded' : ''}`}
          onLoad={() => setSmallLoaded(true)}
        />
        <div style={{ paddingBottom: '50%' }}></div>
        {smallLoaded && (
          <img
            src={imageSrc}
            className={largeLoaded ? 'loaded image w-full' : ''}
            onLoad={() => setLargeLoaded(true)}
          />
        )}
        <div
          onClick={() => clickFunction(photo)}
          className={'card-img-overlay w-full h-full cursor-pointer absolute top-0 p-3'}
        >
          {smallLoaded && <span className={'cardTitle text-white'}>{photo.title}</span>}
        </div>
      </div>
    </div>
  );
};

export default PhotoBox;
