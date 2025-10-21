// Getting all the elements
const seekbar = document.getElementById("seekbar");
const playbutton = document.getElementById("play-btn");
const prevbutton = document.getElementById("prev-btn");
const nextbutton = document.getElementById("next-btn");
const cursongelement = document.getElementById("cur-song-name");
const cursongdurelement = document.getElementById("cur-song-dur");

// Declaring and Initializing global variables
const songs = [
  { songname: "Jhoome-Jo-Pathaan.mp3", duration: "3:28" },
  { songname: "Pasoori.mp3", duration: "3:44" },
  { songname: "Hymn-for-the-Weekend.mp3", duration: "4:18" },
  { songname: "Naacho-Naacho.mp3", duration: "3:34" },
  { songname: "Teri-Meri-Kahani.mp3", duration: "5:35" },
  { songname: "Millionaire.mp3", duration: "3:19" },
  { songname: "Pyaar-Hota-Kayi-Baar.mp3", duration: "3:36" },
  { songname: "You-Are-My-Specialz.mp3", duration: "1:31" },
  { songname: "Teri-Baaton-Mein-Aisa.mp3", duration: "2:32" },
  { songname: "Senorita.mp3", duration: "3:51" },
  { songname: "Fukashigi-No-Carte.mp3", duration: "3:59" },
];
let ind = 0; // Index of the current song
let songname = songs[ind].songname; // Name of the current song
let song_duration = songs[ind].duration; // Duration of the current song
let audio = new Audio(`./musics/${songname}`); // Audio object for the current song

//Function to list all the songs in the library section
function displaySong(songs) {
  songs.forEach((element, index) => {
    let songitem = document.createElement("div");
    songitem.setAttribute("class", "song-item");
    songitem.innerHTML = `<span>${modifySongName(
      element.songname
    )}</span> <span class="play-this" id="${index}"> ${
      element.duration
    } <i class="fa-solid fa-play"></i> </span>`;
    document.querySelector(".song-list").appendChild(songitem);
  });
}

function modifySongName(songname) {
  if (typeof songname !== "string") {
    alert("Invalid song name!");
    return "Unknown Song";
  }
  let newsongname = songname.replace('-',' ');
  return newsongname;
}

displaySong(songs);

// Adding event listeners
playbutton.addEventListener("click", () => {
  // Changing the play button in the main section
  // Checking if the song is not playing
  // If not playing then play the song and change the button to pause
  if (playbutton.querySelector("i").classList.contains("fa-play")) {
    playbutton.querySelector("i").classList.remove("fa-play");
    playbutton.querySelector("i").classList.add("fa-pause");
    // Changing the buttons in the library section
    let play_this_btn = document.getElementById(ind).querySelector("i");
    play_this_btn.classList.remove("fa-play");
    play_this_btn.classList.add("fa-pause");
    audio.play();
  }
  // If the song is playing then pause the song and change the button to play
  else {
    let play_this_btn = document.getElementById(ind).querySelector("i");
    play_this_btn.classList.remove("fa-pause");
    play_this_btn.classList.add("fa-play");
    playbutton.querySelector("i").classList.remove("fa-pause");
    playbutton.querySelector("i").classList.add("fa-play");
    audio.pause();
  }
});

nextbutton.addEventListener("click", () => {
  // Changing the buttons in the library section
  let play_this_btn = document.getElementById(ind).querySelector("i");
  play_this_btn.classList.remove("fa-pause");
  play_this_btn.classList.add("fa-play");
  // Changing the current song
  ind = (ind + 1) % songs.length;
  songname = songs[ind].songname;
  song_duration = songs[ind].duration;
  audio.src = `./musics/${songname}`;
  audio.currentTime = 0;
  audio.play();
  cursongelement.innerHTML = modifySongName(songname);
  cursongdurelement.innerHTML = song_duration;
  // Changing the buttons in the library section
  play_this_btn = document.getElementById(ind).querySelector("i");
  play_this_btn.classList.remove("fa-play");
  play_this_btn.classList.add("fa-pause");
});

