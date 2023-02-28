const icons = document.querySelectorAll(".section1Icon i");
let previous = document.querySelector("#pre");
let play = document.querySelector("#play");
let next = document.querySelector("#next");
let recent_volume = document.querySelector("#volume");
let volume_show = document.querySelector("#volume_show");
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

//music functionality starts
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
    img: "./assets/punjabihits.png",
  },

  {
    path: "http://stream.radiobollyfm.in:8201/hd?type=http&nocache=171734",
    name: "Bollywood Hits",
    img: "./assets/hindi hits.png",
  },

  {
    path: "https://stream.zeno.fm/vrqrkmrfkzzuv",
    name: "Karan Aujla Radio",
    img: "./assets/karanaujla.png",
  },

  {
    path: "https://bolpunjabi-ekamsoftware.radioca.st//stream",
    name: "Bol Punjabi Radio",
    img: "./assets/bolPunjabiRadio.png",
  },

  {
    path: "https://securestreams8.autopo.st:3001/1",
    name: "Hungama Bollywood",
    img: "./assets/hungama.png",
  },

  {
    path: "https://s2.radio.co/sbb640c97c/listen",
    name: "Punjabi Non-Stop",
    img: "./assets/punjabiNonStop.png",
  },

  {
    path: "https://stream.zeno.fm/szh14bya1feuv",
    name: "Gaana Only",
    img: "./assets/ganaOnly.png",
  },

  {
    path: "https://stream.zeno.fm/1k0y9f0cm0quv",
    name: "Punjabi Charts",
    img: "./assets/punjabiCharts.png",
  },

  {
    path: "https://stream.zenolive.com/0xsvm1nr7a5tv",
    name: "Old Hindi Songs",
    img: "./assets/ClassicHindi.png",
  },
  {
    path: "https://tunein-icecast.mediaworks.nz/humm_128kbps",
    name: "HUMM Fm Nz",
    img: "./assets/Humm.png",
  },
];

//Music Player Functionality
// function load the tracks
function load_track(index_no) {
  clearInterval(timer);

  track.src = All_song[index_no].path;
  spinner.src = All_song[index_no].img;
  artist.innerHTML = All_song[index_no].name;
  track.load();
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
    spinner.classList.toggle("elem");
  } else {
    pausesong();
    spinner.classList.remove("elem");
  }
}

// play song
function playsong() {
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong() {
  track.pause();
  Playing_song = false;
  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
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
