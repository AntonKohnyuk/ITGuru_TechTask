import { Photo } from "pexels";
import "../entities/styles/photo-card.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/Download";
import { SvgIcon } from "@mui/material";
import { useEffect, useState } from "react";
import {
  addLike,
  isLiked,
  removeLike,
} from "../entities/localStorage/localStorage";

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

  return (
    <div className="card-wrapper">
      <img
        src={photo.src.large}
        alt={photo.alt || "Photo"}
        className="photo-img"
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
        <a
          download
          href={photo.src.original}
          title="download"
          className="download-photo"
          target="_blank"
          rel="noreferrer"
        >
          <SvgIcon
            component={DownloadIcon}
            className="download-icon"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          />
        </a>
      </div>
      <div></div>
    </div>
  );
}

export default PhotoCard;
