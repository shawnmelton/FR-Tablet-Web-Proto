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

this["JST"]["src/js/templates/elements/communitySpotlight.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="communitySpotlight" class="moreInfoSection">\n\t<h3 class="sectionTitle">COMMUNITY SPOTLIGHT</h3>\n\t<video id="video" preload="auto" controls>\n\t\t<source  width=\'100%\' src=\'' +
((__t = ( video_source )) == null ? '' : __t) +
'\'  />\n\t</video>\n</div>';

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
__p += '<form id="guestCard" method="post" action="" class="height100">\n    <h3>Check Availability</h3>\n    <fieldset>\n        <input type="text" placeholder="Full Name" name="fullName" class="width100 borderBox">\n    </fieldset>\n    <fieldset>\n        <input type="text" placeholder="Email Address" name="emailAddress" class="width100 borderBox">\n    </fieldset>\n    <fieldset>\n        <input type="text" placeholder="Phone Number" name="phoneNumber" class="width100 borderBox">\n    </fieldset>\n    <fieldset>\n        <textarea placeholder="I am interested in more information about this property." name="comments" class="width100 borderBox"></textarea>\n    </fieldset>\n    <fieldset>\n        <button type="submit" class="width100 borderBox whiteText alignCenter">Check Availability</button>\n    </fieldset>\n</form>';

}
return __p
};

this["JST"]["src/js/templates/elements/large_marker.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class=\'marker large\'>\n\t<span class=\'img_container\'><img src=\'' +
((__t = ( image_src )) == null ? '' : __t) +
'\' /></span>\n\t<div>\n\t\t<h3>' +
((__t = ( property.name )) == null ? '' : __t) +
'</h3>\n\t\t<h5>' +
((__t = ( property.streetAddress )) == null ? '' : __t) +
', ' +
((__t = ( property.zip )) == null ? '' : __t) +
'</h5>\n\t\t<h6>' +
((__t = ( property.beds )) == null ? '' : __t) +
' Beds for ' +
((__t = ( property.price.min )) == null ? '' : __t) +
' - ' +
((__t = ( property.price.max )) == null ? '' : __t) +
'</h6>\n\t</div>\n\t<a href="#1">View Property</a>\n</span>';

}
return __p
};

this["JST"]["src/js/templates/elements/marker.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class=\'marker basic\'>\n    <span class=\'count\'>' +
((__t = ( count )) == null ? '' : __t) +
'</span>\n</span>';

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

this["JST"]["src/js/templates/elements/moreInfoPanel.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="basic select moreInfo" id="moreInfo" property="' +
((__t = ( propertyId )) == null ? '' : __t) +
'">\n\t<img src="/img/map_sample.png" />\n\t<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>\n\t<a href="#">View Property</a>\n\t<div class="aspect_fill"></div>\n</div>\n';

}
return __p
};

