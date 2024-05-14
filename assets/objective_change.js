/* SCRIPT FOR CHANGING OBJECTIVE VIEWS */

current_obj = 0;
new_obj = 0;
obj_selections = document.querySelectorAll(".obj_buttons");
obj_selections.forEach(elem => elem.addEventListener('click', changeObj));
obj_steps = [0, 10, 50, 100];
obj_zoom_class = obj_zoom.classList;
obj_anim_rot_class = obj_anim_rot.classList;

function changeObj() {
  new_obj = parseInt(this.id.replace("obj_", "").replace("x", ""));
  
  // return if selected objective is already active
  if(new_obj === current_obj) {
    return;
  }

  // SHOW ADDITIONAL SLIDES AFTER INITIAL OBJECTIVE SELECTION
  if(selection_area.classList.toString().includes('hide_selection_area')) {
    setTimeout(() => {
      selection_area.classList.remove('hide_selection_area');
    }, 750);
  }

  // ANIMATE CLICK AREAS MOVEMENT WHEN CLICKED

  if(typeof obj_cont_timeout !== "undefined") {
    clearTimeout(obj_cont_timeout);
  }
  objectives_container.style.display = 'flex';
  obj_cont_timeout = setTimeout(() => {
    objectives_container.style.display = 'none';
  }, 5000);

  // update page title
  if(typeof page_magnification_timeout !== "undefined") {
    clearTimeout(page_magnification_timeout);
  }
  page_magnification_timeout = setTimeout(() => {
    page_magnification.innerText = new_obj + 'x';
  }, 3500);
  

  // set number of objective rotations
  current_obj_index = obj_steps.indexOf(current_obj);
  new_obj_index = obj_steps.indexOf(new_obj);
  if(new_obj_index > current_obj_index) {
    num_obj_rots = 'anim_rot_high_' + (new_obj_index - current_obj_index);
  } else {
    num_obj_rots = 'anim_rot_low_' + (current_obj_index - new_obj_index);
  }

  // change previous current_obj_target objective button to Inactive
  current_obj_target = document.getElementById('obj_' + current_obj + 'x');
  current_obj_target.classList.remove('obj_buttons_active');
  current_obj_target.classList.add('obj_buttons_inactive');

  // change selected current_obj_target objective button to Active
  this.classList.remove('obj_buttons_inactive');
  this.classList.add('obj_buttons_active');

  /* HIDE STAGE AT HIGHER MAGNIFICATIONS */
  if(current_obj === 0) {
    stage_cover.classList = '';
    /* slide_content.classList = 'flex'; */
    void stage_cover.offsetWidth;
    setTimeout(() => stage_cover.style.visibility = 'visible', 50);
    stage_cover
      .classList
      .add('anim_content_opaque_' + current_obj + '_' + new_obj);
    setTimeout(() => slide_content.style.visibility = 'visible', 50);
  }
  if(new_obj === 0) {
    stage_cover.classList = '';
    /* slide_content.classList = 'flex'; */
    void stage_cover.offsetWidth;
    setTimeout(() => stage_cover.style.visibility = 'hidden', 4950);
    stage_cover
      .classList
      .add('anim_content_opaque_' + current_obj + '_' + new_obj);
    setTimeout(() => slide_content.style.visibility = 'hidden', 4950);
  }
  
  // update objective selection
  prev_obj = current_obj;
  current_obj = new_obj;

  obj_zoom.classList = '';
  obj_anim_rot.classList = 'flex';
  content_black.classList = 'flex';
  controls.classList = 'flex';
  objective_selections.classList = 'flex';
  selection_slides.classList = 'flex';
  content_title.classList = 'flex';
  
  obj_btns_view_container.classList = 'flex obj_btns_view_container_hide';
  cntrl_btns_view_container.classList = 'flex cntrl_btns_view_container_hide';

  if(slide_content.classList.toString().includes("opaque")) {
    slide_content.classList = 'flex';
  }

  void main.offsetWidth;

  obj_zoom.classList.add('anim_scale_in_out');
  selection_slides.classList.add('anim_scale_in_out_controls_show');
  content_title.classList.add('anim_scale_in_out_controls_show');
  
  if(new_obj === 100 && innerWidth < 900) {
    objective_selections
      .classList.add('anim_scale_in_out_controls_hide');
    obj_btns_view_container
      .classList.remove('obj_btns_view_container_hide');
    obj_btns_view_container
      .classList.add('anim_scale_in_out_bottom_controls_show');
    
    controls.classList
      .add('anim_scale_in_out_controls_hide');
    cntrl_btns_view_container
      .classList.remove('cntrl_btns_view_container_hide');
    cntrl_btns_view_container
      .classList.add('anim_scale_in_out_bottom_controls_show');

    setTimeout(() => {
      document
        .querySelectorAll('.slides').forEach(elem => {
          elem.classList.add('anim_slides_shrink_grow');
      });
      document
        .querySelectorAll('.slides > div').forEach(elem => {
          elem.classList.add('anim_slides_shrink_grow_labels');
      });
      selection_slides.style.cursor = 'pointer';
    }, 3500);
    
  } else {
    objective_selections.classList.add('anim_scale_in_out_controls_show');
    controls.classList.add('anim_scale_in_out_controls_show');

    setTimeout(() => {
      document
        .querySelectorAll('.slides').forEach(elem => {
          elem.classList.remove('anim_slides_shrink_grow');
      });
      document
        .querySelectorAll('.slides > div').forEach(elem => {
          elem.classList.remove('anim_slides_shrink_grow_labels');
      });
      selection_slides.style.cursor = '';
    }, 3500);
  }
  if(prev_obj === 100 && innerWidth < 900) {
    cntrl_btns_view_container
      .classList = 'flex anim_scale_in_out_bottom_controls_hide';
    setTimeout(() => {
      cntrl_btns_view_container
        .classList = 'flex cntrl_btns_view_container_hide';
    }, 3501);

    
    obj_btns_view_container
      .classList = 'flex anim_scale_in_out_bottom_controls_hide';
    setTimeout(() => {
      obj_btns_view_container.classList = 'flex obj_btns_view_container_hide';
    }, 3501);
  }
  

  obj_anim_rot.classList.add(num_obj_rots);    
  slide_content
    .classList
    .add('anim_content_opaque_' + prev_obj + '_' + new_obj);
  content_black
    .classList
    .add('anim_content_reveal_' + prev_obj + '_' + new_obj);
  /* controls
    .style
    .animation = 'sidebar_hides_' + prev_obj + '_' + new_obj + 
                  ', scale_in_out_controls'; */
}





