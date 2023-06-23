import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setOpenLyric } from "../../../redux/features/audioSlice";

const RecommendControl: React.FC = () => {
  const isLyrics = useAppSelector((state) => state.audio.isLyric);
  const dispatch = useAppDispatch();

  const handleOpenLyrics = () => {
    isLyrics ? dispatch(setOpenLyric(false)) : dispatch(setOpenLyric(true));
  };

  return (
    <div onClick={handleOpenLyrics}>
      <button className="mx-2 my-0 style__buttons" title="Lyric & Karaoke">
        <p>Recommend</p>
      </button>
    </div>
  );
};

export default RecommendControl;
