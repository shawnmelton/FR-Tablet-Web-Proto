this["JST"] = this["JST"] || {};

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
'">\n                <img src="' +
((__t = ( selects[0].img )) == null ? '' : __t) +
'">\n                <p class="desc">\n                    <strong>' +
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
'">\n                <img src="' +
((__t = ( properties[i].img )) == null ? '' : __t) +
'">\n                <p class="desc">\n                    <strong>' +
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
'">\n                <img src="' +
((__t = ( properties[i].img )) == null ? '' : __t) +
'">\n                <p class="desc">\n                    <strong>' +
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
'">\n                <img src="' +
((__t = ( properties[i].img )) == null ? '' : __t) +
'">\n                <p class="desc">\n                    <strong>' +
((__t = ( properties[i].name )) == null ? '' : __t) +
'</strong><br>\n                    ' +
((__t = ( properties[i].location )) == null ? '' : __t) +
'<br>\n                    ' +
((__t = ( properties[i].type )) == null ? '' : __t) +
'\n                </p>\n            </div>\n        ';
 } ;
__p += '\n        </div>\n        <div class="select">\n            <div property="' +
((__t = ( selects[1].id )) == null ? '' : __t) +
'">\n                <img src="' +
((__t = ( selects[1].img )) == null ? '' : __t) +
'">\n                <p class="desc">\n                    <strong>' +
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
'">\n                <img src="' +
((__t = ( properties[i].img )) == null ? '' : __t) +
'">\n                <p class="desc">\n                    <strong>' +
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
__p += '<div id="results"></div>';

}
return __p
};