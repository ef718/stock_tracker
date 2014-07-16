define(function(require) {

  var Backbone = require('backbone');
  var list = require('../models/list');

  var ListView = Backbone.View.extend({
    el: '#stock-list',

    initialize: function() {
      this.listenTo(this.collection, 'sync add remove', this.render);
      this.render();
    },

    render: function() {
      var html = '';

      list.each(function(model) {
        html += '<li><a href="#stocks/' + model.get('ticker') + '">' + model.get('ticker') + '</a><span id="delete-list"> &times; </span></li>';
      });

      this.$el.html(html);
    },

    events: {
      'click span' : 'onDelete'
    },

    onDelete: function(evt) {
      var deleteTicker = this.$(evt.target).parent().text().slice(0, -3);
      list.findWhere({ticker: deleteTicker}).destroy();
    }

  });

  return new ListView({collection: list});
});
