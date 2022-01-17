import {
  getVerovioContainerSize
} from './resizer.js'
import * as speed from './speed.js';
import * as utils from './utils.js';
import * as dutils from './dom-utils.js';
import {
  addToolTip
} from './control-menu.js';


export default class Viewer {

  constructor(worker) {
    this.worker = worker;
    this.currentPage = 1;
    this.pageCount = 0;
    this.selectedElements = [];
    this.lastNoteId = '';
    this.notationNightMode = false;
    // this.tkOptions = this.vrvToolkit.getAvailableOptions();
    this.updateNotation = true; // whether or not notation gets re-rendered after text changes
    this.speedMode = true; // speed mode (just feeds on page to Verovio to reduce drawing time)
    this.parser = new DOMParser();
    this.xmlDoc;
    this.encodingHasChanged = true; // to recalculate DOM or pageLists
    this.pageBreaks = {}; // object of page number and last measure id '1': 'measure-000423', ...
    // this.scoreDefList = []; // list of xmlNodes, one for each change, referenced by 5th element of pageList
    this.meiHeadRange = [];
    this.breaks = ['sb', 'pb'];
    this.toolTipTimeOutHandle = null; // handle for zoom tooltip hide timer
    this.vrvOptions;
    this.verovioIcon = document.getElementById('verovio-icon');
  }

  // change options, load new data, render current page, add listeners, highlight
  updateAll(cm, options = {}, xmlId = '') {
    this.setVerovioOptions(options);
    let computePageBreaks = false;
    if (this.speedMode && Object.keys(this.pageBreaks).length == 0 &&
      document.getElementById('breaks-select').value == 'auto') {
      computePageBreaks = true;
      this.currentPage = 1;
    }
    if (this.speedMode && xmlId)
      this.currentPage = speed.getPageWithElement(this, xmlId);
    let message = {
      'cmd': 'updateAll',
      'options': this.vrvOptions,
      'mei': this.speedFilter(cm.getValue()),
      'pageNo': this.currentPage,
      'xmlId': xmlId,
      'speedMode': this.speedMode,
      'computePageBreaks': computePageBreaks
    }
    this.busy();
    this.worker.postMessage(message);
  }

  updateData(cm, setCursorToPageBeg = true, setFocusToVerovioPane = true) {
    // is it needed for speed mode?
    //if(!this.speedMode) this.loadVerovioData(this.speedFilter(cm.getValue()));
    let message = {
      'cmd': 'updateData',
      'mei': this.speedFilter(cm.getValue()),
      'pageNo': this.currentPage,
      'xmlId': '',
      'setCursorToPageBeginning': setCursorToPageBeg,
      'setFocusToVerovioPane': setFocusToVerovioPane,
      'speedMode': this.speedMode,
      'breaks': document.getElementById('breaks-select').value
    };
    this.busy();
    this.worker.postMessage(message);
  }

  updatePage(cm, page, xmlId = '') {
    if (this.changeCurrentPage(page) || xmlId) {
      if (!this.speedMode) {
        let message = {
          'cmd': 'updatePage',
          'pageNo': this.currentPage,
          'xmlId': xmlId
        };
        this.busy();
        this.worker.postMessage(message);
      } else { // speed mode
        if (this.encodingHasChanged) this.loadXml(cm.getValue());
        if (xmlId) {
          this.currentPage = speed.getPageWithElement(this, xmlId);
          console.info('UpdatePage(speedMode=true): page: ' +
            this.currentPage + ', xmlId: ' + xmlId);
        }
        this.updateData(cm, xmlId ? false : true, true);
      }
    }
  }

  // update: options, redoLayout, page/xml:id, render page
  updateLayout(options = {}) {
    this.updateQuick(options, 'updateLayout');
  }

  // update: options, page/xml:id, render page
  updateOption(options = {}) {
    this.updateQuick(options, 'updateOption');
  }

