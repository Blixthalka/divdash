import React from 'react';


function TextInput({ type = "text", value, setFunction, placeholder, label, onKeyDown }) {

    return (
        <div className='flex flex-col max-w-md text-sm'>
            {label && <label className="text-sm text-primary">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                className="border  border-slate-200 px-3 text-primary py-2 rounded "
                onChange={evt => setFunction(evt.target.value)}
                value={value}
                onKeyDown={onKeyDown}
            >
            </input>
        </div>
    );
}

export default TextInput;
