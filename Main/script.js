document.addEventListener('DOMContentLoaded', () => {
    // Select the form and table body
    const form = document.querySelector('#expense-form form');
    const tableBody = document.querySelector('#expenses-list tbody');

   // Ensure no duplicate event listeners are attached
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission from reloading the page

    //    Get form data
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;

        console.log({ amount, category, date, description }); 

       // Validate form data
        if (!isNaN(amount) && date) {
           // Create a new row
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${date}</td>
                <td>${category}</td>
                <td>$${amount.toFixed(2)}</td>
                <td>${description || 'N/A'}</td>
            `;

           // Append the new row to the table
            tableBody.appendChild(newRow);

           // Update the chart
            updateChart(category, amount);

           // Update summary
            updateSummary();

           // Reset the form fields
            form.reset();
        }
    });
});



// Function to update the chart dynamically
function updateChart(category, amount) {
    const categoryIndex = expenseChart.data.labels.indexOf(category);

    if (categoryIndex === -1) {
        // Add a new category if it doesn't exist
        expenseChart.data.labels.push(category);
        expenseChart.data.datasets[0].data.push(amount);
    } else {
        // Update the amount for an existing category
        expenseChart.data.datasets[0].data[categoryIndex] += amount;
    }

    expenseChart.update(); // Refresh the chart
}

// Function to update the summary dynamically
function updateSummary() {
    const amounts = Array.from(document.querySelectorAll('#expenses-list tbody td:nth-child(3)'))
        .map(td => parseFloat(td.textContent.replace('$', '')));

    const totalExpense = amounts.reduce((sum, amount) => sum + amount, 0);
    const highestExpense = Math.max(...amounts);

    // Update summary fields
    document.querySelector('#summary .summary-item:nth-child(1) span').textContent = `$${totalExpense.toFixed(2)}`;
    document.querySelector('#summary .summary-item:nth-child(2) span').textContent = `$${highestExpense.toFixed(2)}`;
}

// Initialize the chart with empty data
const ctx = document.getElementById('expenseChart').getContext('2d');
const expenseChart = new Chart(ctx, {
    type: 'bar', // You can change this to 'pie', 'doughnut', etc.
    data: {
        labels: [], // Start with no categories
        datasets: [{
            label: 'Expense Summary',
            data: [], // Start with no amounts
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 205, 86, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(201, 203, 207, 0.6)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(201, 203, 207, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Expense Distribution'
            }
        }
    }
});

