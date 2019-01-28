function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  //x1 = randomGaussian(0, windowWidth);
  //y1 = randomGaussian(0, windowHeight);
  x1 = random(0, windowWidth);
  y1 = random(0, windowHeight);
}

function draw() {
  draw_galaxy_ripples();
  /*stroke(randomGaussian(0, 255),
       randomGaussian(0, 255),
       randomGaussian(0, 255));
  strokeWeight(randomGaussian(1,10));
  x2 = randomGaussian(0, windowWidth);
  y2 = randomGaussian(0, windowHeight);*/
  /*
  stroke(random(0, 255),
       random(0, 255),
       random(0, 255));
  strokeWeight(random(1,20));
  x2 = random(0, windowWidth);
  y2 = random(0, windowHeight);
  point(x2, y2);
  */
  //line(x1, y1, x2, y2);
  /*stroke(255);
  point(x1, y1);
  x1 = x1 + random(-1, 1);
  y1 = y1 + random(-1, 1);*/
}

function draw_galaxy_ripples() {
  gal_width = random(4, 60);
  x_pos = round(random(-gal_width*.9,
    max_x_img+(gal_width*.9)));
  y_pos = round(random(-gal_width*.9,
    max_y_img+(gal_width*.9)));
  num_gal_rings = round(random(2, 4));
  for(j = 0; j < gal_width; j++) {
    ring_opac = sin(pow(PI, num_gal_rings)/(j));
    stroke(255, (randomGaussian()*100) * ring_opac);
    ellipse(x_pos, y_pos, j, j);
  }
  fill(0, 200, 0);
  ellipse(x_pos, y_pos, gal_width*.05, gal_width*.05);
  noFill();
  gal_count++;
}
