var mode = "home";
var onKeyDown = function(evt    ){
    console.log(evt.keyIdentifier, Date.now());

    var ul = document.querySelector('ul.outer');
    var last = document.querySelector('ul.outer>li:last-child');
    var first = document.querySelector('ul.outer>li');

    if(mode === "home"){
        switch(evt.keyCode){
            case KEYS.LEFT:
                console.log("Moving last ", last, " in front of first, ", first)
                ul.insertBefore(last,first);

                evt.preventDefault();
                break;

            case KEYS.RIGHT:
                console.log("Moving firsts, ", first, " to the end");
                ul.appendChild(first);

                evt.preventDefault();
                break;

            case KEYS.ENTER:
                var p = document.querySelector('ul.outer>li:nth-child(4)>ul');

                var lis = p.querySelectorAll('li');

                if(lis.length < 10){
                    var items = document.createDocumentFragment(),
                        li;

                    for(var i=0; i<14; i++){
                        li = document.createElement('li');
                        li.style.backgroundImage = 'url(../../resources/images/'+(i%36)+'.jpg)';
                        items.appendChild(li);
                    }


                    p.appendChild(items);
                    p.setAttribute('data-children-loaded','1');



                                //.add(),.remove(),.contains()

                }

                document.body.classList.remove('list-view');
                finishDomOperations();

                document.body.classList.add('cat');

                mode = 'cat';

                break;

        }
    }else if(mode == 'cat'){

        switch(evt.keyCode){
            case KEYS.BACK:
            case KEYS.EXIT:
            case KEYS.LAST:
                document.body.classList.remove('cat');
                evt.preventDefault();
                mode = 'home';



                var element = document.querySelector('ul.outer>li:nth-child(4)>ul li');

                var removeListener = function(){
                    element.removeEventListener('transitionend', afterAnimation);
                }
                var afterAnimation = function(){
                    document.body.classList.add('list-view');

                    var elements = document.querySelectorAll('.list-view ul.outer li ul li:nth-child(n+7):nth-child(-n+20)');
                    for(var i=0; i<elements.length; i++){
                        elements[i].parentNode.removeChild(elements[i]);
                    }

                    removeListener();
                }

                element.addEventListener('transitionend', afterAnimation);


                break;
        }

    }


}

function finishDomOperations(){
    return document.body.scrollTop;
}

window.addEventListener('keydown', onKeyDown);

window.addEventListener('load', function(){
    var lis = document.querySelectorAll('ul.outer>li>ul>li');
    for(var i=0; i<lis.length;i++){
        lis[i].style.backgroundImage = 'url(../../resources/images/'+(i%36)+'.jpg)';
    }
})