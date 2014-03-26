this["JST"] = this["JST"] || {};

this["JST"]["src/js/templates/elements/advancedSearch.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="advancedSearch">\n    <div class="clearFix noOverflow">\n        <h3>Refine Your Search</h3>\n        <div class="table">\n            <div class="tableRow">\n                <div class="tableCell noPadLeft"><select>\n                    <option value="">Beds</option>\n                    <option value="Studio">Studio</option>\n                    <option value="1">1 Bed</option>\n                    <option value="2">2 Beds</option>\n                    <option value="3">3 Beds</option>\n                    <option value="4+">4+ Beds</option>\n                </select></div>\n                <div class="tableCell"><select>\n                    <option value="">Baths</option>\n                    <option value="1">1+ Baths</option>\n                    <option value="2">2+ Baths</option>\n                    <option value="3">3+ Baths</option>\n                </select></div>\n                <div class="tableCell"><select>\n                    <option value="">Price: Low</option>\n                    ';
 var price = 250; while(price <= 3000) { ;
__p += '\n                        <option value="' +
((__t = ( price )) == null ? '' : __t) +
'">' +
((__t = ( price )) == null ? '' : __t) +
'</option>\n                        ';
 price += 250; ;
__p += '\n                    ';
 } ;
__p += '\n                </select></div>\n                <div class="tableCell">&nbsp; to &nbsp;</div>\n                <div class="tableCell"><select>\n                    <option value="">Price: Max</option>\n                    ';
 var price = 500; while(price <= 5000) { ;
__p += '\n                        <option value="' +
((__t = ( price )) == null ? '' : __t) +
'">' +
((__t = ( price )) == null ? '' : __t) +
'</option>\n                        ';
 price += 250; ;
__p += '\n                    ';
 } ;
__p += '\n                </select></div>\n                <div class="tableCell noPadRight"><select>\n                    <option value="">Apartment &amp; Community Amenities</option>\n                </select></div>\n            </div>\n        </div>\n        <div class="buttons">\n            <button>Cancel</button> &nbsp;\n            <button class="blue">Apply</button>\n        </div>\n    </div>\n    <span></span>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/footerProfile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<nav class="table width100">\n    <div class="tableRow">\n    ';
 _.each(links, function(link) { ;
__p += '\n        <a rel="' +
((__t = ( link.rel )) == null ? '' : __t) +
'" class="tableCell whiteText vAlignMiddle alignCenter ';
 if(typeof(link.cls) !== 'undefined') { ;
__p +=
((__t = ( link.cls )) == null ? '' : __t);
 } ;
__p += '" style="width: ' +
((__t = ( size )) == null ? '' : __t) +
'%;">' +
((__t = ( link.text )) == null ? '' : __t) +
'</a>\n    ';
 }); ;
__p += '\n    </div>\n</nav>';

}
return __p
};

this["JST"]["src/js/templates/elements/guestCardForm.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<form id="guestCard" method="post" action="" class="bgWhite">\n    <h3>Check Availability</h3>\n    <p>Email this property for more information</p>\n    <fieldset>\n        <input type="text" placeholder="Full Name" name="fullName" class="width100 borderBox">\n    </fieldset>\n    <fieldset>\n        <input type="text" placeholder="Email Address" name="emailAddress" class="width100 borderBox">\n    </fieldset>\n    <fieldset>\n        <input type="text" placeholder="Phone Number" name="phoneNumber" class="width100 borderBox">\n    </fieldset>\n    <fieldset>\n        <textarea placeholder="I am interested in more information about this property." name="comments" class="width100 borderBox"></textarea>\n    </fieldset>\n    <fieldset>\n        <button type="submit" class="width100 borderBox whiteText alignCenter">Check Availability</button>\n    </fieldset>\n</form>';

}
return __p
};

