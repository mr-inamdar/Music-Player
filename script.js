let audio_elemant = new Audio("songs/1.mp3");
let song_index = -1;
let master_play = document.getElementById("master_play");
let gif = document.querySelectorAll(".gif");
let progres_bar = document.getElementById("myProgressBar");
let song_items = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {name: "Pal Pal", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg", time: "03:28"},
    {name: "Haseen", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", time: "02:54"},
    {name: "Into you", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", time: "02:12"},
    {name: "Wishes", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", time: "03:38"},
    {name: "Jugraafiya", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", time: "04:38"},
    {name: "Shiddat Titel Track", filePath: "songs/6.mp3", coverPath: "covers/6.jpeg", time: "04:03"},
    {name: "Dil Ibadat", filePath: "songs/7.mp3", coverPath: "covers/7.jpeg", time: "05:54"},
    {name: "Kahani sono 2.0", filePath: "songs/8.mp3", coverPath: "covers/8.jpeg", time: "02:53"},
    {name: "Kabhi Kabhi Aditi", filePath: "songs/9.mp3", coverPath: "covers/9.jpeg", time: "03:38"},
    {name: "Main parinda ho", filePath: "songs/10.mp3", coverPath: "covers/10.jpeg", time: "04:48"}
];

progres_bar.value = 0;

song_items.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("song_name")[0].innerText = songs[i].name;
    element.getElementsByClassName("songlistplay")[0].querySelector('.timeSpan span').innerText = songs[i].time;
});

// Handle play/pause click
master_play.addEventListener('click', () => {
    if(audio_elemant.paused || audio_elemant.currentTime <= 0){
        audio_elemant.play();
        if(song_index === -1){
            song_index = 0;
        }
        // pause icon ko play icon main badal
        master_play.src = "pause-solid.svg";
        gif[0].style.opacity = 1;
        gif[1].style.opacity = 1;
        document.getElementById(`${song_index}`).src = "pause-solid.svg";
    }
    else{
       audio_elemant.pause();
        // play icon ko paue icon main badal 
        master_play.src = "play-solid.svg";
        gif[0].style.opacity = 0;
        gif[1].style.opacity = 0;
        document.getElementById(`${song_index}`).src =  "play-solid.svg";
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

let play_song = Array.from(document.getElementsByClassName('song_item_paly'));
const make_all_play = ()=>{
    play_song.forEach((element)=>{
       element.src = "play-solid.svg";
    })
}

let master_song = document.getElementById("master_song");

play_song.forEach((element) => {
    element.addEventListener('click', (e)=>{
        make_all_play();
        if (parseInt(e.target.id) != song_index) {
            e.target.src = "pause-solid.svg";
            gif[0].style.opacity = 1;
            gif[1].style.opacity = 1;
            song_index = parseInt(e.target.id);
            audio_elemant.src = `songs/${song_index + 1}.mp3`;
            audio_elemant.currentTime = 0;
            audio_elemant.play();
            master_song.innerText = songs[song_index].name;
            master_play.src = "pause-solid.svg";         
        } else{
            gif[0].style.opacity = 0;
            gif[1].style.opacity = 0;
            audio_elemant.pause();
            master_play.src = "play-solid.svg";
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
    document.getElementById(`${song_index}`).src ="pause-solid.svg";
});
let next_song = 4;

const playlist = document.getElementById('songItemContainer');

function scroll_songs_up() {
    const first_song =  playlist.children[0];

    first_song.classList.add('fade_out_up');

    setTimeout(() => {
        if (next_song >= songs.length - 1) {
            next_song = 0;
        } else {
            next_song++;
        }
        first_song.classList.remove('fade_out_up');
        first_song.getElementsByTagName('img')[0].src = songs[next_song].coverPath;
        first_song.getElementsByClassName('song_name')[0].innerText = songs[next_song].name;
        first_song.getElementsByClassName("songlistplay")[0].querySelector('.timeSpan span').innerText = songs[next_song].time;
        first_song.getElementsByClassName("songlistplay")[0].querySelector('.timeSpan img').id = `${next_song}`;

        playlist.appendChild(first_song);
    }, 500);
}

let index = [5, 6, 7, 8, 9, 0, 1, 2, 3, 4];

function scroll_songs_down() {
    const last_song =  playlist.children[4];

    last_song.classList.add('fade_out_down');

    setTimeout(() => {
        last_song.classList.remove('fade_out_down');
         
        last_song.getElementsByTagName('img')[0].src = songs[index[next_song]].coverPath;
        last_song.getElementsByClassName('song_name')[0].innerText = songs[index[next_song]].name;
        last_song.getElementsByClassName("songlistplay")[0].querySelector('.timeSpan span').innerText = songs[index[next_song]].time;
        last_song.getElementsByClassName("songlistplay")[0].querySelector('.timeSpan img').id = `${index[next_song]}`;
        playlist.insertBefore(last_song, playlist.children[0]);
        if (next_song == 0) {
            next_song = songs.length - 1;
        } else {
            next_song--;
        } 
    }, 500);
}
let bool = false;
playlist.addEventListener("wheel", function(e) {
    if (!bool) {
        bool = true;
        if (e.deltaY > 0) {
            console.log("scroll up")
            scroll_songs_up();       
        } else {
            console.log("scroll down")
            scroll_songs_down();
        }
    }
    setTimeout(() => {
        bool = false;
    }, 20000);
});

let touchStartY = 0;

playlist.addEventListener('touchmove', function(e) {
    let touchEndY = e.touches[0].clientY;
    let deltaY = touchStartY - touchEndY;
    if (!bool) {
        if (deltaY > 10) {
            scroll_songs_up();
        } else if (deltaY < -10) {
            scroll_songs_down();
        }
    }
    setTimeout(() => {
        bool = false;
    }, 20000);
});

// playlist.addEventListener('mousescroll', scroll_songs);
// setInterval(scroll_songs_up, 10000);

// playlist.addEventListener("touchstart",()=>{
//     if(!bool){
//         bool = true;
//         scroll_songs_down()
//     }
//     setTimeout(() => {
//          bool = false;
//     }, 20000);
// });
// playlist.addEventListener("touchend", ()=>{
//     if(!bool){
//         bool = true;
//         scroll_songs_up()
//     }
//     setTimeout(() => {
//          bool = false;
//     }, 20000);
// });
    