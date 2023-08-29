

function Button({ text, children, className, onClick, design = "primary", Icon, rightIcon = true,  disabled = false, xs = false}) {
    return (
        <button
            className={`
                cursor-pointer
                ${design === "primary" && "bg-primary hover:bg-slate-600"}
                ${design === "secondary" && "bg-transparent hover:bg-background border-background"}
                ${(disabled && design === "primary") && 'hover:bg-secondary'}
                 ${xs ? "px-2" : "px-5"} py-2  rounded group min-w-fit ${className}`}
                onClick={disabled ? () => {} : onClick}
            disabled={disabled}
        >
            {text ?
                <span
                    className={`
                        ${design === "primary" && "text-white"}
                        ${design === "secondary" && "text-secondary group-hover:text-primary"}
                        ${(disabled && design === "secondary") && 'group-hover:text-secondary'}
                        font-medium flex items-center text-sm`}
                >
                    {text && <span className={`${rightIcon ? 'order-1' : 'order-2'}`}>{text}</span>}
                    {Icon && <Icon className={`w-5 h-5 stroke-secondary group-hover:stroke-primary ${rightIcon ? 'order-2 ml-2' : 'order-1 mr-2'}`}/>}
                </span> :
                children}
        </button>
    )
}

export default Button;
