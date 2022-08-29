import { IPhoto } from 'models/Photo';

import PhotoBox from './PhotoBox';

interface IProps {
  photos: IPhoto[];
  clickFunction: (photos: IPhoto) => void;
}

const Photos: React.FC<IProps> = ({ photos, clickFunction }: IProps) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-center mt-3"
      style={{ marginBottom: '5px' }}
    >
      {photos.map((x) => {
        return <PhotoBox key={x.fileName} photo={x} clickFunction={clickFunction} />;
      })}
    </div>
  );
};

export default Photos;
