var mode = 'main';

var getAsFragment = function(elems){
    var frag = document.createDocumentFragment();
    for(var i=0; i<elems.length; i++){
        frag.appendChild(elems[i]);
    }
    return frag;
}

var onKeyDown = function(evt    ){
    console.log(evt.keyIdentifier, evt.keyCode, Date.now());

    var ul = document.querySelector('ul');

    //MAIN VIEW ================================================
    if(mode == 'main'){
        switch(evt.keyCode){
            case 37:
                var elements = document.querySelectorAll('ul.list1 li:nth-child(n+29)');
                ul.insertBefore(getAsFragment(elements), document.querySelector('li'));
                evt.preventDefault();
                break;
            case 39:
                var elements = document.querySelectorAll('ul.list1 li:nth-child(-n+7)');
                ul.appendChild(getAsFragment(elements));
                evt.preventDefault();
                break;
            case 13:
                mode = 'list';
                document.body.classList.add('list');
                break;
            case 8:
                //evt.preventDefault();
                break;
        }

    //EXPANDED LIST VIEW ================================================
    }else if(mode == 'list'){
        switch(evt.keyCode){
            case 13:
                mode = 'list';
                document.body.classList.add('animating');
                document.body.classList.add('detail');
                setTimeout(function(){
                    document.body.classList.remove('animating');
                }, 400);
                mode = 'detail';
                break;

            case 37:
                var first = document.querySelector('ul.list1 li:nth-child(n+15)');
                var last = document.querySelector('ul.list1 li:nth-child(n+21)');

                ul.insertBefore(first, last);
                evt.preventDefault();
                break;
            case 39:
                var first = document.querySelector('ul.list1 li:nth-child(n+15)');
                var last = document.querySelector('ul.list1 li:nth-child(n+20)');

                ul.insertBefore(last, first);
                evt.preventDefault();
                break;

            case 8:
                mode = 'main';
                document.body.classList.remove('list');
                evt.preventDefault();
                break;
        }

        //DETAIL VIEW ================================================
    }else if(mode == 'detail'){
        switch(evt.keyCode){
            case 8:
                mode = 'list';
                document.body.classList.remove('detail');
                evt.preventDefault();
                break;
        }
    }



}


window.addEventListener('keydown', onKeyDown);
window.addEventListener('load', function(){
    var lis = document.querySelectorAll('li:not(.p)');
    for(var i=0; i<lis.length;i++){
        lis[i].style.backgroundImage = 'url(../../resources/images/'+i+'.jpg)';
    }
})