import React, { useState } from 'react';
import PopoverFilter from './PopoverFilter.js';
import styled from 'styled-components';
import Status from './Status.js';
import DateRange from './DateRange.js';
import AmountRange from './AmountRange.js';
import SortBy from './SortBy.js';
import { filterByDateRange, sortData, getMinMaxClaimAmount } from './helper.js'

const StyledContainer = styled.div`
    display: flex;
    .table-name{
        flex: 1;
    }
    .filter-container{
        display: flex;
        gap: 10px;
        padding-right: 20px;
    }
`;


const Filters = ({ setClaims, listData, open, setOpen }) => {
    const min = getMinMaxClaimAmount(listData)[0];
    const max = getMinMaxClaimAmount(listData)[1];
    const initialState = {
        status: [],
        date: [],
        amount: [min, max],
        sortBy: {
            "key": "",
            "value": ""
        },
    };
    const [filter, setFilter] = useState(initialState);

    const onApply = (data) => {
        setClaims((prev) => {
            let result = [];
            if (data.key === 'status') {
                result = listData.filter((item) => data.value.length === 0 || data.value.includes(item.status));
            } if (data.key === 'date') {
                result = filterByDateRange(data.value, listData)
            } if (data.key === 'amount') {
                result = listData.filter((item) => item.claimAmount >= data.value[0] && item.claimAmount <= data.value[1]);
            } if (data.key === 'sortBy') {
                result = sortData(listData, data.value)
            }
            setFilter((prev) => ({ ...prev, [data.key]: data.value }));
            return result;
        })

        setOpen('');
    }

    return (
        <StyledContainer>
            <div className='table-name'>Paitent Information</div>
            <div className='filter-container'>
                <PopoverFilter
                    key="status"
                    content={(
                        <Status onApply={onApply} setOpen={setOpen} filter={filter} />
                    )}
                    onOpenChange={(open) => { setOpen(open ? 'status' : '') }}
                    heading="Status"
                    rounded
                    open={open === 'status'}
                    count={filter.status?.length}
                />
                <PopoverFilter
                    key='date'
                    content={(
                        <DateRange onApply={onApply} setOpen={setOpen} filter={filter} />
                    )}
                    onOpenChange={(open) => { setOpen(open ? 'date' : '') }}
                    heading="Submission date"
                    rounded
                    open={open === 'date'}
                    count={filter.date?.length > 0 ? 1 : 0}
                />
                <PopoverFilter
                    key='amount'
                    content={(
                        <AmountRange onApply={onApply} setOpen={setOpen} filter={filter} min={min} max={max} />
                    )}
                    onOpenChange={(open) => { setOpen(open ? 'amount' : '') }}
                    heading="Amount"
                    rounded
                    open={open === 'amount'}
                    count={JSON.stringify([min, max]) === JSON.stringify(filter.amount) ? 0 : 1}
                />
                <PopoverFilter
                    key='sortBy'
                    content={(
                        <SortBy onApply={onApply} setOpen={setOpen} filter={filter} />
                    )}
                    onOpenChange={(open) => { setOpen(open ? 'sortBy' : '') }}
                    heading="Sort By"
                    rounded
                    open={open === 'sortBy'}
                    count={filter.sortBy?.key?.length > 0 ? 1 : 0}
                />
            </div>
        </StyledContainer>
    )
}

export default Filters