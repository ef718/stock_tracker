define(function(require) {

  var Backbone = require('backbone');
  var searchResult = require('../models/search');
  var HomeView = require('../views/home');
  var StockView = require('../views/stock');

  var Router = Backbone.Router.extend({
    routes: {
      'stocks': 'home',
      'stocks/:id': 'stock',
      '*default': 'home'
    },

    setView: function(view) {
      if (this.view) {
        this.view.remove();
      }

      this.view = view;
      this.view.render().appendTo('#container');
    },

    home: function() {
      console.log("Home view");
      var view = new HomeView();
      this.setView(view);
    },

    stock: function(id) {
      console.log("Stock view");
      searchResult.set({ticker: id});
      var view = new StockView({model: searchResult});
      this.setView(view);
    }
  });

  return new Router();
});

