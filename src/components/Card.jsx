import { toPng } from 'html-to-image';
import { CameraIcon, Maximize, XIcon } from 'lucide-react';
import React, { createContext, useCallback, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ButtonIcon from './ButtonIcon';
import Info from './Info';
import IcognitoButton from './IcognitoButton';
import ReactGA from 'react-ga';

export const ChartContext = createContext();

function Card({ title, useIcognito, useScreenshot, zoomedTitle, children, className, screenshot, textClassName, settings }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  const [isIcognito, setIsIcognito] = useState(false)

  const takeScreenshot = useCallback(async () => {
    if (ref.current === null) {
      return
    }

    // call it multiple times to avoid safari bugg lol
    var ua = navigator.userAgent.toLowerCase();
    console.log(ua.search("safari") >= 0 && ua.search("chrome") < 0)
    if (ua.search("safari") >= 0 && ua.search("chrome") < 0) {
      await toPng(ref.current, { cacheBust: true })
      await toPng(ref.current, { cacheBust: true })
      await toPng(ref.current, { cacheBust: true })
    }


    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = uuidv4() + '.png'
        link.href = dataUrl
        link.click()
        ReactGA.event({
          category: 'User',
          action: 'Took a screenshot'
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  const BaseSettings = () => (
    <>
      {settings}
    </>
  )

  return (
    <div className={`bg-card p-5 ${className}`}>
      {title &&
        <div className="flex justify-between ">
          <p className={`text-secondary text-sm ${textClassName}`}>{title}</p>
          <div className='flex item-center space-x-2'>
            <BaseSettings />
            {useScreenshot && <ButtonIcon onClick={() => setShow(true)} Icon={Maximize} />}
          </div>
        </div>
      }
      <ChartContext.Provider
        value={{ isIcognito: isIcognito }}
      >
        <div className="">
          {children}
        </div>
        {show && (
          <div className='fixed top-0 left-0 h-full w-full p-10 bg-[#0C0F11] z-10 mx-auto '>
            <Info text={"You can resize the window to resize the final screenshot."} className="max-w-md mx-auto" />
            <div className='flex space-x-3 justify-center items-center w-full my-5'>
              <BaseSettings />
              {useIcognito && <IcognitoButton setIsIcognito={setIsIcognito} isIcognito={isIcognito} />}
              <ButtonIcon Icon={CameraIcon} onClick={takeScreenshot} />
              <ButtonIcon Icon={XIcon} onClick={() => setShow(false)} />
            </div>
            <div ref={ref} className='bg-card p-14 pb-10'>
              <p className='text-white text-xl font-medium mb-3'>{zoomedTitle ? zoomedTitle : title}</p>
              {children}
              <p className='flex text-sm justify-center mt-10 text-secondary '>
                <span className='text-secondary'>divdash.blixthalka.com</span>
              </p>
            </div>
          </div>
        )}
      </ChartContext.Provider>

    </div >
  );
}

export default Card;
