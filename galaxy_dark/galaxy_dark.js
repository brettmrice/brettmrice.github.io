value = 0;
gal_mode_1 = 255;
gal_mode_2 = 0;

x_pos = [];
y_pos = [];
gal_width = [];
num_gal_rings = [];
gal_count = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  max_x_img = windowWidth;
  max_y_img = windowHeight;
  mil = millis(); // for draw_galaxy_ripples
  noStroke();
  noFill();
  background(gal_mode_2);
  gal_num = round(dist(0, 0, windowWidth, windowHeight)/4);

}

function draw() {
  if (gal_count == gal_num) {
    noLoop();
  }
  draw_galaxy_ripples();
}

function draw_galaxy_ripples() {
  gal_width = randomGaussian(20, 40);
  x_pos = round(random(-gal_width*.9,
    max_x_img+(gal_width*.9)));
  y_pos = round(random(-gal_width*.9,
    max_y_img+(gal_width*.9)));
  num_gal_rings = round(random(2, 4));
  for(j = 0; j < gal_width; j++) {
    ring_opac = sin(pow(PI, num_gal_rings)/(j));
    stroke(gal_mode_1, (randomGaussian()*100) * ring_opac);
    ellipse(x_pos, y_pos, j, j);
  }
  fill(0, 200, 0);
  ellipse(x_pos, y_pos, gal_width*.05, gal_width*.05);
  noFill();
  gal_count++;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  max_x_img = windowWidth;
  max_y_img = windowHeight;
  background(gal_mode_2);
  gal_count = 0;
  loop();
  draw_galaxy_ripples();
}
