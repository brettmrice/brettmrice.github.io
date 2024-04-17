/* SCRIPT ADJUST MICROSCOPE CONTROLS */

/* ADJUST LIGHT */
function fun_adjust_light_container_details() {
  button_height = cntrl_light_slide.offsetHeight;
  button_top_orig = cntrl_light_slide.offsetTop + button_height/2;
  bar_top = cntrl_light_slide.previousElementSibling.offsetTop;
  bar_height = cntrl_light_slide.previousElementSibling.offsetHeight;
  bar_height_half = bar_height/2;
  bar_bottom = bar_top + bar_height;
}
function fun_adjust_light(e) {
  if(adjust_light) {
    mY = e.clientY;
    if(typeof(mY) === 'undefined') {
      mY = e.touches[0].clientY;
    }
    moveY = mY - button_top_orig;
    if(mY >= bar_top && mY <= bar_bottom) {
      cntrl_light_slide.style.transform = 'translateY(' + moveY + 'px)';
      opacity_change = Math.sin(((mY - bar_top)/bar_height) * Math.PI/2);
      light.style.opacity = 1 - opacity_change;

      /* DECREASE BRIGHTNESS */
      if(mY >= (bar_height_half) + bar_top) {
        content_white.style.backgroundColor = 'rgb(0,0,0)';
        new_content_view_opacity = Math.sin((1 - ((bar_bottom - mY)/bar_height_half)) * Math.PI/2);
        content_view.style.opacity = 1 - new_content_view_opacity;
        content_white.style.opacity = new_content_view_opacity;
      }
      /* INCREASE BRIGHTNESS */
      else { // increase brightness
        content_white.style.backgroundColor = 'rgb(255,255,255)';
        content_white.style.opacity = 1;
        new_content_view_opacity = Math.sin((((mY - bar_top)/bar_height_half)) * Math.PI/2);
        content_view.style.opacity = new_content_view_opacity;
      }
    }
    pos_light_slide = moveY/(bar_height_half);
  }
}
adjust_light = false;
cntrl_light_js.addEventListener('mousedown', e => {
  adjust_light = true;
  fun_adjust_light_container_details();
});
cntrl_light_js.addEventListener('mousemove', e => {
  fun_adjust_light(e);
});
cntrl_light_js.addEventListener('touchmove', e => {
  adjust_light = true; 
  fun_adjust_light_container_details();
  fun_adjust_light(e);
});
doubleTap_light = false;
cntrl_light_js.addEventListener('touchend', e => {
  doubleTap_light = true;
});
cntrl_light_js.addEventListener('mouseup', e => {
  adjust_light = false;
});
cntrl_light_js.addEventListener('mouseout', e => {
  adjust_light = false;
});
/* RESET LIGHT TO DEFAULT */
pos_light_slide = 0;
cntrl_light_js.addEventListener('click', e => {
  e.preventDefault();
  if(e.detail === 2 || doubleTap_light) {
    cntrl_light_slide.style.transform = 'translateY(0)';
    light.style.opacity = 0.5;
    pos_light_slide = 0;
    content_view.style.opacity = 1;
    content_white.style.opacity = 1;
    content_white.style.backgroundColor = 'rgba(255,255,255)';
  }
  doubleTap_light = false;
});
window.addEventListener('resize', () => {
  new_light_bar_height = cntrl_light_bar.offsetHeight/2 * pos_light_slide;
  cntrl_light_slide.style.transform = 'translateY(' + new_light_bar_height + 'px)';
});


