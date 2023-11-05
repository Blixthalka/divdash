import { VenetianMaskIcon } from "lucide-react";
import ButtonIcon from "./ButtonIcon";



const IcognitoButton = ({ isIcognito, setIsIcognito, ...props }) => {
    return (
        <ButtonIcon
            selected={isIcognito}
            Icon={VenetianMaskIcon}
            onClick={() => setIsIcognito(!isIcognito)}
            {...props}
        />
    )
}

export default IcognitoButton;