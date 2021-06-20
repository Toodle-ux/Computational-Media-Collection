// Create a new poseNet method
let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let leftEyeX = 0;
let leftEyeY = 0;
let rightEyeX = 0;
let rightEyeY = 0;
let leftWristX = 0;
let leftWristY = 0;
let rightWristX = 0;
let rightWristY = 0;
let leftElbowX = 0;
let leftElbowY = 0;
let rightElbowX = 0;
let rightElbowY = 0;
let leftHandX = 0;
let leftHandY = 0;
let hat;
let hatX = 590;
let hatY = 170;
let hatA = 120;
let gingers = [];
let gingerX = 300;
let gingerY = 400;
let gingerStage = 0;
let train;
let trainX = 100;
let modelFlag = 0;
let tree1;
let tree2;
let taskFlag = 0;
let bell1 = [];
let bell2 = [];
let bell3 = [];
let bell4 = [];
let bellState = 0;
let bellString;
let song;
let amp;
let tag1;
let tag2;
let tag3;
let tag1X = -150;
let tag1Y = 130;
let tag2X = -150;
let tag2Y = 190;
let tag3X = -150;
let tag3Y = 250;
let gameStage = 0;
let gingerMove = 0;
let tag1Step = 0;
let tag2Step = 0;
let tag3Step = 0;
let merryA = 100;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  song = loadSound('lastChristmas.mp3');
  video.hide();
  amp = new p5.Amplitude();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  hat = loadImage('hat2.png');
  tree1 = loadImage('tree1.png');
  tree2 = loadImage('tree2.png');
  bell1[0] = loadImage('bell-01.png');
  bell1[1] = loadImage('bell1.gif');
  bell2[0] = loadImage('bell-02.png');
  bell2[1] = loadImage('bell2.gif');
  bell3[0] = loadImage('bell-03.png');
  bell3[1] = loadImage('bell3.gif');
  bell4[0] = loadImage('bell-04.png');
  bell4[1] = loadImage('bell4.gif');
  bellString = loadImage('string.png');
  tag1 = loadImage('tag-01.png');
  tag2 = loadImage('tag-02.png');
  tag3 = loadImage('tag-03.png');
  merry = loadImage('merry2.png');
  gingers[0] = loadImage('ginger1.png');
  gingers[1] = loadImage('ginger2.png');
  gingers[2] = loadImage('ginger3.png');
  train = loadImage('train.png');
}

function draw() {
  var vol = amp.getLevel();
  var digree = map(vol, 0, 1, 10, 200);
  if (modelFlag == 1){
    scale(-1, 1);
    imageMode(CORNER);
    translate(-width, 0);
    image(video, 0, 0);

  // ellipse(noseX, noseY, 5);
  // scale(1, 1);
    imageMode(CENTER);
    image(tree1, 60, 320, 180, 480);
    image(tree2, 580, 320, 180, 480);
    image(bellString, 320, 40, 560, 80)
    image(bell1[bellState], 80, 35, 100, 80);
    image(bell2[bellState], 240, 65, 100, 80);
    image(bell3[bellState], 400, 40, 100, 80);
    image(bell4[bellState], 560, 50, 100, 80);
    image(hat, hatX, hatY, hatA, hatA);
    if (gingerStage < 3){
      image(gingers[gingerStage], gingerX, gingerY, 100, 100);
    }
    imageMode(CORNER);
    image(train, trainX, 395);
    trainX--;
    if (trainX < -340){
      trainX = 640;
    }
    if (gingerMove == 0){
      gingerX--;
      if (gingerX < -340){
        gingerX = 640;
      }
    }
    if (gameStage == 0){
      if (tag3Step < 50){
        tag3X = tag3X + 3;
        tag3Step++;
      }
      else if (tag3Step < 58){
        tag3X = tag3X - 2;
        tag3Step++;
      }
      
    }
    if (gameStage == 1){
      if (tag3Step < 95){
        tag3X = tag3X - 3;
        tag3Step++;
      }
      if (tag2Step < 50){
        tag2X = tag2X + 3;
        tag2Step++;
      }
      else if (tag2Step < 58){
        tag2X = tag2X - 2;
        tag2Step++;
      }
      
      
    }
    if (gameStage == 2 && gingerStage < 3){
      if (tag2Step < 95){
        tag2X = tag2X - 3;
        tag2Step++;
      }
      if (tag1Step < 50){
        tag1X = tag1X + 3;
        tag1Step++;
      }
      else if (tag1Step < 58){
        tag1X = tag1X - 2;
        tag1Step++;
      }
      
    }
    
    image(tag3, tag3X, tag3Y, 200, 125);
    image(tag2, tag2X, tag2Y, 200, 125);
    image(tag1, tag1X, tag1Y, 200, 125);
    if (gingerStage == 3){
      imageMode(CENTER)
      tag1X = tag1X - 2;
      tag2X = tag2X - 2;
      tag3X = tag3X - 2;
      if (merryA < 300){
        merryA = merryA + 3;
      }
      image(merry, 320, 360, merryA, merryA);
    }
    if (bellState == 1 && !song.isPlaying()){
      song.play();
    }

  }  
}

function modelLoaded() {
  console.log('Model Loaded!');
  modelFlag = 1;
}

