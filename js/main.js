var ctx = document.getElementById('canvas').getContext('2d');

function update() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    draw_author(ctx);
    draw_title(ctx)
}

function scale_image() {
    width = document.getElementById("width_range").value;
    height = document.getElementById("height_range").value;

    cover_photo = document.getElementById("cover_photo");
    cover_photo.style.width = (width*10).toString() + 'px';
    cover_photo.style.height = (height*10+33).toString() + 'px';
}

function translate_image() {
    x = document.getElementById("x_range").value;
    y = document.getElementById("y_range").value;

    cover_photo = document.getElementById("cover_photo");
    cover_photo.style.left = x.toString() + '%';
    cover_photo.style.top = y.toString() + '%';
}

function update_cover() {
    cover_photo = document.getElementById("cover_photo");
    cover_photo.src = document.getElementById("image_url").value;
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

window.onload = function() {
    setInterval("update()", 1000/60);
};
