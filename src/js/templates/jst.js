this["JST"] = this["JST"] || {};

this["JST"]["src/js/templates/elements/footerProfile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<nav>\n    <div>\n    ';
 _.each(links, function(link) { ;
__p += '\n        <a rel="' +
((__t = ( link.rel )) == null ? '' : __t) +
'" ';
 if(typeof(link.cls) !== 'undefined') { ;
__p += 'class="' +
((__t = ( link.cls )) == null ? '' : __t) +
'"';
 } ;
__p += ' style="width: ' +
((__t = ( size )) == null ? '' : __t) +
'%;">' +
((__t = ( link.text )) == null ? '' : __t) +
'</a>\n    ';
 }); ;
__p += '\n    </div>\n</nav>';

}
return __p
};

this["JST"]["src/js/templates/elements/menu.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<nav>\n    <a href="/">Home</a>\n    <a href="http://forrent.com">Full Site</a>\n</nav>';

}
return __p
};

this["JST"]["src/js/templates/elements/searchBar.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<form action="/search" method="post" name="search" id="searchBar">\n    ' +
((__t = ( heading )) == null ? '' : __t) +
'\n    <fieldset>\n        <input type="text" name="keywords" placeholder="City, State or Zip Code" value="' +
((__t = ( keywords )) == null ? '' : __t) +
'">\n        <div>\n            <a id="adv-search"></a>\n            <button type="submit">Search</button>\n        </div>\n    </fieldset>\n</form>';

}
return __p
};

