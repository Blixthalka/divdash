import Card from "./Card"
import { InfoIcon } from "lucide-react"

function Info({ text, ...props }) {
    return (
        <Card {...props}>
            <div className='flex space-x-3 w-full items-center text-sm border-card-off text-secondary '>
                <InfoIcon className='w-5 h-5 stroke-primary flex-shrink-0' />
                <span>{text}</span>
            </div>
        </Card>
    )
}

export default Info;