document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calculator-form');
    const calculateButton = document.getElementById('calculate-button');
    const results = document.getElementById('results');
    const maxTrailerWeight = document.getElementById('max-trailer-weight');
    const loadedTruckWeight = document.getElementById('loaded-truck-weight');
    const remainingWeight = document.getElementById('remaining-weight');
    const combinedCargoWeight = document.getElementById('combined-cargo-weight');
    const maxCombinedWeight = document.getElementById('max-combined-weight');
    const grossVehicleWeightResult = document.getElementById('gross-vehicle-weight-result');

    calculateButton.addEventListener('click', function() {
        // Clear any previous error messages
        clearErrors();
        
        // Parse and validate inputs
        const cargoInput = form.cargo.value.trim();
        if (!cargoInput) {
            showError('Please enter cargo weights');
            return;
        }
        
        let cargo;
        try {
            cargo = cargoInput.split(',').map(item => {
                const weight = parseFloat(item.trim());
                if (isNaN(weight) || weight <= 0) {
                    throw new Error('All cargo weights must be positive numbers');
                }
                return weight;
            });
        } catch (error) {
            showError(error.message);
            return;
        }
        
        const maxWeight = parseFloat(form['max-weight'].value);
        const grossVehicleWeight = parseFloat(form['gross-vehicle-weight'].value);
        
        // Validate inputs
        if (isNaN(maxWeight) || maxWeight <= 0) {
            showError('Max combined weight must be a positive number');
            return;
        }
        
        if (isNaN(grossVehicleWeight) || grossVehicleWeight <= 0) {
            showError('Gross vehicle weight must be a positive number');
            return;
        }
        
        const combinedCargoWeightValue = cargo.reduce((a, b) => a + b, 0);
        
        if (combinedCargoWeightValue >= maxWeight) {
            showError('Combined cargo weight must be less than max combined weight');
            return;
        }
        
        // Calculate results using 13% rule: remaining payload capacity divided by 0.13 gives max trailer weight
        const maxTrailerWeightValue = Math.round((maxWeight - combinedCargoWeightValue) / 0.13);
        const loadedTruckWeightValue = grossVehicleWeight - (maxWeight - combinedCargoWeightValue);
        const remainingWeightValue = grossVehicleWeight - loadedTruckWeightValue;

        maxTrailerWeight.textContent = `Max towable gross trailer weight: ${maxTrailerWeightValue}`;
        loadedTruckWeight.textContent = `Loaded Truck weight: ${loadedTruckWeightValue}`;
        remainingWeight.textContent = `Remaining weight: ${remainingWeightValue}`;
        combinedCargoWeight.textContent = `Combined cargo weight: ${combinedCargoWeightValue}`;
        maxCombinedWeight.textContent = `Max combined weight: ${maxWeight}`;
        grossVehicleWeightResult.textContent = `Gross vehicle weight: ${grossVehicleWeight}`;

        results.style.display = 'block';
    });
    
    function showError(message) {
        clearErrors();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = `Error: ${message}`;
        errorDiv.style.color = 'red';
        errorDiv.style.marginBottom = '10px';
        errorDiv.style.fontWeight = 'bold';
        form.insertBefore(errorDiv, form.firstChild);
    }
    
    function clearErrors() {
        const existingErrors = form.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        results.style.display = 'none';
    }
});
