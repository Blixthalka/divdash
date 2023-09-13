import React from 'react';


const ButtonIcon = ({Icon, className, onClick, disabled = false}) => {
    return (
        <button
            className={`group ${disabled ? "" : "hover:bg-slate-100"} w-8 h-8 flex justify-center items-center rounded ${className}`}
            onClick={disabled ? () => {} : onClick}
            disabled={disabled}
        >
            <Icon className={`stroke-secondary w-6 h-6 ${disabled ? "stroke-slate-200" : "group-hover:stroke-primary "}`} />
        </button>
    );
}

export default ButtonIcon;
