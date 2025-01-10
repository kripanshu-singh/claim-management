import React, { useState } from 'react';
import { Button, DatePicker } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 14px;
    width: 240px;
    border: 1px solid #ECECEC;
    .ant-picker-large .ant-picker-input>input {
    font-size: 14px;
}
    .button-container{
        display: flex;
        justify-content: flex-end;
    }
`;

const { RangePicker } = DatePicker;

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

export const getDay = (date, isRange = true) => {
    if (date.length !== 0) {
        const dateFormat = 'YYYY-MM-DD';
        let value = '';
        if (isRange) {
            value = [(dayjs(date[0], dateFormat)), (dayjs(date[1], dateFormat))];
        }
        else {
            value = dayjs(date, dateFormat);
        }
        return value;
    }
    else if (date) {
        if (date[0] === 'Invalid Date' && date[1 === 'Invalid Date']) {
            return [];
        }
    }
    return [];
};

const DateRange = ({ onApply, setOpen, filter }) => {
    const [dateValue, setDateValue] = useState(filter?.date);
    const handlePickDate = (value, dateString) => {
        setDateValue(dateString);
    };
    return (
        <StyledContainer>
            <RangePicker
                value={getDay(dateValue)}
                popupClassName="rangercalender"
                onChange={handlePickDate}
                placement="bottomRight"
                placeholder={['from', 'to']}
                allowClear={false}
            />
            <StyledDivider />
            <div className='button-container'>
                {dateValue?.length > 0 && (
                    <ClearButton type="link" onClick={() => { setDateValue([]); setOpen(''); onApply({ key: 'date', value: [] }); }}>Clear Selection</ClearButton>
                )}
                <Button type="primary" disabled={dateValue?.length === 0} onClick={() => onApply({ key: 'date', value: dateValue })}>Apply</Button>
            </div>
        </StyledContainer>
    )
}

export default DateRange;