this["JST"]["src/js/templates/elements/marker.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'marker basic\'>\n    <span class=\'count\'>' +
((__t = ( count )) == null ? '' : __t) +
'</span>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/menu.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="menu" class="fixed transition noOverflow">\n    <nav class="relative transWhite80">\n        <a href="/" class="block">Home</a>\n        <a href="http://forrent.com" target="_blank" class="block">Full Site</a>\n    </nav>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/pmarker.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'marker premier\'>\n\t<span class=\'img_container\'><img src=\'' +
((__t = ( image_src )) == null ? '' : __t) +
'\' /></span>\n\t<div class=\'marker basic\'><span class=\'count\'>' +
((__t = ( count )) == null ? '' : __t) +
'</span></div>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/propertyDetails.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="details" class="bgWhite">\n    <table class="width100">\n        <tr>\n            <td class="name alignLeft vAlignMiddle">' +
((__t = ( property.name )) == null ? '' : __t) +
'</td>\n            <td class="alignCenter vAlignMiddle">1<span class="block">Beds</span></td>\n            <td class="alignCenter vAlignMiddle">2<span class="block">Baths</span></td>\n            <td class="alignCenter vAlignMiddle">$1,500<span class="block">Monthly</span></td>\n        </tr>\n    </table>\n    <p>Curabitur eleifend nisi lobortis, adipiscing mauris in, venenatis ipsum. Sed suscipit nisi ut tincidunt facilisis. Praesent ligula mi, cursus eu gravida nec, consequat id sapien. Vestibulum adipiscing quis mi quis mollis. In condimentum consequat felis, sit amet gravida massa elementum quis. Ut suscipit aliquet dolor, vitae laoreet nibh mollis non. Aenean diam justo, pretium et odio a, fermentum tempus metus.</p>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/propertyFloorPlans.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="floorplans" class="bgWhite">\n    <table class="width100">\n        <tr>\n            <td class="alignLeft">\n                Floor Plan Name\n                <span class="block">more details here</span>\n            </td>\n            <td class="alignCenter">1<span class="block">Beds</span></td>\n            <td class="alignCenter">2<span class="block">Baths</span></td>\n            <td class="alignCenter">$1,500<span class="block">Monthly</span></td>\n        </tr>\n        <tr>\n            <td class="alignLeft">\n                Floor Plan Name\n                <span class="block">more details here</span>\n            </td>\n            <td class="alignCenter">1<span class="block">Beds</span></td>\n            <td class="alignCenter">2<span class="block">Baths</span></td>\n            <td class="alignCenter">$1,500<span class="block">Monthly</span></td>\n        </tr>\n        <tr>\n            <td class="alignLeft">\n                Floor Plan Name\n                <span class="block">more details here</span>\n            </td>\n            <td class="alignCenter">1<span class="block">Beds</span></td>\n            <td class="alignCenter">2<span class="block">Baths</span></td>\n            <td class="alignCenter">$1,500<span class="block">Monthly</span></td>\n        </tr>\n        <tr>\n            <td class="alignLeft">\n                Floor Plan Name\n                <span class="block">more details here</span>\n            </td>\n            <td class="alignCenter">1<span class="block">Beds</span></td>\n            <td class="alignCenter">2<span class="block">Baths</span></td>\n            <td class="alignCenter">$1,500<span class="block">Monthly</span></td>\n        </tr>\n        <tr>\n            <td class="alignLeft">\n                Floor Plan Name\n                <span class="block">more details here</span>\n            </td>\n            <td class="alignCenter">1<span class="block">Beds</span></td>\n            <td class="alignCenter">2<span class="block">Baths</span></td>\n            <td class="alignCenter">$1,500<span class="block">Monthly</span></td>\n        </tr>\n        <tr>\n            <td class="alignLeft">\n                Floor Plan Name\n                <span class="block">more details here</span>\n            </td>\n            <td class="alignCenter">1<span class="block">Beds</span></td>\n            <td class="alignCenter">2<span class="block">Baths</span></td>\n            <td class="alignCenter">$1,500<span class="block">Monthly</span></td>\n        </tr>\n        <tr>\n            <td class="alignLeft">\n                Floor Plan Name\n                <span class="block">more details here</span>\n            </td>\n            <td class="alignCenter">1<span class="block">Beds</span></td>\n            <td class="alignCenter">2<span class="block">Baths</span></td>\n            <td class="alignCenter">$1,500<span class="block">Monthly</span></td>\n        </tr>\n        <tr>\n            <td class="alignLeft noBorder">\n                Floor Plan Name\n                <span class="block">more details here</span>\n            </td>\n            <td class="alignCenter noBorder">1<span class="block">Beds</span></td>\n            <td class="alignCenter noBorder">2<span class="block">Baths</span></td>\n            <td class="alignCenter noBorder">$1,500<span class="block">Monthly</span></td>\n        </tr>\n    </table>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/propertyMap.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="map" class="clearFix bgWhite">\n    <img src="/img/google-map.png" class="width100">\n    <a href="https://maps.google.com?q=' +
((__t = ( propertyAddress )) == null ? '' : __t) +
'" target="_blank" class="block right">Get Directions</a>\n    <p>' +
((__t = ( propertyAddress )) == null ? '' : __t) +
'</p>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/propertyReviews.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="reviews" class="bgWhite">\n    <p class="noBorder reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n    <p class="reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n    <p class="reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n    <p class="reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/searchBar.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<form action="/search" method="post" name="search" id="searchBar" class="relative block ' +
((__t = ( formClass )) == null ? '' : __t) +
' clearFix borderBox">\n    ' +
((__t = ( heading )) == null ? '' : __t) +
'\n    <fieldset class="relative clearFix">\n        <input type="text" name="keywords" placeholder="City, State or Zip Code" value="' +
((__t = ( keywords )) == null ? '' : __t) +
'" class="block width100 borderBox">\n        <div class="absolute">\n            <a id="advSearchBtn" class="block borderBox left"></a>\n            <button type="submit" class="block borderBox alignCenter left">Search</button>\n        </div>\n    </fieldset>\n</form>';

}
return __p
};

