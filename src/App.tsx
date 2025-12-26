import './App.css'
import Chat from "./components/chat.tsx";
import Sidebar from "./components/sidebar.tsx";

function App() {

  return (
      <section className="w-full flex justify-center">
          {/*<p className="absolute text-black mt-1 text-[600px] z-1">ArIa</p>*/}
          <span className="bg-linear-to-r from-primary_purple to-primary_zvet
          bg-clip-text text-transparent font-semibold top-2 left-17 text-3xl absolute z-3">
              Aria
          </span>
          <Sidebar/>
          <Chat/>
      </section>
  )
}

export default App
