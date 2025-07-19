let audio_elemant = new Audio("songs/1.mp3");
let song_index = 0;
let master_play = document.getElementById("master_play");
let gif = document.querySelector("#gif");
let progres_bar = document.getElementById("myProgressBar");
let song_items = Array.from(document.getElementsByClassName("songItem"));
let current_img_src = "play-solid.svg";

let songs = [
    {name: "Pal Pal", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg"},
    {name: "Haseen", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {name: "Into you", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {name: "Paro", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg"},
    {name: "Jugraafiya", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"}
];

progres_bar.value = 0;

song_items.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("song_name")[0].innerText = songs[i].name;
});

// Handle play/pause click
master_play.addEventListener('click', () => {
    if(audio_elemant.paused || audio_elemant.currentTime <= 0){
        audio_elemant.play();
        // pause icon ko play icon main badal
        master_play.src = "pause-solid.svg";
        gif.style.opacity = 1;
        document.getElementById(`${song_index}`).src = current_img_src = "pause-solid.svg";
    }
    else{
       audio_elemant.pause();
        // play icon ko paue icon main badal 
        master_play.src = "play-solid.svg";
        gif.style.opacity = 0;
        document.getElementById(`${song_index}`).src = current_img_src =  "play-solid.svg";
    }
})

function play_next_song() {
    document.getElementById(`${song_index}`).src = "play-solid.svg";
    if (song_index >= songs.length) {
        song_index = 0;
    } else {
        song_index++;
    }
    audio_elemant.src = `songs/${song_index + 1}.mp3`;
    audio_elemant.currentTime = 0;
    audio_elemant.play();
    master_song.innerText = songs[song_index].name;
    document.getElementById(`${song_index}`).src = "pause-solid.svg";
}

// listen to Events 
audio_elemant.addEventListener('timeupdate', () => {
    progress = parseInt((audio_elemant.currentTime/audio_elemant.duration) * 100);
    if(progress == 100){
        play_next_song();
    }
    progres_bar.value = progress;
})

progres_bar.addEventListener('change', ()=>{
    audio_elemant.currentTime = (progres_bar.value  * audio_elemant.duration)/100;
})

const make_all_paly = ()=>{
    Array.from(document.getElementsByClassName('song_item_paly')).forEach((element)=>{
       element.src = "play-solid.svg";
    })
}

let master_song = document.getElementById("master_song");

Array.from(document.getElementsByClassName('song_item_paly')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        make_all_paly();
        if (current_img_src == "pause-solid.svg") {
            gif.style.opacity = 0;
            audio_elemant.pause();
            master_play.src = "play-solid.svg";
        } else {
            e.target.src = current_img_src = "pause-solid.svg";
            gif.style.opacity = 1;
            song_index = parseInt(e.target.id);
            audio_elemant.src = `songs/${song_index + 1}.mp3`;
            audio_elemant.currentTime = 0;
            audio_elemant.play();
            master_song.innerText = songs[song_index].name;
            master_play.src = "pause-solid.svg";
        }
    })
})

document.getElementById('forward').addEventListener('click', () => {
    document.getElementById(`${song_index}`).src = "play-solid.svg";
    if(song_index >= songs.length){
        song_index = 0;
    } else{
        song_index++;
    }  
    audio_elemant.src = `songs/${song_index + 1}.mp3`;
    audio_elemant.currentTime = 0;
    audio_elemant.play();
    master_song.innerText = songs[song_index].name;
    document.getElementById(`${song_index}`).src = "pause-solid.svg";
});

document.getElementById('backward').addEventListener('click', () => {
    document.getElementById(`${song_index}`).src = "play-solid.svg";
    if(song_index <= 0){
        song_index = songs.length - 1;
    } else {
        song_index--;
    }  
    audio_elemant.src = `songs/${song_index + 1}.mp3`;
    audio_elemant.currentTime = 0;
    audio_elemant.play();
    master_song.innerText = songs[song_index].name;
    document.getElementById(`${song_index}`).src = current_img_src = "pause-solid.svg";
});