import { SnailIcon } from 'lucide-react';
import React from 'react';
import Card from '../components/Card';

function Empty() {
    return (
      <Card className={""}>
        <div className='flex flex-col items-center'>
          <span className='text-white text-lg'>No dividends found. Please add some.</span>
          <SnailIcon className='stroke-card-off w-10 h-10 my-10' />
        </div>
      </Card>
    )
}

export default Empty;
