import { Photo } from "pexels";
import "./Photo.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/Download";
import { SvgIcon } from "@mui/material";
import { useEffect, useState } from "react";
import {
  addLike,
  isLiked,
  removeLike,
} from "../../entities/localStorage/localStorage";
import { saveAs } from "file-saver";

interface PhotoProps {
  photo: Photo;
}

function PhotoCard({ photo }: PhotoProps) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isLiked(photo.id));
  });

  const likePhoto = () => {
    setLiked(!liked);
    liked ? removeLike(photo.id) : addLike(photo.id);
  };

  const downloadImg = () => {
    saveAs(photo.src.original, `${photo.alt || "img" + photo.id}.jpeg`);
  };

  return (
    <div
      className="card-wrapper"
      style={{ backgroundColor: `${photo.avg_color}` }}
    >
      <img
        src={photo.src.large}
        alt={photo.alt || "Photo"}
        className="photo-img"
        style={{ backgroundColor: `${photo.avg_color}` }}
      />
      <div className="group-of-buttons">
        <button className="like-button" onClick={likePhoto}>
          <SvgIcon
            component={liked ? FavoriteIcon : FavoriteBorderIcon}
            className="like-icon"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          />
        </button>
        <button onClick={downloadImg} className="download-photo">
          <SvgIcon
            component={DownloadIcon}
            className="download-icon"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="photographer">
        <a
          href={photo.photographer_url}
          target="_blank"
          rel="noreferrer"
          className="photographer-name"
        >
          Photographer: {photo.photographer}
        </a>
      </div>
    </div>
  );
}

export default PhotoCard;
