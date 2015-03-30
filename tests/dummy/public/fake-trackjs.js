window.trackJs = {
  configure: function(newOpts) {
    console.log("Configuring");

    var originalOpts = window._trackJs;
    var modifiedOpts = Ember.merge(originalOpts, newOpts);

    window._trackJs = modifiedOpts;
  },

  _errors: [],

  track: function(errorOrString) {
    console.error(errorOrString);
    this._errors.push(errorOrString);
  },

  _reset: function() { this.errors = []; },

  attempt: function() { console.log("Attempting"); },

  watch: function() { console.log("Watching"); },

  watchAll: function() { console.log("Watching all"); }
};
