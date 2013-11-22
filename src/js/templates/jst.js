this["JST"] = this["JST"] || {};

this["JST"]["src/js/templates/layouts/home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<form action="/search" method="post" name="search">\n    <h2>Discover the Perfect Apartment</h2>\n    <div>\n        <input type="text" name="keywords" placeholder="City, State or Zip Code">\n        <div>\n            <a id="adv-search"></a>\n            <button type="submit">Search</button>\n        </div>\n    </div>\n</form>\n<section>\n';
 _.each(properties, function(property) { ;
__p += '\n    <div>\n        <img src="' +
((__t = ( property.img )) == null ? '' : __t) +
'" alt="' +
((__t = ( property.name )) == null ? '' : __t) +
'">\n        <p>\n            <strong>' +
((__t = ( property.name )) == null ? '' : __t) +
'</strong><br>\n            ' +
((__t = ( property.location )) == null ? '' : __t) +
'<br>\n            ' +
((__t = ( property.type )) == null ? '' : __t) +
'\n        </p>\n    </div>\n';
 }); ;
__p += '\n</section>';

}
return __p
};

this["JST"]["src/js/templates/layouts/property.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += 'PROPERTY';

}
return __p
};

this["JST"]["src/js/templates/layouts/search.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += 'SEARCH';

}
return __p
};