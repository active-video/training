var onKeyDown = function(evt    ){
    console.log(evt.keyIdentifier, Date.now());

    var ul = document.querySelector('ul.outer');
    var last = document.querySelector('ul.outer>li:last-child');
    var first = document.querySelector('ul.outer>li');

    switch(evt.keyIdentifier){
        case 'Left':
            console.log("Moving last ", last, " in front of first, ", first)
            ul.insertBefore(last,first);

            evt.preventDefault();
            break;

        case 'Right':
            console.log("Moving firsts, ", first, " to the end");
            ul.appendChild(first);

            evt.preventDefault();
            break;
    }



}

window.addEventListener('keydown', onKeyDown);