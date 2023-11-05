import React from 'react';
import Card from '../components/Card';
import Accum from './Accum';

function AccumCard({ ...props }) {



    return (
        <Card
            title={'Accumulated Dividends'}
            useScreenshot={true}
            useIcognito={true}
            {...props}
        >
            <Accum />
        </Card>

    );
}

export default AccumCard;
