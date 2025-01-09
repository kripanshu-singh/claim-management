import React, { useState } from 'react';
import { Slider, Button } from 'antd';
import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 14px;
    width: 220px;
    .button-container{
        display: flex;
        justify-content: flex-end;
    }
`;

const StyledSlider = styled(Slider)`
`;

const ClearButton = styled(Button)`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    padding: 0px;
`;

const StyledDivider = styled.div`
    margin: 10px;
    border: 1px solid #ececec;
    width: calc(100% + 30px);
    margin-left: -15px;
`;

const AmountRange = ({ onApply, setOpen, filter, max, min }) => {
    const [value, setValue] = useState(filter?.amount);
    return (
        <StyledContainer>
            <StyledSlider range value={value} max={max} onChange={(e) => setValue(e)} />
            <StyledDivider />
            <div className='button-container'>
                {!(JSON.stringify([min, max]) === JSON.stringify(value)) && (
                    <ClearButton type="link" onClick={() => { setValue([]); setOpen(''); onApply({ key: 'amount', value: [min, max] }); }}>Clear Selection</ClearButton>
                )}
                <Button type="primary" disabled={JSON.stringify([min, max]) === JSON.stringify(value)} onClick={() => onApply({ key: 'amount', value: value })}>Apply</Button>
            </div>
        </StyledContainer>
    )
}

export default AmountRange