this["JST"]["src/js/templates/elements/photoLightbox.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="photo_lightbox">\n    <a href="#!" class="close_button">CLOSE</a>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/pmarker.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class=\'marker premier\'>\n\t<span class=\'img_container\'><img src=\'' +
((__t = ( image_src )) == null ? '' : __t) +
'\' /></span>\n\t<span class=\'marker basic\'><span class=\'count\'>' +
((__t = ( count )) == null ? '' : __t) +
'</span></span>\n</span>';

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
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="floorplans" class="bgWhite">\n    ';
 for(i = 0; i < floor_plans.length; i++){ ;
__p += '\n    <table class="width100">\n        <tr>\n            <td class="alignLeft">\n                ' +
((__t = ( floor_plans[i].name )) == null ? '' : __t) +
'\n                <a href="#" class="block">more details here</a>\n            </td>\n            <td class="alignCenter">' +
((__t = ( floor_plans[i].beds )) == null ? '' : __t) +
'<span class="block">Beds</span></td>\n            <td class="alignCenter">' +
((__t = ( floor_plans[i].baths )) == null ? '' : __t) +
'<span class="block">Baths</span></td>\n            <td class="alignCenter">' +
((__t = ( floor_plans[i].price_low )) == null ? '' : __t) +
'<span class="block">Monthly</span></td>\n        </tr>\n        <tr><td class="moredetails" colspan="4">More Details</td></tr>\n    </table>\n    ';
 } ;
__p += '\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/propertyGallery.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="propertyGallery" class="moreInfoSection">\n\t<h3 class="sectionTitle">PROPERTY GALLERY</h3>\n\t<div class="galleryPhotos">\n    ';
 
    var max_length = (images.length > 6) ? 6 : images.length;
    for(i = 0; i < max_length; i++){ ;
__p += '\n    \t<img src="' +
((__t = ( images[i] )) == null ? '' : __t) +
'" />\n    ';
 } ;
__p += '\n\t</div>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/propertyInfo.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h2>Details</h2>\n<div id="details" class="bgWhite">\n    <table class="width100">\n        <tr>\n            <td class="name alignLeft vAlignMiddle">' +
((__t = ( property.name )) == null ? '' : __t) +
'</td>\n            <td class="alignCenter vAlignMiddle">1<span class="block">Beds</span></td>\n            <td class="alignCenter vAlignMiddle">2<span class="block">Baths</span></td>\n            <td class="alignCenter vAlignMiddle">$1,500<span class="block">Monthly</span></td>\n        </tr>\n    </table>\n    <p>Curabitur eleifend nisi lobortis, adipiscing mauris in, venenatis ipsum. Sed suscipit nisi ut tincidunt facilisis. Praesent ligula mi, cursus eu gravida nec, consequat id sapien. Vestibulum adipiscing quis mi quis mollis. In condimentum consequat felis, sit amet gravida massa elementum quis. Ut suscipit aliquet dolor, vitae laoreet nibh mollis non. Aenean diam justo, pretium et odio a, fermentum tempus metus.</p>\n</div>\n<h2>Floor Plans</h2>\n<div id="floorplans" class="bgWhite">\n    ';
 for(i = 0; i < floor_plans.length; i++){ ;
__p += '\n    <table class="width100">\n        <tr>\n            <td class="alignLeft">\n                ' +
((__t = ( floor_plans[i].name )) == null ? '' : __t) +
'\n                <a href="#!" class="block moreDetailsButton">more details here</a>\n            </td>\n            <td class="alignCenter">' +
((__t = ( floor_plans[i].beds )) == null ? '' : __t) +
'<span class="block">Beds</span></td>\n            <td class="alignCenter">' +
((__t = ( floor_plans[i].baths )) == null ? '' : __t) +
'<span class="block">Baths</span></td>\n            <td class="alignCenter">' +
((__t = ( floor_plans[i].price_low )) == null ? '' : __t) +
'<span class="block">Monthly</span></td>\n        </tr>\n        <tr><td class="moreDetails" colspan="4">\n            <img src="' +
((__t = ( floor_plans[i].image )) == null ? '' : __t) +
'" />\n            <p>' +
((__t = ( floor_plans[i].description )) == null ? '' : __t) +
'</p>\n        </td></tr>\n    </table>\n    ';
 } ;
__p += '\n</div>\n<h2>Reviews</h2>\n<div id="reviews" class="bgWhite">\n    <p class="noBorder reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n    <p class="reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n    <p class="reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n    <p class="reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n</div>\n<h2>\nMap\n<a href="#!" id="buttonCA" class="block right">Send Me A Text!</a>\n<a href="http://maps.apple.com/?daddr=' +
((__t = ( property.attributes.streetAddress )) == null ? '' : __t) +
',' +
((__t = ( property.attributes.city )) == null ? '' : __t) +
',' +
((__t = ( property.attributes.state )) == null ? '' : __t) +
' ' +
((__t = ( property.attributes.zip )) == null ? '' : __t) +
'" target="_blank" id="getDirectionsButton" class="block right">Get Directions</a>\n</h2>\n<div id="map" class="clearFix bgWhite">\n    <div id="property-map"></div>\n    <p>' +
((__t = ( property.attributes.streetAddress )) == null ? '' : __t) +
',' +
((__t = ( property.attributes.city )) == null ? '' : __t) +
',' +
((__t = ( property.attributes.state )) == null ? '' : __t) +
' ' +
((__t = ( property.attributes.zip )) == null ? '' : __t) +
'</p>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/propertyManagement.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="propertyManagement" class="moreInfoSection">\n\t<h3 class="sectionTitle">PROPERTY MANAGEMENT</h3>\n\t<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>\n</div>';

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
__p += '<div class="page">\n';

for(var s = 0; s < numBlocksToPrint && selects; s++) {
    if(!selects[s]) break;
    //Remove top padding from the first property
    var first = (s == 0) ? 'first' : '';
;
__p += '\n    <div class="basic select ' +
((__t = ( first )) == null ? '' : __t) +
'">\n        <div class="aspect_fill"></div>\n        <div class="element noOverflow hasTransition" property="' +
((__t = ( selects[s].attributes.homesId )) == null ? '' : __t) +
'">\n            <a href="#" class="cardButton details"><img src="/img/details_icon.png" /></a>\n            <a href="#" class="cardButton contact"><img src="/img/contact_icon.png" /></a>\n            <div class="front">\n                <img src="' +
((__t = ( selects[s].attributes.primaryImage )) == null ? '' : __t) +
'" class="block width100">\n                <div class="blurImageContainer">\n                    <img src="' +
((__t = ( selects[s].attributes.primaryImage )) == null ? '' : __t) +
'" class="block width100">\n                    <p class="desc width100 absolute whiteText">\n                        <strong>' +
((__t = ( selects[s].attributes.name )) == null ? '' : __t) +
'</strong><br>\n                        ' +
((__t = ( selects[s].attributes.streetAddress )) == null ? '' : __t) +
',' +
((__t = ( selects[s].attributes.city )) == null ? '' : __t) +
'\n                    </p>\n                    <p class="price absolute whiteText">' +
((__t = ( selects[s].attributes.price.max )) == null ? '' : __t) +
' - ' +
((__t = ( selects[s].attributes.price.min )) == null ? '' : __t) +
'\n                    </p>\n                </div>\n            </div>\n            <div class="back">\n                <form>\n                    <input type="text" value="Name" placeholder="Name"/>\n                    <input type="text" value="Email" placeholder="Email"/>\n                    <input type="text" value="Phone" placeholder="Phone"/>\n                    <textarea>Question/Comments</textarea>\n                </form>\n                <a class="ca_button" href="#">Check Availability</a>\n            </div>\n        </div>\n    </div>\n';

    for(var p = 0; p < numPropertiesToPrint && properties; p++) {
        var trueIndex = p + s*numPropertiesToPrint;
        if(!properties[trueIndex]) break;
;
__p += '\n        <div class="basic">\n            <div class="aspect_fill"></div>\n            <div class="element noOverflow hasTransition" property="' +
((__t = ( properties[trueIndex].attributes.homesId )) == null ? '' : __t) +
'">\n            <a href="#" class="cardButton details"><img src="/img/details_icon.png" /></a>\n            <a href="#" class="cardButton contact"><img src="/img/contact_icon.png" /></a>\n                <div class="front">\n                    <img src="' +
((__t = ( properties[trueIndex].attributes.primaryImage )) == null ? '' : __t) +
'" class="block width100">\n                    <div class="blurImageContainer">\n                        <img src="' +
((__t = ( properties[trueIndex].attributes.primaryImage )) == null ? '' : __t) +
'" class="block width100">                    <p class="desc width100 absolute whiteText">\n                        <strong>' +
((__t = ( properties[trueIndex].attributes.name )) == null ? '' : __t) +
'</strong><br>\n                        ' +
((__t = ( properties[trueIndex].attributes.streetAddress )) == null ? '' : __t) +
',' +
((__t = ( properties[trueIndex].attributes.city )) == null ? '' : __t) +
'\n                    </p>\n                    <p class="price absolute whiteText">' +
((__t = ( properties[trueIndex].attributes.price.max )) == null ? '' : __t) +
' - ' +
((__t = ( properties[trueIndex].attributes.price.min )) == null ? '' : __t) +
'\n                    </p>\n                    </div>\n                </div>\n                <div class="back">\n                    <ul>\n                        <li>Brand New Floorplans</li>\n                        <li>Resort Style Pool</li>\n                        <li>Stainless Steel Appliances</li>\n                        <li>In-Home Washer &amp; Dryer</li>\n                        <li>Private Pier w/ Access to Canoes, Kayaks, &amp; Fishing</li>\n                        <li>21st Century Kitchens with Granite Countertops</li>\n                    </ul>\n                    <a class="ca_button" href="#">Check Availability</a>\n                </div>\n            </div>\n        </div>\n';

    }
} 
;
__p += '\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/searchResultsGroupPlaceholder.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="results_placeholder">\n    <div class="basic select">\n        <div class="aspect_fill"></div>\n        <div class="element noOverflow hasTransition">\n            <div class="front"></div>\n            <div class="back"></div>\n        </div>\n    </div>\n\n    <div class="basic">\n        <div class="aspect_fill"></div>\n        <div class="element noOverflow hasTransition">\n            <div class="front"></div>\n            <div class="back"></div>\n        </div>\n    </div>\n\n    <div class="basic">\n        <div class="aspect_fill"></div>\n        <div class="element noOverflow hasTransition">\n            <div class="front"></div>\n            <div class="back"></div>\n        </div>\n    </div>\n\n    <div class="basic">\n        <div class="aspect_fill"></div>\n        <div class="element noOverflow hasTransition">\n            <div class="front"></div>\n            <div class="back"></div>\n        </div>\n    </div>\n\n    <div class="basic">\n        <div class="aspect_fill"></div>\n        <div class="element noOverflow hasTransition">\n            <div class="front"></div>\n            <div class="back"></div>\n        </div>\n    </div>\n\n        <div class="basic select">\n        <div class="aspect_fill"></div>\n        <div class="element noOverflow hasTransition">\n            <div class="front"></div>\n            <div class="back"></div>\n        </div>\n    </div>\n\n    <div class="basic">\n        <div class="aspect_fill"></div>\n        <div class="element noOverflow hasTransition">\n            <div class="front"></div>\n            <div class="back"></div>\n        </div>\n    </div>\n\n    <div class="basic">\n        <div class="aspect_fill"></div>\n        <div class="element noOverflow hasTransition">\n            <div class="front"></div>\n            <div class="back"></div>\n        </div>\n    </div>\n\n    <div class="basic">\n        <div class="aspect_fill"></div>\n        <div class="element noOverflow hasTransition">\n            <div class="front"></div>\n            <div class="back"></div>\n        </div>\n    </div>\n\n    <div class="basic">\n        <div class="aspect_fill"></div>\n        <div class="element noOverflow hasTransition">\n            <div class="front"></div>\n            <div class="back"></div>\n        </div>\n    </div>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/sendToCellForm.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<form id="sendToCell" method="post" action="" class="absoluteCenter height100">\n    <h3>Send Me A Text!</h3>\n    <fieldset>\n        <input type="tel" placeholder="Mobile Number" name="mobileNumber" class="width100 borderBox">\n    </fieldset>\n    <fieldset>\n        <button id="sendToCellButton" type="button" class="width100 borderBox whiteText alignCenter sendToCellButton">Send Now</button>\n    </fieldset>\n</form>';

}
return __p
};

