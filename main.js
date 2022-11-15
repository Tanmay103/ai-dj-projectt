music1 = "";
music2 ="";
RwristX = "";
RwristY = "";
LwristX = "";
LwristY = "";
LwristScore = 0;
RwristScore = 0;
music1_status = "";
music2_status = "";

function setup(){
    canvas = createCanvas(500,400);
    canvas.position(500,250);
    
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose",gotPoses);
}
function draw(){
    image(video,0,0,500,400);
    music1_status = music1.isPlaying();
    music2_status = music2.isPlaying();
    fill("orange");
    stroke("black");
    if(RwristScore > 0.2){
        circle(RwristX,RwristY,20);
        music1.stop();
        if(music2_status == false){
            music2.play();
            document.getElementById("song_name").innerHTML = "Guitar is being played";
        } 
    }
    if(LwristScore > 0.2){
        circle(LwristX,LwristY,20);
        music2.stop();
       if(music1_status == false){
        music1.play();
        document.getElementById("song name").innerHTML = "Harry Porter theme song is being played";
       }
        
    }

}
function preload(){
music1 = loadSound("music.mp3");
music2 = loadSound("music2.mp3");
}
function modelLoaded(){
    console.log("pose net is initialised");
}
function gotPoses(results){
console.log(results);
if(results.length > 0){
RwristX = results[0].pose.rightWrist.x;
RwristY = results[0].pose.rightWrist.y;
LwristX = results[0].pose.leftWrist.x;
LwristY = results[0].pose.leftWrist.y;
LwristScore = results[0].pose.keypoints[9].score;
RwristScore = results[0].pose.keypoints[10].score;
}
}

function play(){
    music1.setVolume(1);
    music1.rate(1);
    music2.setVolume(1);
    music2.rate(1);
}
