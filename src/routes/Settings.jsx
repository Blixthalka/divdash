
import { AtSignIcon, MoveRightIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import ButtonIcon from '../components/ButtonIcon';
import Card from '../components/Card';
import Info from '../components/Info';
import { formatNumberNoFractions } from '../utils/util';

const Settings = () => {
    const [fromIsin, setFromIsin] = useState("")
    const [toIsin, setToIsin] = useState("")
    const [goal, setGoal] = useState({ year: "", amount: "" })

    const { settings, setSettings } = useContext(AppContext)


    function addGoalToSettings() {
        settings.goals = settings.goals.filter(g => g.year !== parseInt(goal.year))
        settings.goals.push({ year: parseInt(goal.year), amount: parseInt(goal.amount) })
        settings.goals = settings.goals.sort((a, b) => a.year > b.year ? -1 : 1)
        setSettings(settings)
        window.location.reload(false)
    }

    function addMergeToSettings() {
        settings.merge.push({ from_isin: fromIsin, to_isin: toIsin })
        setSettings(settings)
        window.location.reload(false)
    }

    function removeMergeFromSettings(index) {
        const merge = settings.merge.filter((v, i) => i !== index)
        setSettings({
            ...settings,
            merge: merge
        })
        window.location.reload(false)
    }

    function removeGoalFromSettings(index) {
        const goals = settings.goals.filter((v, i) => i !== index)
        setSettings({
            ...settings,
            goals: goals
        })
        window.location.reload(false)
    }


    const inputClazz = 'bg-transparent border-card-off border px-3 py-2 text-white placeholder:text-secondary rounded text-sm flex-grow outline-blue-900 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-input';
    return (
        <div className='grid lg:grid-cols-2 gap-5'>
            <Info className="lg:col-start-2" text={"You need to reupload files for changes in merge stocks to take effect."} />
            <Card className={""}>
                <div className='flex flex-col space-y-1.5 col-span-2 '>
                    <p className='text-white text-lg font-medium'>Goals</p>
                    <p className='text-secondary text-sm'>Add goals to compete against.</p>
                </div>

                <p className='mt-5 mb-1.5 text-secondary text-sm'>Add a goal</p>

                <div className='grid sm:flex space-y-3 sm:space-y-0 sm:space-x-3 items-center'>
                    <form className='flex gap-2'>
                        <input
                            className={`${inputClazz} w-16`}
                            placeholder='year'
                            value={goal.year}
                            type='number'
                            onChange={(e) => setGoal({ ...goal, year: e.target.value })}
                        />
                        <input
                            className={inputClazz}
                            placeholder='amount'
                            value={goal.amount}
                            type="number"
                            onChange={(e) => setGoal({ ...goal, amount: e.target.value })}
                        />
                        <ButtonIcon submit Icon={PlusIcon} onClick={() => addGoalToSettings()} />
                    </form>
                </div>
                <div className='flex flex-col mt-5 gap-3 max-w-fit items-center '>
                    {settings.goals
                        .map((goal, index) => (
                            <div className='flex items-center space-x-2'>
                                <div className='text-white p-2 border border-card-off space-x-2  flex items-center'>
                                    <span>{goal.year}</span>
                                    <AtSignIcon className='stroke-secondary w-4 h-4' />
                                    <span className=' border-card-off'>{formatNumberNoFractions(goal.amount) + " kr"}</span>
                                </div>
                                <div>
                                    <ButtonIcon Icon={Trash2Icon} onClick={() => removeGoalFromSettings(index)} />
                                </div>
                            </div>
                        ))}
                </div>
            </Card>

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
                    <ButtonIcon Icon={PlusIcon} onClick={() => addMergeToSettings()} />
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
                                    <ButtonIcon Icon={Trash2Icon} onClick={() => removeMergeFromSettings(index)} />
                                </div>
                            ))}
                        </div>
                    </>
                )}



            </Card>
        </div>

    );
}

export default Settings;
