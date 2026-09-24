import { useContext, useState } from "react";
import { SampleTypes } from "../../models/defaults";
import { ListItemIcon, ListItemText, MenuItem, MenuList, Stack } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { SampleContext } from "../../context/SampleContext";

export function SampleTypeSelect () {
    const options = Object.keys(SampleTypes)

    const {focusedSample, setFocusedSample} = useContext(SampleContext)
    const [currentType, setCurrentType] = useState(focusedSample.sampleType)

    const onTypeChange = (value:string) => {
        setCurrentType(value)
        setFocusedSample({...focusedSample, sampleType:value})
    }

    return (
        <Stack>
        <MenuList>
            {options.map(option => {
            return (
                <MenuItem role="menuitemradio"
                key={option}
                selected={currentType===option}
                onClick={()=>onTypeChange(option)}
                >
            <ListItemIcon>
                {currentType===option && <CheckBoxIcon/>}
            {currentType!=option && <CheckBoxOutlineBlankIcon/>}
            </ListItemIcon>
            <ListItemText>{option}</ListItemText>
                </MenuItem> )
            })
        }
        </MenuList>
        </Stack>
    )
}