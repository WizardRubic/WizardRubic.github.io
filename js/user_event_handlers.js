/**
 * user_event_handler.js
 * handles menu interactions
 */



/**
 * Handles opening and closing the menu if we're in mobile mode.
 * This function is called when the hamburger menu is visible and clicked.
 * @return {undefined}
 */
function menuHandler() {
    if(isHamburgerMenuOpen()) {
        closeHamburgerMenu();
    } else {
        openHamburgerMenu();
    }
}

/**
 * returns if hamburger menu is open 
 * @return {Boolean} is the menu open or not
 */
function isHamburgerMenuOpen() {
    var contentResponsive = document.getElementsByClassName("nav-responsive");
    var spacerResponsive = document.getElementsByClassName("nav-spacer-open");
    if(contentResponsive.length > 0 || spacerResponsive.length > 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * Closes the hamburger menu when called
 * @return {undefined} 
 */
function closeHamburgerMenu() {
    var contentResponsive = document.getElementsByClassName("nav-responsive");
    var spacerResponsive = document.getElementsByClassName("nav-spacer-open");
    if(contentResponsive) {
        for(var i = contentResponsive.length - 1; i >= 0 ; i--) {
            contentResponsive[i].className = contentResponsive[i].className.replace(/\bnav-responsive\b/g, "");
        }
    }
    if(spacerResponsive) {
        for(var i = 0; i < spacerResponsive.length; i++) {
            spacerResponsive[i].className = spacerResponsive[i].className.replace(/\bnav-spacer-open\b/g, "");
        }
    }
}

/**
 * Opens the hamburger menu when called
 * @return {undefined}
 */
function openHamburgerMenu() {
    // open the nav menu
    var navList = document.getElementsByClassName("nav-content");
    for(var i = 0; i < navList.length; i++) {
        navList[i].className += " nav-responsive";
    }
    var spacerList = document.getElementsByClassName("nav-spacer");
    for(var i = 0; i < spacerList.length; i++) {
        spacerList[i].className += " nav-spacer-open";
    }
}

/**
 * Scrolls to the appropriate part of the page
 * Get the position relative to the top of the page.
 * @param  {String} section which div to scroll too
 * @return {undefined}         
 */
function scrollToSection(section) {
    $('#container').stop();
    var divName = "#" + section;
    var paddingOffset = 50; // offset() doesn't take into account padding
    var positionRelativeToPage = $(divName).offset().top - paddingOffset;
    // positionRelativeToPage changes based on our current position 
    // in the page since we're scrolling the container
    // it's a calculation of how far we need to move the page to get to the next section
    // 
    // since scrollTop is the current position and positionRelativeToPage is 
    // the offset rather than a static value, we need to increment scrollTop
    console.log(positionRelativeToPage);
    console.log($('#container').scrollTop());
    $('#container').animate({
        scrollTop: '+=' + positionRelativeToPage
    }, 300, function() {
        console.log($('#container').scrollTop());
    });

    if(isHamburgerMenuOpen()) {
        closeHamburgerMenu();
    }
}



/**
 * This function handles activating the appropriate section of the website.
 * @param  {String} The element id of the section needed to be activated
 * @return {undefined}
 */
function activateSection(section) {
    console.log(section);
    var active = document.getElementsByClassName("content-active");
    var element = document.getElementById(section);
    if (active[0] === element) {
        return;
    }

    // play animation
    // remove animations first since we don't wanna accidentally put an animation on while there's already one on since it won't happen
    var classes;
    for(var i = active.length-1; i >= 0; i--) {
        classes = active[i].className.replace(/\bcontent-appearing\b/g, "");
        classes = classes.replace(/\bcontent-disappearing\b/g, "");
        active[i].className = classes;
        void active[i].offsetWidth; // trigger css reflow with read operation 
        classes = active[i].className.replace(/\bcontent-active\b/g, "content-inactive");
        classes += " content-disappearing";
        active[i].className = classes;
    }

    // Repeat the process for the element we're making active
    classes = element.className.replace(/\bcontent-appearing\b/g, "");
    classes = classes.replace(/\bcontent-disappearing\b/g, "");
    element.style.display='block';
    element.className = classes;
    void element.offsetWidth;
    classes = element.className.replace(/\bcontent-inactive\b/g, "content-active");
    classes += " content-appearing";
    element.className = classes;


    // do the same thing for nav:
    var navActive = document.getElementsByClassName("nav-active");

    var navElement = document.getElementById("nav-" + section);

    // remove class nav-active
    for(var i = navActive.length-1; i >= 0; i--) {
        classes = navActive[i].className.replace(/\bnav-active\b/g, "");
        navActive[i].className = classes;
    }

    navElement.className += " nav-active";
}

/**
 * Makes the animations trigger a callback to set faded out headlines to display: none
 * @return {undefined}
 */
function initAnimationHandler() {
    var headlineList = document.getElementsByClassName('headline');
    for(var i = headlineList.length - 1; i >= 0; i--) {
        headlineList[i].addEventListener('animationend', function(e) {
            if(!isVarActive(this)) {
                // if inactive make the thing disappear from the flow, set display to none
                this.style.display='none';
            } 
        });
    }
}

/**
 * returns whether the current headline element is active or not by looking at the class list
 * @param  {object}  headlineElement a dom element that we're checking
 * @return {Boolean}                 whether or not the class names contain content-active
 */
function isVarActive(headlineElement) {
    return headlineElement.className.indexOf('content-active') > -1;
}