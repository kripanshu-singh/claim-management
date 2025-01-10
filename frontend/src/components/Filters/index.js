import React, { useState } from "react";
import PopoverFilter from "./PopoverFilter.js";
import styled from "styled-components";
import Status from "./Status.js";
import DateRange from "./DateRange.js";
import AmountRange from "./AmountRange.js";
import SortBy from "./SortBy.js";
import { filterByDateRange, sortData, getMinMaxClaimAmount } from "./helper.js";

const StyledContainer = styled.div`
  display: flex;
  .table-name {
    flex: 1;
  }
  .filter-container {
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
      key: "",
      value: "",
    },
  };

  const [filter, setFilter] = useState(initialState);

  const applyFilters = (filters) => {
    let filteredData = listData;

    // Apply status filter
    if (filters.status.length > 0) {
      filteredData = filteredData.filter((item) =>
        filters.status.includes(item.status),
      );
    }

    // Apply date filter
    if (filters.date.length > 0) {
      filteredData = filterByDateRange(filters.date, filteredData);
    }

    // Apply amount filter
    if (
      filters.amount[0] !== min ||
      filters.amount[1] !== max // Only filter if the range isn't default
    ) {
      filteredData = filteredData.filter(
        (item) =>
          item.claimAmount >= filters.amount[0] &&
          item.claimAmount <= filters.amount[1],
      );
    }

    // Apply sortBy filter
    if (filters.sortBy.key) {
      filteredData = sortData(filteredData, filters.sortBy);
    }

    return filteredData;
  };

  const onApply = (data) => {
    setFilter((prev) => {
      const newFilter = { ...prev, [data.key]: data.value };
      setClaims(applyFilters(newFilter)); // Apply all filters with the updated filter state
      return newFilter;
    });
    setOpen("");
  };

  const clearFilter = (key) => {
    setFilter((prev) => {
      const newFilter = { ...prev, [key]: initialState[key] };
      setClaims(applyFilters(newFilter)); // Reapply filters after clearing
      return newFilter;
    });
    setOpen("");
  };

  return (
    <StyledContainer>
      <div className="table-name">Patient Information</div>
      <div className="filter-container">
        <PopoverFilter
          key="status"
          content={
            <Status
              onApply={onApply}
              clearFilter={() => clearFilter("status")}
              setOpen={setOpen}
              filter={filter}
            />
          }
          onOpenChange={(open) => {
            setOpen(open ? "status" : "");
          }}
          heading="Status"
          rounded
          open={open === "status"}
          count={filter.status?.length} // Show count of selected statuses
        />

        <PopoverFilter
          key="date"
          content={
            <DateRange
              onApply={onApply}
              clearFilter={() => clearFilter("date")}
              setOpen={setOpen}
              filter={filter}
            />
          }
          onOpenChange={(open) => {
            setOpen(open ? "date" : "");
          }}
          heading="Submission Date"
          rounded
          open={open === "date"}
          count={filter.date?.length > 0 ? 1 : 0}
        />

        <PopoverFilter
          key="amount"
          content={
            <AmountRange
              onApply={onApply}
              clearFilter={() => clearFilter("amount")}
              setOpen={setOpen}
              filter={filter}
              min={min}
              max={max}
            />
          }
          onOpenChange={(open) => {
            setOpen(open ? "amount" : "");
          }}
          heading="Amount"
          rounded
          open={open === "amount"}
          count={
            JSON.stringify([min, max]) === JSON.stringify(filter.amount) ? 0 : 1
          }
        />

        <PopoverFilter
          key="sortBy"
          content={
            <SortBy
              onApply={onApply}
              clearFilter={() => clearFilter("sortBy")}
              setOpen={setOpen}
              filter={filter}
            />
          }
          onOpenChange={(open) => {
            setOpen(open ? "sortBy" : "");
          }}
          heading="Sort By"
          rounded
          open={open === "sortBy"}
          count={filter.sortBy?.key?.length > 0 ? 1 : 0}
        />
      </div>
    </StyledContainer>
  );
};

export default Filters;
