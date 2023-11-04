import { formatNumberNoFractions } from '../utils/util';

function CardSingleNumber({ title, amount, currency, change, className, Icon }) {
  if (amount === undefined || amount === null) {
    amount = 0
  }

  return (
    <div className={` bg-[#101418] rounded p-5 ${className}`}>
      {title &&
        <div className="flex justify-between">
          <p className="text-[#595F6B] text-sm">{title}</p>
        </div>
      }
      <p className="flex flex-wrap items-center justify-between">
        <span className="text-2xl text-white font-bold ">
          {formatNumberNoFractions(amount) + (currency ? ' ' + currency : '')}
        </span>
        {change && (
          <span className={`hidden md:block text-primary px-2 py-1 bg-[#14222F] rounded-lg font-medium ${change > 0 ? "text-primary" : "text-red-500"}`}>
            {(change > 0 ? '+ ' : '- ') + formatNumberNoFractions(change).replace('-', '') + ' %'}
          </span>
        )}
        {Icon && (
          <div className='bg-[#14222F] p-2 rounded hidden md:block '>
            <Icon className="stroke-primary w-5 h-5" />
          </div>
        )}
      </p>
    </div>
  );
}

export default CardSingleNumber;
