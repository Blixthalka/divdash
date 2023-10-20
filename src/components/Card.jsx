import { toPng } from 'html-to-image';
import { CameraIcon } from 'lucide-react';
import React, { useCallback, useRef } from 'react';
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
    //border border-[#1D232B]
    <div ref={ref} className={`bg-card p-5 ${className}`}>
      {title &&
        <div className="flex justify-between ">
          <p className={`text-secondary text-sm ${textClassName}`}>{title}</p>
          {screenshot && (
            <button onClick={onClick}>
              <CameraIcon className='w-4 h-4 stroke-secondary'/>
            </button>
          )}
        </div>
      }
      <div className="">
        {children}
      </div>
    </div>
  );
}

export default Card;
