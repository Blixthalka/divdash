import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';



const AccordionElement = ({ title, body, className }) => {
    const [open, setOpen] = useState(false)

    return (
        <div
            className={``}
        >
            <div
                className={`flex justify-between items-center p-2 text-secondary border-b border-slate-200 hover:text-primary hover:bg-slate-100 cursor-pointer group `}
                onClick={(e) => {
                    setOpen(!open)
                }}
            >
                <span>{title}</span>
                {open ?
                    <ChevronUpIcon className="h-4 w-4 fill-secondary group-hover:fill-primary" /> :
                    <ChevronDownIcon className="h-4 w-4  fill-secondary group-hover:fill-primary" />}
            </div>
            {open && (
                <div className='px-2 py-5 text-secondary text-sm border-b border-slate-200 '>
                    <span>{body}</span>
                </div>
            )}
        </div>
    );
}

export default AccordionElement;
