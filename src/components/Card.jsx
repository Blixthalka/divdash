import { CameraIcon } from '@heroicons/react/24/outline'
import { toPng } from 'html-to-image'
import React, { useCallback, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';


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
    <div  className={` bg-white border border-slate-300 rounded p-5 ${className}`}>
      {title &&
        <div className="flex justify-between ">
          <p className={`text-secondary text-sm ${textClassName}`}>{title}</p>
          {screenshot && (
            <button onClick={onClick} className=" hover:bg-slate-100 w-8 h-8 flex justify-center items-center rounded group">
              <CameraIcon className="w-5 h-5 stroke-secondary  group-hover:stroke-primary" />
            </button>
          )}
        </div>
      }
      <div ref={ref} className="bg-white">
        {children}
      </div>
    </div>
  );
}

export default Card;