/* ADJUST FOCUS */
function fun_adjust_focus_container_details() {
  button_height = cntrl_focus_slide.offsetHeight;
  button_top_orig = cntrl_focus_slide.offsetTop + button_height/2;
  bar_top = cntrl_focus_slide.previousElementSibling.offsetTop;
  bar_height = cntrl_focus_slide.previousElementSibling.offsetHeight;
  bar_bottom = bar_top + bar_height;
}
function fun_adjust_focus(e) {
  if(adjust_focus) {
    mY = e.clientY;
    if(typeof(mY) === 'undefined') {
      mY = e.touches[0].clientY;
    }
    moveY = mY - button_top_orig;
    if(mY >= bar_top && mY <= bar_bottom) {
      cntrl_focus_slide.style.transform = 'translateY(' + moveY + 'px)';
      focus_change = Math.abs(((bar_top + bar_height/2) - mY)/(bar_height/2));
      content_view.style.filter = 'blur(' + (focus_change * 1) + 'vh)';
    }
    pos_focus_slide = moveY/(bar_height/2);
  }
}
adjust_focus = false;
cntrl_focus_js.addEventListener('mousedown', e => {
  adjust_focus = true;
  fun_adjust_focus_container_details();
});
cntrl_focus_js.addEventListener('mousemove', e => {
  fun_adjust_focus(e);
});
cntrl_focus_js.addEventListener('touchmove', e => {
  adjust_focus = true; 
  fun_adjust_focus_container_details();
  fun_adjust_focus(e);
});
doubleTap_focus = false;
cntrl_focus_js.addEventListener('touchend', e => {
  doubleTap_focus = true;
});
cntrl_focus_js.addEventListener('mouseup', e => {
  adjust_focus = false;
});
cntrl_focus_js.addEventListener('mouseout', e => {
  adjust_focus = false;
});
/* RESET FOCUS TO DEFAULT */
pos_focus_slide = 0;
cntrl_focus_js.addEventListener('click', e => {
  e.preventDefault();
  if(e.detail === 2 || doubleTap_focus) {
    cntrl_focus_slide.style.transform = 'translateY(0)';
    content_view.style.filter = 'blur(0px)';
    pos_focus_slide = 0;
  }
  doubleTap_focus = false;
});
window.addEventListener('resize', () => {
  new_focus_bar_height = cntrl_focus_bar.offsetHeight/2 * pos_focus_slide;
  cntrl_focus_slide.style.transform = 'translateY(' + new_focus_bar_height + 'px)';
});


/* ADJUST VERTICAAL MOVEMENT */
function fun_adjust_moveUD_container_details() {
  button_height = cntrl_moveUD_slide.offsetHeight;
  button_top_orig = cntrl_moveUD_slide.offsetTop + button_height/2;
  bar_top = cntrl_moveUD_slide.previousElementSibling.offsetTop;
  bar_height = cntrl_moveUD_slide.previousElementSibling.offsetHeight;
  bar_bottom = bar_top + bar_height;
}
slide_transX = 'translateX(0)';
slide_transX_change = slide_transX;
function fun_adjust_moveUD(e) {
  if(adjust_moveUD) {
    mY = e.clientY;
    if(typeof(mY) === 'undefined') {
      mY = e.touches[0].clientY;
    }
    moveY = mY - button_top_orig;
    if(mY >= bar_top && mY <= bar_bottom) {
      cntrl_moveUD_slide.style.transform = 'translateY(' + moveY + 'px)';
      /* SLIDE POSITION */
      vertical_change = ((bar_top + bar_height/2) - mY)/(bar_height/2);
      slide_UP_pos = (vertical_change * 4) + 'vh';
      slide_transX_change = 'translateX(' + slide_UP_pos + ')';
      slide_active.style.transform = 'rotate(90deg) ' + slide_transY_change + ' ' + slide_transX_change;
      /* CONTENT POSITION */
      content_UP_pos = (vertical_change * 40) + '%';
      content_view.style.transform = 'translateY(' + content_UP_pos + ')';
    }
    pos_moveUD_slide = moveY/(bar_height/2);
  }
}
adjust_moveUD = false;
cntrl_moveUD_js.addEventListener('mousedown', e => {
  adjust_moveUD = true;
  fun_adjust_moveUD_container_details();
});
cntrl_moveUD_js.addEventListener('mousemove', e => {
  fun_adjust_moveUD(e);
});
cntrl_moveUD_js.addEventListener('touchmove', e => {
  adjust_moveUD = true; 
  fun_adjust_moveUD_container_details();
  fun_adjust_moveUD(e);
});
doubleTap_moveUD = false;
cntrl_moveUD_js.addEventListener('touchend', e => {
  doubleTap_moveUD = true;
});
cntrl_moveUD_js.addEventListener('mouseup', e => {
  adjust_moveUD = false;
});
cntrl_moveUD_js.addEventListener('mouseout', e => {
  adjust_moveUD = false;
});
/* RESET FOCUS TO DEFAULT */
pos_moveUD_slide = 0;
cntrl_moveUD_js.addEventListener('click', e => {
  e.preventDefault();
  if(e.detail === 2 || doubleTap_moveUD) {
    cntrl_moveUD_slide.style.transform = 'translateY(0)';
    pos_moveUD_slide = 0;
    slide_transX_change = slide_transX;
    slide_active.style.transform = 'rotate(90deg) ' + slide_transY_change + ' ' + slide_transX_change;
    content_view.style.transform = 'translateY(0)';
  }
  doubleTap_moveUD = false;
});
window.addEventListener('resize', () => {
  new_moveUD_bar_height = cntrl_moveUD_bar.offsetHeight/2 * pos_moveUD_slide;
  cntrl_moveUD_slide.style.transform = 'translateY(' + new_moveUD_bar_height + 'px)';
});