this["JST"]["src/js/templates/elements/videoLightbox.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="video_lightbox">\n    <div class="video_container absoluteCenter">\n    \t<video id="video" preload="auto" controls>\n\t\t\t<source  width=\'600\' height=\'300\' src=\'/video/video_medium.m4v\'  />\n\t\t</video>\n    </div>\n    <a href="#!" class="close_button">CLOSE</a>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/layouts/home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<section class="fixed noOverflow clearFix">\n';
 
	var i = 0;
	_.each(properties, function(property) { 
;
__p += '\n    <div property="' +
((__t = ( property.attributes.homesId )) == null ? '' : __t) +
'" class="relative noOverflow property borderBox whiteText left pointer">\n    \t' +
((__t = ( (i==1) ? '<img src="/img/play_button.png" class="absoluteCenter playButton" />' : '' )) == null ? '' : __t) +
'\n        <img src="' +
((__t = ( property.attributes.primaryImage )) == null ? '' : __t) +
'" alt="' +
((__t = ( property.attributes.name )) == null ? '' : __t) +
'" class="block width100">\n        <p class="absolute width100 fadingGradient">\n            <strong>' +
((__t = ( property.attributes.name )) == null ? '' : __t) +
'</strong><br>\n            ' +
((__t = ( property.attributes.location )) == null ? '' : __t) +
'<br>\n            ' +
((__t = ( property.attributes.type )) == null ? '' : __t) +
'\n        </p>\n    </div>\n';
	
	i++;
	}); 
;
__p += '\n</section>';

}
return __p
};

