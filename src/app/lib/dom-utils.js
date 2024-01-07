export const meiNameSpace = 'http://www.music-encoding.org/ns/mei';
export const xmlNameSpace = 'http://www.w3.org/XML/1998/namespace';
export const svgNameSpace = 'http://www.w3.org/2000/svg';

export const navElsArray = ['note', 'rest', 'mRest', 'beatRpt', 'halfmRpt', 'mRpt', 'clef'];
export const navElsSelector = '.' + navElsArray.join(',.');

import * as att from './attribute-classes.js';
import { escapeXmlId } from './utils.js';

/**
 * Scans through SVG starting from element to find next element elementName
 * (e.g. 'note'), within same staff and layer
 * @param {Element} currEl
 * @param {string} [dir='forwards|backwards']
 * @param {string} sel
 * @param {string} incr
 * @returns
 */
export function getIdOfNextSvgElement(currEl, dir = 'forwards', sel = navElsSelector, incr = 'all') {
  let measure = currEl.closest('.measure');
  let st = currEl.closest('.staff');
  let stN = 1;
  let lyN = 1;
  if (!st) {
    return dir === 'forwards'
      ? getLastInMeasure(measure, navElsSelector, stN, lyN)
      : getFirstInMeasure(measure, navElsSelector, stN, lyN);
  }
  stN = st.getAttribute('data-n');
  let layer = currEl.closest('.layer');
  if (layer) lyN = layer.getAttribute('data-n');
  let currChord = currEl.closest('.chord');
  let currChordId = '';
  if (currChord) currChordId = currChord.getAttribute('id');
  if (incr === 'measure' && dir === 'forwards') return getIdInNextMeasure(currEl, dir, stN, lyN);
  if (incr === 'measure' && dir === 'backwards') {
    let firstId = getFirstInMeasure(measure, navElsSelector, stN, lyN);
    let currId = currEl.getAttribute('id');
    if (currChord) currId = currChordId;
    let firstChord = document.querySelector('g#' + escapeXmlId(firstId)).closest('.chord');
    if (firstChord) firstId = firstChord.getAttribute('id');
    if (currId === firstId) {
      let id = getIdInNextMeasure(currEl, dir.substring(0, 4), stN, lyN);
      console.info('getIdOfNextElement ' + dir.substring(0, 4) + ', ' + stN + '/' + lyN + ', id: ' + id);
      return id;
    } else return firstId;
  }
  let id = '';
  let elementList = Array.from(measure.querySelectorAll(sel));
  if (dir === 'backwards') elementList.reverse();
  // console.info("getIdOfNextSvgElement: elementList ", elementList);
  let found = false;
  for (let i of elementList) {
    // go thru all elements on page
    if (
      found &&
      i.closest('.staff').getAttribute('data-n') === stN &&
      i.closest('.layer') &&
      i.closest('.layer').getAttribute('data-n') === lyN
    ) {
      let ch = i.closest('.chord'); // ignore tones of same chord
      if (ch && ch.getAttribute('id') === currChordId) continue;
      id = i.getAttribute('id'); // if layer-matched -- wonderful!
      break;
    }
    if (i.getAttribute('id') === currEl.getAttribute('id')) found = true;
  }
  if (id) {
    console.info('getIdOfNextSvgElement: staff/layer-matched id: ' + id);
    return id;
  } else {
    id = getIdInNextMeasure(currEl, dir, stN, lyN);
    console.info('getIdOfNextSvgElement: empty string for ' + currEl.getAttribute('id') + ', ' + dir + '; new: ' + id);
    return id;
  }
} // getIdOfNextSvgElement()

/**
 * Returns id in next (dir = backwards/forwards) measure, at same staff and/or
 * layer if existent (otherwise in same staff)
 * @param {Element} currEl
 * @param {string} [dir="backwards|forwards"]
 * @param {number} [stN=0]
 * @param {number} [lyN=0]
 * @returns {string} id
 */
export function getIdInNextMeasure(currEl, dir = 'forwards', stN = 0, lyN = 0) {
  let measureList = Array.from(document.querySelectorAll('.measure'));
  if (dir.startsWith('back')) measureList.reverse();
  let measure = currEl.closest('.measure');
  if (lyN === 0) lyN = currEl.closest('.layer').getAttribute('data-n');
  if (stN === 0) stN = currEl.closest('.staff').getAttribute('data-n');
  let found = false;
  for (let m of measureList) {
    // console.info('getIdInNextMeasure ' + dir + ', m: ', m);
    if (found) {
      if (dir === 'backwards') return getLastInMeasure(m, navElsSelector, stN, lyN);
      // forwards, back
      else return getFirstInMeasure(m, navElsSelector, stN, lyN);
    }
    if (m.getAttribute('id') === measure.getAttribute('id')) found = true;
  }
} // getIdInNextMeasure()

