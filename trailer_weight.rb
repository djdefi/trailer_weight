# frozen_string_literal: true

require 'optparse'
# Trailer weight calculator based on https://www.f150forum.com/f82/whats-my-best-travel-trailer-length-weight-my-f150-428715/index3/#post5946301
#
# Open up your driver side door and locate the yellow payload sticker.
# It will say “max weight including occupants not to exceed XXXX.” Should be around 1500lb, give or take.
# Take that number, subtract everything you’ve added to your truck, including occupants, and divide by .13 and that is the gross trailer weight you can tow.
#
# Example:
# 1500 max combined weight - 200lb cargo - 150lb cargo - 50lb cargo = 1100. 1100 / .13 = 8400lb max gross weight trailer.
#
# Then look at your gross vehicle weight sticker. Subtract your truck payload you just calculated from it (truck, wife, kid, dog), this is your truck’s weight.
# Subtract this from the gross combined vehicle weight and it should be around the same as above formula

# Parse command line options and assign to variables
# Multiple cargo options can be specified    --cargo=50,100,150
# A single max combined weight can be specified       --max-weight=1500 (Required)
# Optionally a gross vehicle weight can be specified   --gross-vehicle-weight=1200
# If no options are specified, the script will provide a usage message

options = {}

OptionParser.new do |opts|
  opts.banner = 'Usage: trailer_weight.rb [options]'

  opts.on('-c', '--cargo=VAL', 'Comma separated list of cargo weights. Default = 210,180,40,125') do |v|
    options[:cargo] = v.split(',')
  end
  opts.on('-m', '--max-weight=VAL', 'Max combined weight of cargo and occupants. Default = 1500') do |v|
    options[:max_weight] = v.to_i
  end
  opts.on('-g', '--gross-vehicle-weight=VAL', 'Gross vehicle weight GVWR. Default = max-weight') do |v|
    options[:gross_vehicle_weight] = v.to_i
  end
  opts.on('-v', '--verbose', 'Run verbosely') do |v|
    options[:verbose] = v
  end

  opts.on_tail('-h', '--help', 'Show this message') do
    puts opts
    exit
  end
end.parse!

# Validate options
if options[:max_weight].nil?
  puts 'ERROR: You must specify a max combined weight'
  puts 'Usage: trailer_weight.rb [options]'
  exit
end

# Set defaults
options[:cargo] = [210, 180, 40, 125] unless options[:cargo]
unless options[:gross_vehicle_weight]
  options[:gross_vehicle_weight] = options[:max_weight]
end

# Convert cargo string to integer array if needed
options[:cargo] = options[:cargo].map(&:to_i)

# Subtract cargo from max combined weight and devide by .13 to get gross trailer weight
gross_trailer_weight = (options[:max_weight] - options[:cargo].inject(0, :+)) / 0.13

# Round to nearest integer
gross_trailer_weight = gross_trailer_weight.round

puts "Max towable gross trailer weight: #{gross_trailer_weight}"

# If gross vehicle weight is present: Subtract your truck payload you just calculated from it (truck, wife, kid, dog), this is your truck’s weight.
# Subtract this from the gross combined vehicle weight and it should be around the same as above formula
if options[:gross_vehicle_weight] != [:max_weight]
  truck_weight = options[:gross_vehicle_weight] - (options[:max_weight] - options[:cargo].inject(0, :+))
  puts "Loaded Truck weight: #{truck_weight}"

  # Subtract truck weight from gross gross_vehicle_weight weight
  alt_weight = options[:gross_vehicle_weight] - truck_weight
  puts "Remaining weight: #{alt_weight}"
end

# If verbose option is specified, print out combined cargo weight, max combined weight, and gross vehicle weight
if options[:verbose]
  puts "Combined cargo weight: #{options[:cargo].inject(0, :+)}"
  puts "Max combined weight: #{options[:max_weight]}"
  puts "Gross vehicle weight: #{options[:gross_vehicle_weight]}"
end