  // updateLayout and updateOption
  updateQuick(options, what) {
    // if (!this.speedMode) {
    let id = '';
    if (this.selectedElements[0]) id = this.selectedElements[0];
    this.setVerovioOptions(options);
    let message = {
      'cmd': what,
      'options': this.vrvOptions,
      'pageNo': this.currentPage,
      'xmlId': id,
      'speedMode': this.speedMode
    };
    this.busy();
    this.worker.postMessage(message);
  }


  // with normal mode: load DOM and pass-through the MEI code;
  // with speed mode: load into DOM (if encodingHasChanged) and
  // return MEI excerpt of currentPage page
  speedFilter(mei, brks = ['sb', 'pb']) {
    // update DOM only if encoding has been edited or
    this.loadXml(mei);
    let bs = document.getElementById('breaks-select');
    if (!this.speedMode || bs.value == 'none') return mei;
    this.breaks = brks;
    if (bs.value == "encoded") {
      this.breaks = ['pb'];
    } else if (bs.value == 'auto') {
      this.breaks =
        (Object.keys(this.pageBreaks).length == 0) ? '' : this.pageBreaks;
    }
    // count pages from system/pagebreaks
    if (Array.isArray(this.breaks)) {
      let elements = this.xmlDoc.querySelectorAll("measure, sb, pb");
      // count pages
      this.pageCount = 1; // pages are one-based
      let countBreaks = false;
      for (let e of elements) {
        if (e.nodeName == 'measure') countBreaks = true; // skip leading breaks
        if (countBreaks && this.breaks.includes(e.nodeName))
          this.pageCount++;
      }
      if (this.currentPage > this.pageCount) this.currentPage = 1;
      console.info('xmlDOM pages counted: currentPage: ' + this.currentPage +
        ', pageCount: ' + this.pageCount);
    }
    return speed.getPageFromDom(this.xmlDoc, this.currentPage, this.breaks);
  }

  loadXml(mei, forceReload = false) {
    if (this.encodingHasChanged || forceReload) {
      this.xmlDoc = this.parser.parseFromString(mei, "text/xml");
      this.encodingHasChanged = false;
    }
  }

  clear() {
    this.selectedElements = [];
    this.lastNoteId = '';
    this.currentPage = 1;
    this.pageCount = -1;
    this.pageBreaks = {};
  }

  reRenderMei(cm, removeIds = false) {
    let message = {
      'cmd': 'reRenderMei',
      'format': 'mei',
      'mei': cm.getValue(),
      'pageNo': this.currentPage,
      'removeIds': removeIds
    }
    if (false && !removeIds) message.xmlId = this.selectedElements[0]; // TODO
    this.busy();
    this.worker.postMessage(message);
  }

  computePageBreaks(cm) {
    let message = {
      'cmd': 'computePageBreaks',
      'options': this.vrvOptions,
      'format': 'mei',
      'mei': cm.getValue()
    }
    this.busy();
    this.worker.postMessage(message);
  }

  // update options in viewer from user interface
  setVerovioOptions(newOptions = {}) {
    if (Object.keys(newOptions).length > 0) this.vrvOptions = newOptions;
    let zoom = document.getElementById('verovio-zoom');
    if (zoom) this.vrvOptions.scale = parseInt(zoom.value);
    let fontSel = document.getElementById('font-select');
    if (fontSel) this.vrvOptions.font = fontSel.value;
    let bs = document.getElementById('breaks-select');
    if (bs && bs.value) this.vrvOptions.breaks = bs.value;
    let dimensions = getVerovioContainerSize();
    let vp = document.querySelector('.verovio-panel');
    dimensions.width = vp.clientWidth;
    dimensions.height = vp.clientHeight;
    // console.info('client size: ' + dimensions.width + '/' + dimensions.height);
    if (this.vrvOptions.breaks !== "none") {
      this.vrvOptions.pageWidth = Math.max(Math.round(
        dimensions.width * (100 / this.vrvOptions.scale)), 600);
      this.vrvOptions.pageHeight = Math.max(Math.round(
        dimensions.height * (100 / this.vrvOptions.scale)), 250);
    }
    // overwrite existing options if new ones are passed in
    // for (let key in newOptions) { this.vrvOptions[key] = newOptions[key]; }
    console.info('Verovio options updated: ', this.vrvOptions);
  }