/**
 * Returns id string of requested element having the properties
 * specified in the parameters.
 * Wrapper for getFirstInMeasure and getLastInMeasure.
 * @param {Element} measure
 * @param {string} selector
 * @param {number} stN
 * @param {number} lyN
 * @param {string} [what="first|last"]
 * @returns {string} id
 */
export function getInMeasure(measure, selector, stN, lyN, what = '') {
  if (what === 'first') return getFirstInMeasure(measure, selector, stN, lyN);
  if (what === 'last') return getLastInMeasure(measure, selector, stN, lyN);
} // getInMeasure()

/**
 * Returns id of first element in measure element.
 * @param {Element} measure
 * @param {string} selector
 * @param {number} stN
 * @param {number} lyN
 * @returns {string} id
 */
export function getFirstInMeasure(measure, selector, stN, lyN) {
  let foundElementId = '';
  let staff = measure.querySelector('.staff[data-n="' + stN + '"]');
  // console.info('getFirstInMeasure: staff ', staff);
  if (staff) {
    let el;
    let layer = staff.querySelector('.layer[data-n="' + lyN + '"]');
    // console.info('getFirstInMeasure: layer ', layer);
    if (layer) {
      el = layer.querySelector(selector);
    } else {
      el = staff.querySelector(selector);
    }
    // console.info('getFirstInMeasure: el ', el);
    if (el) foundElementId = el.getAttribute('id');
  }
  return foundElementId;
} // getFirstInMeasure()

/**
 * Returns id of last element in measure element.
 * @param {Element} measure
 * @param {string}} selector
 * @param {number} stN
 * @param {number} lyN
 * @returns
 */
export function getLastInMeasure(measure, selector, stN, lyN) {
  let foundElementId = '';
  let staff = measure.querySelector('.staff[data-n="' + stN + '"]');
  // console.info('getLastInMeasure staff: ', staff);
  if (staff) {
    let els;
    let layer = staff.querySelector('.layer[data-n="' + lyN + '"]');
    // console.info('layer: ', layer);
    if (layer) {
      els = layer.querySelectorAll(selector);
    } else {
      els = staff.querySelectorAll(selector);
    }
    if (els && els.length > 0) foundElementId = els[els.length - 1].getAttribute('id');
    // console.info('els: ', els);
  }
  return foundElementId;
} // getLastInMeasure()

/**
 * Returns x coordinates of note and noteheads, as specified by what.
 * @param {Element} element
 * @param {string} [what="median|range|array"]
 * @returns {number|array}
 */
export function getX(element, what = 'median') {
  if (!element) return false;
  let x = [];
  if (element.getAttribute('class').includes('chord')) {
    let els = element.querySelectorAll('g.note');
    els.forEach((item, i) => {
      x.push(getX(item));
    });
  } else if (navElsArray.some((el) => element.getAttribute('class').includes(el))) {
    // (element.getAttribute('class').includes("note")) {
    let els = element.querySelectorAll('.notehead > use[x]'); // should be one!
    if (els.length === 0) els = element.querySelectorAll('use[x]'); // non-notes
    els.forEach((item) => x.push(parseInt(item.getAttribute('x'))));
  }
  if (what === 'median') return median(x);
  if (what === 'range') return Math.max(x) - Math.min(x);
  if (what === 'array') return x;
} // getX()

/**
 * Returns median of y coordinate of element
 * @param {Element} element
 * @returns {number}
 */
export function getY(element) {
  if (!element) return false;
  let y = [];
  if (element.getAttribute('class').includes('chord')) {
    let els = element.querySelectorAll('g.note');
    els.forEach((item, i) => {
      y.push(getY(item));
    });
  } else if (navElsArray.some((el) => element.getAttribute('class').includes(el))) {
    let els = element.querySelectorAll('.notehead > use[y]'); // should be one!
    if (els.length === 0) els = element.querySelectorAll('use[y]'); // non-notes
    els.forEach((item, i) => {
      y.push(parseInt(item.getAttribute('y')));
    });
  }
  return median(y);
} // getY()

/**
 * Returns median of array of numbers
 * @param {number[]} numbers
 * @returns {number}
 */
export function median(numbers) {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) return (sorted[middle - 1] + sorted[middle]) / 2;
  return sorted[middle];
} // median()

/**
 * Returns true when element is the first in SVG page in same staff & layer
 * @param {string} id
 * @returns
 */
