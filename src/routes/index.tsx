import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Top100 from "../pages/Top100"
import DetailPlaylist from "../pages/DetailPlaylist"
import ChartHome from "../pages/ChartHome"
import Artist from "../pages/Artist"
import Search from "../pages/Search"
import MV from "../pages/MV"
import DetailMV from "../pages/DetailMV"

const RouterPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/top100" element={<Top100 />} />
      <Route path="/zingchart" element={<ChartHome />} />
      <Route path="/search" element={<Search />}>
        <Route path=":keyword" element={<Search />} />
      </ Route>
      <Route path="/playlist" element={<DetailPlaylist />}>
        <Route path=":playlistId" element={<DetailPlaylist />} />
      </Route>
      <Route path="/artist" element={<Artist />}>
        <Route path=":name" element={<Artist />} />
      </Route>
      <Route path="/mv" element={<MV />} />
      <Route path="/mv/:id" element={<DetailMV />} />
    </Routes>
  )
}

export default RouterPage
