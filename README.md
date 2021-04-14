[![codecov](https://codecov.io/gh/internetarchive/iaux-throttler-debouncer/branch/master/graph/badge.svg)](https://codecov.io/gh/internetarchive/iaux-throttler-debouncer)

# Internet Archive Throttler Debouncer

Helper functions for throttling and debouncing events.

Throttle - runs a given function just once in a given period 
Debounce - runs a given function after a given period of time will pass without a single event. 

## Installation

`npm install --save @internetarchive/throttler-debouncer`

## Usage
```
<!-- index.html -->
<script type="module">
  import { Debouncer } from '@internetarchive/throttler-debouncer';
  import { Throttler } from '@internetarchive/throttler-debouncer'; 

  const debouncerFn = new Debouncer(callbackFnc, threshold_time_in_millis);
  const throttleFn = new Throttler(callbackFnc, threshold_time_in_millis);

  debouncerFn.execute()
  throttleFn.execute()
</script>
```

## Testing 

`yarn run test`

## Linting / Fix formatting  

`yarn run lint`
