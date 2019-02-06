#!/bin/bash
# up to 5 times at ~1 second intervals (though it almost always works first try)
for a in {1..5}
do
    sleep 1
    
    # if CrossCode is not running start it
    if ! pgrep -x "CrossCode"
    then
        ./CrossCode &
        break
    fi
done
