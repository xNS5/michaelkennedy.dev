import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix, findIconDefinition } from '@fortawesome/fontawesome-svg-core';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

library.add(fas, fab, far);

type IconProps = {
    type: string,
    className?: string,
    ariahidden?: boolean | true,
    altText?: string,
    accessibilityProps?: NonNullable<unknown>,
    tabIndex?: number | -1
}

const getIcon = (type: string, delimiter: string) => {
    const index: number = type.indexOf("-");
    const nameArr: string[] = [type.slice(0, index), type.slice(index + delimiter.length)];

   const temp =  findIconDefinition({ prefix: nameArr[0] as IconPrefix, iconName: nameArr[1] as IconName });
   if(temp === undefined) console.log(temp);
   return temp;
}

export default function Icon(props: IconProps){
    if (props !== undefined) {
        const DynamicIcon = getIcon(props.type, "-");
       
        if (DynamicIcon == null) {
            return <FontAwesomeIcon title="X icon" icon={getIcon("fas-rectangle-xmark", "-")} />;
        }
        return (
            <FontAwesomeIcon icon={DynamicIcon} style={{height: "inherit"}} className={`rounded my-2 ${props?.className ?? ""}`} aria-hidden={props.ariahidden} tabIndex={props.tabIndex} title={props.altText ?? ""}/>
        )
    }
}