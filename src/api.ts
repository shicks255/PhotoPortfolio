import { IPhoto } from 'models/Photo';
import { useQuery, QueryObserverResult } from 'react-query';

import Body from './components/Body';

function fethc(endpoint: string) {
  return fetch(endpoint)
    .then((res) => Promise.all([res.ok, res.json()]))
    .then(([ok, photos]) => {
      if (!ok) {
        throw Error(
          JSON.stringify({
            error: photos.message
          })
        );
      }
      return photos.map((t: IPhoto, i: number) => {
        t.num = i;
        return t;
      });
    });
}

function photosQuery(): Promise<IPhoto[]> {
  return fethc('https://photosapi.shicks255.com/image');
}

function photoQuery(name: string): Promise<IPhoto> {
  return fethc(`https://photosapi.shicks255.com/image/${name}`);
}

export function usePhotos(): QueryObserverResult<IPhoto[]> {
  return useQuery(['photos'], async () => photosQuery(), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
    retry: 2
  });
}

export function usePhoto(name: string): QueryObserverResult<IPhoto> {
  return useQuery(`photo-${name}`, async () => photoQuery(name), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
    retry: 2
  });
}
