import React from "react";
import IconPrevious from "../../Icons/Previous";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import {
  setSongId,
  setcurrentIndexPlaylist,
  changeIconPlay,
} from "../../../redux/features/audioSlice";

const PreviousControl: React.FC = () => {
  const currentIndexPlaylist = useAppSelector(
    (state) => state.audio.currentIndexPlaylist
  );
  const playlistSong: any = useAppSelector((state) => state.audio.playlistSong);

  const dispatch = useAppDispatch();

  const handleNextSong = () => {
    if (playlistSong !== undefined && playlistSong.length > 0) {
      let currentIndex;
      if (currentIndexPlaylist === 0) {
        currentIndex = 0;
      } else {
        currentIndex = currentIndexPlaylist - 1;
      }

      dispatch(setcurrentIndexPlaylist(currentIndex));

      dispatch(setSongId(playlistSong[currentIndex].encodeId));

      dispatch(changeIconPlay(true));
    }
  };

  return (
    <button
      onClick={handleNextSong}
      className="mx-2 my-0 style__buttons"
      title="Previous Song"
    >
      <IconPrevious setColor="white" setWidth="16px" setHeight="16px" />
    </button>
  );
};

export default PreviousControl;
