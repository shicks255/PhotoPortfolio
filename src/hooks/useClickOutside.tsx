import { useEffect } from 'react';

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [ref, handler]);
}

// For use if we only want to run the handler function if none of the refs were called
export function useClickOutsideMulti(refs, handler) {
  useEffect(() => {
    const listener = (event) => {
      let handle = true;

      refs.forEach((ref) => {
        if (!ref.current || ref.current.contains(event.target)) {
          handle = false;
        }
      });

      if (handle) {
        handler(event);
      }
    };

    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [refs, handler]);
}

export default useClickOutside;
