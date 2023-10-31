import React from 'react';


const ButtonIcon = ({Icon, className, onClick, disabled = false}) => {
    return (
        <button
            className={`group ${disabled ? "" : "hover:bg-[#1E232A]"} p-2  flex justify-center items-center rounded outline-blue-900 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-input ${className}`}
            onClick={disabled ? () => {} : onClick}
            disabled={disabled}
        >
            <Icon className={` w-5 h-5 ${disabled ? "stroke-card" : "stroke-secondary group-hover:stroke-primary "} `} />
        </button>
    );
}

export default ButtonIcon;
