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
        const cargo = form.cargo.value.split(',').map(Number);
        const maxWeight = parseInt(form['max-weight'].value);
        const grossVehicleWeight = parseInt(form['gross-vehicle-weight'].value);

        const combinedCargoWeightValue = cargo.reduce((a, b) => a + b, 0);
        const maxTrailerWeightValue = ((maxWeight - combinedCargoWeightValue) / 0.13).toFixed(2);
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
});
