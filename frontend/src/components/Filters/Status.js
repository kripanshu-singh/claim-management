import React, { useState } from 'react';
import { Checkbox, Button } from 'antd';
import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 14px;
    width: 200px;
    .button-container{
        display: flex;
        justify-content: flex-end;
    }
`;

const StyledCheckbox = styled(Checkbox)`
    padding: 10px;
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

const Status = ({ onApply, setOpen, filter }) => {
    const [checked, setChecked] = useState(filter?.status);
    return (
        <StyledContainer>
            <StyledCheckbox key='approved' checked={checked.includes('approved')} onChange={() => setChecked((prev) => prev.includes('approved') ? prev.filter((item) => item !== 'approved') : [...prev, 'approved'])}>Approve</StyledCheckbox>
            <StyledCheckbox key='rejected' checked={checked.includes('rejected')} onChange={() => setChecked((prev) => prev.includes('rejected') ? prev.filter((item) => item !== 'rejected') : [...prev, 'rejected'])}>Reject</StyledCheckbox>
            <StyledCheckbox key='pending' checked={checked.includes('pending')} onChange={() => setChecked((prev) => prev.includes('pending') ? prev.filter((item) => item !== 'pending') : [...prev, 'pending'])}>Pending</StyledCheckbox>
            <StyledDivider />
            <div className='button-container'>
                {checked?.length > 0 && (
                    <ClearButton type="link" onClick={() => { setChecked([]); setOpen(''); onApply({ key: 'status', value: [] }); }}>Clear Selection</ClearButton>
                )}
                <Button type="primary" disabled={checked?.length === 0} onClick={() => onApply({ key: 'status', value: checked })}>Apply</Button>
            </div>
        </StyledContainer>
    )
}

export default Status