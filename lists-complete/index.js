"use strict";

if(location.href.indexOf('positionbased=true') != -1){
    console.log("Using position based");
    document.write('<link type="text/css" rel="stylesheet" href="position-based.css" />');
}

var uls = document.querySelectorAll('.carousel');

//HOW MANY LIs FIT ON SCREEN?
var M = 5;
var NEEDED = M+2;

for(var listIndex=0; listIndex<uls.length; listIndex++){
    var ul = uls[listIndex];
    var children = ul.querySelectorAll('li');

    if(children.length < NEEDED){
        //hide then clone then show
        ul.style.display = 'none';

        //add class that hides/masks the cloned items
        ul.classList.add('items' + children.length);

        var elements = document.createDocumentFragment();
        for(var i=0; i<children.length; i++){
            elements.appendChild(children[i].cloneNode(true));
        }

        //put clones back into ul
        ul.appendChild(elements);

        //move last element to beginning so that item #1 which is
        //currently off screen with a (-) negative webkit-transform
        //is pushed to spot #2 which visibly IS THE FIRST ITEM
        ul.insertBefore(ul.querySelector('li:last-child'), ul.querySelector('li:first-child'));
    }

    //show the list again
    ul.style.display = 'block';
}


var onKeyDown = function(evt, swipeEvent){
    console.log("keydown " + evt.keyIdentifier);

    switch(evt.keyIdentifier){
        case "Up":
            var list = document.querySelector('section>ul');
            //litle tricky query selector since CloudTV does not support ":scope>li" we must go above it by
            //1 to get li's rooted DIRECTLY inside this list and not nested li's deeper inside
            list.insertBefore(list.parentNode.querySelector('section>ul:first-child>li:last-child'), list.querySelector('li:first-child'));
            break;

        case "Down":
            var list = document.querySelector('section>ul');
            list.appendChild(list.querySelector('li:first-child'));
            break;

        //NOTE - the 1st visible row is row 2
        case "Left":
            var list = document.querySelector('section>ul>li:nth-child(2)');
            var carousel = list.querySelector('.carousel');
            if(!carousel.classList.contains('items1')){
                carousel.insertBefore(list.querySelector('.carousel li:last-child'), list.querySelector('.carousel li:first-child'));
            }

            break;

        case "Right":
            var list = document.querySelector('section>ul>li:nth-child(2)');
            var carousel = list.querySelector('.carousel');
            if(!carousel.classList.contains('items1')){
                list.querySelector('.carousel').appendChild(list.querySelector('.carousel li:first-child'));
            }
            break;


    }
}


window.addEventListener('keydown', onKeyDown);

window.addEventListener('load', function(){
    //setup swipe events
    var section = document.querySelector('section');
    Hammer(section).on('swipeleft',onKeyDown.bind(window, {keyIdentifier:"Left"}));
    Hammer(section).on('swiperight',onKeyDown.bind(window, {keyIdentifier:"Right"}));
    Hammer(section).on('swipeup',onKeyDown.bind(window, {keyIdentifier:"Up"}));
    Hammer(section).on('swipedown',onKeyDown.bind(window, {keyIdentifier:"Down"}));

})