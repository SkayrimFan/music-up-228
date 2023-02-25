let container = document.querySelector(`.album`);

let search = new URLSearchParams(window.location.search);

let i = search.get(`i`);
console.log(i);

let album = albums[i];

if(!album)
{
    container.innerHTML = `ОШИБКА! Редирект 5 секунд...`
    setTimeout(() => {
        window.location.pathname = `index.html`
    }, 5000);
} else {

container.innerHTML = `
<div class="card mb-3">
<div class="row">
    <div class="col-md-4">
        <img src="${album.img}" class="img-fluid rounded-start">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${album.title}</h5>
            <p class="card-text">${album.discription}</p>
            <p class="card-text"><small class="text-muted">Сборник собран, это всё что тебе надо знать (${album.year})</small></p>
        </div>
    </div>
</div>
</div>
`
let playlist = document.querySelector(`.playlist`);

let tracks = album.tracks;

for(let j = 0; j < tracks.length; j++){
    let track = tracks[j];
    playlist.innerHTML += `
    <li class="track list-group-item d-flex align-items-center">
    <img src="assets/6ddc87140344472e58d9bf9e1a8cc429.png" class="img-pause me-3" height="30px">
    <img src="assets/png-transparent-cancel-circle-close-delete-dismiss-remove-web-ui-icon.png" class="img-play me-3 d-none" height="30px">
        <div>
            <div>${track.title}</div>
            <div class="text-secondary">${track.time}</div>
            <div class="progress">
            <div class="progress-bar" role="progressbar" width=" 0%;"></div>
            </div>
        </div>
        <div class="ms-auto time">${track.author}</div>
        <audio class="audio" src="${track.src}"></audio>
    </li>
    `
}};

function setupAudio() {

    let trackNodes = document.querySelectorAll(`.track`); 

    for (let i = 0; i < trackNodes.length; i++) {

    let node = trackNodes[i]; 
    let timeNode = node.querySelector(`.time`);
    let imgPause = node.querySelector(`.img-pause`);
    let imgPlay = node.querySelector(`.img-play`);
    let audio = node.querySelector(`.audio`); 
    let progressBar = node.querySelector(`.progress-bar`); 
    let isPlaying = false;

    node.addEventListener(`click`, function(){
        //играет
        if (isPlaying) {
        isPlaying = false;
        audio.pause();
        imgPause.classList.remove(`d-none`);
        imgPlay.classList.add(`d-none`);
        //не играет
        } else {
            isPlaying = true;
            audio.play();
            imgPause.classList.add(`d-none`);
            imgPlay.classList.remove(`d-none`);
            updateProgress();
        }
    });
    function updateProgress() {

        let time = getTime(audio.currentTime)
        if(timeNode.innerHTML != time){
        timeNode.innerHTML = time;
        progressBar.style.width = audio.currentTime*100/audio.duration + `%`;
    }

        if (isPlaying) {
              requestAnimationFrame(updateProgress);
        }   
        
      }
    }
}
setupAudio();
function getTime(time){
    let currentSeconds =  Math.floor(time);
    let minutes = Math.floor(currentSeconds/60);
    let seconds = Math.floor(currentSeconds%60);

    if (minutes < 10)
    {
        minutes = `0` + minutes;
    }
    if (seconds < 10)
    {
        seconds = `0` + seconds;
    }
    return `${minutes}:${seconds}`
}