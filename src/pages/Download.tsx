import type React from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useConverter } from "../hooks/useConverter";
import Root from "../layouts/Root";

interface IDownloadProps {}

const Download: React.FC<IDownloadProps> = ({}) => {
  const params = useParams();
  const navigate = useNavigate();
  const convertApi = useConverter(params.id);

  useEffect(() => {
    if (!params.id || !params.id.match(/^[a-zA-Z0-9_-]{11}$/)) {
      navigate("/", { replace: true });
    }
  }, [params]);

  return (
    <Root>
      <Button
        label={`Click to download ${convertApi.data?.title}`}
        onClick={() => {
          if (Math.random() * 100 === 69)
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
          else window.open(convertApi.data?.link);
        }}
      />
    </Root>
  );
};

export default Download;
