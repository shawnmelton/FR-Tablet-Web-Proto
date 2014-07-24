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
__p += '\n                </select></div>\n                <div class="tableCell noPadRight"><select>\n                    <option value="">Apartment &amp; Community Amenities</option>\n                </select></div>\n            </div>\n        </div>\n        \n        <div class="table">\n            <div class="tableRow">\n                <div class="tableCell noPadLeft">\n                    ' +
((__t = ( apartmentAmenities )) == null ? '' : __t) +
'\n                </div>\n                <div class="tableCell noPadLeft">\n                    ' +
((__t = ( communityAmenities )) == null ? '' : __t) +
'\n                </div>\n                <div class="tableCell noPadLeft">\n                    ' +
((__t = ( petAmenities )) == null ? '' : __t) +
'\n                </div>\n                <div class="tableCell noPadLeft">\n                    ' +
((__t = ( propertyTypesAmenities )) == null ? '' : __t) +
'\n                </div>\n                <div class="tableCell noPadLeft">\n                    ' +
((__t = ( photosVideosAmenities )) == null ? '' : __t) +
'\n                </div>\n            </div>\n        </div>\n        <div class="buttons">\n            <button>Cancel</button> &nbsp;\n            <button class="blue">Apply</button>\n        </div>\n    </div>\n    <span></span>\n</div>';

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
__p += '<form id="guestCard" method="post" action="" class="height100">\n    <h3>Check Availability</h3>\n    <fieldset>\n        <input type="text" placeholder="Full Name" name="fullName" class="width100 borderBox">\n    </fieldset>\n    <fieldset>\n        <input type="text" placeholder="Email Address" name="emailAddress" class="width100 borderBox">\n    </fieldset>\n    <fieldset>\n        <input type="text" placeholder="Phone Number" name="phoneNumber" class="width100 borderBox">\n    </fieldset>\n    <fieldset>\n        <textarea placeholder="I am interested in more information about ' +
((__t = ( property.attributes.name )) == null ? '' : __t) +
'." name="comments" class="width100 borderBox"></textarea>\n    </fieldset>\n    <fieldset>\n        <button type="submit" class="width100 borderBox whiteText alignCenter">Check Availability</button>\n    </fieldset>\n</form>';

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

this["JST"]["src/js/templates/elements/optionsApartmentAmenities.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul id="apartmentAmenities" class="block-grid p20 searchAmenitiesContent">\n    <li>\n        <label class="unit flexUnit txtN" for="airconditioning">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="1" id="airconditioning">Air Conditioning</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="alarmsystem">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="2" id="alarmsystem">Alarm System</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="tv">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="7" id="tv">Cable or Satellite</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="ceilingfan">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="10" id="ceilingfan">Ceiling Fan</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="dishwasher">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="17" id="dishwasher">Dishwasher</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="extrastorage">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="20" id="extrastorage">Extra Storage</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="fireplace">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="21" id="fireplace">Fireplace</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="furnishedavailable">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="24" id="furnishedavailable">Furnished Available</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="hardwoodfloors">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="28" id="hardwoodfloors">Hardwood Floors</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="wwwhi">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="32" id="wwwhi">High Speed Internet Access</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="microwave">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="36" id="microwave">Microwave</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="patiorbalcony">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="37" id="patiorbalcony">Patio or Balcony</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="view">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="53" id="view">View</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="walkinclosets">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="54" id="walkinclosets">Walk-in Closets</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="washerdryerhook">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="55" id="washerdryerhook">Washer/Dryer Hookups</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="washerdryer">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="56" id="washerdryer">Washer/Dryer in Unit</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="wwwwire">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="87" id="wwwwire">Wireless Internet Access</label>\n    </li>\n</ul>\n';

}
return __p
};

