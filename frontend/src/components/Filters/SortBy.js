import React, { useState } from 'react';
import { Checkbox, Button } from 'antd';
import styled from 'styled-components';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 14px;
    width: 196px;
    .button-container{
        display: flex;
        justify-content: flex-end;
    }
`;

const StyledCheckbox = styled(Checkbox)`
    padding: 10px;
    .text{
        padding-right: 10px;
    }
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
const options = [
    {
        value: 'Submission Date (Ascending)',
        label: 'Submission Date',
        type: {
            key: 'date',
            value: 'asc'
        }
    },
    {
        value: 'Submission Date (Descending)',
        label: 'Submission Date',
        type: {
            key: 'date',
            value: 'dec'
        }
    },
    {
        value: 'Amount (Ascending)',
        label: 'Amount',
        type: {
            key: 'amount',
            value: 'asc'
        }
    },
    {
        value: 'Amount (Descending)',
        label: 'Amount',
        type: {
            key: 'amount',
            value: 'dec'
        }
    },
];

const SortBy = ({ onApply, setOpen, filter }) => {
    const [checked, setChecked] = useState(filter?.sortBy);
    return (
        <StyledContainer>
            {
                options.map((option) => (
                    <StyledCheckbox
                        key={option.value}
                        checked={JSON.stringify(checked) === JSON.stringify(option.type)}
                        onChange={() => setChecked(option.type)}
                    >
                        <span className='text'>
                            {option.label}
                        </span>
                        {option.type.value === 'asc' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    </StyledCheckbox>
                ))
            }
            <StyledDivider />
            <div className='button-container'>
                {checked?.key?.length > 0 && (
                    <ClearButton type="link" onClick={() => {
                        setChecked({
                            "key": "",
                            "value": ""
                        }); setOpen('');
                        onApply({
                            key: 'sortBy', value: {
                                "key": "",
                                "value": ""
                            }
                        })
                    }}>Clear Selection</ClearButton>
                )}
                <Button type="primary" disabled={!(checked?.key?.length > 0)} onClick={() => onApply({ key: 'sortBy', value: checked })}>Apply</Button>
            </div>
        </StyledContainer>
    )
}

export default SortBy;

