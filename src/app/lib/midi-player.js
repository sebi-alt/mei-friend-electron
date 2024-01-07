import { cm, v, requestMidiFromVrvWorker } from './main.js';
// import * as expansionMap from './expansion-map.js';

export let midiTimeout; // javascript timeout between last edit and MIDI re-render
export const midiDelay = 400; // in ms, delay between last edit and MIDI re-render
export let mp = document.getElementById('midi-player'); // midi player
let timemap;
let timemapIdx = 0;
let lastOnsetIdx = 0; // index in timemap of last onset
let lastReportedTime = 0; // time (s) of last reported note fired (used to check slider shifts)
let playbackOnLoad = false; // request immediate play on load
let expansionMap;
let highlightId = 'data-highlight';

export function seekMidiPlaybackToSelectionOrPage() {
  unHighlightAllElements(); // close all highlighted notes
  // on load, seek to first currently selected element (or first note on page)
  let seekToNote = v.findFirstNoteInSelection() || document.querySelector('.note');
  if (seekToNote) {
    console.log('MidiPlayer.seekMidiPlaybackToSelectionOrPage(): ', seekToNote);
    // v.getTimeForElement(seekToNote.id, true); // will trigger a seekMidiPlaybackTo
    // Instead of asking toolkit for element time, ask timemap (WG, 14 Aug 2023)
    let t = getTimeFromTimemap(seekToNote.id);
    if (t >= 0) {
      seekMidiPlaybackToTime(t);
    } else {
      console.warn("midi-player: Can't find time stamp for note " + seekToNote.id + 'to seek MIDI playback to');
    }
  } else {
    console.warn("midi-player: Can't find a note to seek MIDI playback to");
  }
  timemapIdx = 0;
} // seekMidiPlaybackToSelectionOrPage()

export function seekMidiPlaybackToTime(t) {
  // seek MIDI playback to time (in milliseconds)
  if (mp) {
    if (mp.playing) {
      mp.stop();
      mp.currentTime = t / 1000;
      mp.start();
    } else {
      mp.currentTime = t / 1000;
    }
  }
  timemapIdx = 0;
  unHighlightAllElements(); // close all highlighted notes
  if (playbackOnLoad) {
    playbackOnLoad = false;
    mp.start();
  }
} // seekMidiPlaybackToTime()

export function highlightNotesAtMidiPlaybackTime(ev = false) {
  let highlightCheckbox = document.getElementById('highlightCurrentlySoundingNotes');
  let pageFollowCheckbox = document.getElementById('pageFollowMidiPlayback');
  let scrollFollowCheckbox = document.getElementById('scrollFollowMidiPlayback');
  // Only if user has requested at least one of the features that track currently sounding notes...
  if (highlightCheckbox.checked || scrollFollowMidiPlayback.checked || pageFollowCheckbox.checked) {
    let t;
    if (ev) {
      t = ev.detail.note.startTime * 1000; // convert to milliseconds
    } else {
      t = lastReportedTime;
    }
    const currentlyHighlightedNotes = Array.from(document.querySelectorAll('g.note.currently-playing'));
    const firstNoteOnPage = document.querySelector('.note');
    let closestTimemapTime;

    // increment to current element in timemap
    if (t < lastReportedTime) {
      timemapIdx = 0;
    }
    lastReportedTime = t;
    // increment timemapIdx to current event, ignore 1-ms diff
    while (
      timemap.length > 0 &&
      Math.round(timemap[timemapIdx].tstamp) + 1 < Math.round(t) &&
      timemapIdx < timemap.length
    ) {
      timemapIdx++;
    }

    // console.log('timemap tstamp: ' + timemap[timemapIdx].tstamp + '; midi t: ' + t);

    // go back from current timemapIdx to 'close' highlighted notes
    // 129 ms; with timemapIdx reduced to 66 ms with Op. 120 last two pages
    let ix = timemapIdx;
    while (ix >= 0 && timemap.length > 0) {
      if ('off' in timemap[ix]) {
        let i = currentlyHighlightedNotes.length - 1;
        while (i >= 0) {
          if (timemap[ix].off.includes(currentlyHighlightedNotes[i].getAttribute(highlightId))) {
            unhighlightNote(currentlyHighlightedNotes[i]);
            currentlyHighlightedNotes.splice(i, 1);
          }
          i = Math.min(currentlyHighlightedNotes.length - 1, --i);
        }
      }
      if ('on' in timemap[ix] && timemap[ix].on.includes(firstNoteOnPage.id)) {
        break;
      }
      ix--;
    } // while()

    // at last onset, program the closing of events in the future
    if (timemapIdx === lastOnsetIdx) {
      let j = timemapIdx;
      while (j++ < timemap.length - 1) {
        if ('off' in timemap[j]) {
          timemap[j].off.forEach((id) => {
            let note = document.getElementById(id);
            setTimeout(() => unhighlightNote(note), timemap[j].tstamp - t, note);
          });
        }
        // last item in timemap, stop player
        if (j === timemap.length - 1) {
          setTimeout(() => mp.stop(), timemap[j].tstamp - t, mp);
        }
      }
    }
    closestTimemapTime = timemap[timemapIdx];

    // highlight notes and turn pages
    if (closestTimemapTime && 'on' in closestTimemapTime) {
      for (let id of closestTimemapTime['on']) {
        let origId = id;
        if (expansionMap && id in expansionMap) {
          origId = expansionMap[id][0]; // use local object for lookup
          // id = expansionMap.getNotatedIdForElement(id);
        }
        let note = document.getElementById(origId);
        if (note && highlightCheckbox.checked) {
          highlightNote(note, id);
          // search for corresponding note-off and check whether onset there
          for (let i = timemapIdx + 1; i < timemap.length - 1; i++) {
            if ('off' in timemap[i] && timemap[i].off.includes(id)) {
              if (!('on' in timemap[i])) {
                // if no onset, program unhighlightening of that note
                setTimeout(() => unhighlightNote(note), timemap[i].tstamp - t, note);
              }
              break;
            }
          }
        } else if (pageFollowCheckbox.checked) {
          v.getPageWithElement(origId)
            .then((flipToPage) => {
              if (flipToPage) {
                v.updatePage(cm, flipToPage, '', true, false); // disable midi seek after page-flip
              }
            })
            .catch((e) => {
              console.warn("Expected to highlight currently playing note, but couldn't find it:", origId, e);
            });
          break; // one trigger for page turning is enough
        }
      }
      if (scrollFollowCheckbox.checked && closestTimemapTime && 'on' in closestTimemapTime) {
        // find parent measure
        let el = document.getElementById(closestTimemapTime['on'][0]);
        let measure = el ? el.closest('.measure') : null;
        if (measure) {
          // scroll to its ID
          v.scrollSvg(measure.id);
        }
      }
    }
  }
} // highlightNotesAtMidiPlaybackTime()

