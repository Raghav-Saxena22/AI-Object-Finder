video = "";
objects = [];
status = "";

function preload()
{
video = createVideo("video.mp4");
video.hide();
}

function setup()
{
canvas = createCanvas(400,400);
canvas.center();
}

function start()
{
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results)
{
    if(error)
    {
    console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video,0,0,400,400);
    if(status !="")
    {
        object_detector.detect(video, gotResult)
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objeccts detected are: " + objects.length;

            fill("#FF000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +""+ percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

