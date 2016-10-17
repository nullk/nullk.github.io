var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');

var photo_canvas = document.getElementById('photo_canvas');
var photo_ctx = photo_canvas.getContext('2d');

var bg_canvas = document.getElementById('bg_canvas');
var bg_ctx = bg_canvas.getContext('2d');

var cover_properties = {
    x: 0,
    y: 0,
    width: 500,
    height: 533
};

function update(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_template();
    draw_author(ctx);
    draw_title(ctx);
}

function scale_image(photo_canvas, photo_ctx) {
    width = document.getElementById("width_range").value;
    height = document.getElementById("height_range").value;

    cover_properties['width'] = 10 * width;
    cover_properties['height'] = 10 * height;

    update_cover(photo_canvas, photo_ctx, cover_properties['x'], cover_properties['y'], 
        cover_properties['width'], cover_properties['height']);
}

function translate_image(canvas, photo_ctx) {
    var x = document.getElementById("x_range").value;
    var y = document.getElementById("y_range").value;

    cover_properties['x'] = 10 * x;
    cover_properties['y'] = -(5 * y);

    update_cover(photo_canvas, photo_ctx, cover_properties['x'], cover_properties['y'], 
        cover_properties['width'], cover_properties['height']);
}

function update_cover(photo_canvas, photo_ctx, x, y, width, height) {
    photo_ctx.clearRect(0, 0, photo_canvas.width, photo_canvas.height);

    var cover_photo = new Image();
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        cover_photo.src = reader.result;
    };
    cover_photo.onload = function() {
        photo_ctx.drawImage(this, x, y, width, height);
    };

    if (file) {
        if (file.type == 'image/jpeg' || file.type == 'image/png') {
            reader.readAsDataURL(file);
        }
        else {
            Materialize.toast(file.type + ' file type not accepted!', 4000);
            file = null;
        }
    }
}

function draw_template() {
    var ctx = document.getElementById('bg_canvas').getContext('2d');
    var template = new Image();
    template.onload = function() {
        ctx.drawImage(this, 0, 0, 500, 775);
    };

    template.src = 'template.png';
}

function draw_author(ctx) {
    author = document.getElementById("author").value;

    if (author.length > 10) {
        ctx.font = '26px GillSansMT';
    } 
    else if (author.length > 20) {
        ctx.font = '20px GillSansMT';   
    } 
    else if (author.length > 30) {
        ctx.font = '14px GillSansMT';
    }
    else {
        ctx.font = '32px GillSansMT';
    }

    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#D28928';
    ctx.textAlign = 'center'
    ctx.fillText(author, canvas.width/2, 655);
}
function draw_title(ctx) {
    title = document.getElementById("title").value;

    ctx.font = '24px BemboStd';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center'
    ctx.fillText(title, canvas.width/2, 700);
}

function download_canvas(bg_canvas, photo_canvas, canvas) {
    var dl_canvas = document.getElementById('dl_canvas');
    var dl_ctx = dl_canvas.getContext('2d');

    dl_ctx.drawImage(photo_canvas, 0, 0);
    dl_ctx.drawImage(bg_canvas, 0, 0);
    dl_ctx.drawImage(canvas, 0, 0);

    var imageURL = dl_canvas.toDataURL("image/png");

    dl_ctx.clearRect(0, 0, canvas.width, canvas.height);

    Materialize.toast('Downloading!');

    var dl_link = document.createElement('a');
    dl_link.href = imageURL;
    dl_link.download = document.getElementById('title').value+'.png';
    document.body.appendChild(dl_link);
    dl_link.click();
}

window.onload = function() {
    setInterval("update(ctx, canvas)", 1000/60);
};

