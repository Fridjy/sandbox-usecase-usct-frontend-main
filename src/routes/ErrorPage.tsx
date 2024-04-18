import {
  isRouteErrorResponse,
  Navigate,
  useRouteError,
} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { statusText: string; message: string };
  if (isRouteErrorResponse(error) && error.status === 401) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
