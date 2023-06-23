import React from "react";
import RouterPage from "./routes"
import Navbar from "./components/Navbar"
import Player from "./components/Player"
import { store } from "./redux/store"
import { Provider } from "react-redux"

const App: React.FC = () => {

  return (
    <Provider store={ store }>
      <Navbar />
      <RouterPage />
      <Player />
    </Provider>
  )
}

export default App;
