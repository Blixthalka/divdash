
import { BarChartIcon, ChevronLeft, ChevronRight, LayersIcon, LockIcon, Share2Icon } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import AccumCard from '../components/AccumCard';
import Button from "../components/Button";
import ButtonIcon from '../components/ButtonIcon';
import Calendar from '../components/Calendar';
import Card from "../components/Card";
import ContributionCard from '../components/ContributionCard';
import DividendMonthCard from '../components/DividendMonthCard';
import DividendYearCard from '../components/DividendYearCard';
import InstrumentChartCard from '../components/InstrumentChartCard';
import Avanza from '../images/avanza.svg';
import Nordnet from '../images/nordnet.svg';
import screenshot from './../images/screenshot.png';

const Index = function () {
    const [selectedDemo, setSelectedDemo] = useState(0)

    const demoItems = [
        {
            component: <Calendar year={2023} demo={true} />,
        },
        {
            component: <ContributionCard year={2023} demo={true} />,
        },
        {
            component: <AccumCard demo={true} />,
        },
        {
            component: <InstrumentChartCard demo={true} />
        },
        {
            component: <DividendYearCard demo={true} />
        },
        {
            component: <DividendMonthCard year={2023} demo={true} />
        }
    ]


    return (
        <div>
            <div className="my-32 text-white max-w-lg  mx-auto text-center">
                <h1 className="text-6xl font-bold ">divdash</h1>
                <p className="my-5 text-2xl fond-medium ">The <span className="text-primary italic">dividend dashboard</span> your spreadsheet has nightmares about</p>
                <NavLink to="/upload">
                    <Button>
                        Let's get going!
                    </Button>
                </NavLink>
            </div>


            <div className={"my-32  sm:hidden"}>
                <img src={screenshot} className="border border-card-off rounded-lg" alt="divdash dashboard" />
            </div>

            <div className='my-32'>
                <div className='flex justify-center flex-col space-y-3 items-center mb-5'>
                    <div className='flex space-x-1.5  text-xl font-medium'>
                        <span className='text-white'>{"Component"}</span>
                        <span className='text-primary'>{selectedDemo + 1}</span>
                        <span className='text-white'>of</span>
                        <span className='text-white'>{demoItems.length}</span>
                    </div>


                    <div className='flex'>
                        <ButtonIcon
                            Icon={ChevronLeft}
                            onClick={() => setSelectedDemo(selectedDemo === 0 ? demoItems.length - 1 : selectedDemo - 1)}
                        />
                        <ButtonIcon
                            Icon={ChevronRight}
                            onClick={() => setSelectedDemo(selectedDemo === demoItems.length - 1 ? 0 : selectedDemo + 1)}
                        />
                    </div>
                </div>
                {demoItems[selectedDemo].component}
            </div>

            <div className="grid md:grid-cols-2  my-32 gap-10">
                <Card className="text-white ">
                    <div className="flex items-center mb-3">
                        <BarChartIcon className="w-5 h-5 mr-3 stroke-primary" />
                        <p className="text-xl font-medium">Charts</p>
                    </div>
                    <p className="text-secondary">An abundance of charts to explore.</p>
                </Card>
                <Card className="text-white ">
                    <div className="flex items-center mb-3">
                        <LayersIcon className="w-5 h-5 mr-3 stroke-primary" />
                        <p className="text-xl font-medium">Aggregate</p>
                    </div>
                    <p className="text-secondary">Have multiple banks? No problem.</p>
                </Card>
                <Card className="text-white ">
                    <div className="flex items-center mb-3">
                        <LockIcon className="w-5 h-5 mr-3 stroke-primary" />
                        <p className="text-xl font-medium">Secure</p>
                    </div>
                    <p className="text-secondary">Your data stays in your browser.</p>
                </Card>
                <Card className="text-white ">
                    <div className="flex items-center mb-3">
                        <Share2Icon className="w-5 h-5 mr-3 stroke-primary" />
                        <p className="text-xl font-medium">Share</p>
                    </div>
                    <p className="text-secondary">A breeze to share to your socials.</p>
                </Card>
            </div>


            <div className='my-32'>
                <h3 className='text-white text-2xl font-medium mb-10 sm:mb-20 text-center'>Use your favourite bank</h3>
                <div className='grid gap-5 sm:gap-20 grid-cols-2 place-items-center mx-auto'>
                    <img src={Avanza} alt="Avanza" className='p-5 h-24' />
                    <img src={Nordnet} alt="Nordnet" className='p-5 h-20' />
                </div>
            </div>




            <div className='my-32 border border-card-off p-5 sm:p-20 '>
                <h3 className='text-2xl text-white text-center font-medium'>Get going in three easy steps</h3>
                <div className='text-white   grid gap-10 mt-10 sm:mt-20 sm:grid-cols-3 '>
                    <div className="text-white ">
                        <div className="flex  items-center mb-3">
                            <p className="text-xl font-medium">1. Download</p>

                        </div>
                        <p className="text-secondary">Get a transaction file from your bank.</p>
                    </div>
                    <div className="text-white ">
                        <div className="flex  items-center mb-3">

                            <p className="text-xl font-medium">2. Upload</p>

                        </div>
                        <p className="text-secondary">Upload the transaction file here.</p>
                    </div>
                    <div className="text-white ">
                        <div className="flex items-center mb-3">

                            <p className="text-xl font-medium">3. Enjoy!</p>
                        </div>
                        <p className="text-secondary">Watch your satisfying dividend staples.</p>
                    </div>
                </div>
                <div className='pt-10 sm:pt-20 flex justify-center'>
                    <NavLink to="/upload">
                        <Button>
                            Take me to the upload
                        </Button>
                    </NavLink>
                </div>
            </div>




            <div className="text-white flex-col flex items-center space-y-3 text-center">
                <span className="">Made by <a href="https://twitter.com/blixthalka" className="text-blue-400 hover:text-blue-500 cursor-pointer">@blixthalka</a></span>
                <span className="text-secondary">Don't hesitate to send me some suggestions or feedback on twitter!</span>
            </div>

        </div>
    )
}

export default Index;