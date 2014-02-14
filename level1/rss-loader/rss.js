/**
 * Configuration
 */
var feedUrl = "http://uvtv.libsyn.com/rss/";//Heavy Metal Videos
var maxItems = 20;

/**
 * Utility method to regex replace HTML tags in a string
 * @param str
 * @returns {XML|string|void}
 */
var removeTags = function(str){
    return str.replace(/\<[^\>]*\>/g,'');
}

/**
 * Given an ItemCollection or array of XML nodes, loop over them and populate
 * the DOM with the data from those items
 *
 * Note - this method will move XML nodes from the response items directly into the HTML DOM
 * @param items
 */
var showItems = function(items, xml){
    console.log("Showing items", items);

    var ul = document.createElement('ul');
    for(var i=0; i<Math.min(items.length, maxItems); i++){
        var li = document.createElement('li');
        li.setAttribute('tabindex',i+1);
        li.setAttribute('data-list-index', i+1);//keep track of "i"

        //IMAGE
        var img = document.createElement('img');
        if(items[i].querySelector('image')) img.src = items[i].querySelector('image').getAttribute('href');
        li.appendChild(img);

        //TITLE
        li.appendChild(items[i].querySelector('title'));

        //DESCRIPTION
        var desc = items[i].querySelector('description');
        desc.textContent = removeTags(desc.textContent);
        li.appendChild(desc);

        ul.appendChild(li);
    }

    //Put in DOM
    document.body.appendChild(xml.querySelector('title'));
    document.body.appendChild(ul);

    document.querySelector('ul li').focus();
    document.body.classList.remove('loading');

}

var onKeyDown = function(evt){
    if(evt.keyCode == KEYS.UP){
        var i = Math.max(1, evt.target.getAttribute('data-list-index')-1);
        var next = document.querySelector('ul li:nth-child(' + i + ')');
        evt.preventDefault();//don't let window scroll down
        next.focus();

    //go down to next item, or if hit the bottom, go to the top of the list (circular)
    }else if(evt.keyCode == KEYS.DOWN){
        var i = +evt.target.getAttribute('data-list-index') + 1;
        var next = document.querySelector('ul li:nth-child(' + i + ')');
        if(!next){
            next = document.querySelector('ul li:nth-child(1)');//go back to first item in list
        }
        console.log("next", next)
        evt.preventDefault();//don't let window scroll down
        next.focus();
    }

    //is the focused item the 1st item? if so, scroll page to top
    if(next && next == document.querySelector('ul li')){
        document.body.scrollTop = 0;
    }
}



// START LOADING RSS ***********************
var onReadyStateChange = function(){
    if(this.readyState == 4){
        if((this.status == 200 || this.status == 304) && this.responseXML){
            var xml = this.responseXML.documentElement;
            var items = xml.querySelectorAll('item');
            showItems(items, xml);
        }else{
            alert('error! ' + this.status)
        }
    }

}

//Go load the RSS file
var x = new XMLHttpRequest();
x.addEventListener('readystatechange', onReadyStateChange);
x.open('GET', feedUrl, true);
x.send('');



//Subscribe to window events
window.addEventListener('keydown', onKeyDown);