this["JST"]["src/js/templates/elements/optionsCommunityAmenities.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul id="communityAmenities" class="block-grid  p20 searchAmenitiesContent">\n    <li>\n        <label class="unit flexUnit txtN" for="acceptscreditcardpayments">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="88" id="acceptscreditcardpayments">Accepts Credit Card Payments</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="acceptselectronicpayments">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="89" id="acceptselectronicpayments">Accepts Electronic Payments</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="attuverse">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="100" id="attuverse">AT&amp;T U-verse</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="businesscenter">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="6" id="businesscenter">Business Center</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="closetopublictrans">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="40" id="closetopublictrans">Close to Public Transportation</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="clubhouse">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="11" id="clubhouse">Clubhouse</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="controlledaccess">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="12" id="controlledaccess">Controlled Access</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="coveredparking">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="15" id="coveredparking">Covered Parking</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="disabilityaccess">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="16" id="disabilityaccess">Disability Access</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="doorattendant">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="98" id="doorattendant">Door Attendant</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="elevator">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="19" id="elevator">Elevator</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="fitnesscenter">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="22" id="fitnesscenter">Fitness Center</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="garages">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="25" id="garages">Garages</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="hablamosespanol">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="138" id="hablamosespanol">Hablamos Español</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="laundryfacility">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="33" id="laundryfacility">Laundry Facility</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="nosmoking">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="139" id="nosmoking">No Smoking</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="playground">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="39" id="playground">Playground</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="pool">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="59" id="pool">Pool</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="shorttermlease">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="43" id="shorttermlease">Short Term Lease</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="tenniscourts">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="48" id="tenniscourts">Tennis Courts</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="utilitiesincluded">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="140" id="utilitiesincluded">Utilities Included</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="verizonfios">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="101" id="verizonfios">Verizon FiOS</label>\n    </li>\n\n</ul>\n';

}
return __p
};

this["JST"]["src/js/templates/elements/optionsPetAmenities.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul id="petsAmenities" class="block-grid  p20 searchAmenitiesContent">\n    <li>\n        <label class="unit flexUnit txtN" for="catsallowed">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="9" id="catsallowed">Cats Allowed</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="smalldogsallowed">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="44" id="smalldogsallowed">Small Dogs Allowed</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="largedogsallowed">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="91" id="largedogsallowed">Large Dogs Allowed</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="petsallowed">\n            <input type="checkbox" name="amenities[]" class="unit mr5" value="38" id="petsallowed">Pets Allowed</label>\n    </li>\n</ul>\n';

}
return __p
};

this["JST"]["src/js/templates/elements/optionsPhotosVideosAmenities.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul id="photos-videosAmenities" class="block-grid  p20 searchAmenitiesContent borderBottom">\n    <li>\n        <label class="unit flexUnit txtN" for="multiplephotos">\n            <input type="checkbox" name="Has_Multiple_Photos" class="unit mr5" value="Has_Multiple_Photos" id="multiplephotos">Multiple Photos</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="streamingvideo">\n            <input type="checkbox" name="Has_Community_Theater" class="unit mr5" value="Has_Community_Theater" id="streamingvideo">Streaming Video</label>\n    </li>\n    <li>\n        <label class="unit flexUnit txtN" for="virtualtour">\n            <input type="checkbox" name="Has_VTour" class="unit mr5" value="Has_VTour" id="virtualtour">Virtual Tour</label>\n    </li>\n</ul>\n';

}
return __p
};