  changeHighlightColor(color) {
    document.getElementById('customStyle').innerHTML =
      `.mei-friend .verovio-panel g.highlighted,
      .mei-friend .verovio-panel g.highlighted,
      .mei-friend .verovio-panel g.highlighted,
      .mei-friend .verovio-panel g.highlighted * {
        fill: ${color};
        color: ${color};
        stroke: ${color};
    }`;
  }

  // accepts number or string (first, last, forwards, backwards)
  changeCurrentPage(newPage) {
    let targetpage;
    if (Number.isInteger(newPage)) {
      targetpage = newPage;
      console.info('targetPage: ', targetpage);
    } else {
      newPage = newPage.toLowerCase();
      if (newPage === 'first') {
        targetpage = 1;
      } else if (newPage === 'last') {
        targetpage = this.pageCount
      } else if (newPage === 'forwards') {
        if (this.currentPage < this.pageCount) {
          targetpage = this.currentPage + 1;
        }
      } else if (newPage === 'backwards') {
        if (this.currentPage > 1) {
          targetpage = this.currentPage - 1;
        }
      }
    }
    if (targetpage > 0 && targetpage <= this.pageCount &&
      targetpage != this.currentPage) {
      this.currentPage = targetpage;
      this.updatePageNumDisplay();
      return true;
    }
    return false;
  }

  updatePageNumDisplay() {
    let pg = (this.pageCount < 0) ? '?' : this.pageCount;
    document.getElementById("pagination1").innerHTML = 'Page';;
    document.getElementById("pagination2").innerHTML =
      `&nbsp;${this.currentPage}&nbsp;`;
    document.getElementById("pagination3").innerHTML = `of ${pg}`;
  }

  // set cursor to first note id in page, taking st/ly of id, if possible
  setCursorToPageBeginning(cm) {
    let id = this.lastNoteId;
    let stNo, lyNo;
    let sc;
    if (id == '') {
      id = document.querySelector('.note').getAttribute('id');
    } else {
      sc = cm.getSearchCursor('xml:id="' + id + '"');
      if (sc.findNext()) {
        const p = sc.from();
        stNo = utils.getElementAttributeAbove(cm, p.line, 'staff')[0];
        lyNo = utils.getElementAttributeAbove(cm, p.line, 'layer')[0];
        let m = document.querySelector('.measure');
        console.info('setCursorToPgBg st/ly;m: ' + stNo + '/' + lyNo + '; ', m);
        if (m) {
          id = dutils.getFirstInMeasure(m, dutils.navElsSelector, stNo, lyNo);
        }
      }
    }
    utils.setCursorToId(cm, id);
    console.info('setCrsrToPgBeg(): lastNoteId: ' + this.lastNoteId +
      ', new id: ' + id);
    this.selectedElements = [];
    this.selectedElements.push(id);
    this.lastNoteId = id;
    return id;
  }

  addNotationEventListeners(cm) {
    let elements = Array.from(document.querySelectorAll('g[id]'));
    elements.forEach(item => {
      item.addEventListener('click',
        (event) => this.handleClickOnNotation(event, cm));
    });
  }

