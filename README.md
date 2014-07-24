ForRent.com Tablet Experience Prototype
=========

This is a tablet specific version of the ForRent.com site that aims to take advantage of features such as

  - A large, high-resolution screen, perfect for full-screen images
  - Touch gestures for ease of navigation
  - Geo-location for customized search results

![Tablet Screenshot](http://i.imgur.com/1I5bnLk.png)

Below you'll find a description of the Vision, Technology, and Structure of the current iteration of the prototype.  This is meant to provide a springboard into a full-fledged, fully-responsive site.


Vision
-----------

Tablet usage is soaring and no one in our space and created an experience that really capitalizes on the many great features tablets offer.

Tech
-----------

The prototype uses a number of open source projects to work properly:

* [Require.js] - a JavaScript file and module loader
* [Backbone.js] - gives structure to web applications
* [SASS] - a professional grade CSS extension language
* [JST] - ''JavaScript Templates'' for template-based programming
* [Grunt] - The JavaScript Task Runner
* [FTP-Deploy] - Grunt task for code deployment over ftp
* [jQuery] - :) 

CSS, Js, HTML, and most IMGs are compressed and minified all into one index.html file and placed in the `/dist folder`.


Structure
--------------

The vast majority of the application code is found in the `/src` folder, inside which you'll find the following structure:

#####/css _(SASS files prefixed by "_")
#####/img _(Some site images)_
#####/js
 - /collections
 - /libs
 - /models
 - /templates _(Here lies all HTML)_
 - /tools
 - /views _(Here lies most of the application logic)_
  - /elements
    - /options _(for use in Adv Search)_
    - /property
    - /search
  - /layouts _(Main layouts: Home, Search, Property)_
 - app.js
 - boostrap.js
 - router.js

*****If a file is not in an individual folder, then it is used for multiple views

#### Home
 * Search
 * Featured Properties
 * Video Lightbox

#### Search Results (List/Map View)
 * Full Interactive Map 
 * Search Resulst Group (Cards)


#### Property Profile `(/js/views/property.js)`
The various components of the property view are loaded in `/js/views/elements/propertyView.js`.
 * Property Info
 * Main Gallery
 * Video Lightbox
 * Photo Lightbox
 * **Below The Fold**
    * Details
    * Features
    * Floorplans
    * Reviews
    * Map
    * Guestcard Form
    * Mini Video Player (Community Spotlight)
    * Mini Photo Gallery
    * Property Management

### Current Bugs/Quirks

#### Advanced Search
The various facets are not implemented in the [Middle-man API] at this point.  See that link as well as `/api.php` in this project to make these changes.

#### Search Results Paging
Curently, there is no mechanism for proper dequeing and pagination of the search results/cards on the Search/Map view.  The desire is to be able to use Infinite Scroll to return pages of content that, when scrolled far enough out of the viewport, will unload and free up resources.  Also, the desire is to include functionality that allows a user to hit a 'Back' button on the profile page and return to the search page at the same page and property as before

#### Mini Gallery Sync with Photo Lightbox on Profile page
The mini photo gallery below the fold on the profile page will activate the Photo lightbox with the selected image, **if loaded**. The photos are loaded lazily, so if the user chooses a photo from this gallery beyond what is loaded, the lightbox does not appear.

#### Reviews
These are not from live data

[Require.js]:http://requirejs.org/
[Backbone.js]:http://backbonejs.org/
[SASS]:http://sass-lang.com/
[JST]:https://code.google.com/p/trimpath/wiki/JavaScriptTemplates
[Grunt]:http://gruntjs.com/
[FTP-Deploy]:https://github.com/zonak/grunt-ftp-deploy
[jQuery]:http://jquery.com/
[Middle-man API]:https://github.com/shawnmelton/FR-Tablet-Proto-API