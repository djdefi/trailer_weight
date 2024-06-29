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

# Parse command line options and assign to variables
options = {}

OptionParser.new do |opts|
  opts.banner = 'Usage: trailer_weight.rb [options]'

  opts.on('-c', '--cargo=VAL', 'Comma separated list of cargo weights. Default = 210,180,40,125') do |v|
    options[:cargo] = v.split(',').map(&:to_i)
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
unless options[:max_weight]
  puts 'ERROR: You must specify a max combined weight'
  puts 'Usage: trailer_weight.rb [options]'
  exit
end

# Set defaults
options[:cargo] ||= [210, 180, 40, 125]
options[:gross_vehicle_weight] ||= options[:max_weight]

# Calculate gross trailer weight
gross_trailer_weight = (options[:max_weight] - options[:cargo].sum) / 0.13
gross_trailer_weight = gross_trailer_weight.round

puts "Max towable gross trailer weight: #{gross_trailer_weight}"

# Calculate and display truck weight if gross vehicle weight is provided
if options[:gross_vehicle_weight] != options[:max_weight]
  truck_weight = options[:gross_vehicle_weight] - (options[:max_weight] - options[:cargo].sum)
  puts "Loaded Truck weight: #{truck_weight}"

  alt_weight = options[:gross_vehicle_weight] - truck_weight
  puts "Remaining weight: #{alt_weight}"
end

# Output additional information if verbose mode is enabled
if options[:verbose]
  puts "Combined cargo weight: #{options[:cargo].sum}"
  puts "Max combined weight: #{options[:max_weight]}"
  puts "Gross vehicle weight: #{options[:gross_vehicle_weight]}"
end

