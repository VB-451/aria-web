import './App.css'
import Chat from "./components/chat.tsx";
import Sidebar from "./components/sidebar.tsx";
import {useState, useEffect} from "react";
import {ModalProvider} from "./providers/modal-provider.tsx";
import {WhitelistProvider} from "./providers/whitelist-provider.tsx";
import {NotificationProvider} from "./providers/notifications-provider.tsx";
import {useDispatch} from "react-redux";
import {loadSettings} from "./redux/settings/settings-thunks.ts";

function App() {

  const [autoTTS, setAutoTTS] = useState<boolean>(false);

  const handleTTSToggle = () => {
      setAutoTTS(prev => !prev);
  }

  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(loadSettings());
  }, [dispatch]);

  return (
      <section className="w-full flex justify-center">
           <div id="toast-root" className="fixed inset-0 z-50 pointer-events-none" />
           <NotificationProvider>
               <WhitelistProvider>
                   <ModalProvider >
                      <span className="bg-linear-to-r from-primary_purple to-primary_mauve
                      bg-clip-text text-transparent font-semibold top-2 left-17 text-3xl absolute z-6">
                          Aria
                      </span>
                           <Sidebar autoTTSState={autoTTS} toggleTTS={handleTTSToggle} />
                           <Chat autoTTSState={autoTTS} />
                   </ModalProvider>
               </WhitelistProvider>
           </NotificationProvider>
      </section>
  )
}

export default App
