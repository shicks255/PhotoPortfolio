import React, { ReactElement } from 'react';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { IPhoto } from 'models/Photo';

interface IProps {
  modalPhoto?: IPhoto;
}

const ModalPhotoDetails: React.FC<IProps> = (props) => {
  const { modalPhoto } = props;
  const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY || '';
  let content: ReactElement | null = null;

  if (modalPhoto) {
    let mapBundle;
    let mapColClassName = '';

    if (modalPhoto.lat && modalPhoto.long) {
      const lat = modalPhoto.lat.slice(0, modalPhoto.lat.length - 1);
      const lng = modalPhoto.long.slice(0, modalPhoto.long.length - 1);
      mapColClassName = 'col';

      mapBundle = (
        <LoadScript id="script-loader" googleMapsApiKey={key}>
          <GoogleMap
            id="my-map"
            mapContainerClassName="mapContainer"
            zoom={15}
            center={{
              lat: parseFloat(lat),
              lng: -parseFloat(lng)
            }}
          >
            <Marker
              position={{
                lat: parseFloat(lat),
                lng: -parseFloat(lng)
              }}
            />
          </GoogleMap>
        </LoadScript>
      );
    }

    const tagList = modalPhoto.tags.map((tag, index) => (
      <span className={'bg-slate-500 rounded-full px-3 py-1 text-white'} key={index}>
        {tag.name}
      </span>
    ));

    const dateTaken = new Date(modalPhoto.taken);
    const dateAdded = new Date(modalPhoto.addedOn);
    content = (
      <div id={'modalDetails'} className={'container-fluid'}>
        <div className={'row justify-content-center'}>
          <div className="p-4 font-bold text-2xl">
            <p>{modalPhoto.title}</p>
          </div>
          <div>
            <i>
              <p className={'h3'}>{modalPhoto.description}</p>
            </i>
          </div>
          <div className="text-left ml-4 mr-3">
            <div className="mt-8 p-2 border-b-2">
              <i className={'fas fa-clock mr-3'}></i>
              <b>Exposure:</b> {modalPhoto.exposureTime}
            </div>
            <div className="p-2 border-b-2">
              <i className={'fas fa-asterisk mr-3'}></i>
              <b>Fstop:</b> {modalPhoto.fnumber}
            </div>
            <div className="p-2 border-b-2">
              <i className={'fas fa-ruler mr-3'}></i>
              <b>Focal length:</b> {modalPhoto.focalLength}
            </div>
            <div className="p-2 border-b-2">
              <i className={'fas fa-cloud-sun mr-3'}></i>
              <b>Iso:</b> {modalPhoto.iso}
            </div>
            <div className="p-2 border-b-2">
              <i className={'fas fa-camera mr-3'}></i>
              <b>Lens:</b> {modalPhoto.lensModel}
            </div>
            <div className="p-2 border-b-2">
              <i className={'fas fa-calendar-alt mr-3'}></i>
              <b>Added:</b>{' '}
              {dateAdded.toLocaleDateString('en-US', {
                weekday: 'short',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <div className="p-2 border-b-2">
              <i className={'fas fa-calendar-alt mr-3'}></i>
              <b>Date taken:</b>{' '}
              {dateTaken.toLocaleDateString('en-US', {
                weekday: 'short',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          <br />
          Tags:
          <br />
          {tagList}
          <br />
          <div className={mapColClassName}>{mapBundle}</div>
        </div>
      </div>
    );
  }

  return content;
};

export default ModalPhotoDetails;
