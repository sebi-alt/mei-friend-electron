import { calcSizeOfContainer } from './resizer.js';
import { openFile } from './main.js';

export function dropHandler(ev) {
  ev.stopPropagation();
  ev.preventDefault();
  // Use DataTransferItemList interface to access the file(s)
  if (ev.dataTransfer.items) {
    let l = ev.dataTransfer.items.length;
    console.log('dropHandler(): ' + l + ' item(s) dropped.');
    for (var i = 0; i < l; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        console.log('... file[' + i + '].name = ' + file.name);
        openFile(file);
        break; // open only first file dropped
      } else {
        console.log('Unrecognized item ' + i + ':', ev.dataTransfer.items[i]);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    let l = ev.dataTransfer.files.length;
    console.log('dropHandler(): ' + l + ' file(s) dropped.');
    for (var i = 0; i < l; i++) {
      let fileName = ev.dataTransfer.files[i].name;
      console.log('... file[' + i + '].name = ' + fileName);
      openFile(fileName);
      break; // open only first file dropped
    }
  }
  off();
}

export function dragOverHandler(ev) {
  ev.stopPropagation();
  ev.preventDefault();
  // console.log('dragOverHandler(): File(s) in drop zone', ev);
  on();
}

export function dragEnter(ev) {
  ev.stopPropagation();
  ev.preventDefault();
  if (ev.target.closest('.dragOverlay') || document.querySelector('.dragOverlay')) {
    // console.log('dragEnter()');
    on();
  }
}

export function dragLeave(ev) {
  ev.stopPropagation();
  ev.preventDefault();
  off();
}

function on() {
  let sz = calcSizeOfContainer();
  // console.log('on()', sz);
  let fc = document.querySelector('.dragOverlay');
  fc.width = sz.width;
  fc.height = sz.height;
  fc.style.display = 'block';
}

function off() {
  // console.log('off()');
  let fc = document.querySelector('.dragOverlay');
  fc.style.display = 'none';
}
