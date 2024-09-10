document.addEventListener('DOMContentLoaded', function() {
    const streamsInput = document.getElementById('streams');
    const royaltiesShareInput = document.getElementById('royaltiesShare');
    const locationSelect = document.getElementById('location');
    const currencySelect = document.getElementById('currency');
    const estimatedEarningsElement = document.getElementById('estimatedEarnings');

    function calculateEarnings() {
        const streams = parseFloat(streamsInput.value);
        const royaltiesShare = Math.min(parseFloat(royaltiesShareInput.value), 100) / 100;
        const selectedOption = locationSelect.options[locationSelect.selectedIndex];
        const royaltyRate = parseFloat(selectedOption.dataset.royalty);
        const currency = currencySelect.value;

        let earnings = streams * royaltyRate * royaltiesShare;

        // Convert to selected currency
        if (currency === 'EUR') {
            earnings *= 0.91; // Approximate USD to EUR conversion
        } else if (currency === 'GBP') {
            earnings *= 0.76; // Approximate USD to GBP conversion
        } else if (currency === 'INR') {
            earnings *= 83.98; // Approximate USD to INR conversion
        }

        estimatedEarningsElement.textContent = `${currency} ${earnings.toFixed(2)}`;
    }

    streamsInput.addEventListener('input', calculateEarnings);
    royaltiesShareInput.addEventListener('input', function() {
        if (parseFloat(this.value) > 100) {
            this.value = 100;
        }
        calculateEarnings();
    });
    locationSelect.addEventListener('change', calculateEarnings);
    currencySelect.addEventListener('change', calculateEarnings);

    calculateEarnings(); // Initial calculation
});