  handleClickOnNotation(e, cm) {
    e.stopImmediatePropagation();
    this.updateNotation = false;
    // console.info('click: ', e);
    let itemId = String(e.currentTarget.id);
    if (itemId === "undefined") return;
    // take chord rather than note xml:id, when ALT is pressed
    let chordId = utils.insideParent(itemId);
    if (e.altKey && chordId) itemId = chordId;
    // select tuplet when clicking on tupletNum
    if (e.currentTarget.getAttribute('class') == 'tupletNum')
      itemId = utils.insideParent(itemId, 'tuplet');

    if (((navigator.appVersion.indexOf("Mac") !== -1) && e.metaKey) || e.ctrlKey) {
      this.selectedElements.push(itemId);
      console.info('handleClickOnNotation() added: ' +
        this.selectedElements[this.selectedElements.length - 1] +
        ', size now: ' + this.selectedElements.length);
    } else {
      // set cursor position in buffer
      utils.setCursorToId(cm, itemId);
      this.selectedElements = [];
      this.selectedElements.push(itemId);
      console.info('handleClickOnNotation() newly created: ' +
        this.selectedElements[this.selectedElements.length - 1] +
        ', size now: ' + this.selectedElements.length);
    }
    this.updateHighlight(cm);
    this.setFocusToVerovioPane();
    // set lastNoteId to @startid or @staff of control element
    let startid = utils.getAttributeById(cm, itemId, "startid");
    if (startid && startid.startsWith('#')) startid = startid.split('#')[1];

    // if (!startid) { // work around for tstamp/staff
    // TODO: find note corresponding to @staff/@tstamp
    // startid = utils.getAttributeById(txtEdr.getBuffer(), itemId, attribute = 'tstamp');
    // console.info('staff: ', startid);
    // }
    if (startid) this.lastNoteId = startid;
    else this.lastNoteId = itemId;
    this.updateNotation = true;
  } // handleClickOnNotation()

  // when cursor pos in editor changed, update notation location / highlight
  cursorActivity(cm, forceFlip = false) {
    let id = utils.getElementIdAtCursor(cm);
    this.selectedElements = [];
    this.selectedElements.push(id);
    let fl = document.getElementById('flip-checkbox');
    if (!document.querySelector('g#' + id) &&
      ((this.updateNotation && fl && fl.checked) || forceFlip)) {
      this.updatePage(cm, '', id);
    } else if (this.updateNotation) {
      this.scrollSvg(cm);
      this.updateHighlight(cm);
    }
  }

  scrollSvg(cm) {
    let vp = document.querySelector('.verovio-panel');
    let el = document.querySelector('g#' + utils.getElementIdAtCursor(cm));
    if (el) {
      let vpRect = vp.getBoundingClientRect();
      let elRect = el.getBBox();
      var mx = el.getScreenCTM();
      // adjust scrolling only when element (close to or completely) outside
      const closeToPerc = .1;
      let sx = mx.a * elRect.x + mx.c * elRect.y + mx.e;
      // kind-of page-wise flipping for x
      if (sx < (vpRect.x + vpRect.width * closeToPerc))
        vp.scrollLeft -= vpRect.x + vpRect.width * (1 - closeToPerc) - sx;
      else if (sx > (vpRect.x + vpRect.width * (1 - closeToPerc)))
        vp.scrollLeft -= vpRect.x + vpRect.width * closeToPerc - sx;
      // y flipping
      let sy = mx.b * elRect.x + mx.d * elRect.y + mx.f;
      if (sy < (vpRect.y + vpRect.height * closeToPerc) ||
        sy > (vpRect.y + vpRect.height * (1 - closeToPerc)))
        vp.scrollTop -= vpRect.y + vpRect.height / 2 - sy;
    }
  }

  // when editor emits changes, update notation rendering
  notationUpdated(cm, forceUpdate = false) {
    this.encodingHasChanged = true;
    let ch = document.getElementById('live-update-checkbox');
    if (this.updateNotation && ch && ch.checked || forceUpdate)
      this.updateData(cm, false, false);
  }

  // highlight currently selected elements
  updateHighlight(cm) {
    // clear existing highlighted classes
    let highlighted = Array.from(document.querySelectorAll('g.highlighted'));
    // console.info('updateHlt: highlighted: ', highlighted);
    highlighted.forEach(e => e.classList.remove('highlighted'));
    let ids = [];
    if (this.selectedElements.length > 0)
      this.selectedElements.forEach(item => ids.push(item));
    else ids.push(utils.getElementIdAtCursor(cm));
    // console.info('updateHlt ids: ', ids);
    for (let id of ids) {
      if (id) {
        let el = document.querySelector('g#' + id)
        // console.info('updateHlt el: ', el);
        if (el) {
          el.classList.add('highlighted');
          let children = Array.from(el.querySelectorAll('g'));
          children.forEach(item => item.classList.add('highlighted'));
        }
      }
    }
  }


