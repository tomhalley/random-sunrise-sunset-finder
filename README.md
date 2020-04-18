## Overview

Total time taken: 4 - 5 hours

## Installation

`npm install`

## Run

`npm run start`

## Extendability

- throttlePromise is generic and so can be ported to other codebases or reused outside of the context of this app.
- date can be specified, is today by default

## Notes
The https://sunrise-sunset.org/api does not seem to be able to handle points too close to the north or south pole, with 
some data points coming back as having the sunrise and sunset at the same date and time in 1970. An example can be seen 
here: https://api.sunrise-sunset.org/json?formatted=0&lat=-83.7964&lng=104.8814 

Because of this, any sunrise/sunset data with a day length of 0 is logged and discarded.

For the throttlePromises function, I would have used something like https://www.npmjs.com/package/bottleneck
in a production environment, but have implemented my own solution as it's assumed it's part of the coding challenge.