/**
 * Image class
 * 
 * @category
 * @package
 * @author Michael Kramer
 * @copyright siosphere.com
 */


ImageMagick_Image = {
    
    /**
     * File Data
     */
    file: {
        name: null,
        path: null,
        binary: null,
        data_url: null
    },
    
    width: null,
    height: null,
    _onFilePropertiesCallbacks: [],
    onFileProperties: function(callback){
        this._onFilePropertiesCallbacks.push(callback);
    },
    _onFileProperties: function(err, features){
        var image = this;
        this._onFilePropertiesCallbacks.forEach(function(callback){
            callback(err, features, image);
        });
    }
};

module.exports = {
    create: function(){
        return ImageMagick_Image;
    }
};