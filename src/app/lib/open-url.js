import { calcSizeOfContainer } from './resizer.js';
import { sampleEncodings, samp, translator } from './main.js';

function fillInSampleUrl(e) {
  document.getElementById('openUrlInput').value = e.target.value;
}

function fillInComposerEncodings(e) {
  let fc = document.querySelector('.openUrlOverlay');
  let composerSelector = fc.querySelector('#sampleEncodingsComposer');
  let encodingSelector = fc.querySelector('#sampleEncodingsEncoding');
  encodingSelector.innerHTML = '';
  const dummyOpt = document.createElement('option');
  dummyOpt.id = 'openUrlChooseEncodingText';
  dummyOpt.text = translator.lang.openUrlChooseEncodingText.text;
  dummyOpt.value = '';
  dummyOpt.classList.add('sampleEntry');
  dummyOpt.setAttribute('selected', '');
  dummyOpt.setAttribute('disabled', '');
  dummyOpt.setAttribute('hidden', '');
  encodingSelector.appendChild(dummyOpt);
  let composer = e.target.value;
  if (composer) {
    const composerEntries = sampleEncodings.filter((s) => s[samp.COMPOSER] === composer);
    // alphabetically by work title
    composerEntries
      .sort((a, b) => a[samp.TITLE] - b[samp.TITLE])
      .forEach((e) => {
        const entryOpt = document.createElement('option');
        entryOpt.text = e[samp.TITLE] + ' - ' + e[samp.FILE];
        entryOpt.value = e[samp.URL];
        entryOpt.classList.add('sampleEntry');
        encodingSelector.appendChild(entryOpt);
      });
  } else {
    fillInSampleUrl(e); // clear input when no composer selected
  }
}

export function openUrl(showSamples = false) {
  let sz = calcSizeOfContainer();
  let fc = document.querySelector('.openUrlOverlay');
  fc.width = sz.width * 0.25;
  fc.height = sz.height * 0.25;
  fc.style.display = 'block';
  let sampleEncodingsDetails = fc.querySelector('details');
  let popupHeader = fc.querySelector('h3');
  if (showSamples) {
    popupHeader.innerText = translator.lang.publicRepertoireSummary.text;
    sampleEncodingsDetails.setAttribute('open', '');
  } else {
    popupHeader.innerText = translator.lang.openUrlOpenEncodingByUrlText.text;
    sampleEncodingsDetails.removeAttribute('open');
  }
  let composerSelector = fc.querySelector('#sampleEncodingsComposer');
  composerSelector.innerHTML = '';
  let encodingSelector = fc.querySelector('#sampleEncodingsEncoding');
  encodingSelector.innerHTML = '<option value="">' + translator.lang.openUrlChooseEncodingText.text + '</option>';
  // arrange by composer
  let byComposer = {};
  sampleEncodings.forEach((s) => {
    if (s[samp.COMPOSER] in byComposer) {
      byComposer[s[samp.COMPOSER]].push(s);
    } else {
      byComposer[s[samp.COMPOSER]] = [s];
    }
  });

  const dummyOpt = document.createElement('option');
  dummyOpt.id = 'openUrlChooseComposerText';
  dummyOpt.text = translator.lang.openUrlChooseComposerText.text;
  dummyOpt.value = '';
  dummyOpt.classList.add('sampleEntry');
  dummyOpt.setAttribute('selected', '');
  dummyOpt.setAttribute('disabled', '');
  dummyOpt.setAttribute('hidden', '');
  composerSelector.appendChild(dummyOpt);

  // alphabetically by composer...
  Object.keys(byComposer)
    .sort()
    .forEach((c) => {
      const composerOpt = document.createElement('option');
      composerOpt.text = c;
      composerOpt.value = c;
      composerSelector.appendChild(composerOpt);
    });

  composerSelector.removeEventListener('change', fillInComposerEncodings);
  composerSelector.addEventListener('change', fillInComposerEncodings);

  encodingSelector.removeEventListener('change', fillInSampleUrl);
  encodingSelector.addEventListener('change', fillInSampleUrl);
}

export function openUrlCancel() {
  // user has cancelled the "Open URL" action
  // => hide Open URL interface, show file status display
  let fileStatusElement = document.querySelector('.fileStatus');
  let openUrlElement = document.querySelector('.openUrlOverlay');
  // show file status, hide openUrl
  openUrlElement.style.display = 'none';
}