export function isFirstElementOnPage(id) {
  if (!id) return true;
  let element = document.querySelector('g#' + escapeXmlId(id));
  if (!element) return true;
  let measure = element.closest('.measure');
  let stN = element.closest('.staff').getAttribute('data-n');
  let lyN = element.closest('.layer').getAttribute('data-n');
  // console.info('isFirstElement this measure: ', measure);
  // console.info('isFirstElement st/ly: ' + stN + '/' + lyN);
  let thisId = getFirstInMeasure(measure, navElsSelector, stN, lyN);
  let m = document.querySelector('.measure');
  let firstId = getFirstInMeasure(m, navElsSelector, stN, lyN);
  console.info('isFirstElement: firstId: ' + firstId + ', thisId: ' + thisId + ', BOOL: ' + (thisId === firstId));
  return thisId === firstId;
} // isFirstElementOnPage()

/**
 * Returns the DOM element at encoding cursor position
 * @param {CodeMirror} cm
 * @returns {Element}
 */
export function getElementAtCursor(cm) {
  let cursor = cm.getCursor();
  let coords = cm.cursorCoords(
    {
      ch: cursor.ch,
      line: cursor.line,
    },
    'window'
  );
  let elem = document.elementFromPoint(coords.left, coords.top);
  return elem;
} // getElementAtCursor()

/**
 * Checks whether a page beginning or system beginning has to be counted as a
 * new page (normally true, and if within an <app>, count only
 * if inside a <lem> or inside first <rdg> or <rdg|source=id)
 * @param {Element} el
 * @param {string} sourceId
 * @returns {boolean}
 */
export function countAsBreak(el, sourceId = '') {
  let app;
  if ((app = el.closest('app'))) {
    let rdgs = app.querySelectorAll('rdg');
    if (
      (rdgs && rdgs.length > 0 && el.closest('lem')) ||
      el.closest('rdg') === rdgs[0] ||
      (el.closest('rdg') && el.closest('rdg').getAttribute('source') === sourceId)
    ) {
      return true;
    }
  } else {
    return true;
  }
  return false;
} // countAsBreak()

/**
 * Convert xmlNode to string and remove meiNameSpace declaration from return string
 * @param {Node} xmlNode
 * @returns {string}
 */
export function xmlToString(xmlNode) {
  let str = new XMLSerializer().serializeToString(xmlNode);
  // console.info('xmlToString: ' + str);
  str = str.replace(/(?:><)/g, '>\n<');
  // console.info('xmlToString: ' + str);
  return str.replace(' xmlns="' + meiNameSpace + '"', '');
} // xmlToString()

/**
 * Checks xmlDoc for expand elements and returns an array of arrays
 * @param {Node} xmlDoc
 * @param {string} baseSelector
 * @returns {string[][]}
 */
export function generateExpansionList(xmlDoc, baseSelector = 'music score') {
  let selector = 'section,ending,lem,rdg';
  let expansions = [['No expansion', '']];
  let baseSection = xmlDoc.querySelector(baseSelector);
  if (baseSection) {
    baseSection.querySelectorAll('expansion').forEach((el) => {
      let str = '';
      let parent = el.parentElement.closest(selector);
      if (parent) {
        // str += '│ ';
        while ((parent = parent.parentElement.closest(selector))) str += '│ '; // &#9474;&nbsp; for indentation
      }
      expansions.push([str + el.getAttribute('xml:id'), el.getAttribute('xml:id')]);
    });
  }
  return expansions;
} // generateExpansionList()

/**
 * Returns key signature string for a given note, after DOM traversal in xmlDoc.
 * @param {Node} xmlDoc
 * @param {Element} noteElement
 * @returns {string} data.KEYFIFTHS, such as '3f', '0', or '7s'
 */
export function getKeySigForNote(xmlDoc, noteElement) {
  if (!xmlDoc || !noteElement || !noteElement.hasAttribute('xml:id')) return '';
  let keySigString = '0';
  const sigList = xmlDoc.querySelectorAll('[key\\.sig],[sig],[*|id="' + noteElement.getAttribute('xml:id') + '"]');
  for (const s of sigList) {
    if (s === noteElement) break;
    keySigString = s.getAttribute('key.sig') || s.getAttribute('sig') || '0';
  }
  return keySigString;
} // getKeySigForNote()

/**
 * Returns notes names affected by key signature and
 * the accidental string ('s', 'f', 'n')
 * @param {string} keySigString
 * @returns {Object} affectedNotes, keySigAccid
 * Usage:
 * const { affectedNotes, keySigAccid } = getAffectedNotesFromKeySig('5f')
 */
export function getAffectedNotesFromKeySig(keySigString = '') {
  let affectedNotes = [];
  let keySigAccid = 'n';
  let splitF = keySigString.split('f');
  let splitS = keySigString.split('s');
  if (splitF.length > 1) {
    keySigAccid = 'f';
    affectedNotes = att.flats.slice(0, splitF[0]);
  } else if (splitS.length > 1) {
    keySigAccid = 's';
    affectedNotes = att.sharps.slice(0, splitS[0]);
  }
  return {
    affectedNotes: affectedNotes,
    keySigAccid: keySigAccid,
  };
} // getAffectedNotesFromKeySig()
