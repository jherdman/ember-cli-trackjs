/* jshint node: true */
'use strict';

module.exports = {
  normalizeEntityName: function() {
    // Silence error. We don't actually care about this.
  },

  afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: 'trackjs', target: '~2.6.2' }
    ]);
  }
};