this["JST"]["src/js/templates/layouts/property.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="gallery" class="fixed noOverflow"></div>\n<a id="swipeHorizArrow" class="block absolute safariHack"></a>\n<section id="teaser" class="relative borderBox noOverflow">\n    <div class="info">\n        <h2>' +
((__t = ( property.attributes.name )) == null ? '' : __t) +
'</h2>\n        <p class="clickable pointer" section="map">\n            ' +
((__t = ( property.attributes.streetAddress )) == null ? '' : __t) +
' ' +
((__t = ( property.attributes.city )) == null ? '' : __t) +
', ' +
((__t = ( property.attributes.state )) == null ? '' : __t) +
'' +
((__t = ( property.attributes.zip )) == null ? '' : __t) +
'<br>\n            <a href="http://maps.google.com?q=' +
((__t = ( property.address )) == null ? '' : __t) +
'" target="_blank">View Map &amp; Directions</a>\n        </p>\n        <p class="clickable pointer" section="floorplans">\n            ' +
((__t = ( property.attributes.beds )) == null ? '' : __t) +
' Beds for ' +
((__t = ( property.attributes.price.min )) == null ? '' : __t) +
' - ' +
((__t = ( property.attributes.price.max )) == null ? '' : __t) +
'<br>\n            <a>View Floor Plans &amp; Prices</a>\n        </p>\n        <p class="clickable pointer" section="reviews">\n            <span id="webReview" class="block reviewStars">4 Reviews</span>\n            <a>View Reviews from the Web</a>\n        </p>\n        ';
 if(property.attributes.video.length) { ;
__p += '\n        <div class="clickable pointer" section="video">\n            <div class="video_thumb" style="background-image: url(' +
((__t = ( property.attributes.images[2] )) == null ? '' : __t) +
')">\n                <img src="/img/play_button.png" />\n            </div>\n        </div>\n        ';
 } ;
__p += '\n    </div>\n</section>\n\n<section id="more" class="relative borderBox noOverflow table width100 safariHack">\n    <div class="tableRow">\n        <div id="moreContent" class="tableCell vAlignTop">' +
((__t = ( moreContent )) == null ? '' : __t) +
'</div>\n        <div class="form relative tableCell vAlignTop">\n            ' +
((__t = ( guestCardForm )) == null ? '' : __t) +
'\n            ' +
((__t = ( communitySpotlight )) == null ? '' : __t) +
'\n            ' +
((__t = ( propertyGallery )) == null ? '' : __t) +
'\n            ' +
((__t = ( propertyManagement )) == null ? '' : __t) +
'\n            ' +
((__t = ( officeHours )) == null ? '' : __t) +
'\n            ' +
((__t = ( petPolicy )) == null ? '' : __t) +
'\n        </div>\n    </div>\n</section>';

}
return __p
};

this["JST"]["src/js/templates/layouts/propertyPlaceholder.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="gallery" class="fixed noOverflow"></div>\n<a id="swipeHorizArrow" class="block absolute safariHack"></a>\n<section id="teaser" class="relative borderBox noOverflow">\n    <div class="info">\n        <h2></h2>\n        <p class="clickable pointer" section="map"><a href="#!" target="_blank">View Map &amp; Directions</a></p>\n        <p class="clickable pointer" section="floorplans"><a>View Floor Plans &amp; Prices</a></p>\n        <p class="clickable pointer" section="reviews">\n            <span id="webReview" class="block reviewStars">4 Reviews</span>\n            <a>View Reviews from the Web</a>\n        </p>\n        <div class="clickable pointer" section="video">\n            <div class="video_thumb">\n                <img src="/img/play_button.png" />\n            </div>\n        </div>\n        <p class="clickable pointer noBorder" section="details">\n            Details<br>\n            <small></small>\n        </p>\n    </div>\n    <div class="buttons table width100">\n        <div class="tableRow">\n            <div class="tableCell"><button id="buttonCA" class="block noBorder whiteText width100 alignCenter">Check Availability</button></div>\n        </div>\n    </div>\n</section>';

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