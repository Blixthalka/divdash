import { TrashIcon } from 'lucide-react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import Button from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';
import Card from '../components/Card';

const Upload = () => {
    const navigate = useNavigate()
    const { dividends, setDividends } = useContext(AppContext);
    const initial_banks = [
        {
            tag: "avanza"
        },
        {
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
                className="mb-5 "
            >
                <div className='grid gap-2 mt-3'>
                    {banks.map((bank) => (
                        <div className='p-3 bg-card border border-card-off flex justify-between items-center rounded-sm'>
                            <div className="">
                                <span className="text-xl text-white">{bank.tag.charAt(0).toUpperCase() + bank.tag.slice(1)}</span>
                                {bank.total > 0 && (
                                    <div className="flex space-x-2 items-center">
                                        <span className="text-sm text-secondary">Uploaded Dividends</span>
                                        <div className="font-bold text-white">{bank.total}</div>
                                    </div>
                                )}
                            </div>
                            <div className='flex space-x-2 items-center'>
                                {bank.total > 0 && (
                                    <ButtonIcon Icon={TrashIcon} onClick={(e) => delete_for_tag(bank.tag)} />
                                )}
                                <Button text="Upload" onClick={(e) => navigate(`/upload/${bank.tag}`)} />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </>
    );
}

export default Upload;
