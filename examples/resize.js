/**
 *
 * @category
 * @package
 * @author Michael Kramer
 * @copyright siosphere.com
 */



var ImageMagick = require('../ImageMagick/ImageMagick');

im = new ImageMagick();

/*im.readImageDataUrl('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==', function(image){
    src_width = image.width;
    src_height = image.height;

    new_width = 10;
    new_height = 10;

    im.resizeImage(new_width, new_height, IMAGE_MAGICK_FILTER_LANCZOS, 0, function(){
        im.resizeImage(50, 50, IMAGE_MAGICK_FILTER_LANCZOS, 0, function(){
            console.log(image.data_url);
        });
    });
});*/


im.readImage('/Users/kramer/Documents/node-imagemagick/examples/blue-bottle-coffee.jpg', function(image){
    src_width = image.width;
    src_height = image.height;

    new_width = 100;
    new_height = 10;
    
    var x =0;
    var y = 10;

    im.cropImage(new_width, new_height, x, y, function(){
        /*im.resizeImage(50, 50, IMAGE_MAGICK_FILTER_LANCZOS, 0, function(){
            console.log(image.data_url);
        });*/
        console.log(image.data_url);
    });
});
