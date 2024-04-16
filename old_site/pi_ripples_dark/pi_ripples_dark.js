function preload() {
  result = loadStrings('pi');
}

mode_1 = 255;
mode_2 = 0;
str_weight = [];
str = [];
obs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  pi_res = int(split(result[0], ''));
  pi_res = subset(pi_res, 2, 1000002);
  ellipse_max_size = dist(0, 0, windowWidth, windowHeight);
  ellipse_count = 0;
  pi_digit = 0;
  num_pix_sp = 10;
  subset_length = round(ellipse_max_size/num_pix_sp);
  for(i = 0; i <= 9; i++) {
    str_weight[i] = map(i, 0, 9, 10, 30);
    str[i] = map(i, 0, 9, mode_1, mode_2);
  }
  obs_size = 20;
  for(j = obs_size; j >= 1; j--) {
    obs[j] = round(map(j, obs_size, 1, 0, 255));
  }
}

function draw() {
  drawPItarget();
}

function drawPItarget() {
  pi_res_current = subset(pi_res, pi_digit, subset_length);
  for(i = 0; i < subset_length; i++) {
    strokeWeight(str_weight[pi_res_current[i]]);
    stroke(str[pi_res_current[i]]);
    ellipse(windowWidth/2, windowHeight/2,
      ellipse_max_size - round(i*num_pix_sp),
      ellipse_max_size - round(i*num_pix_sp));
  }
  for(j = obs_size; j >= 1; j--) {
    strokeWeight(2);
    stroke(mode_2, obs[j]);
    ellipse(windowWidth/2, windowHeight/2, j, j);
  }
  pi_digit++;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ellipse_max_size = dist(0, 0, windowWidth, windowHeight);
  subset_length = round(ellipse_max_size/num_pix_sp);

}
