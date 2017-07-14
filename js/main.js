var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');

var photo_canvas = document.getElementById('photo_canvas');
var photo_ctx = photo_canvas.getContext('2d');

var bg_canvas = document.getElementById('bg_canvas');
var bg_ctx = bg_canvas.getContext('2d');

var author_color;
// file reader
var reader;
var cover_photo = new Image();

// default properties of the book cover photo 
var cover_properties = {
    x: 0,
    y: 0,
    width: 500,
    height: 533
};

file_input = document.getElementById("file_input");
file_input.onchange = function() {
    load_cover(reader, cover_photo);
    update_cover(cover_photo, photo_canvas, photo_ctx, cover_properties['x'], cover_properties['y'],
                        cover_properties['width'], cover_properties['height']);
};

function update(ctx, canvas) {
    // updates the following at 60fps 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_template();
    draw_author(ctx, author_color);
    draw_title(ctx);
}

function scale_image(photo_canvas, photo_ctx) {
    // width/height HTML ranges call this function 
    // to scale the image
    width = document.getElementById("width_range").value;
    height = document.getElementById("height_range").value;

    cover_properties['width'] = 10 * width;
    cover_properties['height'] = 10 * height;

    update_cover(cover_photo, photo_canvas, photo_ctx, cover_properties['x'], cover_properties['y'],
        cover_properties['width'], cover_properties['height']);
}

function translate_image(canvas, photo_ctx) {
    // x/y HTML ranges call this function 
    // to move the image
    var x = document.getElementById("x_range").value;
    var y = document.getElementById("y_range").value;

    cover_properties['x'] = 10 * x;
    cover_properties['y'] = -(5 * y);

    update_cover(cover_photo, photo_canvas, photo_ctx, cover_properties['x'], cover_properties['y'],
        cover_properties['width'], cover_properties['height']);
}

function load_cover(reader, cover_photo) {
    var file = document.querySelector('input[type=file]').files[0];
    reader = new FileReader();    

    reader.onloadend = function() {
        cover_photo.src = reader.result;
        if (cover_photo.width > 1500 || cover_photo.height > 1500) {
            Materialize.toast('Warning: Large image files may be slow to manipulate!', 4000);
        }
    };    

    if (file) {
        if (file.type == 'image/jpeg' || file.type == 'image/png') {
            reader.readAsDataURL(file);
        } else {
            Materialize.toast(file.type + ' file type not accepted!', 4000);
            file = null;
        }
    }
}

function update_cover(cover_photo, photo_canvas, photo_ctx, x, y, width, height) {
    photo_ctx.clearRect(0, 0, photo_canvas.width, photo_canvas.height);
    photo_ctx.drawImage(cover_photo, x, y, width, height);

    cover_photo.onload = function() {
        photo_ctx.drawImage(this, x, y, width, height);
    };
}

function draw_template() {
    // draws the base template
    var ctx = document.getElementById('bg_canvas').getContext('2d');
    var template = new Image();
    template.onload = function() {
        ctx.drawImage(this, 0, 0, 500, 775);
    };

    template.src = 'template.png';
}

function change_author_color(color) {
    author_color = color;
}

function draw_author(ctx, author_color) {
    author = document.getElementById("author").value;

    ctx.font = '32px FuturaPTW01-Book';
    if (author.length > 15) {
        ctx.font = '26px FuturaPTW01-Book';
    }
    if (author.length > 30) {
        ctx.font = '20px FuturaPTW01-Book';
    }

    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = author_color;
    ctx.textAlign = 'center'
    ctx.fillText(author, canvas.width / 2, 651);
}

function draw_title(ctx) {
    title = document.getElementById("title").value;

    ctx.font = '24px MrsEavesItalic';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center'
    ctx.fillText(title, canvas.width / 2, 700);
}

function download_canvas(bg_canvas, photo_canvas, canvas) {
    // create a canvas (dl_canvas) that merges all three canvases 
    // into one then converts it to an image/png 
    var dl_canvas = document.getElementById('dl_canvas');
    var dl_ctx = dl_canvas.getContext('2d');

    dl_ctx.drawImage(photo_canvas, 0, 0);
    dl_ctx.drawImage(bg_canvas, 0, 0);
    dl_ctx.drawImage(canvas, 0, 0);

    var imageURL = dl_canvas.toDataURL("image/png");

    // clear dl_canvas
    dl_ctx.clearRect(0, 0, canvas.width, canvas.height);

    // notify the user
    Materialize.toast('Downloading!', 4000);

    // a download link is created and opened 
    var dl_link = document.createElement('a');
    dl_link.href = imageURL;
    dl_link.download = document.getElementById('title').value + ' by ' + document.getElementById('author').value + '.png';
    document.body.appendChild(dl_link);
    dl_link.click();
}

window.onload = function() {
    // called when the page is first opened
    setInterval("update(ctx, canvas)", 1000 / 60);
    author_color = '#D28928';
};