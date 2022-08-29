export interface IPhoto {
  num: number;
  fileName: string;
  title: string;
  description: string;
  lat?: string;
  long?: string;
  altitude?: string;
  exposureTime: string;
  iso: string;
  fnumber: string;
  focalLength: number;
  lensModel: string;
  addedOn: string;
  taken: string;
  tags: ITag[];
}

export interface ITag {
  name: string;
}