/* ADJUST HORIZONTAL MOVEMENT */
function fun_adjust_moveLR_container_details() {
  button_height = cntrl_moveLR_slide.offsetHeight;
  button_top_orig = cntrl_moveLR_slide.offsetTop + button_height/2;
  bar_top = cntrl_moveLR_slide.previousElementSibling.offsetTop;
  bar_height = cntrl_moveLR_slide.previousElementSibling.offsetHeight;
  bar_bottom = bar_top + bar_height;
}
slide_transY = 'translateY(calc(var(--stage-size) * -0.18))';
slide_transY_change = slide_transY;
function fun_adjust_moveLR(e) {
  if(adjust_moveLR) {
    mY = e.clientY;
    if(typeof(mY) === 'undefined') {
      mY = e.touches[0].clientY;
    }
    moveY = mY - button_top_orig;
    if(mY >= bar_top && mY <= bar_bottom) {
      cntrl_moveLR_slide.style.transform = 'translateY(' + moveY + 'px)';
      text_space_change = ((bar_top + bar_height/2) - mY)/(bar_height/2);
      /* TEXT SPACING */
      /* LINE HEIGHT */
      if(text_space_change < 0) {
        content_view.style.letterSpacing = text_space_change * 0.4 + 'em';
        content_view.style.lineHeight = 1.25 + (text_space_change * 1.25) + 'em';
      } else {
        content_view.style.letterSpacing = text_space_change * 2 + 'em';
        content_view.style.lineHeight = (text_space_change * 1.25 + 1.25) + 'em';
      }
      /* SLIDE POSITION */
      slide_LR_pos = (text_space_change * -40) + 'px';
      slide_transY_change = 'translateY(calc(var(--stage-size) * -0.18 + ' + slide_LR_pos + '))';
      slide_active.style.transform = 'rotate(90deg) ' + slide_transY_change + ' ' + slide_transX_change;
      /* SLIDE CONTENT POSITION */
      /* slide_content_LR_pos = (text_space_change * 40) + '%';
      slide_content.style.transform = 'translateX(' + slide_content_LR_pos + ')'; */
    }
    pos_moveLR_slide = moveY/(bar_height/2);
  }
}
adjust_moveLR = false;
cntrl_moveLR_js.addEventListener('mousedown', e => {
  adjust_moveLR = true;
  fun_adjust_moveLR_container_details();
});
cntrl_moveLR_js.addEventListener('mousemove', e => {
  fun_adjust_moveLR(e);
});
cntrl_moveLR_js.addEventListener('touchmove', e => {
  adjust_moveLR = true; 
  fun_adjust_moveLR_container_details();
  fun_adjust_moveLR(e);
});
doubleTap_moveLR = false;
cntrl_moveLR_js.addEventListener('touchend', e => {
  doubleTap_moveLR = true;
});
cntrl_moveLR_js.addEventListener('mouseup', e => {
  adjust_moveLR = false;
});
cntrl_moveLR_js.addEventListener('mouseout', e => {
  adjust_moveLR = false;
});
/* RESET FOCUS TO DEFAULT */
pos_moveLR_slide = 0;
cntrl_moveLR_js.addEventListener('click', e => {
  e.preventDefault();
  if(e.detail === 2 || doubleTap_moveLR) {
    cntrl_moveLR_slide.style.transform = 'translateY(0)';
    pos_moveLR_slide = 0;
    content_view.style.letterSpacing = '';
    content_view.style.lineHeight = '';
    slide_transY_change = slide_transY;
    slide_active.style.transform = 'rotate(90deg) ' + slide_transY_change + ' ' + slide_transX_change;
  }
  doubleTap_moveLR = false;
});
window.addEventListener('resize', () => {
  new_moveLR_bar_height = cntrl_moveLR_bar.offsetHeight/2 * pos_moveLR_slide;
  cntrl_moveLR_slide.style.transform = 'translateY(' + new_moveLR_bar_height + 'px)';
});


/* MOBILE */
cntrl_btns_view_container.addEventListener('click', () => {
  
});