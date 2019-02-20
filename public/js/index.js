window.onload = function(){
    fetch('/quotes',{ method: 'GET' })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            //console.log(myJson);
            for(let i = 0; i < myJson.length; i++){
                let select = document.getElementById('quotes');
                let option = document.createElement('option');
                option.setAttribute('id', myJson[i]._id);
                option.innerHTML = `"${myJson[i].quote}" by "${myJson[i].author}"`;
                select.append(option);
            };

            let increment = 0;
            loop = function(){
                if(increment < myJson.length){
                    increment++;
                }else if(increment == myJson.length){
                    increment = 1;
                };
                //console.log(increment-1);
                currentQuote.innerHTML = `"${myJson[increment-1].quote}"`;
                currentAuthor.innerHTML = myJson[increment-1].author;
                setTimeout(function(){ loop(); }, 5000);
            };
            loop();
        });
};

document.getElementById('quotes').addEventListener('change', function(){
    let selected = this.selectedIndex;
    let string = quotes[selected].innerHTML;
    let split = string.split('"');
    document.getElementById('quote').value = split[1];
    document.getElementById('author').value = split[3];
});

document.getElementById('create').addEventListener('click', function(e){
    //e.preventDefault();

    let quote = document.getElementById('quote').value;
    let author = document.getElementById('author').value;

    if (quote == ""){
        quote = "Unknown Quote";
    };
    if (author == ""){
        author = "Unknown Author";
    };

    const options = { 
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({'quote':`${quote}`,'author':`${author}`})
    };

    fetch('/quote/create',options);
});

document.getElementById('delete').addEventListener('click', function(e){
    //e.preventDefault();

    let quotes = document.getElementById('quotes');
    let selected = quotes.selectedIndex;
    let id = quotes[selected].getAttribute('id');

    const options = { 
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({'id':`${id}`})
    };

    fetch('/quote/delete',options);
});

document.getElementById('update').addEventListener('click', function(e){
    //e.preventDefault();

    let quotes = document.getElementById('quotes');
    let selected = quotes.selectedIndex;
    let id = quotes[selected].getAttribute('id');

    let quote = document.getElementById('quote').value;
    let author = document.getElementById('author').value;

    const options = { 
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({'id':`${id}`,'quote':`${quote}`,'author':`${author}`})
    };

    fetch('/quote/update',options);
});

document.getElementById('read').addEventListener('click', function(e){
    e.preventDefault();

    let quotes = document.getElementById('quotes');
    let selected = quotes.selectedIndex;
    let id = quotes[selected].getAttribute('id');

    fetch(`/quote/read?id=${id}`,{ method: 'GET' })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
        });
});