this["JST"]["src/js/templates/elements/optionsPropertyTypesAmenities.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul id="property-typesAmenities" class="block-grid  p20 searchAmenitiesContent">\n\n                    <li>\n                        <label class="unit flexUnit txtN" for="apartmentcondo">\n                            <input type="checkbox" name="propertyType[]" class="unit mr5" value="1,8" id="apartmentcondo">Apartment/Condo</label>\n                    </li>\n\n                    <li>\n                        <label class="unit flexUnit txtN" for="brownstone">\n                            <input type="checkbox" name="propertyType[]" class="unit mr5" value="92" id="brownstone">Brownstone</label>\n                    </li>\n\n                    <li>\n                        <label class="unit flexUnit txtN" for="co-op">\n                            <input type="checkbox" name="propertyType[]" class="unit mr5" value="94" id="co-op">Co-Op</label>\n                    </li>\n\n                    <li>\n                        <label class="unit flexUnit txtN" for="duplextriplex">\n                            <input type="checkbox" name="propertyType[]" class="unit mr5" value="4,5" id="duplextriplex">Duplex/Triplex</label>\n                    </li>\n\n                    <li>\n                        <label class="unit flexUnit txtN" for="efficiencystudio">\n                            <input type="checkbox" name="propertyType[]" class="unit mr5" value="6" id="efficiencystudio">Efficiency/Studio</label>\n                    </li>\n\n                    <li>\n                        <label class="unit flexUnit txtN" for="highrise">\n                            <input type="checkbox" name="propertyType[]" class="unit mr5" value="29" id="highrise">High Rise</label>\n                    </li>\n\n                    <li>\n                        <label class="unit flexUnit txtN" for="loft">\n                            <input type="checkbox" name="propertyType[]" class="unit mr5" value="10" id="loft">Loft</label>\n                    </li>\n\n                    <li>\n                        <label class="unit flexUnit txtN" for="lowrise">\n                            <input type="checkbox" name="propertyType[]" class="unit mr5" value="95" id="lowrise">Low Rise</label>\n                    </li>\n\n                    <li>\n                        <label class="unit flexUnit txtN" for="midrise">\n                            <input type="checkbox" name="propertyType[]" class="unit mr5" value="66" id="midrise">Mid Rise</label>\n                    </li>\n\n                    <li>\n                        <label class="unit flexUnit txtN" for="newconstruction">\n                            <input type="checkbox" name="propertyType[]" class="unit mr5" value="93" id="newconstruction">New Construction</label>\n                    </li>\n\n                    <li>\n                        <label class="unit flexUnit txtN" for="postwar">\n                            <input type="checkbox" name="propertyType[]" class="unit mr5" value="96" id="postwar">Post-War</label>\n                    </li>\n\n                    <li>\n                        <label class="unit flexUnit txtN" for="prewar">\n                            <input type="checkbox" name="propertyType[]" class="unit mr5" value="97" id="prewar">Pre-War</label>\n                    </li>\n\n                    <li>\n                        <label class="unit flexUnit txtN" for="singlefamilyhome">\n                            <input type="checkbox" name="propertyType[]" class="unit mr5" value="2" id="singlefamilyhome">Single Family Home</label>\n                    </li>\n\n                    <li>\n                        <label class="unit flexUnit txtN" for="townhouse">\n                            <input type="checkbox" name="propertyType[]" class="unit mr5" value="7" id="townhouse">Townhouse</label>\n                    </li>\n                </ul>';

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

this["JST"]["src/js/templates/elements/propertyAmenities.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="amenities" class="section">\n    <h2>Features & Amenities</h2>\n    <ul>\n    ';
 
    if(typeof features !== 'undefined') {
        for(i = 0; i < features.length; i++){ 
    ;
__p += '\n        <li>' +
((__t = ( features[i].name )) == null ? '' : __t) +
'</li>\n    ';
 
        } 
    } 
    ;
__p += '\n    </ul>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/propertyDetails.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="details" class="section">\n    <h2>Details</h2>\n    <table class="width100">\n        <tr>\n            <td class="name alignLeft vAlignMiddle">' +
((__t = ( name )) == null ? '' : __t) +
'</td>\n            <td class="alignCenter vAlignMiddle">' +
((__t = ( beds )) == null ? '' : __t) +
'<span class="block"> Beds</span></td>\n            <td class="alignCenter vAlignMiddle">2<span class="block">Baths</span></td>\n            <td class="alignCenter vAlignMiddle">' +
((__t = ( price.min )) == null ? '' : __t) +
' - ' +
((__t = ( price.max )) == null ? '' : __t) +
'<span class="block">Price</span></td>\n        </tr>\n    </table>\n    <p>' +
((__t = ( description )) == null ? '' : __t) +
'</p>\n    <ul>\n        <li><p class="pet_details">' +
((__t = ( pet_policy )) == null ? '' : __t) +
'</p></li>\n    </ul>\n    <ul>\n        <li>\n            <p class="hours">\n                Office Hours\n                <ul>\n                    <li>Monday - Friday 10am - 6pm</li>\n                </ul>\n            </p>\n        </li>\n    </ul>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/propertyFloorPlans.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="floorplans" class="section">\n    <h2>Floor Plans</h2>\n    ';
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
__p += '\n';
 console.log('Load Details'); ;
__p += '\n\n<div id="details" class="section">\n    <h2>Details</h2>\n    <table class="width100">\n        <tr>\n            <td class="name alignLeft vAlignMiddle">' +
((__t = ( property.name )) == null ? '' : __t) +
'</td>\n            <td class="alignCenter vAlignMiddle">1<span class="block">Beds</span></td>\n            <td class="alignCenter vAlignMiddle">2<span class="block">Baths</span></td>\n            <td class="alignCenter vAlignMiddle">$1,500<span class="block">Monthly</span></td>\n        </tr>\n    </table>\n    <p>Curabitur eleifend nisi lobortis, adipiscing mauris in, venenatis ipsum. Sed suscipit nisi ut tincidunt facilisis. Praesent ligula mi, cursus eu gravida nec, consequat id sapien. Vestibulum adipiscing quis mi quis mollis. In condimentum consequat felis, sit amet gravida massa elementum quis. Ut suscipit aliquet dolor, vitae laoreet nibh mollis non. Aenean diam justo, pretium et odio a, fermentum tempus metus.</p>\n    <ul>\n        <li><p class="pet_details">' +
((__t = ( property.attributes.pet_policy )) == null ? '' : __t) +
'</p></li>\n    </ul>\n    <ul>\n        <li>\n            <p class="hours">\n                Office Hours\n                <ul>\n                    <li>Monday - Friday 10am - 6pm</li>\n                </ul>\n            </p>\n        </li>\n    </ul>\n</div>\n\n';
 console.log('Load Floorplans'); ;
__p += '\n\n<div id="floorplans" class="section">\n    <h2>Floor Plans</h2>\n    ';
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
__p += '\n</div>\n\n';
 console.log('Load Amenities'); ;
__p += '\n\n<div id="amenities" class="section">\n    <h2>Features & Amenities</h2>\n    <ul>\n    ';
 
    if(typeof property.attributes.features !== 'undefined') {
        for(i = 0; i < property.attributes.features.length; i++){ 
    ;
__p += '\n        <li>' +
((__t = ( property.attributes.features[i].name )) == null ? '' : __t) +
'</li>\n    ';
 
        } 
    } 
    ;
__p += '\n    </ul>\n</div>\n\n';
 console.log('Load Reviews'); ;
__p += '\n\n<div id="reviews" class="section">\n    <h2>Reviews</h2>\n    <p class="noBorder reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n    <p class="reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n    <p class="reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n    <p class="reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n</div>\n\n';
 console.log('Load Map'); ;
__p += '\n\n<div id="map" class="clearFix section">\n    <h2>\n    Map\n    <a href="#!" id="buttonCA" class="block right">Send Me A Text!</a>\n    <a href="http://maps.apple.com/?daddr=' +
((__t = ( property.attributes.streetAddress )) == null ? '' : __t) +
',' +
((__t = ( property.attributes.city )) == null ? '' : __t) +
',' +
((__t = ( property.attributes.state )) == null ? '' : __t) +
' ' +
((__t = ( property.attributes.zip )) == null ? '' : __t) +
'" target="_blank" id="getDirectionsButton" class="block right">Get Directions</a>\n    </h2>\n    <div id="property-map"></div>\n    <p>' +
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
__p += '<div id="propertyManagement" class="moreInfoSection">\n\t<h3 class="sectionTitle">PROPERTY MANAGEMENT</h3>\n\t<h4 >Prudential Towne Realty</h4>\n\t<!-- <img src="" /> -->\n\t<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/propertyMap.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="map" class="clearFix section">\n    <h2>\n    Map\n    <a href="#!" id="buttonCA" class="block right">Send Me A Text!</a>\n    <a href="http://maps.apple.com/?daddr=' +
((__t = ( streetAddress )) == null ? '' : __t) +
',' +
((__t = ( city )) == null ? '' : __t) +
',' +
((__t = ( state )) == null ? '' : __t) +
' ' +
((__t = ( zip )) == null ? '' : __t) +
'" target="_blank" id="getDirectionsButton" class="block right">Get Directions</a>\n    </h2>\n    <div id="property-map"></div>\n    <p>' +
((__t = ( streetAddress )) == null ? '' : __t) +
',' +
((__t = ( city )) == null ? '' : __t) +
',' +
((__t = ( state )) == null ? '' : __t) +
' ' +
((__t = ( zip )) == null ? '' : __t) +
'</p>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/propertyReviews.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="reviews" class="section">\n    <h2>Reviews</h2>\n    <p class="noBorder reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n    <p class="reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n    <p class="reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n    <p class="reviewStars">\n        <strong class="block">Apartment is Fantastic</strong>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et lacinia orci. Etiam ac eros at ante gravida ultrices ut vel nibh. Donec dapibus luctus egestas. Praesent aliquet adipiscing nunc sit amet lacinia.\n        <span class="block">From Google Places</span>\n    </p>\n</div>';

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
__p += '<div class="lightbox">\n    <form id="sendToCell" method="post" action="" class="absoluteCenter height100">\n        <h3>Send Me A Text!</h3>\n        <fieldset>\n            <input type="tel" placeholder="Mobile Number" name="mobileNumber" class="width100 borderBox">\n        </fieldset>\n        <fieldset>\n            <button id="sendToCellButton" type="button" class="width100 borderBox whiteText alignCenter sendToCellButton">Send Now</button>\n        </fieldset>\n    </form>\n</div>';

}
return __p
};

