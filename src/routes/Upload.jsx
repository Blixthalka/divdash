import { TrashIcon } from '@heroicons/react/24/outline';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import Button from '../components/Button';
import Card from '../components/Card';
import avanza from '../images/avanza.png';

const Upload = () => {
    const navigate = useNavigate()
    const { dividends, setDividends } = useContext(AppContext);
    const initial_banks = [
        {
            image: avanza,
            coming_soon: false,
            tag: "avanza"
        },
        {
            image: avanza,
            coming_soon: true,
            tag: "nordnet"
        }
    ]

    const banks = initial_banks.map(bank => {
        return {
            ...bank,
            total: dividends.filter(div => div.tag === bank.tag).length
        }
    })

    const delete_for_tag = (tag) => {
        setDividends(dividends.filter(div => div.tag !== tag))
    }

    return (
        <>
            <Card
                title="Upload File"
                className="mb-5 grid gap-2"
            >
                {banks.map((bank) => (
                    <div className='p-3 bg-gray-50 border flex justify-between items-center rounded-sm'>
                        <div className="">
                            <span className="text-xl">{bank.tag.charAt(0).toUpperCase() + bank.tag.slice(1)}</span>
                            {bank.total > 0 && (
                                <div className="flex space-x-2 items-center">
                                    <span className="text-sm text-gray-500">Uploaded Dividends</span>
                                    <div className="font-bold">{bank.total}</div>
                                </div>
                            )}
                        </div>
                        <div className='flex space-x-2'>
                            {bank.total > 0 && (
                                <Button design="secondary" onClick={(e) => delete_for_tag(bank.tag)}>
                                    <TrashIcon className="w-5 h-5 stroke-gray-500" />
                                </Button>
                            )}
                            <Button text="Upload" onClick={(e) => navigate(`/upload/${bank.tag}`)} />
                        </div>
                    </div>
                ))}
            </Card>
        </>
    );
}

export default Upload;