  setNotationColors() {
    if (this.notationNightMode) {
      let gs = Array.from(document.querySelectorAll('g'));
      gs.forEach(item => item.classList.add('inverted'));
      document.querySelector('.verovio-panel').classList.add('inverted');
    } else {
      let gs = Array.from(document.querySelectorAll('g.inverted'));
      gs.forEach(item => item.classList.remove('inverted'));
      document.querySelector('.verovio-panel').classList.remove('inverted');
    }
  }

  swapNotationColors() {
    if (this.notationNightMode) {
      this.notationNightMode = false;
    } else {
      this.notationNightMode = true;
    }
    console.info('swapNotationColors() set to: ' + this.notationNightMode);
    this.setNotationColors();
  }

  zoom(delta) {
    let zoomCtrl = document.getElementById('verovio-zoom');
    if (delta <= 30) // delta only up to 30% difference
      zoomCtrl.value = parseInt(zoomCtrl.value) + delta;
    else // otherwise take it as the scaling value
      zoomCtrl.value = delta;
    this.updateLayout();
    // this.updateZoomSliderTooltip(zoomCtrl);
  }

  // TODO: why is it not showing?
  updateZoomSliderTooltip(zoomCtrl) {
    let toolTipText = 'Notation scale: ' + zoomCtrl.value + "%";
    let tt = zoomCtrl.querySelector('.tooltiptext');
    // console.info('Zoomctr.TT: ', tt);
    if (tt) tt.innerHTML = toolTipText;
    else addToolTip(zoomCtrl, {
      title: toolTipText
    });
    tt.classList.add('visible');
    if (this.toolTipTimeOutHandle) clearTimeout(this.toolTipTimeOutHandle);
    this.toolTipTimeOutHandle = setTimeout(() =>
      tt.classList.remove('visible'), 1500);
  }

  // set focus to verovioPane in order to ensure working key bindings
  setFocusToVerovioPane() {
    let el = document.querySelector('.verovio-panel');
    el.setAttribute('tabindex', '-1');
    el.focus();
    // $(".mei-friend").attr('tabindex', '-1').focus();
  }


