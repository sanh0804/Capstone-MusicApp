import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { setOpenLyric, setPlaylistSong } from "../../redux/features/audioSlice";
import IconArrowDown from "../../components/Icons/ArrowDow";
import useLyric from "../../hooks/lyric";
import Playlist from "../../pages/DetailPlaylist";
import { useParams } from "react-router-dom";
import { getDetailPlaylist } from "../../api/detailPlaylist";
import DetailPlaylistInfo from "../DetailPlaylistInfo";
import TrackListDetailPlaylist from "../TrackPlaylist";
import Loading from "../Loading";

interface playlistType {
  thumbnailM: string;
  title: string;
  artists: [];
  description: string;
  like: number;
  contentLastUpdate: number;
  song: {
    total: string;
    items: [];
  };
}

const Lyric: React.FC<{ auRef: HTMLAudioElement | null }> = ({ auRef }) => {
  const isLyric = useAppSelector((state) => state.audio.isLyric);
  const songId = useAppSelector((state) => state.audio.songId);
  const currentTime = useAppSelector((state) => state.audio.currentTime);

  const lyrRef = useRef<HTMLDivElement>(null);

  const handleCloseLyric = () => {
    if (isLyric) {
      if (lyrRef.current) {
        lyrRef.current.classList.remove("animate-[lyric-up_1s]");
        lyrRef.current.classList.add("animate-[lyric-down_1s]");
      }
      setTimeout(() => {
        dispatch(setOpenLyric(false));
      }, 1000);
    } else {
      dispatch(setOpenLyric(true));
    }
  };

  const [dataDetailPlaylist, setDataDetailPlaylist] = useState<playlistType>();

  const params = useParams<{ playlistId: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (params.playlistId) {
        const detailPlaylist: playlistType = await getDetailPlaylist(
          params.playlistId
        );
        console.log(detailPlaylist);
        setDataDetailPlaylist(detailPlaylist);
        dispatch(setPlaylistSong(detailPlaylist.song.items));
      }
    })();
  }, [params, dispatch]);

  return (
    <>
      <div
        className={
          "fixed inset-0 z-[200] bg-[color:var(--color-body-bg)] transition-all ease-linear duration-300 " +
          (isLyric ? "animate-[lyric-up_1s]" : "hidden")
        }
        ref={lyrRef}
      >
        {/* Close Button */}
        <button
          className="p-2 mx-3 my-3 bg-transparent rounded-[25%] transition-all duration-200 hover:bg-[color:var(--color-secondary-bg-for-transparent)] fixed top-6 right-6"
          title="Close"
          onClick={handleCloseLyric}
        >
          <IconArrowDown setColor="white" setWidth="24px" setHeight="24px" />
        </button>
        {/* End Close Button */}

        {/* Lyric */}
        <div className="mx-[10vw] mt-16 mb-24">
          {dataDetailPlaylist ? (
            <>
              <DetailPlaylistInfo
                thumbnailM={dataDetailPlaylist.thumbnailM}
                title={dataDetailPlaylist.title}
                artists={dataDetailPlaylist.artists}
                total={dataDetailPlaylist.song.total}
                description={dataDetailPlaylist.description}
                like={dataDetailPlaylist.like}
                contentLastUpdate={dataDetailPlaylist.contentLastUpdate}
              />
              <TrackListDetailPlaylist items={dataDetailPlaylist.song.items} />
            </>
          ) : (
            <Loading />
          )}
        </div>
        {/* End Lyric */}
      </div>
    </>
  );
};

export default Lyric;
