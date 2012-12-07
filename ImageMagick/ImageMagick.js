/**
 * Image Magick Class
 * 
 * @category ImageMagick
 * @package ImageMagick
 * @author Michael Kramer
 */

var ImageMagick_Image = require('./Image');
var ImageMagick_Filter = require('./Filter');
var atob = require('atob');

var btoa = require('btoa');

var fs = require('fs')


cli = require('../imagemagick');


ImageMagick = function(){
    IMAGE_MAGICK_FILTER_POINT       = new ImageMagick_Filter('Point');
    IMAGE_MAGICK_FILTER_BOX         = new ImageMagick_Filter('Box');
    IMAGE_MAGICK_FILTER_TRIANGLE    = new ImageMagick_Filter('Triangle');
    IMAGE_MAGICK_FILTER_HERMITE     = new ImageMagick_Filter('Hermite');
    IMAGE_MAGICK_FILTER_GUASSIAN    = new ImageMagick_Filter('Gaussian');
    IMAGE_MAGICK_FILTER_QUADRATIC   = new ImageMagick_Filter('Quadratic');
    IMAGE_MAGICK_FILTER_CUBIC       = new ImageMagick_Filter('Cubic');
    IMAGE_MAGICK_FILTER_CATROM      = new ImageMagick_Filter('Catrom');
    IMAGE_MAGICK_FILTER_MITCHELL    = new ImageMagick_Filter('Mitchell');
    IMAGE_MAGICK_FILTER_LANCZOS     = new ImageMagick_Filter('Lanczos');
    IMAGE_MAGICK_FILTER_BLACKMAN    = new ImageMagick_Filter('Blackman');
    IMAGE_MAGICK_FILTER_HANNING     = new ImageMagick_Filter('Hanning');
    IMAGE_MAGICK_FILTER_HAMMING     = new ImageMagick_Filter('Hamming');
    IMAGE_MAGICK_FILTER_KAISER      = new ImageMagick_Filter('Kaiser');
    IMAGE_MAGICK_FILTER_BARTLETT    = new ImageMagick_Filter('Bartlett');
    IMAGE_MAGICK_FILTER_PARZEN      = new ImageMagick_Filter('Parzen');
    IMAGE_MAGICK_FILTER_WELSH       = new ImageMagick_Filter('Welsh');
    IMAGE_MAGICK_FILTER_BOHMAN      = new ImageMagick_Filter('Bohman');
    
    return {
        /**
         * ImageMagick_Image
         */
        image: null,
        
        /**
         * Read image from file path
         * 
         * @param string filename
         */
        readImage: function(path, onLoad){
            this.readImageBinary(fs.readFileSync(path, 'binary'), onLoad);
        },

        /**
         * Read image from binary
         * 
         * @param binary binary
         */
        readImageBinary: function(binary, onLoad){
            
            this.image = ImageMagick_Image.create();
            this.image.file.binary = binary;
            
            this.image.onFileProperties(function(err, properties, image){
                if(!err){
                    var type = properties.format;
                    image.data_url_prefix = 'data:image/' + type.toLowerCase();
                    image.data_url = image.data_url_prefix + ';base64,' + btoa(image.file.binary);
                    if(typeof(onLoad) != 'undefined'){
                        onLoad(image);
                    }
                }
            });
            
            this.identify();
            
        },

        /**
         * Read from a data url
         * data:image/png;base64,
         * Only supports base64
         * 
         * @param string data_url
         */
        readImageDataUrl: function(data_url, onLoad){
            // convert base64 to raw binary data held in a string
            // doesn't handle URLEncoded DataURIs
            var binary = atob(data_url.split(',')[1]);
            
            var prefix = data_url.split(';')[0];
            
            this.image = ImageMagick_Image.create();
            this.image.file.binary = binary;
            this.image.data_url = data_url;
            this.image.data_url_prefix = prefix;
            
            
            this.image.onFileProperties(function(err, properties){
                if(!err){
                    im.image.width = properties.width;
                    im.image.height = properties.height;
                    im.image.file_properties = properties;
                    if(typeof(onLoad) != 'undefined'){
                        onLoad(im.image);
                    }
                }
            });
            
            this.identify();
            
        },

        /**
         * 
         */
        resizeImage: function(width, height, filter, blur, callback){
            im = this;
            var result = cli.resize({
                srcData: this.image.file.binary,
                width: width,
                height: height,
                filter: filter.filter
              }, function(err, stdout){
                  im.image.binary = stdout;
                  im.image.data_url = im.image.data_url_prefix + ';base64,' + btoa(stdout);
                  if('undefined' != typeof callback){
                    callback();
                  }
            });
        },
        
        /**
         * 
         */
        cropImage: function(width, height, x, y, callback){
            
            console.log ('beginning crop');
            cli.crop({
                srcData: this.image.file.binary,
                width: width,
                height: height,
                x: x,
                y: y
              }, function(err, stdout){
                  im.image.binary = stdout;
                  im.image.data_url = im.image.data_url_prefix + ';base64,' + btoa(stdout);
                  if('undefined' != typeof callback){
                    callback();
                  }
            });
        },
        
        identify: function(){
            var im = this;
            cli.identify({
                data: this.image.file.binary
            }, function(err, features){
                im.image._onFileProperties(err, features);
            });
        },
        
        /**
         * Write image out
         */
        writeImage: function(path){
            
        }
    };
}

module.exports = ImageMagick;