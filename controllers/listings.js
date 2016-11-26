var Listing = require('../models/listing');

module.exports = {
  index: index,
  newListing:  newListing
  // show: showListing
}

function index(req, res, next) {

  res.render('listings/index', { title: 'HomeMe', user: req.user });
}

function newListing(req, res, next) {
  res.render('listings/new', { title: 'HomeMe', user: req.user });
}

function showListing(req, res, next){
  // Listing.findById(req.params.id, function(err, listing){
  //   if (err) throw err;
  //   res.render('listings/show', {title: 'HomeMe', user: req.user, listing: listing});
  // });
}
