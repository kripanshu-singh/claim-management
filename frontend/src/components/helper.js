export function getTaskSummary(data) {
    // Initialize counters for each task type
    const taskCounts = {
        approved: 0,
        pending: 0,
        rejected: 0
    };

    // Loop through the data and count tasks by their status
    data.forEach(item => {
        if (item.status === 'approved') {
            taskCounts.approved++;
        } else if (item.status === 'pending') {
            taskCounts.pending++;
        } else if (item.status === 'rejected') {
            taskCounts.rejected++;
        }
    });

    // Total number of tasks (this can be dynamic based on actual task statuses)
    const totalTasks = data.length;

    // Prepare the result array with calculated values
    const result = [
        {
            taskType: "approved",
            noOfTask: taskCounts.approved,
            val: Math.round((taskCounts.approved / totalTasks) * 100), // Percentage of approved tasks
            totalTasks: totalTasks,
            color: "#70C78E" // Color for approved tasks
        },
        {
            taskType: "pending",
            noOfTask: taskCounts.pending,
            val: Math.round((taskCounts.pending / totalTasks) * 100), // Percentage of pending tasks
            totalTasks: totalTasks,
            color: "#FEBD54" // Color for pending tasks
        },
        {
            taskType: "rejected",
            noOfTask: taskCounts.rejected,
            val: Math.round((taskCounts.rejected / totalTasks) * 100), // Percentage of rejected tasks
            totalTasks: totalTasks,
            color: "#D8564B" // Color for rejected tasks
        }
    ];

    return result;
}