import { formatNumberNoFractions } from '../utils/util';

function CardSingleNumber({ title, amount, currency, className }) {
  if (amount === undefined || amount === null) {
    amount = 0
  }

  return (
    <div className={` bg-primary rounded p-5 ${className}`}>
      {title &&
        <div className="flex justify-between">
          <p className="text-white text-sm">{title}</p>
        </div>
      }
      <p className="text-white font-bold">
        <span className="text-3xl">{formatNumberNoFractions(amount) + (currency ? ' ' + currency : '')}
        </span>
      </p>
    </div>
  );
}

export default CardSingleNumber;
