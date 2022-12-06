import { Photo } from "pexels";
import "../entities/styles/photo-card.scss";

interface PhotoProps {
  photo: Photo;
}

function PhotoCard({ photo }: PhotoProps) {
  return (
    <div className="card-wrapper">
      <img
        src={photo.src.large}
        alt={photo.alt || "Photo"}
        className="photo-img"
      />
      <div className="group-of-buttons">
        <button className="like-button">like</button>
        <a href="" className="dowload-button">
          dddd
        </a>
      </div>
    </div>
  );
}

export default PhotoCard;
