var fetch = require('node-fetch');
  
// URL for searching packages
function getSearchByNameUrl(query) {
  return "https://packagist.org/search.json?q=" + query;
}

// URL for looking up info about a specific package
function getPackageInfoUrl(packageName) {
  var parts = packageName.split('/');
  if (parts.length !== 2) {
    throw new Error('Invalid package name: "' + packageName + '"');
  }
  var vendor = parts[0];
  var name = parts[1];
  return "https://packagist.org/packages/" + vendor + "/" + name + ".json"
}

function getSearchByVendorUrl(vendor) {
  return "https://packagist.org/packages/list.json?vendor=" + vendor;
}

// utility, so I don't have to call .json() on each request
function fetchJson(url, options) {
  return fetch(url, options).then(function (response) {
    return response.json();
  });
}

// Returns a Promise, with the {name, description} objects of the matching packages
function searchByName(keyword) {
  return fetchJson(getSearchByNameUrl(keyword)).then(function (json) {
    return json.results;
  });
}
// Returns all the available versions for the given package in reverse order (newest first)
function versions(packageName) {
  return fetchJson(getPackageInfoUrl(packageName)).then(function (json) {
    return Object.keys(((json || {}).package || {}).versions || {});
  });
}

// Returns the packages by the given vendor.
function searchByVendor(vendor) {
  return fetchJson(getSearchByVendorUrl(vendor)).then(function (json) {
    return ((json || {}).packageNames) || [];
  });
}

module.exports = {
  searchByName: searchByName,
  searchByVendor: searchByVendor,
  versions: versions
};