function gotPoses(poses){
  console.log(poses);
  if (poses.length > 0){
    let newNoseX = poses[0].pose.keypoints[0].position.x;
    let newNoseY = poses[0].pose.keypoints[0].position.y;
    let newLeftEyeX = poses[0].pose.keypoints[1].position.x;
    let newLeftEyeY = poses[0].pose.keypoints[1].position.y;
    let newRightEyeX = poses[0].pose.keypoints[2].position.x;
    let newRightEyeY = poses[0].pose.keypoints[2].position.y;
    let newLeftWristX = poses[0].pose.keypoints[9].position.x;
    let newLeftWristY = poses[0].pose.keypoints[9].position.y;
    let newRightWristX = poses[0].pose.keypoints[10].position.x;
    let newRightWristY = poses[0].pose.keypoints[10].position.y;
    let newLeftElbowX = poses[0].pose.keypoints[7].position.x;
    let newLeftElbowY = poses[0].pose.keypoints[7].position.y;
    let newRightElbowX = poses[0].pose.keypoints[8].position.x;
    let newRightElbowY = poses[0].pose.keypoints[8].position.y;
    noseX = lerp(noseX, newNoseX, 0.2);
    noseY = lerp(noseY, newNoseY, 0.2);
    leftEyeX = lerp(leftEyeX, newLeftEyeX, 0.2);
    leftEyeY = lerp(leftEyeY, newLeftEyeY, 0.2);
    rightEyeX = lerp(rightEyeX, newRightEyeX, 0.2);
    rightEyeY = lerp(rightEyeY, newRightEyeY, 0.2);
    leftWristX = lerp(leftWristX, newLeftWristX, 0.2);
    leftWristY = lerp(leftWristY, newLeftWristY, 0.2);
    rightWristX = lerp(rightWristX, newRightWristX, 0.2);
    rightWristY = lerp(rightWristY, newRightWristY, 0.2);
    leftElbowX = lerp(leftElbowX, newLeftElbowX, 0.2);
    leftElbowY = lerp(leftElbowY, newLeftElbowY, 0.2);
    rightElbowX = lerp(rightElbowX, newRightElbowX, 0.2);
    rightElbowY = lerp(rightElbowY, newRightElbowY, 0.2);
    // estimate hand positions using wrist & elbow positions
    // leftHandX = leftWristX * 3 / 2 - leftElbowX / 2;
    // leftHandY = leftWristY * 3 / 2 - leftElbowY / 2;
    // rightHandX= rightWristX * 3 / 2 - rightElbowX / 2;
    // rightHandY = rightWristY * 3 / 2 - rightElbowY / 2;
    leftHandX = leftWristX * 7 / 4 - leftElbowX * 3 / 4;
    leftHandY = leftWristY * 7 / 4 - leftElbowY * 3 / 4;
    rightHandX= rightWristX * 7 / 4 - rightElbowX * 3 / 4;
    rightHandY = rightWristY * 7 / 4 - rightElbowY * 3 / 4;
    // pick up the hat if the hands get close to the hat
    if (gameStage == 1 && dist(leftHandX, leftHandY, hatX, hatY) < 50){
      hatX = leftHandX;
      hatY = leftHandY;
    }
    if (gameStage == 1 && dist(rightHandX, rightHandY, hatX, hatY) < 50){
      hatX = rightHandX;
      hatY = rightHandY;
    }
    
    // put the hat on the head
    if (gameStage >= 1 && dist(hatX, hatY, leftEyeX + rightEyeX - noseX, 3 * leftEyeY / 2 + 3 * rightEyeY / 2 - 2 * noseY) < 60){
      hatA = (rightEyeX - leftEyeX) * 3;
      hatX = leftEyeX + rightEyeX - noseX - hatA / 5;
      hatY = 3 * leftEyeY / 2 + 3 * rightEyeY / 2 - 2 * noseY;
      gameStage = 2;
      //hatY = 2 * leftEyeY + 2 * rightEyeY - 3 * noseY;
    }
    
    // pick up the ginger bread if the hands get close to the hat
    if (gameStage == 2 && dist(leftHandX, leftHandY, gingerX, gingerY) < 50){
      gingerX = leftHandX;
      gingerY = leftHandY;
      gingerMove = 1;
      //gingerY = leftHandY + leftEyeY / 2 + rightEyeY / 2 - noseY;
    }
    if (gameStage == 2 && dist(rightHandX, rightHandY, gingerX, gingerY) < 50){
      gingerX = rightHandX;
      gingerY = rightHandY;
      gingerMove = 1;
      //gingerY = rightHandY + leftEyeY / 2 + rightEyeY / 2 - noseY;
    }
    // eat the ginger bread when it gets closer to the mouth
    if (gameStage == 2 && dist(noseX, 3 * noseY / 2 - leftEyeY / 4 - rightEyeY / 4, gingerX, gingerY) < 80 && gingerStage == 0){
      gingerStage++;
    }
    if (gameStage == 2 && dist(noseX, 3 * noseY / 2 - leftEyeY / 4 - rightEyeY / 4, gingerX, gingerY) < 50 && gingerStage == 1){
      gingerStage++;
    }
    if (gameStage == 2 && dist(noseX, 3 * noseY / 2 - leftEyeY / 4 - rightEyeY / 4, gingerX, gingerY) < 30 && gingerStage == 2){
      gingerStage++;
      gameStage = 3;
    }
    if (dist(leftHandX, leftHandY, 80, 35) < 50 || dist(leftHandX, leftHandY, 240, 65) < 50 || dist(leftHandX, leftHandY, 400, 40) < 50 || dist(leftHandX, leftHandY, 460, 50) < 50 || dist(rightHandX, rightHandY, 80, 35) < 50 || dist(rightHandX, rightHandY, 240, 65) < 50 || dist(rightHandX, rightHandY, 400, 40) < 50 || dist(rightHandX, rightHandY, 460, 50) < 50){
      bellState = 1;
      gameStage = 1;
    }
  }

}