import React from 'react';


const ButtonIcon = ({Icon, className, onClick, disabled = false}) => {
    return (
        <button
            className={`group ${disabled ? "" : "hover:bg-[#1E232A]"} p-2  flex justify-center items-center rounded ${className}`}
            onClick={disabled ? () => {} : onClick}
            disabled={disabled}
        >
            <Icon className={`stroke-secondary w-6 h-6 ${disabled ? "stroke-card" : "group-hover:stroke-white "}`} />
        </button>
    );
}

export default ButtonIcon;
