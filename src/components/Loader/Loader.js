import { LoaderSpinner } from "./Loader.styled.jsx";
import Loader from "react-loader-spinner";

function LoaderIcon() {
  return (
    <LoaderSpinner>
      <Loader
        type="Puff"
        color="#000080"
        height={100}
        width={100}
        timeout={5000}
      />
    </LoaderSpinner>
  );
}

export default LoaderIcon;
