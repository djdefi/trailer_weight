# test_trailer_weight.rb

require 'optparse'
require 'rspec'

RSpec.describe "TrailerWeightCalculator" do
  it "calculates max trailer weight correctly" do
    options = {
      max_weight: 1500,
      cargo: [200, 150, 50]
    }

    # Mocking command-line options for testing
    allow_any_instance_of(OptionParser).to receive(:parse!).and_return(options)

    # Capture stdout output during script execution
    output = capture_output { require './trailer_weight.rb' }

    # Calculate expected gross trailer weight based on mock options
    expected_gross_trailer_weight = ((options[:max_weight] - options[:cargo].sum) / 0.13).round

    # Verify script output contains expected trailer weight message
    expect(output).to include("Max towable gross trailer weight: #{expected_gross_trailer_weight}")
  end
end

# Helper method to capture stdout for testing purposes
def capture_output(&block)
  original_stdout = $stdout
  output_catcher = StringIO.new
  $stdout = output_catcher
  yield
  output_catcher.string
ensure
  $stdout = original_stdout
end
