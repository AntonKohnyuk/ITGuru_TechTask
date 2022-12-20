import { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import PhotoCard from "./Photo";
import "../entities/styles/list-of-photos.scss";
import { useActions } from "../hooks/useActions";
import { useParams } from "react-router-dom";
import { PhotoColumns, PhotosFilters } from "../entities/types/photos";
import {
  OrientationsFiltersOptions,
  PhotoSizes,
  SizesFiltersOptions,
} from "../entities/enums/filters";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  SvgIcon,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

interface PageProps {
  pageName: string;
}

function ListOfPhotos({ pageName }: PageProps) {
  const { photos, error, loading } = useTypedSelector((state) => state.photos);
  const { page, per_page } = useTypedSelector((state) => state.fetchSettings);
  const { fetchPhotos, setFetchSettings, clearStore } = useActions();
  const { category } = useParams();

  const initialPhotoColumnsState: PhotoColumns = {
    firstColumn: [],
    firstColumnHeight: 0,

    secondColumn: [],
    secondColumnHeight: 0,

    thirdColumn: [],
    thirdColumnHeight: 0,
  };

  const initialFilters: PhotosFilters = {
    orientations: OrientationsFiltersOptions.ALL_ORIENTATIONS,
    sizes: SizesFiltersOptions.ALL_SIZES,
  };

  const selectNames: PhotosFilters = {
    orientations: "orientations",
    sizes: "sizes",
  };

  const [photoColumns, setPhotoColumns] = useState(initialPhotoColumnsState);
  const [showFilters, setShowFilters] = useState(false);

  const query: string = category || "";

  const [filters, setFilters] = useState(initialFilters);

  const updateColumns = () => {
    const photoColumns = initialPhotoColumnsState;
    let photosArr = photos;
    if (
      category &&
      (filters.orientations !== OrientationsFiltersOptions.ALL_ORIENTATIONS ||
        filters.sizes !== SizesFiltersOptions.ALL_SIZES)
    )
      photosArr = photosArr.filter((photo) => {
        if (
          filters.orientations === OrientationsFiltersOptions.HORIZONTAL &&
          photo.width <= photo.height
        )
          return false;
        else if (
          filters.orientations === OrientationsFiltersOptions.SQUARE &&
          photo.width !== photo.height
        )
          return false;
        else if (
          filters.orientations === OrientationsFiltersOptions.VERTICAL &&
          photo.width >= photo.height
        )
          return false;

        if (
          filters.sizes === SizesFiltersOptions.LARGE &&
          photo.width.toString() < PhotoSizes.LARGE
        )
          return false;
        else if (
          (filters.sizes === SizesFiltersOptions.MEDIUM &&
            photo.width.toString() > PhotoSizes.LARGE) ||
          photo.width.toString() < PhotoSizes.SMALL
        )
          return false;
        else if (
          filters.sizes === SizesFiltersOptions.SMALL &&
          photo.width.toString() > PhotoSizes.SMALL
        )
          return false;
        return true;
      });

    photosArr.forEach((photo) => {
      const minHeight = Math.min(
        photoColumns.firstColumnHeight,
        photoColumns.secondColumnHeight,
        photoColumns.thirdColumnHeight
      );

      if (photoColumns.firstColumnHeight === minHeight) {
        photoColumns.firstColumn.push(photo);
        photoColumns.firstColumnHeight += photo.height;
      } else if (photoColumns.secondColumnHeight === minHeight) {
        photoColumns.secondColumn.push(photo);
        photoColumns.secondColumnHeight += photo.height;
      } else {
        photoColumns.thirdColumn.push(photo);
        photoColumns.thirdColumnHeight += photo.height;
      }
    });

    return setPhotoColumns(photoColumns);
  };

  const InfiniteScroll = () => {
    while (true) {
      let windowRelativeBottom =
        document.documentElement.getBoundingClientRect().bottom;
      if (
        windowRelativeBottom > document.documentElement.clientHeight + 3000 ||
        loading
      )
        break;
      return setFetchSettings({ page: page! + 1, per_page });
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    event.target.name === selectNames.orientations
      ? setFilters({ ...filters, orientations: event.target.value })
      : setFilters({ ...filters, sizes: event.target.value });
    updateColumns();
  };

  useEffect(() => {
    window.addEventListener("scroll", InfiniteScroll);
    return () => {
      window.removeEventListener("scroll", InfiniteScroll);
    };
  });

  useEffect(() => {
    fetchPhotos({ page, per_page, query }, pageName);
  }, [page]);

  useEffect(() => {
    return () => {
      clearStore();
    };
  }, []);

  useEffect(() => {
    return () => {
      clearStore();
    };
  }, [category]);

  useEffect(() => {
    updateColumns();
  }, [photos]);

  useEffect(() => {
    if (photos) updateColumns();
  }, [filters]);

  if (error) {
    return (
      <div className="error">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="main-content">
      {category && (
        <div className="category-info">
          <h1>Photos: {category}</h1>
        </div>
      )}
      {category && (
        <div className="filters">
          <div className="filter-button">
            <button
              onClick={() => {
                setShowFilters(!showFilters);
              }}
            >
              <SvgIcon component={FilterListIcon} /> <span>Filters</span>{" "}
            </button>
          </div>
          {showFilters && (
            <div className="filters-options">
              <FormControl sx={{ m: 1, minWidth: 240 }}>
                <Select
                  value={filters.orientations}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  name={selectNames.orientations}
                >
                  <MenuItem value={OrientationsFiltersOptions.ALL_ORIENTATIONS}>
                    {OrientationsFiltersOptions.ALL_ORIENTATIONS}
                  </MenuItem>
                  <MenuItem value={OrientationsFiltersOptions.HORIZONTAL}>
                    {OrientationsFiltersOptions.HORIZONTAL}
                  </MenuItem>
                  <MenuItem value={OrientationsFiltersOptions.VERTICAL}>
                    {OrientationsFiltersOptions.VERTICAL}
                  </MenuItem>
                  <MenuItem value={OrientationsFiltersOptions.SQUARE}>
                    {OrientationsFiltersOptions.SQUARE}
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 240 }}>
                <Select
                  value={filters.sizes}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  name={selectNames.sizes}
                >
                  <MenuItem value={SizesFiltersOptions.ALL_SIZES}>
                    {SizesFiltersOptions.ALL_SIZES}
                  </MenuItem>
                  <MenuItem value={SizesFiltersOptions.LARGE}>
                    {SizesFiltersOptions.LARGE}
                  </MenuItem>
                  <MenuItem value={SizesFiltersOptions.MEDIUM}>
                    {SizesFiltersOptions.MEDIUM}
                  </MenuItem>
                  <MenuItem value={SizesFiltersOptions.SMALL}>
                    {SizesFiltersOptions.SMALL}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
        </div>
      )}
      <div className="photos">
        <div className="content-flex">
          {photoColumns.firstColumn.map((photo) => (
            <PhotoCard photo={photo} key={photo.id} />
          ))}
        </div>
        <div className="content-flex">
          {photoColumns.secondColumn.map((photo) => (
            <PhotoCard photo={photo} key={photo.id} />
          ))}
        </div>
        <div className="content-flex">
          {photoColumns.thirdColumn.map((photo) => (
            <PhotoCard photo={photo} key={photo.id} />
          ))}
        </div>
      </div>

      {loading && <h2 className="loading">Идет загрузка...</h2>}
    </div>
  );
}

export default ListOfPhotos;
