document.addEventListener("DOMContentLoaded", () => {
  const audioPlayer = document.querySelector(".audio__player");
  const playPauseButton = document.querySelector(
    ".content__button--play-pause"
  );
  const volumeBtn = document.querySelector(".content__volume-btn");
  const volumeSlider = document.getElementById("volume-slider");
  const closeLisbutton = document.getElementById("footer__close-list");
  const songListButton = document.querySelector(".footer__list-button");
  const songList = document.querySelector(".footer__song-list");
  const songItems = document.querySelectorAll(".footer__song-list li");
  const progressContainer = document.querySelector(".content__progress");
  const progress = document.querySelector(".content__progress-bar");
  const currentTimeEl = document.querySelector(".content__current-time");
  const durationEl = document.querySelector(".content__duration");
  const albumArt = document.querySelector(".header__image");
  const songTitleEl = document.querySelector(".content__song-title");
  const artistNameEl = document.querySelector(".content__artist-name");
  const skipForwardButton = document.querySelector(
    ".content__button--skip-forward"
  );
  const skipBackwardButton = document.querySelector(
    ".content__button--skip-backward"
  );

  let isPlaying = false;
  let songIndex = 0;

  const song = [
    {
      title: "Congratulations (con Bilal)",
      artist: "Mac Miller",
      src: "./songs/Mac Miller - Congratulations (feat. Bilal).mp3",
      img: "./images/Mac-Miller-imag2.jpg",
    },
    {
      title: "Say Yes (con Al Baro y A. Cheeze)",
      artist: "Buhodermia 夜",
      src: "./songs/Buhodermia 夜 - Say Yes.mp3",
      img: "./images/Buhodermia.png",
    },
    {
      title: "Virgen",
      artist: "Adolescent's Orquesta",
      src: "./songs/Los Adolescentes - Virgen.mp3",
      img: "./images/Imagen_roblox_bb.jpg",
    },
    {
      title: "A VOS",
      artist: "Milo j",
      src: "./songs/Milo j - A VOS.mp3",
      img: "./images/Imagen_milo_j.jpg",
    },
    {
      title: "See You Again (con Kali Uchis)",
      artist: "Tyler, The Creator",
      src: "./songs/Tyler, The Creator - See You Again (feat. Kali Uchis).mp3",
      img: "./images/Image_de_corazon_manos.jpg",
    },
    {
      title: "Dime Como Llego A Ti",
      artist: "Erick Franchesky",
      src: "./songs/Erick Franchesky - Dime Como Llego A Ti.mp3",
      img: "./images/Imagen_corazon_meli.jpg",
    },
    {
      title: "Cometas",
      artist: "Bacalao Men",
      src: "./songs/Bacalao Men - Cometas.mp3",
      img: "./images/Imagen_roblox_bate.jpg",
    },
    {
      title: "Yebba’s Heartbreak",
      artist: "Drake y Yebba",
      src: "./songs/Drake - Yebba’s Heartbreak.mp3",
      img: "./images/Los_dos_corazones.jpg",
    },
    {
      title: "El Muñeco de la ciudad",
      artist: "Bobby Valentin",
      src: "./songs/Bobby Valentin - El Muñeco de la Ciudad.mp3",
      img: "./images/Image_free.jpg",
    },
    {
      title: "Te quiero",
      artist: "Domingo Quiñones",
      src: "./songs/Domingo Quinones - Te Quiero.mp3",
      img: "./images/imagen_dibujo.jpg",
    },
    {
      title: "El tun tun de tu corazón",
      artist: "Orquesta la palabra",
      src: "./songs/Orquesta La Palabra - El Tun Tun De Tu Corazón.mp3",
      img: "./images/imagen_tun_tun.jpg",
    },
  ];

  function loadSong(song) {
    songTitleEl.textContent = song.title;
    artistNameEl.textContent = song.artist;
    audioPlayer.src = song.src;

    // Forzar la actualización de la imagen
    const newImgUrl = `${song.img}?${new Date().getTime()}`;
    albumArt.src = newImgUrl;
    albumArt.onload = () => {
      // La imagen se ha cargado correctamente
      document.body.style.background = `url(${newImgUrl})`;
    };
  }

  function playSong() {
    isPlaying = true;
    audioPlayer.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
  }

  function pauseSong() {
    isPlaying = false;
    audioPlayer.pause();
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
  }

  function togglePlayPause() {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }

  function updateProgressBar() {
    if (isPlaying) {
      const { duration, currentTime } = audioPlayer;
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;

      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
      }
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }

  function nextSong() {
    songIndex++;
    if (songIndex >= song.length) {
      songIndex = 0;
    }
    loadSong(song[songIndex]);
    playSong();
  }

  function prevSong() {
    songIndex--;
    if (songIndex < 0) {
      songIndex = song.length - 1;
    }
    loadSong(song[songIndex]);
    playSong();
  }

  function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
  }

  function setVolume() {
    audioPlayer.volume = volumeSlider.value / 100;
  }

  function toggleMute() {
    if (audioPlayer.muted) {
      audioPlayer.muted = false;
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
      audioPlayer.muted = true;
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  }

  function toggleSongList() {
    songList.classList.toggle("show");
  }

  function playSelectedSong() {
    songIndex = parseInt(this.dataset.index, 10);
    loadSong(song[songIndex]);
    playSong();
    songList.classList.remove("show");
  }

  playPauseButton.addEventListener("click", togglePlayPause);
  volumeBtn.addEventListener("click", toggleMute);
  volumeSlider.addEventListener("input", setVolume);
  songListButton.addEventListener("click", toggleSongList);
  closeLisbutton.addEventListener("click", toggleSongList);
  songItems.forEach((item) => item.addEventListener("click", playSelectedSong));
  audioPlayer.addEventListener("timeupdate", updateProgressBar);
  audioPlayer.addEventListener("ended", nextSong); // Aquí añadimos el event listener
  progressContainer.addEventListener("click", setProgressBar);
  skipForwardButton.addEventListener("click", nextSong);
  skipBackwardButton.addEventListener("click", prevSong);

  loadSong(song[songIndex]);
});
