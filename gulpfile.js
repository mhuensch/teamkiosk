// ---------------------------------------------------------------------------------------------------------------------
// BUILD FILE
// ---------------------------------------------------------------------------------------------------------------------

// Used to fix the warning behavior in gulp-watch.  Without this line a warning will be issued that states:
// "(node) warning: possible EventEmitter memory leak detected. 11 change listeners added."
// This is "normal" when you are processing more than 10 files in parallel.  No memory is actually being leaked.
// SEE: https://github.com/cbarrick/gulp-run/issues/7
// TODO: remove with latest version of pyre
require('events').EventEmitter.defaultMaxListeners = 0;

// SEE: https://github.com/billowlabs/pyre for more information on pyre
var gulp = require('pyre')(require('gulp'));