this["JST"]["src/js/templates/elements/searchResultsGroup.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


for(var s = 0; s < numBlocksToPrint; s++) {
    //Remove top padding from the first property
    var first = (s == 0) ? 'first' : '';
;
__p += '\n    <div class="basic select ' +
((__t = ( first )) == null ? '' : __t) +
'">\n        <div class="aspect_fill"></div>\n        <div class="element noOverflow" property="' +
((__t = ( selects[s].id )) == null ? '' : __t) +
'">\n            <img src="/img/listings/' +
((__t = ( selects[s].id )) == null ? '' : __t) +
'-1024.jpg" class="block width100">\n            <p class="desc fadingGradient width100 absolute whiteText">\n                <strong>' +
((__t = ( selects[s].name )) == null ? '' : __t) +
'</strong><br>\n                ' +
((__t = ( selects[s].location )) == null ? '' : __t) +
'<br>\n                ' +
((__t = ( selects[s].type )) == null ? '' : __t) +
'\n            </p>\n            <p class="price absolute whiteText">' +
((__t = ( selects[s].price )) == null ? '' : __t) +
'</p>\n        </div>\n    </div>\n';

    for(var p = 0; p < numPropertiesToPrint; p++) { 
;
__p += '\n        <div class="basic">\n            <div class="aspect_fill"></div>\n            <div class="element noOverflow" property="' +
((__t = ( properties[p].id )) == null ? '' : __t) +
'">\n                <img src="/img/listings/' +
((__t = ( properties[p].id )) == null ? '' : __t) +
'-612.jpg" class="block width100">\n                <p class="desc fadingGradient width100 absolute whiteText">\n                    <strong>' +
((__t = ( properties[p].name )) == null ? '' : __t) +
'</strong><br>\n                    ' +
((__t = ( properties[p].location )) == null ? '' : __t) +
'<br>\n                    ' +
((__t = ( properties[p].type )) == null ? '' : __t) +
'\n                </p>\n            </div>\n        </div>\n';

    }
} 
;


}
return __p
};

this["JST"]["src/js/templates/layouts/home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<section class="fixed noOverflow clearFix">\n';
 _.each(properties, function(property) { ;
__p += '\n    <div property="' +
((__t = ( property.id )) == null ? '' : __t) +
'" class="relative noOverflow property borderBox whiteText left pointer">\n        <img src="/img/listings/' +
((__t = ( property.id )) == null ? '' : __t) +
'-612.jpg" alt="' +
((__t = ( property.name )) == null ? '' : __t) +
'" class="block width100">\n        <p class="absolute width100 fadingGradient">\n            <strong>' +
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
__p += '<div id="gallery" class="fixed noOverflow"></div>\n<a id="swipeHorizArrow" class="block absolute safariHack"></a>\n<a id="swipeVertArrow" class="block absolute safariHack"></a>\n<section id="teaser" class="relative borderBox noOverflow">\n    <div class="info transWhite80">\n        <h2>' +
((__t = ( property.name )) == null ? '' : __t) +
'</h2>\n        <p class="clickable pointer" section="map">\n            ' +
((__t = ( property.address )) == null ? '' : __t) +
'<br>\n            <a href="http://maps.google.com?q=' +
((__t = ( property.address )) == null ? '' : __t) +
'" target="_blank">View Map &amp; Directions</a>\n        </p>\n        <p class="clickable pointer" section="floorplans">\n            ' +
((__t = ( property.type )) == null ? '' : __t) +
' for ' +
((__t = ( property.price )) == null ? '' : __t) +
'<br>\n            <a>View Floor Plans &amp; Prices</a>\n        </p>\n        <p class="clickable pointer" section="reviews">\n            <span id="webReview" class="block reviewStars">4 Reviews</span>\n            <a>View Reviews from the Web</a>\n        </p>\n        <p class="clickable pointer noBorder" section="details">\n            Details<br>\n            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet arcu pretium, placerat mauris sed, hendrerit eros. Curabitur sed fermentum justo. Pellentesque lobortis, orci ut porttitor luctus, nisi urna pharetra magna.</small>\n        </p>\n    </div>\n    <div class="buttons table width100">\n        <div class="tableRow">\n            <div class="tableCell"><button id="buttonCA" class="block noBorder whiteText width100 alignCenter">Check Availability</button></div>\n            <div id="buttonSpacer" class="tableCell"></div>\n            <div class="tableCell"><button class="block noBorder blackText width100 alignCenter transWhite80">1-800-555-0123</button></div>\n        </div>\n    </div>\n</section>\n<section id="more" class="relative borderBox noOverflow table width100 safariHack">\n    <div class="tableRow">\n        <div id="moreContent" class="tableCell vAlignTop">' +
((__t = ( moreContent )) == null ? '' : __t) +
'</div>\n        <div class="form tableCell vAlignTop">' +
((__t = ( guestCardForm )) == null ? '' : __t) +
'</div>\n    </div>\n</section>';

}
return __p
};

this["JST"]["src/js/templates/layouts/search.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="results"></div>\n';

}
return __p
};