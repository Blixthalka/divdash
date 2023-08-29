import React, { useState } from 'react';
import { BarChartIcon, PortfolioIcon } from '../icons/Icons';
import ButtonIcon from './ButtonIcon';
import Chart from './Chart';
import ChartPie from './ChartPie';


function ChartToggle({ data, onBarClick, className }) {
    const [isBar, setIsBar] = useState(true);

    return (
        <div className={`${className}`}>
            <div className="flex justify-end">
                <ButtonIcon Icon={isBar ? PortfolioIcon : BarChartIcon} onClick={(e) => setIsBar(!isBar)} />
            </div>
            {isBar ?
                <Chart data={data} onBarClick={onBarClick} /> :
                <ChartPie data={data} onBarClick={onBarClick} />}
        </div>
    );

}

export default ChartToggle;
