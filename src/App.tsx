import React, {useRef, useState} from 'react';
import './style/App.scss';
import AddToDo from "./components/addToDO";
import ListsToDo from "./components/listsToDO";
import Completed from "./components/completed";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';

function App() {

    const [changeLight, setChangeLight] = useState(true)
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleOtherElementClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

  return (
      <div className={`${changeLight ? ' bg-[#181824]' : 'bg-white'} h-[100vh] transition-all duration-1000` }>
          <div className={`w-full h-[28vh]  absolute z-[1] top-0 left-0 bg-cover bg-no-repeat transition-all duration-1000
          ${changeLight ? 'bg-[url(./assets/bg-desktop-dark.jpg)]' : 'bg-[url(./assets/bg-desktop-light.jpg)]' } `}></div>
          <div className="2xl:w-1/3 mx-auto relative z-[10] xl:w-[40%] lg:w-1/2 md:w-[60%] sm:w-[70%] w-[80%]  ">
              <div className=' w-full h-[15vh] flex items-center justify-between '>
                  <h1 className=' text-5xl font-bold text-white'>T O D O</h1>
                  <span
                      className='text-white  cursor-pointer '
                      onClick={()=> setChangeLight(!changeLight) }
                  >
                      {changeLight ? <LightModeIcon style={{fontSize:'35px '}} /> : <NightlightRoundIcon style={{fontSize:'35px '}} /> }
                  </span>
              </div>

            <AddToDo inputRef={inputRef} handleOtherElementClick={handleOtherElementClick} changeLight={changeLight} />
            <ListsToDo handleOtherElementClick={handleOtherElementClick} changeLight={changeLight} />
            <Completed changeLight={changeLight} />
        </div>
      </div>
  );
}

export default App;
