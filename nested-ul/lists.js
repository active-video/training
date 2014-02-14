var onKeyDown = function(evt    ){
    console.log(evt.keyIdentifier, Date.now());

    var ul = document.querySelector('ul.outer');
    var last = document.querySelector('ul.outer>li:last-child');
    var first = document.querySelector('ul.outer>li');

    switch(evt.keyIdentifier){
        case 'Left':
            console.log("Moving last ", last, " in front of first, ", first)
            ul.insertBefore(last,first)//.classList.add('cycleRight');
            //setTimeout(function(){last.classList.remove('cycleRight');},0);
            evt.preventDefault();
            break;

        case 'Right':
            console.log("Moving firsts, ", first, " to the end");
            ul.appendChild(first)//.classList.add('cycleLeft');
            //setTimeout(function(){first.classList.remove('cycleLeft');}, 0);
            evt.preventDefault();
            break;
    }



}

window.addEventListener('keydown', onKeyDown);