
/* SCRIPT FOR SLIDE DATE/TIME */

function update_slide_date_time() {
  d = new Date();
  d_year = d.getFullYear();
  d_month = String(d.getMonth() + 1).padStart(2, '0');
  d_day = String(d.getDate()).padStart(2, '0');
  visit_date.innerText = d_year + '-' + d_month + '-' + d_day;

  d_hour = String(d.getHours()).padStart(2, '0');
  d_min = String(d.getMinutes()).padStart(2, '0');
  d_sec = String(d.getSeconds()).padStart(2, '0');
  visit_time.innerText = d_hour + ':' + d_min + ':' + d_sec;
}
update_slide_date_time();


/* SCRIPT EYES FOLLOW MOUSE MOVEMENT */

window.addEventListener('mousemove', (e) => {
  mX = e.clientX;
  mY = e.clientY;

  mid_W = innerWidth/2;
  mid_H = innerHeight/2;

  eye_X = ((mX - mid_W)/mid_W) * 0.7;
  eye_Y = ((mY - mid_H)/mid_H) * 0.7;

  eyeL.style.transform = 'translate(' + eye_X + 'vw, ' + eye_Y + 'vh)';
  eyeR.style.transform = 'translate(' + eye_X + 'vw, ' + eye_Y + 'vh)';
});
window.addEventListener('mouseout', (e) => {
  eyeL.style.transform = '';
  eyeR.style.transform = '';
});


/* MOVE FIELD CONTROL */

/* bf_ph.addEventListener('click', () => {
  bf_ph.firstElementChild.classList.remove('anim_rotate_bf_ph');
  void bf_ph.firstElementChild.offsetWidth;
  bf_ph.firstElementChild.classList.add('anim_rotate_bf_ph');
}); */


/* ADJUST UI FOR CHANGES IN DISPLAY WIDTH */

function check_display_width() {
  cdw_currentObj = current_obj;
  cdw_inWidth = innerWidth;

  if(cdw_currentObj === 100 &&
      cdw_inWidth < 900 &&
      obj_btns_view_container
        .classList.toString()
        .includes('obj_btns_view_container_hide')) {
    
    obj_btns_view_container
      .classList.remove('obj_btns_view_container_hide');
    objective_selections.style.display = 'none';

    cntrl_btns_view_container
      .classList.remove('cntrl_btns_view_container_hide');
    controls.style.display = 'none';

    document
      .querySelectorAll('.slides').forEach(elem => {
        elem.classList.add('anim_slides_shrink_grow');
      });
    document
      .querySelectorAll('.slides > div').forEach(elem => {
        elem.classList.add('anim_slides_shrink_grow_labels');
      });
  }
  if(cdw_currentObj === 100 &&
      cdw_inWidth >= 900) {
    obj_btns_view_container
      .classList.add('obj_btns_view_container_hide');
    objective_selections.style.display = '';
    objective_selections.classList = 'flex';

    cntrl_btns_view_container
      .classList.add('cntrl_btns_view_container_hide');
    controls.style.display = '';
    controls.classList = 'flex';

    document
      .querySelectorAll('.slides').forEach(elem => {
        elem.classList.remove('anim_slides_shrink_grow');
      });
    document
      .querySelectorAll('.slides > div').forEach(elem => {
        elem.classList.remove('anim_slides_shrink_grow_labels');
      });
  }
}
window.addEventListener('resize', () => {
  check_display_width();
})


/* CHANGE CONTENT DISPLAYED FOR SELECTED SLIDES */

current_slide_obj = 0;
initial_slide = document.getElementById('slide_HELLO');
document
.querySelectorAll('.slides')
.forEach(elem => {
  elem.addEventListener('click', (e) => {
    new_slide_title = e.target.id.replace('slide_', '');
    if(new_slide_title === '') {
      return;
    }

    current_slide_obj = current_obj;

    slide_active.classList.remove('anim_new_slide');
    void slide_active.offsetHeight;
    
    if(current_slide_obj !== 0) {
      obj_0x.click();
      setTime_time = 5000;
    } else {
      setTime_time = 0;
    }

    if(new_slide_title === 'HELLO') {
      page_title = 'Slide: Hello';
      new_slide_title = 'Brett M. Rice';
      setTimeout(() => {
        update_content_view('', 'none', 'none', 'none')
      }, setTime_time);
    }
    if(new_slide_title === 'SOP') {
      page_title = 'Slide: SOP';
      setTimeout(() => {
        update_content_view('none', '', 'none', 'none')
      }, setTime_time);
    }
    if(new_slide_title === 'PROJECTS') {
      page_title = 'Slide: Projects';
      setTimeout(() => {
        update_content_view('none', 'none', '', 'none')
      }, setTime_time);
    }
    if(new_slide_title === 'CONTACT') {
      page_title = 'Slide: Contact';
      setTimeout(() => {
        update_content_view('none', 'none', 'none', '')
      }, setTime_time);
    }

    setTimeout(() => {
      slide_active.classList.add('anim_new_slide');
    }, setTime_time);
    setTimeout(() => {
      slide_active_LABEL.firstElementChild.innerText = new_slide_title;
      update_slide_date_time();
      initial_slide.parentElement.style.visibility = 'visible';
      e.target.parentElement.style.visibility = 'hidden';
      initial_slide = e.target;
      page_slide.innerText = new_slide_title;
      document.title = page_title;
      if(new_slide_title === 'PROJECTS') {
        slide_active_SMEAR.style.background = 'none';
      } else {
        slide_active_SMEAR.style.background = '';
      }
    }, setTime_time + 1000);
    
    
    if(current_slide_obj !== 0) {
      setTimeout(() => {
        obj_return = document.getElementById('obj_' + prev_obj + 'x');
        obj_return.click();
      }, setTime_time + 2000);
    }
    
    
  });
});
function update_content_view(s1, s2, s3, s4) {
  content_view_HELLO.style.display = s1;
  content_view_SOP.style.display = s2;
  content_view_PROJECTS.style.display = s3;
  content_view_CONTACT.style.display = s4;
}


/* RESIZE SLIDE BOX WHEN DISPLAY WIDTH CHANGES */

selection_slides.addEventListener('click', () => {
  if(slide_HELLO.classList.toString().includes('anim_slides_shrink_grow_labels')) {
    document
      .querySelectorAll('.slides').forEach(elem => {
        elem.classList.remove('anim_slides_shrink_grow');
      });
    document
      .querySelectorAll('.slides > div').forEach(elem => {
        elem.classList.remove('anim_slides_shrink_grow_labels');
      });
    
    obj_btns_view_container.classList.remove('anim_scale_in_out_bottom_controls_show');
    obj_btns_view_container.style.display = 'none';
    cntrl_btns_view_container.classList.remove('anim_scale_in_out_bottom_controls_show');
    cntrl_btns_view_container.style.display = 'none';

    setTimeout(() => {
      document
      .querySelectorAll('.slides').forEach(elem => {
        elem.classList.add('anim_slides_shrink_grow');
      });
      document
        .querySelectorAll('.slides > div').forEach(elem => {
          elem.classList.add('anim_slides_shrink_grow_labels');
        });

      obj_btns_view_container.style.display = '';
      cntrl_btns_view_container.style.display = '';
    }, 2500);
  }
});