import { useEffect, useState } from 'react'

function App() {
  const now = new Date();
  const [hour, setHour] = useState({time: now.getHours() - 12, angle: now.getHours() * 30 });
  const [minute, setMinute] = useState({time: now.getMinutes(), angle: now.getMinutes() * 30});
  const [second, setSecond] = useState({time: 0, angle: 0 });

  useEffect(() => {

    let time = new Date();

    let curr = time;

    let interval = setInterval(() => {
      curr = new Date();
      if ((curr.getSeconds() - time.getSeconds()) > 0) {
        setSecond((prev) => ({...prev, time: curr.getSeconds(), angle: prev.angle + 6}));
      }
       
      if ((curr.getMinutes() - time.getMinutes()) > 0) {
        setMinute((prev) => ({...prev, time: curr.getMinutes(), angle: prev.angle + 6}));
      }
  
      if ((curr.getHours() - time.getHours()) > 0) {
        setHour((prev) => ({...prev, time: curr.getHours() - 12, angle: prev.angle + 6}));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [second, hour, minute]);

  return (
    <main className="flex flex-col items-center gap-8 max-w-[1280px] mx-auto">
      <h1 className="text-4xl font-bold">Wall Clock</h1>
      <div className="flex flex-row items-center justify-center h-full w-full my-5">
        <div className="border-2 border-rose-600 p-52 h-1/4 w-1/4 rounded-full relative flex items-center justify-center bg-[url('./clock3.png')] bg-cover">

         {/* dot to cover middle of clock */}
         <div className='w-5 h-5 p-3 absolute z-20 bg-rose-700 rounded-full'></div>

          {/* hours needle */}
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 origin-top bg-black h-32 w-1.5 z-10 rotate-90' style={{ transform: `rotate(${hour.angle - 180}deg) translateX(-50%)` }}></div>

          {/* minute needle */}
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 origin-top bg-black h-40 w-1 z-10 rotate-0' style={{ transform: `rotate(${minute.angle - 180}deg) translateX(-50%)` }}></div>

          {/* seconds */}
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 origin-top bg-rose-500 h-44 w-0.5
          duration-1000 z-10' 
          style={{ transform: `rotate(${second.angle - 180}deg) translateX(-50%)` }}></div>
          
        </div>
      </div>
    </main>
  );
}

export default App
