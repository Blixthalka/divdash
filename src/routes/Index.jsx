
import { BarChartIcon, LayersIcon, LockIcon, Share2Icon } from 'lucide-react';
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import screenshot from './../images/screenshot.png';


const Index = function () {
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

            <div className="grid md:grid-cols-2  my-32 gap-10">
                <Card className="text-white ">
                    <div className="flex items-center mb-3">
                        <BarChartIcon className="w-5 h-5 mr-3 stroke-primary" />
                        <p className="text-lg font-medium">Charts</p>
                    </div>
                    <p className="text-secondary">An abundance of charts to explore.</p>
                </Card>
                <Card className="text-white ">
                    <div className="flex items-center mb-3">
                        <LayersIcon className="w-5 h-5 mr-3 stroke-primary" />
                        <p className="text-lg font-medium">Aggregate</p>
                    </div>
                    <p className="text-secondary">Have multiple banks? No problem.</p>
                </Card>
                <Card className="text-white ">
                    <div className="flex items-center mb-3">
                        <LockIcon className="w-5 h-5 mr-3 stroke-primary" />
                        <p className="text-lg font-medium">Secure</p>
                    </div>
                    <p className="text-secondary">Your data stays in your browser.</p>
                </Card>
                <Card className="text-white ">
                    <div className="flex items-center mb-3">
                        <Share2Icon className="w-5 h-5 mr-3 stroke-primary" />
                        <p className="text-lg font-medium">Share</p>
                    </div>
                    <p className="text-secondary">A breeze to share to your socials.</p>
                </Card>
            </div>
            <div className={"my-32"}>
                <img src={screenshot} className="border border-card-off rounded-lg" alt="divdash dashboard" />
            </div>
            <div className="text-white flex-col flex items-center space-y-3">
                <span className="">Made by <a href="https://twitter.com/blixthalka" className="text-blue-400 hover:text-blue-500 cursor-pointer">@blixthalka</a></span>
                <span className="text-secondary">Don't hesitate to send me some suggestions or feedback on twitter!</span>
            </div>

        </div>
    )
}

export default Index;