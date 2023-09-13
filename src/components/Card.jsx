

function Card({ title, children, className, headerComponent, textClassName }) {
  return (
    <div className={` border border-slate-300 rounded p-5 ${className}`}>
      {title &&
        <div className="flex justify-between ">
          <p className={`text-secondary text-sm ${textClassName}`}>{title}</p>
          {headerComponent && headerComponent}
        </div>
      }
      {children}
    </div>
  );
}

export default Card;