export function startMidiTimeout(rerender = false) {
  // clear a possible pre-existing timeout
  window.clearTimeout(midiTimeout);
  if (rerender) {
    // fully rerender MIDI and timemap, then trigger a seek
    midiTimeout = window.setTimeout(() => requestMidiFromVrvWorker(true), midiDelay);
  } else {
    // only trigger a seek
    midiTimeout = window.setTimeout(() => seekMidiPlaybackToSelectionOrPage(), midiDelay);
  }
} // startMidiTimeout()

export function setTimemap(tm) {
  timemap = tm;
  determineLastOnsetIdx();
}

export function getTimemap() {
  return timemap;
}

export function setExpansionMap(em) {
  expansionMap = em;
}

export function requestPlaybackOnLoad() {
  playbackOnLoad = true;
}

/**
 * Highlights the note by adding the currently-playing class
 * to it and its children. The highlighting id from the timemap#
 * is added as separate "data-highligh" attribute, because it
 * might be different from the element's id when playing an
 * expanded section (e.g. 'note-0002332-rend1'). *
 * @param {Element} note
 * @param {string} id
 * @returns nothing
 */
function highlightNote(note, id = '') {
  if (!note) return;
  note.classList.add('currently-playing');
  if (id) note.setAttribute(highlightId, id);
  note.querySelectorAll('g').forEach((g) => g.classList.add('currently-playing'));
} // highlightNote()

/**
 * Unhighlight the note element by removing the currently-playing
 * class and the "data-highlight" attribute.
 * @param {Element} note
 * @returns nothing
 */
function unhighlightNote(note) {
  if (!note) return;
  note.classList.remove('currently-playing');
  note.removeAttribute(highlightId);
  note.querySelectorAll('.currently-playing').forEach((g) => g.classList.remove('currently-playing'));
} // unhighlightNote()

/**
 *  Close/unhighlight all midi-highlighted notes/graphical elements
 */
function unHighlightAllElements() {
  document.querySelectorAll('.currently-playing').forEach((g) => g.classList.remove('currently-playing'));
} // unHighlightAllElements()

// find index of last onset array in timemap
function determineLastOnsetIdx() {
  let i = timemap.length;
  while (i-- > 0) {
    if ('on' in timemap[i]) {
      lastOnsetIdx = i;
      break;
    }
  }
} // determineLastOnsetIdx()

/**
 * Find tstamp (in milliseconds) of note id string from the timemap
 * @param {string} id
 * @returns {double} tstamp (in milliseconds)
 */
function getTimeFromTimemap(id) {
  for (let e of timemap) {
    if (e.hasOwnProperty('on') && e.on.includes(id)) {
      return e.tstamp;
    }
  }
  return -1;
} // getTimeFromTimemap()
