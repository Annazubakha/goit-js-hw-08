import throttle from 'lodash.throttle';
import Player from '@vimeo/player';
import { save } from './localstorage-api';
import { load } from './localstorage-api';

const iframe = document.querySelector('#vimeo-player');
const STORAGE_KYE = 'videoplayer-current-time';
const player = new Player(iframe);

const onPlay = function (data) {
  save(STORAGE_KYE, data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

player
  .setCurrentTime(load(STORAGE_KYE))
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