prevbutton.addEventListener("click", () => {
  // Changing the buttons in the library section
  let play_this_btn = document.getElementById(ind).querySelector("i");
  play_this_btn.classList.remove("fa-pause");
  play_this_btn.classList.add("fa-play");
  // Changing the current song
  ind = (ind - 1 + songs.length) % songs.length;
  songname = songs[ind].songname;
  song_duration = songs[ind].duration;
  audio.src = `./musics/${songname}`;
  audio.currentTime = 0;
  audio.play();
  cursongelement.innerHTML = modifySongName(songname);
  cursongdurelement.innerHTML = song_duration;
  // Changing the buttons in the library section
  play_this_btn = document.getElementById(ind).querySelector("i");
  play_this_btn.classList.remove("fa-play");
  play_this_btn.classList.add("fa-pause");
});

// Resetting seekbar and updating duration display when metadata loads
audio.addEventListener("loadedmetadata", () => {
  seekbar.value = 0;
  cursongdurelement.innerHTML = `00:00/${song_duration}`;
});

// Updating the seekbar and current song played time
audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration) && audio.duration > 0) {
    seekbar.value = parseInt((audio.currentTime / audio.duration) * 100);
    let curmins = Math.floor(audio.currentTime / 60);
    let cursecs = Math.floor(audio.currentTime - curmins * 60);
    if (cursecs < 10) cursecs = "0" + cursecs;
    if (curmins < 10) curmins = "0" + curmins;
    cursongdurelement.innerHTML = curmins + ":" + cursecs + "/" + song_duration;
  }
});

// Changing the song when the current song ends
audio.addEventListener("ended", () => {
  let play_this_btn = document.getElementById(ind).querySelector("i");
  play_this_btn.classList.remove("fa-pause");
  play_this_btn.classList.add("fa-play");
  ind = (ind + 1) % songs.length;
  songname = songs[ind].songname;
  song_duration = songs[ind].duration;
  audio.src = `./musics/${songname}`;
  audio.currentTime = 0;
  audio.play();
  cursongelement.innerHTML = modifySongName(songname);
  cursongdurelement.innerHTML = song_duration;
  play_this_btn = document.getElementById(ind).querySelector("i");
  play_this_btn.classList.remove("fa-play");
  play_this_btn.classList.add("fa-pause");
});

// Changing the current time of the song
seekbar.addEventListener("change", () => {
  audio.currentTime = parseInt((seekbar.value * audio.duration) / 100);
});

// Adding event listeners to buttons in the library section
document.querySelectorAll(".song-item").forEach((element, index) => {
  let play_this_btn = element.querySelector(".play-this").querySelector("i");
  play_this_btn.addEventListener("click", () => {
    if (play_this_btn.classList.contains("fa-play")) {
      // Changing the previous playing song button in the library section
      let play_prev_btn = document.getElementById(ind).querySelector("i");
      play_prev_btn.classList.remove("fa-pause");
      play_prev_btn.classList.add("fa-play");
      // Changing the current playing song button in the library section
      play_this_btn.classList.remove("fa-play");
      play_this_btn.classList.add("fa-pause");
      // Changing the play button in the main section
      playbutton.querySelector("i").classList.remove("fa-play");
      playbutton.querySelector("i").classList.add("fa-pause");
      // Changing the current song
      if (ind != index) {
        ind = index;
        songname = songs[ind].songname;
        song_duration = songs[ind].duration;
        audio.src = `./musics/${songname}`;
        audio.currentTime = 0;
        cursongelement.innerHTML = modifySongName(songname);
        cursongdurelement.innerHTML = song_duration;
      }
      audio.play();
    } else {
      audio.pause();
      play_this_btn.classList.remove("fa-pause");
      play_this_btn.classList.add("fa-play");
      playbutton.querySelector("i").classList.remove("fa-pause");
      playbutton.querySelector("i").classList.add("fa-play");
    }
  });
});
