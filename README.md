# trailer_weight
Ruby script to calculate towing capacity.

Guidance is for Ford's F-150, but may be applicable elsewhere. Not official advice or affliciated with Ford. Please consult your owners manual for information on your vehicle's limits.

## Usage:

```bash
$ ruby trailer_weight.rb -h
Usage: trailer_weight.rb [options]
    -c, --cargo=VAL                  Comma separated list of cargo weights. Default = 210,180,40,125
    -m, --max-weight=VAL             Max combined weight of cargo and occupants. Default = 1500
    -g, --gross-vehicle-weight=VAL   Gross vehicle weight GVWR. Default = max-weight
    -v, --verbose                    Run verbosely
    -h, --help                       Show this message
```

## Example outputs:

```bash
$ ruby trailer_weight.rb -m 1198 -g 7350 -c 210,180,45,50 -v
Max towable gross trailer weight: 5485
Loaded Truck weight: 6637
Remaining weight: 713
Combined cargo weight: 485
Max combined weight: 1198
Gross vehicle weight: 7350
```

```bash
ruby trailer_weight.rb -m 1650 -g 7100 -c 210,180,45,50 -v
Max towable gross trailer weight: 8962
Loaded Truck weight: 5935
Remaining weight: 1165
Combined cargo weight: 485
Max combined weight: 1650
Gross vehicle weight: 7100
```

## Where to find max-weight and gross-vehicle-weight on F-150

Expected in lbs.

### max-weight:

"The combined weight of occupants and cargo should never exceed:"

![Ford F-150 Door sticker denoting the combined weight of occupants and cargo should never exceed value](https://user-images.githubusercontent.com/3662109/155672964-27079650-7d75-42ea-86d0-d3b0684bbed2.png)

### gross-vehicle-weight (GVWR)

Below `MFD. BY FORD MOTOR CO.`:

![Ford F-150 Door dticker denoting the GVWR](https://user-images.githubusercontent.com/3662109/155672961-141c8e35-f053-4d36-8da7-89de5522174c.png)