obj_btns_view_container.addEventListener('click', () => {
  /* BOUNCE BUTTON */
  obj_btns_view_container.classList = 'flex';
  void obj_btns_view_container.offsetWidth;
  obj_btns_view_container.classList.add('anim_obj_btns_view_container');

  /* SLIDE IN OBJECTIVE SELECTIONS */
  objective_selections.classList = 'flex';
  objective_selections.style.display = '';
  objective_selections.classList.add('anim_obj_select_objs_slideIN');
  setTimeout(() => {
    objective_selections.classList.remove('anim_obj_select_objs_slideIN');
  }, 1001);
  obj_selects_slideOUT = setTimeout(() => {
    objective_selections.classList.add('anim_obj_select_objs_slideOUT');
  }, 2500);
});

objective_selections.addEventListener('mouseover', () => {
  if(new_obj === 100 &&
        innerWidth < 900) {
    if(typeof obj_selects_slideOUT !== "undefined") {
      clearTimeout(obj_selects_slideOUT);
    }
  }
});

objective_selections.addEventListener('mouseleave', () => {
  if(new_obj === 100 &&
    innerWidth < 900) {
    obj_selects_slideOUT = setTimeout(() => {
      objective_selections.classList.add('anim_obj_select_objs_slideOUT');
    }, 500);
  }
});


cntrl_btns_view_container.addEventListener('click', () => {
  /* BOUNCE BUTTON */
  cntrl_btns_view_container.classList = 'flex';
  void cntrl_btns_view_container.offsetWidth;
  cntrl_btns_view_container.classList.add('anim_obj_btns_view_container');

  /* SLIDE IN CONTROLS */
  controls.classList = 'flex';
  controls.style.display = '';
  controls.classList.add('anim_cntrls_slideIN');
  setTimeout(() => {
    controls.classList.remove('anim_cntrls_slideIN');
  }, 1001);
  cntrls_slideOUT = setTimeout(() => {
    controls.classList.add('anim_cntrls_slideOUT');
  }, 2500);
});

controls.addEventListener('mouseover', () => {
  if(new_obj === 100 &&
        innerWidth < 900) {
    if(typeof cntrls_slideOUT !== "undefined") {
      clearTimeout(cntrls_slideOUT);
    }
  }
});

controls.addEventListener('mouseleave', () => {
  if(new_obj === 100 &&
      innerWidth < 900) {
    cntrls_slideOUT = setTimeout(() => {
      controls.classList.add('anim_cntrls_slideOUT');
    }, 500);
  }
});