  // navigate forwards/backwards/upwards/downwards in the DOM, as defined
  // by 'dir' an by 'incrementElementName'
  navigate(cm, incElName = 'note', dir = 'forwards') {
    console.info('navigate(): lastNoteId: ', this.lastNoteId);
    this.updateNotation = false;
    let id = this.lastNoteId;
    if (id == '') { // empty note id
      this.setCursorToPageBeginning(cm); // re-defines lastNotId
      id = this.lastNoteId;
    };
    let element = document.querySelector('g#' + id);
    if (!element) { // element off-screen
      this.setCursorToPageBeginning(cm); // re-defines lastNotId
      id = this.lastNoteId;
      element = document.querySelector('g#' + id);
    }
    console.info('Navigate ' + dir + ' ' + incElName + '-wise for: ', element);
    let x = dutils.getX(element);
    let y = dutils.getY(element);
    let measure = element.closest('.measure');
    // in case no measure element is found
    if (!measure) {
      let firstNote = document.querySelector('.measure').querySelector('.note');
      if (firstNote) id = firstNote.getAttribute('id');
    } else {
      // find elements starting from current note id, element- or measure-wise
      if (incElName == 'note' || incElName == 'measure') {
        id = dutils.getIdOfNextSvgElement(element, dir, undefined, incElName);
        if (!id) { // when no id on screen, turn page
          let what = 'first'; // first/last note within measure
          if (dir == 'backwards' && incElName !== 'measure') what = 'last';
          let lyNo = 1;
          let layer = element.closest('.layer');
          if (layer) lyNo = layer.getAttribute('data-n');
          let staff = element.closest('.staff');
          let stNo = staff.getAttribute('data-n');
          this.navigateBeyondPage(cm, dir, what, stNo, lyNo, y);
          return;
        }
      }

      // up/down in layers
      if (incElName == 'layer') {
        // console.info('navigate(u/d): x/y: ' + x + '/' + y + ', el: ', element);
        let els = Array.from(measure.querySelectorAll(dutils.navElsSelector));
        els.sort(function(a, b) {
          if (Math.abs(dutils.getX(a) - x) > Math.abs(dutils.getX(b) - x))
            return 1;
          if (Math.abs(dutils.getX(a) - x) < Math.abs(dutils.getX(b) - x))
            return -1;
          if (dutils.getY(a) < dutils.getY(b))
            return (dir == 'upwards') ? 1 : -1;
          if (dutils.getY(a) > dutils.getY(b))
            return (dir == 'upwards') ? -1 : 1;
          return 0;
        });
        // console.info('els: ', els);
        let found = false;
        let yy = 0;
        for (let e of els) { // go thru all elements to find closest in x/y space
          if (found) {
            yy = dutils.getY(e);
            if (dir == 'upwards' && yy >= y) continue;
            if (dir == 'downwards' && yy <= y) continue;
            id = e.getAttribute('id');
            break;
          }
          if (e.getAttribute('id') === element.getAttribute('id')) found = true;
        }
      } // up/down in layers

      console.info('navigate() found this ID: ' + id);
    }
    // update cursor position in MEI file (buffer)
    utils.setCursorToId(cm, id);
    // this.updateNotationToTextposition(txtEdr); TODO
    if (id) {
      this.selectedElements = [];
      this.selectedElements.push(id);
      this.lastNoteId = id;
    }
    this.updateNotation = true;
    this.scrollSvg(cm);
    this.updateHighlight(cm);
  }

  // turn page for navigation and return svg directly
  navigateBeyondPage(cm, dir = 'forwards', what = 'first',
    stNo = 1, lyNo = 1, y = 0) {
    if (!this.changeCurrentPage(dir)) return; // turn page
    let message = {
      'cmd': 'navigatePage',
      'pageNo': this.currentPage,
      'dir': dir,
      'what': what,
      'stNo': stNo,
      'lyNo': lyNo,
      'y': y
    };
    if (this.speedMode) {
      message.mei = this.speedFilter(cm.getValue());
      message.speedMode = this.speedMode;
    }
    this.busy();
    this.worker.postMessage(message);
  }

  getTimeForElement(id) {
    let promise = new Promise(function(resolve) {
      let message = {
        'cmd': 'getTimeForElement',
        'msg': id
      };
      v.worker.addEventListener('message', function handle(ev) {
        if (ev.data.cmd = message.cmd) {
          ev.target.removeEventListener('message', handle);
          resolve(ev.data.cmd);
        }
      });
      v.worker.postMessage(message);
    }); // .bind(this) ??
    promise.then(
      function(time) {
        return time;
      }
    );
  }

  findClosestNoteInChord(id, y) {
    if (id) { // if id within chord, find y-closest note to previous
      let ch = document.querySelector('g#' + id).closest('.chord');
      if (ch) {
        // console.info('back/forwards within a chord (y: ' + y + '), ', ch);
        let diff = Number.MAX_VALUE;
        ch.querySelectorAll('.note').forEach(item => {
          let newDiff = Math.abs(dutils.getY(item) - y);
          // console.info('note: diff: ' + newDiff, item);
          if (newDiff <= diff) {
            diff = newDiff;
            id = item.getAttribute('id');
          }
        });
      }
    }
  }

  busy(active = true) {
    if (active) this.verovioIcon.classList.add('loading');
    else this.verovioIcon.classList.remove('loading');
  }

}
