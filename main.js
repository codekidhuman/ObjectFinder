stat = "";

function setup()
{
canv = createCanvas(400, 300);
canv.center();
vid = createCapture(VIDEO);
vid.size(300,300);
vid.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    input = document.getElementById("inputt").value;
    document.getElementById("status").innerHTML = 'Detecting Objects';
}
function modelLoaded()
{
    console.log("Model Loaded");
    stat = "true";
}
function draw()
{
    image(vid, 0, 0, 300, 300);
}
