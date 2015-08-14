// Just a container for functions
var Flickr = {};

(function() {
    var key = '4773c07893dbd1fa7b4574b9d7154f85',
        ajax_url = 'http://api.flickr.com/services/rest/',
        image_url = 'http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}{size}.jpg';

    var size = {
        'small': '_q',
        'medium': '',
        'large': '_c'
    };

    // Get the url for the object specified
    function getUrl(obj, img_size) {
        return image_url.replace('{farm-id}', obj.farm)
            .replace('{server-id}', obj.server)
            .replace('{id}', obj.id)
            .replace('{secret}', obj.secret)
            .replace('{size}', size[img_size || 'medium']);
    }

    // Given set data, add the images to the correct element
    function processPhotoset(data) {
        var photos = data.photo,
            elem = $('.flickr[data-type="set"][data-id="' + data.id + '"]');
        
        var url = getUrl(photos[0], elem.attr('data-size'));

        elem.prepend('<img src="' + url + '" />');

        Galleria.loadTheme(STATIC_URL + 'js/galleria/themes/classic/galleria.classic.js');

        var flickr = new Galleria.Flickr();
        flickr.set($(elem).attr('data-id'), function(data) {
            Galleria.run($(elem).children('div'), {
                dataSource: data,
                height: 480,
                extend: function() {
                    var gallery = this;
                    $(elem).click(function() {
                        gallery.openLightbox();
                    });
                },
                flickrOptions: {
                    description: true
                }
            });
        });

        elem.prepend('<span class="icon"><i class="icon-fullscreen"></i></span>');
    }

    // Given photo data, add the image to the correct element
    function processPhoto(data) {
        var id = data.id,
            elem = $('.flickr[data-type="photo"][data-id="' + id + '"]');

        var url = getUrl(data, elem.attr('data-size'));

        $(elem).prepend('<img src="' + url + '" />');
    }

    // Wrapper around jQuery's ajax function
    function get(data) {
        $.ajax({
            'url': ajax_url,
            'data': data,
            'dataType': 'jsonp',
            'jsonp': false
        });
    }

    // Fetch information of a set given the id
    Flickr.getAlbumSetById = function(id) {
        var method = 'flickr.photosets.getPhotos';

        get({ 'api_key': key, format: 'json', 'method': method, 'photoset_id': id });
    };

    // Fetch information of a photo given the id
    Flickr.getPhotoById = function(id) {
        var method = 'flickr.photos.getInfo';

        get({ 'api_key': key, format: 'json', 'method': method, 'photo_id': id });
    };

    // Flickr expects the callback to be available globally
    window.jsonFlickrApi = function(data) {
        if(data.hasOwnProperty('photoset')) {
            processPhotoset(data.photoset);
        }

        if(data.hasOwnProperty('photo')) {
            processPhoto(data.photo);
        }
    };
}());

// Find all flickers and get their data-type attribute
// If the attribute is "set", then get the set by the data-id attribute
// If the attribute is "photo", then get the photo by the data-id attribute
$(document).ready(function() {
    var flickrs = $('.flickr');

    $.each(flickrs, function(idx, elem) {
        if($(elem).attr('data-type') === 'set') {
            Flickr.getAlbumSetById($(elem).attr('data-id'));
        }

        if($(elem).attr('data-type') === 'photo') {
            Flickr.getPhotoById($(elem).attr('data-id'));
        }
    });
});