this["JST"]["src/js/templates/elements/videoLightbox.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="video_lightbox">\n    <div class="video_container absoluteCenter">\n    \t<video id="video" preload="auto" controls>\n\t\t\t<source  width=\'600\' height=\'300\' src=\'' +
((__t = ( source )) == null ? '' : __t) +
'\'  />\n\t\t</video>\n    </div>\n    <a href="#!" class="close_button">CLOSE</a>\n</div>';

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
__p +=
((__t = ( lightbox )) == null ? '' : __t) +
'\n' +
((__t = ( videoLightbox )) == null ? '' : __t) +
'\n';
 if(typeof property.attributes.video !== 'undefined') { ;
__p += '\n<img src="/img/play_button.png" class="absoluteCenter" id="videoPlayButton" />\n';
 } ;
__p += '\n<div id="gallery" class="fixed noOverflow"></div>\n<a id="swipeHorizArrow" class="block absolute safariHack"></a>\n<section id="teaser" class="relative borderBox noOverflow">\n    <div class="info">\n        <h2>' +
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
'<br>\n            <a>View Floor Plans &amp; Prices</a>\n        </p>\n        <p class="clickable pointer" section="reviews">\n            <span id="webReview" class="block reviewStars">4 Reviews</span>\n            <a>View Reviews from the Web</a>\n        </p>\n    </div>\n</section>\n\n<section id="more" class="relative borderBox noOverflow table width100 safariHack">\n    <div class="tableRow">\n        <div id="moreContent" class="tableCell vAlignTop">\n            ' +
((__t = ( detailsSection )) == null ? '' : __t) +
'\n            ' +
((__t = ( amenitiesSection )) == null ? '' : __t) +
'\n            ' +
((__t = ( floorplansSection )) == null ? '' : __t) +
'\n            ' +
((__t = ( reviewsSection )) == null ? '' : __t) +
'\n            ' +
((__t = ( mapSection )) == null ? '' : __t) +
'\n        </div>\n        <div class="form relative tableCell vAlignTop">\n            ' +
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
__p += '<div id="gallery" class="fixed noOverflow"></div>\n<a id="swipeHorizArrow" class="block absolute safariHack"></a>\n<section id="teaser" class="relative borderBox noOverflow">\n    <div class="info">\n        <h2></h2>\n        <p class="clickable pointer" section="map"><a href="#!" target="_blank">View Map &amp; Directions</a></p>\n        <p class="clickable pointer" section="floorplans"><a>View Floor Plans &amp; Prices</a></p>\n        <p class="clickable pointer" section="reviews">\n            <span id="webReview" class="block reviewStars">4 Reviews</span>\n            <a>View Reviews from the Web</a>\n        </p>\n    </div>\n</section>';

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