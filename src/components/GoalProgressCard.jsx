import { FlagTriangleRightIcon, PartyPopperIcon } from "lucide-react"
import moment from "moment/moment"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../App"
import { findGoal, formatNumberNoFractions } from "../utils/util"
import Button from "./Button"

const GoalProgressCard = ({ year, className }) => {
    const { settings, dividends } = useContext(AppContext)

    const currentYear = dividends
        .filter(dividend => dividend.date.isAfter(moment("" + year + "-01-01")) && dividend.date.isBefore(moment("" + (year + 1) + "-01-01")))
        .reduce((acc, dividend) => acc + dividend.amount, 0)

    let goal = findGoal(settings.goals, year)



    if (!goal) {
        return (
            <div className={` bg-[#101418] rounded p-5 ${className} flex items-center justify-center`}>
                <Link to="/settings">
                    <Button text={`Add goal for ${year}`} />
                </Link>
            </div>
        )
    }

    const progress = ((currentYear / goal.amount)) * 100


    return (
        <div className={` bg-[#101418] rounded p-5 ${className}`}>

            <div className="flex justify-between">
                <p className="text-[#595F6B] text-sm">{`Goal ${year}`}</p>
            </div>

            <p className="flex flex-wrap items-center justify-between">

                <span className="text-2xl text-white font-bold ">
                    {formatNumberNoFractions(progress) + ' %'}
                </span>


                <div className='bg-[#14222F] p-2 rounded hidden md:block '>
                    {progress > 100
                        ? <PartyPopperIcon className="stroke-primary w-5 h-5" />
                        : <FlagTriangleRightIcon className="stroke-primary w-5 h-5" />}
                </div>



            </p>
        </div>
    )
}

export default GoalProgressCard