

var imageCache = {};

export function loadImage(asset) {
    const url = (typeof ("") === typeof (asset)) ? asset : asset.url;

    if (imageCache[url])
        return imageCache[url]

    const img = new Image();
    img.src = url;
    const promise = new Promise(function (resolve, reject) {
        img.addEventListener('load', e => {
            resolve(img);
        });
    })
    imageCache[url] = promise;

    return promise;
}

export async function drawColor(ctx, asset, color) {

    var img = await loadImage(asset);
    const tempCanvas = document.getElementById('dbg');

    tempCanvas.width = img.width;
    tempCanvas.height = img.height;
    const c = tempCanvas.getContext('2d');

    fill(c, color);

    c.globalCompositeOperation = "multiply";
    c.drawImage(img, 0, 0, c.canvas.width, c.canvas.height);
    c.globalCompositeOperation = "destination-in";
    c.drawImage(img, 0, 0, c.canvas.width, c.canvas.height);
    ctx.drawImage(tempCanvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
}

export async function draw(ctx, asset) {
    var img = await loadImage(asset);
    ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function fill(ctx, color) {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function clear(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}