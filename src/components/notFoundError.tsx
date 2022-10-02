import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex place-content-center text-white text-center">
      <div className="p-8">
        <h1 className="text-2xl">Oops!</h1>
        <p className="pt-4">Sorry, this page does not exist</p>
      </div>
    </div>
  );
}
