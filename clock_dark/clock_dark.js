value = 0;
dark_mode_1 = 255;
dark_mode_2 = 0;
count = 0;
s_old = 61;
sec_hand_count = 0;
correct_s = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  max_x_img = windowWidth;
  max_y_img = windowHeight;
  mil = millis();
  noStroke();
  noFill();
  background(0);
}

function draw() {
  if (count == 0) {
    draw_clock_background();
    count = 1;
  }
  draw_clock();
}

function draw_clock() {
  stroke(dark_mode_2);
  fill(dark_mode_2);
  noStroke();
  ellipse(windowWidth/2, windowHeight/2,
    min(windowWidth, windowHeight)*(2/2.1),
    min(windowWidth, windowHeight)*(2/2.1));

  h = hour(); m = minute(); s = second();
  draw_second();
  draw_minute();
  draw_hour();

  fill(dark_mode_1);
  ellipse(windowWidth/2, windowHeight/2, 20, 20);
}

function draw_clock_background() {
  translate(windowWidth/2, windowHeight/2);
  stroke(dark_mode_1);
  fill(dark_mode_1);
  background(dark_mode_2);
  for(i = 0; i < 60; i++) {
    if(i != 0) {
      rotate((TWO_PI/60)+PI);
    }
    if(i%5 == 0) {
      strokeWeight(18);
      rect(0, 0, 0, max(windowWidth, windowHeight));
    } else {
      strokeWeight(2);
      rect(0, 0, 0, max(windowWidth, windowHeight));
    }
  }
  s_old = 61;
  translate(-windowWidth/2, -windowHeight/2);
  fill(dark_mode_2);
  noStroke();
  ellipse(windowWidth/2, windowHeight/2,
    min(windowWidth, windowHeight)*(2/2.1),
    min(windowWidth, windowHeight)*(2/2.1));
  frm_cnt = 0;
  sec_hand_count = 0;
}

function draw_second() {
  translate(windowWidth/2, windowHeight/2);
  rotate(PI);
  if(s == s_old) {
    mil_int = (millis() - mil)/1000;
  } else {
    mil = millis();
    mil_int = 0;
    s_old = s;
  }
  if (sec_hand_count == 0) {
    sec_org = s;
    sec_hand_count = 1;
  }
  rot_amt_s = ((TWO_PI/60)*(s+mil_int));
  if (frm_cnt <= 240) {
    if (s < sec_org) {
      rot_amt_s = ((TWO_PI/60)*((s+60)+mil_int));
    }
    rot_amt_st_s = map(frm_cnt, 0, 240, 0, rot_amt_s);
    rotate(rot_amt_st_s);
    stroke(dark_mode_1);
    strokeWeight(3);
    rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
    rotate(-rot_amt_st_s);
  } else {
    rotate(rot_amt_s);
    stroke(dark_mode_1);
    strokeWeight(3);
    rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
    rotate(-rot_amt_s);
  }
  rotate(-PI);
  translate(-windowWidth/2, -windowHeight/2);
}

function draw_minute() {
  translate(windowWidth/2, windowHeight/2);
  rotate(PI);
  rot_amt_m = (TWO_PI/60)*(m+((s+mil_int)/60));
  if (frm_cnt < 240) {
    rot_amt_st_m = map(frm_cnt, 0, 240, 0, rot_amt_m);
    rotate(rot_amt_st_m);
    strokeWeight(11);
    rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
    rotate(-rot_amt_st_m);
  } else {
    rotate(rot_amt_m);
    strokeWeight(11);
    rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
    rotate(-rot_amt_m);
  }
  rotate(-PI);
  translate(-windowWidth/2, -windowHeight/2);
}

function draw_hour() {
  translate(windowWidth/2, windowHeight/2);
  rotate(PI);
  if (h > 12) {
    h = h - 12;
  }
  rot_amt_h = ((TWO_PI/12)*(h+((m+((s+mil_int)/60))/60)));
  if (frm_cnt <= 240) {
    rot_amt_st_h = map(frm_cnt, 0, 240, 0, rot_amt_h);
    rotate(rot_amt_st_h);
    strokeWeight(24);
    rect(0, 0, 0, min(windowWidth, windowHeight)/2.7);
    rotate(-rot_amt_st_h);
    frm_cnt++;
  } else {
    rotate(rot_amt_h);
    strokeWeight(24);
    rect(0, 0, 0, min(windowWidth, windowHeight)/2.7);
    rotate(-rot_amt_h);
  }
  rotate(-PI);
  translate(-windowWidth/2, -windowHeight/2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  draw_clock_background();
}
