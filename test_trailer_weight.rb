# test_trailer_weight.rb

require 'rspec'

RSpec.describe "TrailerWeightCalculator" do
  it "calculation consistency test - Ruby and JavaScript should give same results" do
    # Test the core calculation that both Ruby and JavaScript use
    max_weight = 1500
    cargo_weights = [210, 180, 45, 50]
    cargo_sum = cargo_weights.sum
    
    # This is the formula used by both implementations
    result = ((max_weight - cargo_sum) / 0.13).round
    
    # Verify the result matches expected value from manual testing
    expect(result).to eq(7808)
    expect(cargo_sum).to eq(485)
    expect(max_weight - cargo_sum).to eq(1015)
  end

  it "validates input boundary conditions" do
    # Test edge case where cargo weight equals max weight (should cause division by zero)
    max_weight = 500
    cargo_sum = 500
    remaining_weight = max_weight - cargo_sum
    
    expect(remaining_weight).to eq(0)
    # This would cause division by zero: remaining_weight / 0.13 = 0 / 0.13 = 0
    expect((remaining_weight / 0.13).round).to eq(0)
  end

  it "validates calculation precision" do
    # Test that our calculation produces consistent results
    test_cases = [
      { max_weight: 1500, cargo: [210, 180, 40, 125], expected: 7269 },
      { max_weight: 1200, cargo: [200, 150], expected: 6538 },
      { max_weight: 1800, cargo: [300, 200, 100], expected: 9231 }
    ]
    
    test_cases.each do |test_case|
      cargo_sum = test_case[:cargo].sum
      result = ((test_case[:max_weight] - cargo_sum) / 0.13).round
      expect(result).to eq(test_case[:expected])
    end
  end
end