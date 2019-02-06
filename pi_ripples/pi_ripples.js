function preload() {
  result = loadStrings('pi');
}

mode_1 = 255;
mode_2 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  pi_res = int(split(result[0], ''));
  pi_res = subset(pi_res, 2, 1000002);
  ellipse_max_size = dist(0, 0, windowWidth, windowHeight);
  ellipse_count = 0;
  pi_digit = 0;
  num_pix_sp = 10;
  subset_length = round(ellipse_max_size/round((num_pix_sp/2)+1));
}

function draw() {
  drawPItarget();
}

function drawPItarget() {
  pi_res_current = subset(pi_res, pi_digit, subset_length);
  for(i = 0; i < subset_length; i++) {
    strokeWeight(map(pi_res_current[i], 0, 9, 10, 30));
    stroke(map(pi_res_current[i], 0, 9, mode_1, mode_2));
    ellipse(windowWidth/2, windowHeight/2,
      ellipse_max_size - (i*round((num_pix_sp/2)+1)),
      ellipse_max_size - (i*round((num_pix_sp/2)+1)));
  }
  for(j = 30; j >= 1; j--){
    strokeWeight(1);
    stroke(mode_1, map(j, 30, 1, 0, 255));
    ellipse(windowWidth/2, windowHeight/2, j, j);
  }
  pi_digit++;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ellipse_max_size = dist(0, 0, windowWidth, windowHeight);
  subset_length = round(ellipse_max_size/round((num_pix_sp/2)+1));
}
