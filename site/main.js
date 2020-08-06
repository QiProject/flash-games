var baseURL = "https://github.com/tsukisuperior/flash-games/blob/master/public/",           //The base url for the repo
    message = document.getElementById("message"),                                           //The message element at the top of the page
    files = [],                                                                             //the list of file names
    list = document.getElementById("list"),                                                 //file listing dropdown box
    exceptedFiles = /\.git*/;                                                               //Regular Expression to find .gitingore and the such

function getFileListing(target) {                                                           //gets file listing from github repo
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            for (var x = 0; x < response.length; x++) {
                files.push(response[x].name);
            }
            refreshGames();
        }
    };
    xhttp.open("GET", target, true);
    xhttp.send();
}

function refreshGames() {                                                                    //Fills in the dropdown box of games
    var element;
    for (var x = 0; x < files.length; x++) {
        if (exceptedFiles.test(files[x])) {                                                  //ignores the .git* files
            continue;
        }
        element = document.createElement("option");
        list.appendChild(element);
        element.innerHTML = files[x];
    }

}

getFileListing("https://api.github.com/repos/tsukisuperior/flash-games/contents");            //get the listing


