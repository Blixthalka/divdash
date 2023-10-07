import { CameraIcon } from '@heroicons/react/24/outline'
import { toPng } from 'html-to-image'
import React, { useCallback, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import ButtonIcon from './ButtonIcon';


function Card({ title, children, className, screenshot, textClassName }) {
  const ref = useRef(null)


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
    //border border-[#1D232B]
    <div className={` bg-card  rounded p-5 ${className}`}>
      {title &&
        <div className="flex justify-between ">
          <p className={`text-secondary text-sm ${textClassName}`}>{title}</p>
          {screenshot && (
            <ButtonIcon onClick={onClick} Icon={CameraIcon} />
          )}
        </div>
      }
      <div ref={ref} className="">
        {children}
      </div>
    </div>
  );
}

export default Card;
