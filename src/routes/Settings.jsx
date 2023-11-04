
import { MoveRightIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import ButtonIcon from '../components/ButtonIcon';
import Card from '../components/Card';
import Info from '../components/Info';

const Settings = () => {
    const [fromIsin, setFromIsin] = useState("")
    const [toIsin, setToIsin] = useState("")

    const { settings, setSettings } = useContext(AppContext)


    function addToSettings() {
        settings.merge.push({ from_isin: fromIsin, to_isin: toIsin })
        setSettings(settings)
        window.location.reload(false)
    }

    function removeFromSettings(index) {
        const merge = settings.merge.filter((v, i) => i !== index)
        setSettings({
            ...settings,
            merge: merge
        })
        window.location.reload(false)
    }


    const inputClazz = 'bg-transparent border-card-off border px-3 py-2 text-white placeholder:text-secondary rounded text-sm flex-grow outline-blue-900 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-input';
    return (
        <>
            <Info className="mb-5" text={"You need to reupload files for changes here to take effect."} />


            <Card>
                <div className='flex flex-col space-y-1.5 col-span-2'>
                    <p className='text-white text-lg font-medium'>Merge Stocks</p>
                    <p className='text-secondary text-sm'>If you  want to see dividends from two different stocks as one stock you can merge them to one here.</p>

                </div>

                <p className='mt-5 mb-1.5 text-secondary text-sm'>Add a stock isin here</p>
                <div className='grid sm:flex space-y-3 sm:space-y-0 sm:space-x-3 items-center'>
                    <input
                        className={inputClazz}
                        placeholder='isin from'
                        value={fromIsin}
                        onChange={(e) => setFromIsin(e.target.value)}
                    />
                    <MoveRightIcon className='stroke-secondary w-5 h-5' />
                    <input
                        className={inputClazz}
                        placeholder='isin to'
                        value={toIsin}
                        onChange={(e) => setToIsin(e.target.value)}
                    />
                    <ButtonIcon Icon={PlusIcon} onClick={() => addToSettings()} />
                </div>

                {settings.merge.length > 0 && (
                    <>
                        <p className='mt-5 mb-1.5 text-secondary text-sm'>Added</p>
                        <div className='grid gap-3 '>
                            {settings.merge.map((merge, index) => (
                                <div className='grid sm:flex space-y-3 sm:space-y-0 sm:space-x-3 items-center'>
                                    <input
                                        className={inputClazz}
                                        placeholder='isin from'
                                        value={merge.from_isin}
                                        disabled
                                    />
                                    <MoveRightIcon className='stroke-secondary w-5 h-5' />
                                    <input
                                        className={inputClazz}
                                        placeholder='isin from'
                                        value={merge.to_isin}
                                        disabled
                                    />
                                    <ButtonIcon Icon={Trash2Icon} onClick={() => removeFromSettings(index)} />
                                </div>
                            ))}
                        </div>
                    </>
                )}



            </Card>
        </>

    );
}

export default Settings;
