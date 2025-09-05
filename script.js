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
    const hitchWeight = document.getElementById('hitch-weight');
    const payloadUtilization = document.getElementById('payload-utilization');
    const weightDistributionRatio = document.getElementById('weight-distribution-ratio');

    // Initialize tooltips
    initializeTooltips();

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
        
        // Calculate additional weight distribution metrics
        const hitchWeightValue = Math.round(maxTrailerWeightValue * 0.13); // 13% of trailer weight for hitch weight
        const payloadUtilizationValue = Math.round((combinedCargoWeightValue / maxWeight) * 100);
        const remainingCapacityPercentage = Math.round(((maxWeight - combinedCargoWeightValue) / maxWeight) * 100);

        maxTrailerWeight.textContent = `Max towable gross trailer weight: ${maxTrailerWeightValue} lbs`;
        loadedTruckWeight.textContent = `Loaded Truck weight: ${loadedTruckWeightValue} lbs`;
        remainingWeight.textContent = `Remaining weight: ${remainingWeightValue} lbs`;
        combinedCargoWeight.textContent = `Combined cargo weight: ${combinedCargoWeightValue} lbs`;
        maxCombinedWeight.textContent = `Max combined weight: ${maxWeight} lbs`;
        grossVehicleWeightResult.textContent = `Gross vehicle weight: ${grossVehicleWeight} lbs`;
        hitchWeight.textContent = `Estimated hitch weight (13%): ${hitchWeightValue} lbs`;
        payloadUtilization.textContent = `Payload utilization: ${payloadUtilizationValue}%`;
        weightDistributionRatio.textContent = `Remaining capacity: ${remainingCapacityPercentage}%`;

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

    function initializeTooltips() {
        const tooltips = document.querySelectorAll('.tooltip');
        
        tooltips.forEach(tooltip => {
            const targetId = tooltip.getAttribute('aria-describedby');
            const description = document.getElementById(targetId);
            
            if (description) {
                // Show tooltip on hover
                tooltip.addEventListener('mouseenter', function() {
                    description.classList.add('show');
                });
                
                // Hide tooltip when mouse leaves
                tooltip.addEventListener('mouseleave', function() {
                    description.classList.remove('show');
                });
                
                // Show tooltip on focus (for keyboard navigation)
                tooltip.addEventListener('focus', function() {
                    description.classList.add('show');
                });
                
                // Hide tooltip on blur
                tooltip.addEventListener('blur', function() {
                    description.classList.remove('show');
                });
                
                // Toggle tooltip on click (for touch devices)
                tooltip.addEventListener('click', function(e) {
                    e.preventDefault();
                    description.classList.toggle('show');
                });
            }
        });
    }
});
