stat = "";
objects = [];
function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);

}
function start()
{
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
inputt = document.getElementById("inputt").value;
}
function modelLoaded()
{
    console.log("Model Loaded");
    stat = "true";
}
function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;

}
function draw()
{
    image(video, 0, 0, 640, 420);
    if (stat != "")
    {
          objectDetector.detect(video, gotResult);
        if(objects!=undefined)
        {
           r = random(255);
            g = random(255);
           b = random(255);

            for (i=0; i<objects.length; i++)
            {
                document.getElementById("status").innerHTML = "Status: Finding Objects";
                fill(r,g,b);
                percent = floor(objects[i].confidence*100);
                text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);
          
            if(inputt==(objects[i].label))
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("obj_found").innerHTML = "Object Found";

               var synth = window.speechSynthesis;
               speak_data = "The Object "+inputt+" Has Been Found";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);


            }
            else
            {
                document.getElementById("obj_found").innerHTML = "Object Not Found";
            }
        }
      }
    }
} 
