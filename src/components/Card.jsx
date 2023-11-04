import { toPng } from 'html-to-image';
import { CameraIcon, Maximize, XIcon } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ButtonIcon from './ButtonIcon';
import Info from './Info';


function Card({ title, zoomedTitle, children, className, screenshot, textClassName, settings }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  const onClick = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = uuidv4() + '.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  return (
    <div className={`bg-card p-5 ${className}`}>
      {title &&
        <div className="flex justify-between ">
          <p className={`text-secondary text-sm ${textClassName}`}>{title}</p>
          <div className='flex item-center space-x-2 '>
            {screenshot && (
              <>
                {settings}
                < ButtonIcon onClick={() => setShow(true)} Icon={Maximize} />
              </>
            )}
          </div>
        </div>
      }
      <div className="">
        {children}
      </div>
      {show && (
        <div className='fixed top-0 left-0 h-full w-full p-10 bg-[#0C0F11] z-10 mx-auto '>
          <Info text={"You can resize the window to resize the final screenshot."} className="max-w-md mx-auto" />
          <div className='flex space-x-3 justify-center items-center w-full my-5'>
            {settings}
            <ButtonIcon Icon={CameraIcon} onClick={onClick} />
            <ButtonIcon Icon={XIcon} onClick={() => setShow(false)} />
          </div>
          <div ref={ref} className='bg-card p-14'>
            <p className='text-white text-xl font-medium mb-3'>{zoomedTitle ? zoomedTitle : title}</p>
            {children}
          </div>
        </div>
      )}

    </div>
  );
}

export default Card;
