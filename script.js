const icons = document.querySelectorAll(".section1Icon i");
var mysong = document.getElementById("mysong");
var icon = document.getElementById("iconPlayPause");
var bars = document.getElementById("bars");

let previous = document.querySelector("#pre");
let play = document.querySelector("#play");
let next = document.querySelector("#next");
let recent_volume = document.querySelector("#volume");
let volume_show = document.querySelector("#volume_show");
let slider = document.querySelector("#duration_slider");

let artist = document.querySelector("#artist");
const spinner = document.getElementById("spinner");

//Header Animation Icons
let i = 1;
setInterval(() => {
  i++;
  const icon = document.querySelector(".section1Icon .change");
  icon.classList.remove("change");

  if (i > icons.length) {
    icons[0].classList.add("change");
    i = 1;
  } else {
    icon.nextElementSibling.classList.add("change");
  }
}, 2000);

let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement("audio");

//All songs list
let All_song = [
  {
    path: "https://securestreams8.autopo.st:3019/1",
    name: "Punjabi Hits",
  },
  {
    path: "https://s2.radio.co/sbb640c97c/listen",
    name: "Punjabi Non-Stop",
  },
  {
    path: "https://s6.yesstreaming.net/proxy/john1237?mp=/live",
    name: "Bollywood Remixes",
  },

  {
    path: "https://securestreams8.autopo.st:3001/1",
    name: "Hungama Bollywood",
  },
  {
    path: "https://drive.uber.radio/uber/bollywoodlove/icecast.audio",
    name: "Ishq FM",
  },
  {
    path: "http://198.50.156.92:8255/stream/1/",
    name: "Classic Bollywood",
  },
  {
    path: "http://217.13.107.32:8000/stream/1/",
    name: "Indie Pop",
  },
  {
    path: "http://188.165.240.90:9510/stream/1/",
    name: "Bollywood Mixer",
  },

];

//Music Player Functionality
// function load the tracks
function load_track(index_no) {
  clearInterval(timer);

  track.src = All_song[index_no].path;
  artist.innerHTML = All_song[index_no].name;
  track.load();

  timer = setInterval(range_slider, 1000);
}

load_track(index_no);

//mute sound function
function mute_sound() {
  track.volume = 0;
  volume.value = 0;
  volume_show.innerHTML = 0;
}

// checking.. the song is playing or not
function justplay() {
  if (Playing_song == false) {
    playsong();
    spinner.classList.toggle('elem');
  } else {
    pausesong();
    spinner.classList.remove('elem');
  }
}

// play song
function playsong() {
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  // spinner.classList.toggle('elem');
  
}

//pause song
function pausesong() {
  track.pause();
  Playing_song = false;
  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  // spinner.classList.remove('elem');
}

// next song
function next_song() {
  if (index_no < All_song.length - 1) {
    index_no += 1;
    load_track(index_no);
    playsong();
   
  } else {
    index_no = 0;
    load_track(index_no);
    playsong();
  }
}

// previous song
function previous_song() {
  if (index_no > 0) {
    index_no -= 1;
    load_track(index_no);
    playsong();
  } else {
    index_no = All_song.length;
    load_track(index_no);
    playsong();
  }
}

// change volume
function volume_change() {
  volume_show.innerHTML = recent_volume.value;
  track.volume = recent_volume.value / 100;
}

function range_slider() {
  let position = 0;

  // update slider position
  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    slider.value = position;
  }

  // function will run when the song is over
  if (track.ended) {
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    if (autoplay == 1) {
      index_no += 1;
      load_track(index_no);
      playsong();
    }
  }
}