this["JST"]["src/js/templates/elements/searchResultsGroup.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="table">\n    <div>\n        <div class="select">\n            <div property="' +
((__t = ( selects[0].id )) == null ? '' : __t) +
'">\n                <img src="/img/listings/' +
((__t = ( selects[0].id )) == null ? '' : __t) +
'-1024.jpg">\n                <p class="desc">\n                    <strong>' +
((__t = ( selects[0].name )) == null ? '' : __t) +
'</strong><br>\n                    ' +
((__t = ( selects[0].location )) == null ? '' : __t) +
'<br>\n                    ' +
((__t = ( selects[0].type )) == null ? '' : __t) +
'\n                </p>\n                <p class="price">' +
((__t = ( selects[0].price )) == null ? '' : __t) +
'</p>\n            </div>\n        </div>\n        <div class="stacked">\n        ';
 for(var i = 0; i < 2; i++) { ;
__p += '\n            <div property="' +
((__t = ( properties[i].id )) == null ? '' : __t) +
'">\n                <img src="/img/listings/' +
((__t = ( properties[i].id )) == null ? '' : __t) +
'-612.jpg">\n                <p class="desc">\n                    <strong>' +
((__t = ( properties[i].name )) == null ? '' : __t) +
'</strong><br>\n                    ' +
((__t = ( properties[i].location )) == null ? '' : __t) +
'<br>\n                    ' +
((__t = ( properties[i].type )) == null ? '' : __t) +
'\n                </p>\n            </div>\n        ';
 } ;
__p += '\n        </div>\n    </div>\n</div>\n<div class="table">\n    <div>\n        ';
 for(var i = 2; i < 5; i++) { ;
__p += '\n        <div>\n            <div property="' +
((__t = ( properties[i].id )) == null ? '' : __t) +
'">\n                <img src="/img/listings/' +
((__t = ( properties[i].id )) == null ? '' : __t) +
'-612.jpg">\n                <p class="desc">\n                    <strong>' +
((__t = ( properties[i].name )) == null ? '' : __t) +
'</strong><br>\n                    ' +
((__t = ( properties[i].location )) == null ? '' : __t) +
'<br>\n                    ' +
((__t = ( properties[i].type )) == null ? '' : __t) +
'\n                </p>\n            </div>\n        </div>\n        ';
 } ;
__p += '\n    </div>\n</div>\n<div class="table">\n    <div>\n        <div class="stacked">\n        ';
 for(var i = 5; i < 7; i++) { ;
__p += '\n            <div property="' +
((__t = ( properties[i].id )) == null ? '' : __t) +
'">\n                <img src="/img/listings/' +
((__t = ( properties[i].id )) == null ? '' : __t) +
'-612.jpg">\n                <p class="desc">\n                    <strong>' +
((__t = ( properties[i].name )) == null ? '' : __t) +
'</strong><br>\n                    ' +
((__t = ( properties[i].location )) == null ? '' : __t) +
'<br>\n                    ' +
((__t = ( properties[i].type )) == null ? '' : __t) +
'\n                </p>\n            </div>\n        ';
 } ;
__p += '\n        </div>\n        <div class="select">\n            <div property="' +
((__t = ( selects[1].id )) == null ? '' : __t) +
'">\n                <img src="/img/listings/' +
((__t = ( selects[1].id )) == null ? '' : __t) +
'-1024.jpg">\n                <p class="desc">\n                    <strong>' +
((__t = ( selects[1].name )) == null ? '' : __t) +
'</strong><br>\n                    ' +
((__t = ( selects[1].location )) == null ? '' : __t) +
'<br>\n                    ' +
((__t = ( selects[1].type )) == null ? '' : __t) +
'\n                </p>\n                <p class="price">' +
((__t = ( selects[1].price )) == null ? '' : __t) +
'</p>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="table">\n    <div>\n        ';
 for(var i = 7; i < 10; i++) { ;
__p += '\n        <div>\n            <div property="' +
((__t = ( properties[i].id )) == null ? '' : __t) +
'">\n                <img src="/img/listings/' +
((__t = ( properties[i].id )) == null ? '' : __t) +
'-612.jpg">\n                <p class="desc">\n                    <strong>' +
((__t = ( properties[i].name )) == null ? '' : __t) +
'</strong><br>\n                    ' +
((__t = ( properties[i].location )) == null ? '' : __t) +
'<br>\n                    ' +
((__t = ( properties[i].type )) == null ? '' : __t) +
'\n                </p>\n            </div>\n        </div>\n        ';
 } ;
__p += '\n    </div>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/layouts/home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<section>\n';
 _.each(properties, function(property) { ;
__p += '\n    <div property="' +
((__t = ( property.id )) == null ? '' : __t) +
'" class="property">\n        <img src="/img/listings/' +
((__t = ( property.id )) == null ? '' : __t) +
'-612.jpg" alt="' +
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
__p += '<section>\n    <div id="propDetails">\n        <h2>' +
((__t = ( property.name )) == null ? '' : __t) +
'</h2>\n        <p>\n            ' +
((__t = ( property.address )) == null ? '' : __t) +
'<br>\n            <a href="http://maps.google.com?q=' +
((__t = ( property.address )) == null ? '' : __t) +
'" target="_blank">View Map &amp; Directions</a>\n        </p>\n        <p>\n            ' +
((__t = ( property.type )) == null ? '' : __t) +
' for ' +
((__t = ( property.price )) == null ? '' : __t) +
'<br>\n            <a>View Floor Plans &amp; Prices</a>\n        </p>\n        <p>\n            ' +
((__t = ( property.type )) == null ? '' : __t) +
' for ' +
((__t = ( property.price )) == null ? '' : __t) +
'<br>\n            <a>View Floor Plans &amp; Prices</a>\n        </p>\n        <p class="noBorder">\n            Details<br>\n            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet arcu pretium, placerat mauris sed, hendrerit eros. Curabitur sed fermentum justo. Pellentesque lobortis, orci ut porttitor luctus, nisi urna pharetra magna.</small>\n        </p>\n    </div>\n    <div id="propButtons">\n        <div>\n            <div><button id="buttonCA">Check Availability</button></div>\n            <div id="buttonSpacer"></div>\n            <div><button>1-800-555-0123</button></div>\n        </div>\n    </div>\n</section>\n';

}
return __p
};

this["JST"]["src/js/templates/layouts/search.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="results"></div>';

}
return __p
};