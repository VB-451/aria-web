import './App.css'
import Chat from "./components/chat.tsx";
import Sidebar from "./components/sidebar.tsx";
import {useState} from "react";
import {ModalProvider} from "./providers/modal-provider.tsx";
import {SettingsProvider} from "./providers/settings-provider.tsx";
import {WhitelistProvider} from "./providers/whitelist-provider.tsx";

function App() {

  const [autoTTS, setAutoTTS] = useState<boolean>(false);

  const handleTTSToggle = () => {
      setAutoTTS(prev => !prev);
  }

  return (
      <section className="w-full flex justify-center">
           <SettingsProvider>
               <WhitelistProvider>
                   <ModalProvider >
                      <span className="bg-linear-to-r from-primary_purple to-primary_mauve
                      bg-clip-text text-transparent font-semibold top-2 left-17 text-3xl absolute z-6">Aria
                      </span>
                           <Sidebar autoTTSState={autoTTS} toggleTTS={handleTTSToggle} />
                           <Chat autoTTSState={autoTTS} />
                   </ModalProvider>
               </WhitelistProvider>
           </SettingsProvider>
      </section>
  )
}

export default App
