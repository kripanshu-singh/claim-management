export function filterByDateRange(dateRange, data) {
    // Convert the date range to Date objects and normalize the time to 00:00:00 for consistency
    if (dateRange?.length === 0) return data;
    const [startDate, endDate] = dateRange.map(date => new Date(date));

    const newStartDate = startDate.setHours(0, 0, 0, 0);
    const newEndDate = endDate.setHours(23, 59, 59, 999);
    // Filter the data based on submissionDate
    return data.filter(item => {
        const submissionDate = new Date(item.submissionDate);
        submissionDate.setHours(0, 0, 0, 0); // Normalize time for comparison
        return submissionDate >= newStartDate && submissionDate < newEndDate;
    });
}

export function sortData(data, { key, value }) {
    if (key === '' || value === '') return data;
    return data.sort((a, b) => {
        let compareA, compareB;

        // Sort based on the key
        if (key === 'amount') {
            compareA = a.claimAmount;
            compareB = b.claimAmount;
        } else if (key === 'date') {
            compareA = new Date(a.submissionDate);
            compareB = new Date(b.submissionDate);
        } else {
            return 0; // No valid key, return unmodified
        }

        // Compare values based on the order
        if (value === 'asc') {
            return compareA - compareB;
        } else if (value === 'dec') {
            return compareB - compareA;
        } else {
            return 0; // No valid order, return unmodified
        }
    });
}

export function getMinMaxClaimAmount(data) {
    // Extract the claimAmount values from the data array
    const claimAmounts = data.map(item => item.claimAmount);

    // Find the minimum and maximum values using Math.min and Math.max
    const minAmount = Math.min(...claimAmounts);
    const maxAmount = Math.max(...claimAmounts);

    // Return the result as an array
    return [minAmount, maxAmount];
}