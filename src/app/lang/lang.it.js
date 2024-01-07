/**
 * Language file for Italian
 */

import * as att from '../lib/attribute-classes.js';
import { heart } from '../css/icons.js';

export const lang = {
  // Schermata iniziale
  aboutMeiFriend: { text: 'Informazioni su mei-friend' },
  showSplashScreen: {
    text: "Mostra schermata iniziale all'avvio",
    description: "Mostra la schermata iniziale di mei-friend quando l'applicazione viene caricata",
  },
  splashBody: {
    html: `
      <p>
        mei-friend è un editor per le <a href="https://music-encoding.org">codifiche musicali</a>, ospitato presso
        l'<a href="https://mdw.ac.at" target="_blank">Università di Musica e Arti dello Spettacolo di Vienna</a>. Si prega
        di consultare la nostra <a href="https://mei-friend.github.io" target="_blank">documentazione completa</a> per ulteriori
        informazioni.
      </p>
      <p>
        Anche se mei-friend è un'applicazione basata su browser, i tuoi dati personali (compresa la codifica che stai
        modificando, le impostazioni dell'applicazione e i dettagli di accesso attuali, se presenti) vengono archiviati nel
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank"
          >localStorage</a
        > del tuo browser e non vengono trasmessi o memorizzati sui nostri server.
      </p>
      <p>
        I dati vengono trasmessi a GitHub solo quando lo richiedi esplicitamente (ad esempio, quando effettui l'accesso a
        GitHub, carichi la tua codifica da un repository GitHub o richiedi l'esecuzione di un flusso di lavoro GitHub Action
        per te). Allo stesso modo, i dati vengono trasmessi al tuo provider Solid scelto solo quando lo richiedi esplicitamente
        (ad esempio, quando effettui l'accesso a Solid o carichi o salvi annotazioni stand-off).
      </p>
      <p>
        Utilizziamo <a href="https://matomo.org/" target="_blank">Matomo</a>
        per raccogliere statistiche di utilizzo anonime. Queste includono il tuo indirizzo IP troncato (consentendo la
        geolocalizzazione a livello di paese ma senza ulteriori identificazioni), il tuo browser e sistema operativo, da dove
        provieni (cioè il sito Web di riferimento), l'ora e la durata della tua visita e le pagine che hai visitato. Queste
        informazioni sono archiviate sull'istanza Matomo in esecuzione sui server dell'Università di Musica e Arti dello
        Spettacolo di Vienna e non sono condivise con terze parti.
      </p>
      <p>
        Il toolkit Verovio è caricato da <a href="https://verovio.org" target="_blank">https://verovio.org</a>, ospitato da
        <a href="https://rism.digital/" target="_blank">RISM Digital Switzerland</a>. 
        Ciò consente a mei-friend di rimanere aggiornato con l'ultima versione del toolkit
        e di fornire la scelta di tutte le versioni supportate attraverso il pannello delle impostazioni. 
        Quando si utilizza mei-friend, il tuo indirizzo IP è quindi visibile a RISM Digital.
      </p>
      <p>
        Infine, la riproduzione MIDI è presentata utilizzando il font sonoro SGM_plus fornito da Google Magenta e servito tramite
        googleapis.com. Pertanto, il tuo indirizzo IP è visibile a Google durante l'avvio della riproduzione MIDI. Se non desideri
        che ciò accada, ti preghiamo di astenerti dall'utilizzare la funzione di riproduzione MIDI.
      </p>
      <p>
        mei-friend è sviluppato da
        <a href="https://iwk.mdw.ac.at/werner-goebl" target="_blank">Werner Goebl</a> e
        <a href="https://iwk.mdw.ac.at/david-weigl" target="_blank">David M. Weigl</a> presso il Dipartimento di Acustica
        Musicale - Wiener Klangstil dell'Università di Musica e Arti dello Spettacolo di Vienna ed è distribuito con licenza
        <a href="https://spdx.org/licenses/AGPL-3.0-or-later.html" target="_blank"
          >GNU Affero General Public License v3.0</a
        >. Si prega di consultare la nostra <a href="https://mei-friend.github.io/about/" target="_blank">pagina di
        riconoscimenti</a> per ulteriori informazioni sui contributori e sui componenti open source riutilizzati nel nostro
        progetto. Ringraziamo i nostri colleghi per il loro contributo e la loro guida.
      </p>
      <p>
        Lo sviluppo dell'applicazione Web mei-friend è finanziato dal
        <a href="https://fwf.ac.at" target="_blank">Fondo austriaco per la scienza (FWF)</a> nei progetti
        <a href="https://iwk.mdw.ac.at/signature-sound-vienna/" target="_blank"
          >P 34664-G (Signature Sound Vienna)</a
        >
        e <a href="https://e-laute.info">I 6019 (E-LAUTE)</a>.
      </p>
    `,
  },
  splashGotItButtonText: { text: 'Ho capito!' },
  splashVersionText: { text: 'Versione' },
  splashAlwaysShow: {
    text: 'Mostra sempre questa schermata iniziale',
    description: "Mostra sempre questa schermata iniziale al caricamento dell'applicazione",
  },
  splashAlwaysShowLabel: {
    text: 'Mostra sempre questa schermata iniziale',
    description: "Mostra sempre questa schermata iniziale al caricamento dell'applicazione",
  },

  // Main menu bar
  githubLoginLink: { text: 'Accedi' },

  month: {
    jan: 'Gennaio',
    feb: 'Febbraio',
    mar: 'Marzo',
    apr: 'Aprile',
    may: 'Maggio',
    jun: 'Giugno',
    jul: 'Luglio',
    aug: 'Agosto',
    sep: 'Settembre',
    oct: 'Ottobre',
    nov: 'Novembre',
    dec: 'Dicembre',
  },

  // FILE MENU ITEM// MENU FILE
  fileMenuTitle: { text: 'File' },
  openMeiText: { text: 'Apri file' },
  openUrlText: { text: 'Apri URL' },
  openExample: {
    text: 'Repertorio pubblico',
    description: 'Apri una lista del repertorio pubblico',
  },
  importMusicXml: { text: 'Importa MusicXML' },
  importHumdrum: { text: 'Importa Humdrum' },
  importPae: { text: 'Importa PAE, ABC' },
  saveMeiText: { text: 'Salva MEI' },
  saveMeiBasicText: { text: 'Salva come MEI Basic' },
  saveSvg: { text: 'Salva SVG' },
  saveMidi: { text: 'Salva MIDI' },
  printPreviewText: { text: 'Anteprima PDF' },
  generateUrlText: { text: 'Genera URL di mei-friend' },

  // EDIT/CODE MENU ITEM / MENU EDIT/CODE
  editMenuTitle: { text: 'Codice' },
  undoMenuText: { text: 'Annulla' },
  redoMenuText: { text: 'Ripristina' },
  startSearchText: { text: 'Cerca' },
  findNextText: { text: 'Trova successivo' },
  findPreviousText: { text: 'Trova precedente' },
  replaceMenuText: { text: 'Sostituisci' },
  replaceAllMenuText: { text: 'Sostituisci tutto' },
  indentSelectionText: { text: 'Indenta selezione' },
  surroundWithTagsText: { text: 'Circonda con tags' },
  surroundWithLastTagText: { text: 'Circonda con' },
  jumpToLineText: { text: 'Vai alla riga' },
  toMatchingTagText: { text: 'Vai al tag corrispondente' },
  manualValidateText: { text: 'Convalida' },

  // VIEW MENU ITEM / MENU VISUALIZZA
  viewMenuTitle: { text: 'Visualizza' },
  notationTop: { text: 'Notazione in alto' },
  notationBottom: { text: 'Notazione in basso' },
  notationLeft: { text: 'Notazione a sinistra' },
  notationRight: { text: 'Notazione a destra' },
  showSettingsMenuText: { text: 'Pannello di impostazioni' },
  showAnnotationMenuText: { text: 'Pannello di annotazioni' },
  showFacsimileMenuText: { text: 'Pannello di facsimili' },
  showPlaybackControlsText: { text: 'Controlli di riproduzione' },
  facsimileTop: { text: 'Facsimile in alto' },
  facsimileBottom: { text: 'Facsimile in basso' },
  facsimileLeft: { text: 'Facsimile a sinistra' },
  facsimileRight: { text: 'Facsimile a destra' },

  // MANIPULATE MENU ITEM/ MENU MODIFICA
  manipulateMenuTitle: { text: 'Modifica' },
  invertPlacementText: { text: 'Inverti posizione' },
  betweenPlacementText: { text: 'Posiziona in mezzo' },
  addVerticalGroupText: { text: 'Aggiungi gruppo verticale' },
  deleteText: { text: 'Elimina elemento' },
  pitchChromUpText: { text: 'Alza cromatica' },
  pitchChromDownText: { text: 'Abbassa cromatica' },
  pitchUpDiatText: { text: 'Alza diatonica' },
  pitchDownDiatText: { text: 'Abbassa diatonica' },
  pitchOctaveUpText: { text: "Alza di un'ottava" },
  pitchOctaveDownText: { text: "Abbassa di un'ottava" },
  staffUpText: { text: 'Elemento su 1 rigo' },
  staffDownText: { text: 'Elemento giù 1 rigo' },
  increaseDurText: { text: 'Aumenta durata' },
  decreaseDurText: { text: 'Riduci durata' },
  cleanAccidText: { text: 'Verificare @accid.ges' },
  renumberMeasuresTestText: { text: 'Rinumera misure (test)' },
  renumberMeasuresExecText: { text: 'Rinumera misure (esegui)' },
  addIdsText: { text: 'Aggiungi ids a MEI' },
  removeIdsText: { text: 'Rimuovi ids da MEI' },
  reRenderMeiVerovio: { text: 'Ridisegna tramite Verovio' },
  addFacsimile: { text: 'Aggiungi elemento facsimile' },
  ingestFacsimileText: { text: 'Incorpora facsimile' },

  // INSERT MENU ITEM / INSERISCI VOCE DI MENU
  insertMenuTitle: { text: 'Inserisci' },
  addDoubleSharpText: { html: 'Doppio diesis &#119082;' },
  addSharpText: { html: 'Diesis &#9839;' },
  addNaturalText: { html: 'Bequadro &#9838;' },
  addFlatText: { html: 'Bemolle &#9837;' },
  addDoubleFlatText: { html: 'Doppio bemolle &#119083;' },
  addTempoText: { text: 'Tempo' },
  addDirectiveText: { text: 'Direttiva' },
  addDynamicsText: { text: 'Dinamica' },
  addSlurText: { text: 'Fraseggio' },
  addTieText: { text: 'Legatura' },
  addCrescendoHairpinText: { text: 'Crescendo' },
  addDiminuendoHairpinText: { text: 'Diminuendo' },
  addBeamText: { text: 'Raggruppa note' },
  addBeamSpanText: { text: 'Raggruppa note su più battute' },
  addSuppliedText: { text: 'Aggiungi simbolo mancante' },
  addSuppliedArticText: { text: 'Aggiungi simbolo mancante (Artic)' },
  addSuppliedAccidText: { text: 'Aggiungi simbolo mancante (Accid)' },
  addArpeggioText: { text: 'Arpeggio' },
  addFermataText: { text: 'Fermata' },
  addGlissandoText: { text: 'Glissato' },
  addPedalDownText: { text: 'Pedale giù' },
  addPedalUpText: { text: 'Pedale su' },
  addTrillText: { text: 'Trillo' },
  addTurnText: { text: 'Gruppetto' },
  addTurnLowerText: { text: 'Gruppetto inferiore' },
  addMordentText: { text: 'Mordente' },
  addMordentUpperText: { text: 'Mordente superiore' },
  addOctave8AboveText: { text: 'Ottava (8va sopra)' },
  addOctave15AboveText: { text: 'Ottava (15ma sopra)' },
  addOctave8BelowText: { text: 'Ottava (8va sotto)' },
  addOctave15BelowText: { text: 'Ottava (15ma sotto)' },
  addGClefChangeBeforeText: { text: 'Cambio di chiave di violino prima' },
  addGClefChangeAfterText: { text: 'Cambio di chiave di violino dopo' },
  addFClefChangeBeforeText: { text: 'Cambio di chiave di basso prima' },
  addFClefChangeAfterText: { text: 'Chiave di basso dopo' },
  addCClefChangeBeforeText: { text: 'Chiave di violino prima' },
  addCClefChangeAfterText: { text: 'Chiave di violino dopo' },
  toggleStaccText: { text: 'Staccato' },
  toggleAccentText: { text: 'Accento' },
  toggleTenutoText: { text: 'Tenuto' },
  toggleMarcatoText: { text: 'Marcato' },
  toggleStaccissText: { text: 'Staccatissimo' },
  toggleSpiccText: { text: 'Spiccato' },

  // HELP MENU ITEM / VOCE DI MENU AIUTO
  helpMenuTitle: { text: 'Aiuto' },
  goToHelpPageText: { text: 'Pagina di aiuto di mei-friend' },
  goToCheatSheet: { text: 'Scheda informativa di mei-friend' },
  showChangelog: { text: 'Registro delle modifiche di mei-friend' },
  goToGuidelines: { text: 'Linee guida MEI' },
  consultGuidelinesForElementText: { text: "Linee guida per l'elemento corrente" },
  provideFeedback: { text: 'Fornisci un feedback' },
  resetDefault: { text: 'Ripristina impostazioni predefinite' },

  // panel icons/ icone pannello
  showMidiPlaybackControlBarButton: { description: 'Attiva/Disattiva barra di controllo della riproduzione MIDI' },
  showFacsimileButton: { description: 'Attiva/Disattiva pannello Facsimile' },
  showAnnotationsButton: { description: 'Attiva/Disattiva pannello Annotazioni' },
  showSettingsButton: { description: 'Mostra il pannello delle impostazioni' },

  // Footer texts/ Testi di piè di pagina
  leftFooter: {
    html:
      'Ospitato da <a href="https://iwk.mdw.ac.at">IWK</a> ' +
      'a <a href="https://mdw.ac.at">mdw</a>, con ' +
      heart +
      ' da Vienna. ' +
      '<a href="https://iwk.mdw.ac.at/impressum">Imprint</a>.',
  },
  loadingVerovio: { text: 'Caricamento Verovio' },
  verovioLoaded: { text: 'caricato' },
  convertedToPdf: { text: 'convertito in PDF' },
  statusBarCompute: { text: 'Calcola' },
  middleFooterPage: { text: 'pagina' },
  middleFooterOf: { text: 'di' },
  middleFooterLoaded: { text: 'caricato' },

  // control menu/ menu di controllo
  verovioIcon: {
    description: `attività del worker di mei-friend: 
    la rotazione in senso orario indica l'attività di Verovio, 
    la velocità di rotazione in senso antiorario indica l'attività del worker`,
  },
  decreaseScaleButton: { description: 'Riduci notazione' },
  verovioZoom: { description: 'Scala dimensioni dello spartito' },
  increaseScaleButton: { description: 'Aumenta notazione' },
  pagination1: { html: 'Pagina ' },
  pagination3: { html: ' di' },
  sectionSelect: { description: 'Naviga la struttura di sezione/finale del codice' },
  firstPageButton: { description: 'Vai alla prima pagina' },
  previousPageButton: { description: 'Vai alla pagina precedente' },
  paginationLabel: {
    description: 'Navigazione della pagina: fai clic per inserire manualmente il numero di pagina da visualizzare',
  },
  nextPageButton: { description: 'Vai alla pagina successiva' },
  lastPageButton: { description: "Vai all'ultima pagina" },
  flipCheckbox: { description: 'Passa automaticamente alla posizione del cursore di codice' },
  flipButton: { description: 'Passa manualmente alla posizione del cursore di codice' },
  breaksSelect: { description: 'Definisci il comportamento degli intervalli/pagine di sistema nello spartito' },
  breaksSelectNone: { text: 'Nessuno' },
  breaksSelectAuto: { text: 'Automatico' },
  breaksSelectMeasure: { text: 'Misura' },
  breaksSelectLine: { text: 'Rigo' },
  breaksSelectEncoded: { text: 'Rigo e pagina' },
  breaksSelectSmart: { text: 'Intelligente' },
  updateControlsLabel: {
    text: 'Aggiorna',
    description: 'Cambia il comportamento di controllo dello spartito dopo le modifiche nel codice',
  },
  liveUpdateCheckbox: { description: 'Aggiorna automaticamente lo spartito dopo le modifiche nella codice' },
  codeManualUpdateButton: { description: 'Aggiorna manualmente lo spartito' },
  engravingFontSelect: { description: 'Seleziona il carattere di incisione' },
  backwardsButton: { description: 'Vai a sinistra nello spartito' },
  forwardsButton: { description: 'Vai a destra nello spartito' },
  upwardsButton: { description: "Naviga verso l'alto nello spartito" },
  downwardsButton: { description: 'Naviga verso il basso nello spartito' },
  speedLabel: {
    text: 'Modalità veloce',
    description:
      'Nella modalità veloce, solamente la pagina corrente viene inviata a Verovio per ridurre i tempi di rendering in caso di file di grandi dimensioni',
  },

  // PDF/print preview panel / Pannello di anteprima PDF/stampa
  pdfSaveButton: { text: 'Salva PDF', description: 'Salva come PDF' },
  pdfCloseButton: { description: 'Chiudi vista di stampa' },
  pagesLegendLabel: { text: 'Intervallo di pagine', singlePage: 'pagina', multiplePages: 'Pagine' },
  selectAllPagesLabel: { text: 'Tutte' },
  selectCurrentPageLabel: { text: 'Pagina corrente' },
  selectFromLabel: { text: 'da:' },
  selectToLabel: { text: 'a:' },
  selectPageRangeLabel: { text: 'Intervallo di pagine:' },
  pdfPreviewSpeedModeWarning: {
    text:
      'Solo la pagina corrente viene renderizzata in PDF, poiché è attivata la modalità di velocità. ' +
      'Deseleziona la modalità di velocità per selezionare tutte le pagine.',
  },
  pdfPreviewNormalModeTitle: { text: "Seleziona l'intervallo di pagine da salvare in PDF." },

  // facsimile panel/ pannello facsimile
  facsimileIcon: { description: 'Pannello facsimile' },
  facsimileDecreaseZoomButton: { description: "Riduci l'immagine dello spartito" },
  facsimileZoom: { description: "Regola la dimensione dell'immagine dello spartito" },
  facsimileIncreaseZoomButton: { description: "Ingrandisci l'immagine dello spartito" },
  facsimileFullPageLabel: {
    text: 'Pagina intera',
    description: "Mostra l'intera pagina dell'immagine del facsimile",
  },
  facsimileFullPageCheckbox: { description: "Mostra l'intera pagina dell'immagine del facsimile" },
  facsimileShowZonesLabel: {
    text: 'Mostra riquadri delle zone',
    description: 'Mostra i riquadri delle zone del facsimile',
  },
  facsimileShowZonesCheckbox: { description: 'Mostra i riquadri delle zone del facsimile' },
  facsimileEditZonesCheckbox: { description: 'Modifica le zone del facsimile' },
  facsimileEditZonesLabel: {
    text: 'Modifica le zone',
    description: 'Modifica le zone del facsimile',
  },
  facsimileCloseButton: { description: 'Chiudi il pannello facsimile' },
  facsimileDefaultWarning: { text: 'Nessun contenuto facsimile da visualizzare.' },
  facsimileNoSurfaceWarning: {
    text: 'Nessun elemento di superficie trovato per questa pagina.\n(Potrebbe mancare un elemento pb iniziale.)',
  },
  facsimileNoZonesFullPageWarning: { text: 'Facsimile senza zone visibile solo in modalità pagina intera.' },
  facsimileImgeNotLoadedWarning: { text: "Impossibile caricare l'immagine" },

  // drag'n'drop / trascina e rilascia
  dragOverlayText: { text: 'Trascina il file di input qui.' },

  // public repertoire / repertorio pubblico
  openUrlHeading: { text: "Apri l'encoding ospitato sul Web tramite URL" },
  openUrlInstructions: {
    text: "Scegli tra il repertorio pubblico o inserisci l'URL dell'encoding musicale ospitato sul Web, di seguito. Nota: il server di hosting deve supportare la condivisione di risorse tra origini diverse (CORS).",
  },
  publicRepertoireSummary: { text: 'Repertorio pubblico' },
  sampleEncodingsComposerLabel: { text: 'Compositore:' },
  sampleEncodingsEncodingLabel: { text: 'Encoding:' },
  sampleEncodingsOptionLabel: { text: 'Scegli un encoding...' },
  openUrlButton: { text: 'Apri URL' },
  openUrlCancel: { text: 'Annulla' },
  proposePublicRepertoire: {
    html:
      'Accettiamo proposte per ' +
      '<a href="https://github.com/mei-friend/mei-friend/issues/new?template=public_repertoire.md" target="_blank" >' +
      'aggiunte al repertorio pubblico' +
      '</a>.',
  },
  openUrlChooseEncodingText: { text: 'Scegli un encoding...' },
  openUrlChooseComposerText: { text: 'Scegli un compositore...' },
  openUrlOpenEncodingByUrlText: { text: "Apri l'encoding ospitato sul Web tramite URL" },

  // GitHub actions modal
  githubActionsHeadingText: { text: 'Richiedi workflow di GitHub:' },
  githubActionsDescription: {
    text: 'Clicca su "Esegui workflow" per richiedere all\'API di GitHub di eseguire il workflow sopra riportato per te, utilizzando la configurazione di input specificata di seguito. La tua codifica verrà ricaricata nella sua ultima versione una volta che l\'esecuzione del workflow sarà completa.',
  },
  githubActionStatusMsgPrompt: { text: 'Impossibile eseguire il workflow: GitHub dice' },
  githubActionStatusMsgWaiting: { text: 'Sii paziente mentre GitHub sta elaborando il tuo workflow...' },
  githubActionStatusMsgFailure: { text: 'Impossibile eseguire il workflow: GitHub dice' },
  githubActionStatusMsgSuccess: { text: 'Esecuzione del workflow completata: GitHub dice' },
  githubActionsRunButton: { text: 'Esegui workflow' },
  githubActionsRunButtonReload: { text: 'Ricarica file MEI' },
  githubActionsCancelButton: { text: 'Annulla' },
  githubActionsInputSetterFilepath: { text: "Copia il percorso del file corrente nell'input" },
  githubActionsInputSetterSelection: { text: "Copia la selezione MEI corrente nell'input" },
  githubActionsInputContainerHeader: { text: 'Configurazione input' },

  // fork modals / fork modals
  forkRepoGithubText: { text: 'Fork Repository Github' },
  forkRepoGithubExplanation: {
    text: 'Il link che hai seguito ' + 'creerà una fork del seguente repository GitHub per la modifica in mei-friend:',
  },
  forkRepoGithubConfirm: { text: 'Va bene?' },
  forkRepositoryInstructions: {
    text:
      'Scegli dal repertorio pubblico o inserisci il nome Github (utente o organizzazione) e il nome del repository di un repository ospitato su Github, qui sotto. ' +
      'La tua repository forked sarà disponibile dal menu di Github.',
  },
  forkRepositoryGithubText: { text: 'Fork Repository Github' },
  forkRepertoireSummary: { text: 'Repertorio pubblico' },
  forkRepertoireComposerLabel: { text: 'Compositore:' },
  forkRepertoireOrganizationLabel: { text: 'Organizzazione:' },
  forkRepertoireOrganizationOption: { text: "Scegli un'organizzazione GitHub..." },
  forkRepertoireRepositoryLabel: { text: 'Repository:' },
  forkRepertoireRepositoryOption: { text: 'Scegli una codice...' },
  forkRepositoryInputName: { placeholder: 'Nome utente o organizzazione Github' },
  forkRepositoryInputRepoOption: { text: 'Scegli un repository' },
  forkRepositoryToSelectorText: { text: 'Fork a: ' },
  forkRepositoryButton: { text: 'Fork repository' },
  forkRepositoryCancel: { text: 'Annulla' },
  forkProposePublicRepertoire: {
    html:
      'Accettiamo proposte per ' +
      '<a target="_blank" href="https://github.com/mei-friend/mei-friend/issues/new?template=public_repertoire.md">' +
      'aggiunte al repertorio pubblico' +
      '</a>.',
  },

  // CodeMirror editor
  selectTagNameForEnclosure: { text: "Acchiudere con il nome dell'elemento" },
  selectTagNameForEnclosureOkButton: { value: 'OK' },
  selectTagNameForEnclosureCancelButton: { value: 'Annulla' },

  // restore Solid session overlay
  solidExplanation: {
    description:
      'Solid è una piattaforma decentralizzata per dati collegati sociali. Accedi a Solid per creare annotazioni stand-off utilizzando dati collegati (RDF).',
  },
  solidProvider: { description: 'Per favore, scegli un provider di identità Solid (IdP) o specifica il tuo.' },
  solidLoginBtn: { text: 'Accedi' },
  solidOverlayCancel: {
    html: 'Ripristino della sessione Solid - premere <span>Esc</span> o fare clic qui per annullare.',
  },
  solidWelcomeMsg: { text: 'Benvenuto, ' },
  solidLogout: { text: 'Esci' },
  solidLoggedOutWarning: {
    html: `Ti sei disconnesso dall'integrazione Solid di mei-friend, ma il tuo browser è ancora connesso a Solid!
      <a id="solidIdPLogoutLink" target="_blank">Fai clic qui per disconnetterti da Solid</a>.`,
  },

  // annotation panel / annotation panel
  annotationCloseButtonText: { text: 'Chiudi pannello di annotazione' },
  hideAnnotationPanelButton: { description: 'Chiudi pannello di annotazione' },
  closeAnnotationPanelButton: { description: 'Chiudi pannello di annotazione' },
  annotationToolsButton: { text: 'Strumenti', description: 'Strumenti di annotazione' },
  annotationListButton: { text: 'Lista', description: 'Elenco delle annotazioni' },
  writeAnnotStandoffText: { text: 'Annotazione Web' },
  annotationToolsIdentifyTitle: { text: 'Identifica' },
  annotationToolsIdentifySpan: { text: 'Identifica oggetto musicale' },
  annotationToolsHighlightTitle: { text: 'Evidenzia' },
  annotationToolsHighlightSpan: { text: 'Evidenzia' },
  annotationToolsDescribeTitle: { text: 'Descrivi' },
  annotationToolsDescribeSpan: { text: 'Descrivi' },
  annotationToolsLinkTitle: { text: 'Link' },
  annotationToolsLinkSpan: { text: 'Link' },
  listAnnotations: { text: 'Nessuna annotazione presente.' },
  addWebAnnotation: { text: 'Carica annotazione/i Web' },
  loadWebAnnotationMessage: { text: "Inserisci l'URL dell'annotazione Web o del contenitore dell'annotazione Web" },
  loadWebAnnotationMessage1: { text: "Impossibile caricare l'URL fornito" },
  loadWebAnnotationMessage2: { text: 'per favore riprova' },
  noAnnotationsToDisplay: { text: 'Nessuna annotazione da visualizzare' },
  flipPageToAnnotationText: { description: 'Passa alla pagina di questa annotazione' },
  deleteAnnotation: { description: 'Elimina questa annotazione' },
  deleteAnnotationConfirmation: { text: 'Sei sicuro di voler eliminare questa annotazione?' },
  makeStandOffAnnotation: {
    description: 'Stato stand-off (RDF)',
    descriptionSolid: 'Scrivi in Solid come RDF',
    descriptionToLocal: "Apri l'annotazione stand-off (RDF) in una nuova scheda",
  },
  makeInlineAnnotation: {
    description: 'Clicca per annotazione in-linea',
    descriptionCopy: "Copia l'xml:id di <annot> negli appunti",
  },
  pageAbbreviation: { text: 'p.' },
  elementsPlural: { text: 'elementi' },
  askForLinkUrl: { text: "Inserisci l'URL a cui collegare" },
  drawLinkUrl: { text: 'Apri in una nuova scheda' },
  askForDescription: { text: 'Inserisci una descrizione testuale da applicare' },
  maxNumberOfAnnotationAlert: {
    text1: 'Il numero di elementi <annot> supera il valore massimo configurabile di "Numero massimo di annotazioni"',
    text2:
      'Nuove annotazioni possono ancora essere generate e saranno visualizzate se "Mostra annotazioni" è attivato.',
  },
  annotationsOutsideScoreWarning: {
    text: 'Spiacente, non è possibile scrivere annotazioni al di fuori del tag <score>',
  },
  annotationWithoutIdWarning: {
    text1: "Impossibile scrivere l'annotazione perché il punto di ancoraggio MEI non ha un xml:id.",
    text2: 'Assegna un identificativo selezionando "Manipola" -> "Rendi il MEI di nuovo con id" e riprova.',
  },

  // MIDI
  midiSpeedmodeIndicator: {
    text: 'Modalità di velocità',
    description:
      "La modalità di velocità è attiva; viene riprodotto solo il MIDI per la pagina corrente. Per riprodurre l'intero codice, disabilita la modalità di velocità.",
  },
  closeMidiPlaybackControlBarButton: { description: 'Nascondi la barra di controllo della riproduzione MIDI' },

  // mei-friend SETTINGS MENU// MENU IMPOSTAZIONI di mei-friend
  meiFriendSettingsHeader: {
    text: 'Impostazioni',
    description: 'Impostazioni di mei-friend',
  },
  mfReset: {
    text: 'Predefinito',
    description: 'Reimposta ai valori predefiniti di mei-friend',
  },
  filterSettings: {
    placeholder: 'Cerca',
    description: 'Digita qui per cercare',
  },
  closeSettingsButton: {
    description: 'Chiudi il pannello delle impostazioni',
  },
  hideSettingsButton: {
    description: 'Chiudi il pannello delle impostazioni',
  },
  titleGeneral: {
    text: 'Generale',
    description: 'Impostazioni generali di mei-friend',
  },
  selectToolkitVersion: {
    text: 'Versione di Verovio',
    description:
      'Seleziona la versione del toolkit Verovio ' +
      '(*Passare a versioni precedenti alla 3.11.0 ' +
      'potrebbe richiedere un aggiornamento a causa di problemi di memoria.)',
  },
  toggleSpeedMode: {
    text: 'Modalità di velocità',
    description:
      'Attiva/Disattiva la modalità di velocità di Verovio. ' +
      'In modalità di velocità, solo la pagina corrente ' +
      'viene inviata a Verovio per ridurre il tempo di rendering ' +
      'con file di grandi dimensioni',
  },
  selectIdStyle: {
    text: 'Stile degli xml:id generati',
    description:
      'Stile degli xml:id appena generati (gli xml:id esistenti non vengono modificati)' +
      'ad esempio, originale di Verovio: "note-0000001318117900", ' +
      'base 36 di Verovio: "nophl5o", ' +
      'stile di mei-friend: "note-ophl5o"',
  },
  addApplicationNote: {
    text: "Inserisci dichiarazione dell'applicazione",
    description:
      "Inserisci una dichiarazione dell'applicazione nell'intestazione MEI, identificando" +
      "nome dell'applicazione, versione, data della prima e ultima modifica",
  },
  selectLanguage: {
    text: 'Lingua',
    description: "Seleziona la lingua dell'interfaccia di mei-friend.",
  },

  // Drag select / Selezione tramite trascinamento
  dragSelection: {
    text: 'Selezione tramite trascinamento',
    description: 'Seleziona gli elementi nello spartito con il trascinamento del mouse',
  },
  dragSelectNotes: {
    text: 'Seleziona le note',
    description: 'Seleziona le note',
  },
  dragSelectRests: {
    text: 'Seleziona le pause',
    description: 'Seleziona le pause e le ripetizioni (rest, mRest, beatRpt, halfmRpt, mRpt)',
  },
  dragSelectControlElements: {
    text: 'Seleziona gli elementi di posizionamento',
    description:
      'Seleziona gli elementi di posizionamento (cioè con un attributo @placement: ' +
      att.attPlacement.join(', ') +
      ')',
  },
  dragSelectSlurs: {
    text: 'Seleziona le legature',
    description:
      "Seleziona le legature (cioè gli elementi con l'attributo @curvature: " + att.attCurvature.join(', ') + ')',
  },
  dragSelectMeasures: {
    text: 'Seleziona le misure',
    description: 'Seleziona le misure',
  },

  // Control menu / Menu di controllo
  controlMenuSettings: {
    text: 'Barra di controllo dello spartito',
    description: 'Definisci gli elementi da mostrare nel menu di controllo sopra lo spartito',
  },
  controlMenuFlipToPageControls: {
    text: 'Mostra i controlli per cambiare pagina',
    description: 'Mostra i controlli per cambiare la pagina nel menu di controllo dello spartito',
  },
  controlMenuUpdateNotation: {
    text: "Mostra i controlli per l'aggiornamento dello spartito",
    description:
      'Mostra i controlli per il comportamento di aggiornamento dello spartito nel menu di controllo dello spartito',
  },
  controlMenuFontSelector: {
    text: 'Mostra il selettore del carattere di notazione',
    description: 'Mostra il selettore del carattere di notazione (SMuFL) nel menu di controllo dello spartito',
  },
  controlMenuNavigateArrows: {
    text: 'Mostra le frecce di navigazione',
    description: 'Mostra le frecce di navigazione nello spartito nel menu di controllo dello spartito',
  },
  controlMenuSpeedmodeCheckbox: {
    text: 'Mostra la casella di controllo della modalità di velocità',
    description: 'Mostra la casella di controllo della modalità di velocità nel menu di controllo dello spartito',
  },

  // MIDI Playback / Riproduzione MIDI
  titleMidiPlayback: {
    text: 'Riproduzione MIDI',
    description: 'Impostazioni riproduzione MIDI',
  },
  showMidiPlaybackContextualBubble: {
    text: 'Mostra icona di riproduzione',
    description:
      "Fa apparire un'icona nell'angolo in basso a sinistra " +
      'per avviare immediatamente la riproduzione quando la barra di controllo della riproduzione MIDI è chiusa',
  },
  showMidiPlaybackControlBar: {
    text: 'Mostra barra di controllo riproduzione MIDI',
    description: 'Mostra barra di controllo riproduzione MIDI',
  },
  scrollFollowMidiPlayback: {
    text: 'Scorrimento automatico',
    description: 'Scorri il pannello dello spartito durante la riproduzione MIDI sulla pagina corrente',
  },
  pageFollowMidiPlayback: {
    text: 'Cambio pagina automatico',
    description: 'Cambia automaticamente la pagina durante la riproduzione MIDI',
  },
  highlightCurrentlySoundingNotes: {
    text: 'Evidenzia note attualmente suonate',
    description:
      'Evidenzia visivamente le note attualmente suonate nel pannello di notazione durante la riproduzione MIDI',
  },

  selectMidiExpansion: {
    text: 'Espansione',
    description: "Seleziona l'espansione da utilizzare perla riproduzione MIDI",
  },

  // Transposition // Trasposizione
  titleTransposition: {
    text: 'Trasposizione',
    description: 'Trasponi informazioni di punteggio',
  },
  enableTransposition: {
    text: 'Abilita la trasposizione',
    description:
      'Abilita le impostazioni di trasposizione, da applicare tramite il pulsante di trasposizione sottostante. La trasposizione verrà applicata solo allo spartito, il codice rimane inalterata, a meno che non si clicchi su "Rerender via Verovio" nel menu a discesa "Manipulate".',
  },
  transposeInterval: {
    text: 'Trasponi per intervallo',
    description:
      'Trasponi la codice per intervallo cromatico attraverso gli intervalli più comuni (Verovio supporta il sistema base-40)',
    labels: [
      'Unisono Perfetto',
      'Unisono Aumentato',
      'Seconda diminuita',
      'Seconda minore',
      'Seconda maggiore',
      'Seconda aumentata',
      'Terza diminuita',
      'Terza minore',
      'Terza maggiore',
      'Terza aumentata',
      'Quarta diminuita',
      'Quarta Perfetta',
      'Quarta aumentata',
      'Quinta diminuita',
      'Quinta Perfetta',
      'Quinta aumentata',
      'Sesta diminuita',
      'Sesta minore',
      'Sesta maggiore',
      'Sesta aumentata',
      'Settima diminuita',
      'Settima minore',
      'Settima maggiore',
      'Settima aumentata',
      'Ottava diminuita',
      'Ottava Perfetta',
    ],
  },
  transposeKey: {
    text: 'Trasponi per tonalità',
    description: 'Trasponi per tonalità',
    labels: [
      'Do# maggiore / La# minore',
      'Fa# maggiore / Re# minore',
      'Si maggiore / Sol# minore',
      'Mi maggiore / Do# minore',
      'La maggiore / Fa# minore',
      'Re maggiore / Si minore',
      'Sol maggiore / Mi minore',
      'Do maggiore / La minore',
      'Fa maggiore / Re minore',
      'Si♭ maggiore / Sol minore',
      'Mi♭ maggiore / Do minore',
      'La♭ maggiore / Fa minore',
      'Re♭ maggiore / Si♭ minore',
      'Sol♭ maggiore / Mi♭ minore',
      'Do♭ maggiore / La♭ minore',
    ],
  },
  transposeDirection: {
    text: 'Direzione di trasposizione',
    description: 'Direzione di trasposizione (su/giù)',
    labels: ['Su', 'Giù', 'Più vicino'],
  },
  transposeButton: {
    text: 'Trasponi',
    description:
      'Applica la trasposizione con le impostazioni sopra indicate allo spartito, mantenendo invariata la codice MEI. Per trasporre anche la codice MEI con le attuali impostazioni, utilizzare "Rerender via Verovio" nel menu a tendina "Manipulate".',
  },

  // Renumber measures / Rinumerazione misure
  renumberMeasuresHeading: {
    text: 'Rinumera misure',
    description: 'Impostazioni per la rinumerazione delle misure',
  },
  renumberMeasureContinueAcrossIncompleteMeasures: {
    text: 'Continua tra le misure incomplete',
    description: 'Continua i numeri delle misure tra le misure incomplete (@metcon="false")',
  },
  renumberMeasuresUseSuffixAtMeasures: {
    text: 'Aggiungi suffisso alle misure incomplete',
    description: 'Aggiungi un suffisso numerico alle misure incomplete (ad esempio, 23-cont)',
    labels: ['nessuno', '-cont'],
  },
  renumberMeasuresContinueAcrossEndings: {
    text: 'Continua tra le chiusure',
    description: 'Continua i numeri delle misure tra le chiusure',
  },
  renumberMeasuresUseSuffixAtEndings: {
    text: 'Aggiungi suffisso alle chiusure',
    description: 'Aggiungi un suffisso numerico alle chiusure (ad esempio, 23-a)',
  },

  // Annotations / Annotazioni
  titleAnnotations: {
    text: 'Annotazioni',
    description: 'Impostazioni delle annotazioni',
  },
  showAnnotations: {
    text: 'Mostra annotazioni',
    description: 'Mostra le annotazioni nello spartito',
  },
  showAnnotationPanel: {
    text: 'Mostra pannello annotazioni',
    description: 'Mostra il pannello delle annotazioni',
  },
  annotationDisplayLimit: {
    text: 'Numero massimo di annotazioni',
    description: 'Numero massimo di annotazioni da visualizzare (numeri elevati possono rallentare mei-friend)',
  },

  // Facsimile / Facsimile
  titleFacsimilePanel: {
    text: 'Pannello di facsimile',
    description: "Mostra le immagini di facsimile dell'edizione originale, se disponibili",
  },
  showFacsimilePanel: {
    text: 'Mostra il pannello di facsimile',
    description: "Mostra le immagini dello spartito dell'edizione originale fornite nell'elemento di facsimile",
  },
  selectFacsimilePanelOrientation: {
    text: 'Posizione del pannello di facsimile',
    description: 'Seleziona la posizione del pannello di facsimile rispetto allo spartito',
    labels: ['sinistra', 'destra', 'alto', 'basso'],
  },
  facsimileZoomInput: {
    text: 'Zoom immagine di facsimile (%)',
    description: "Livello di zoom dell'immagine di facsimile (in percentuale)",
  },
  showFacsimileFullPage: {
    text: 'Mostra pagina intera',
    description: "Mostra l'immagine di facsimile su tutta la pagina",
  },
  showFacsimileZones: {
    text: 'Mostra le zone del facsimile',
    description: 'Mostra le zone di delimitazione del facsimile',
  },
  editFacsimileZones: {
    text: 'Modifica le zone del facsimile',
    description: 'Modifica le zone del facsimile (collegando le zone delimitate ai facsimile)',
  },

  // Supplied element // Supplied element
  titleSupplied: {
    text: 'Gestisci il contenuto editoriale',
    description: 'Controlla la gestione degli elementi <supplied>',
  },
  showSupplied: {
    text: 'Mostra gli elementi <supplied>',
    description: "Evidenzia tutti gli elementi contenuti nell'elemento <supplied>",
  },
  suppliedColor: {
    text: "Seleziona il colore per l'evidenziazione di <supplied>",
    description: "Seleziona il colore per l'evidenziazione di <supplied>",
  },
  respSelect: {
    text: 'Seleziona la responsabilità di <supplied>',
    description: "Seleziona l'id della responsabilità",
  },

  // EDITOR SETTINGS / CODEMIRROR SETTINGS
  editorSettingsHeader: {
    text: "Impostazioni dell'editor",
  },
  cmReset: {
    text: 'Predefinito',
    description: 'Reimposta alle impostazioni predefinite di mei-friend',
  },
  titleAppearance: {
    text: "Aspetto dell'editor",
    description: "Controlla l'aspetto dell'editor",
  },
  zoomFont: {
    text: 'Dimensione del carattere (%)',
    description: "Cambia la dimensione del carattere dell'editor (in percentuale)",
  },
  theme: {
    text: 'Tema',
    description: "Seleziona il tema dell'editor",
  },
  matchTheme: {
    text: 'lo spartito corrisponde al tema',
    description: "Corrispondenza dello spartito al tema di colore dell'editor",
  },
  tabSize: {
    text: 'Dimensione indentazione',
    description: 'Numero di spazi per ogni livello di indentazione',
  },
  lineWrapping: {
    text: 'Rientro righe',
    description: 'Indica se le righe vengono spezzate a fine pannello',
  },
  lineNumbers: {
    text: 'Numeri di riga',
    description: 'Mostra i numeri di riga',
  },
  firstLineNumber: {
    text: 'Primo numero di riga',
    description: 'Imposta il primo numero di riga',
  },
  foldGutter: {
    text: 'Piegatura codice',
    description: 'Abilita la piegatura del codice attraverso la piega delle linee',
  },
  titleEditorOptions: {
    text: "Comportamento dell'editor",
    description: "Controlla il comportamento dell'editor",
  },
  autoValidate: {
    text: 'Validazione automatica',
    description: 'Valida automaticamente la codice rispetto allo schema dopo ogni modifica',
  },
  autoShowValidationReport: {
    text: 'Mostra il rapporto di validazione automaticamente',
    description: 'Mostra automaticamente il rapporto di validazione dopo che la convalida è stata eseguita',
  },
  autoCloseBrackets: {
    text: 'Chiusura parentesi automatica',
    description: 'Chiude automaticamente le parentesi quando vengono inserite',
  },
  autoCloseTags: {
    text: 'Chiusura tag automatica',
    description: 'Chiude automaticamente i tag quando vengono inseriti',
    type: 'bool',
  },
  matchTags: {
    text: 'Corrispondenza tag',
    description: "Evidenzia i tag corrispondenti intorno al cursore dell'editor",
  },
  showTrailingSpace: {
    text: 'Evidenzia spazi finali',
    description: 'Evidenzia gli spazi inutili alla fine delle righe',
  },
  keyMap: {
    text: 'Mappa tasti',
    description: 'Seleziona la mappa tasti',
  },

  // Verovio settings / Impostazioni di Verovio
  verovioSettingsHeader: {
    text: 'Impostazioni',
  },
  vrvReset: {
    text: 'Predefinito',
    description: 'Ripristina Verovio ai valori predefiniti di mei-friend',
  },

  // main.js alert messages / messaggi di avviso di main.js
  isSafariWarning: {
    text:
      'Sembra che stai utilizzando Safari come browser, su cui ' +
      'mei-friend attualmente non supporta la validazione dello schema. ' +
      'Per il pieno supporto alla validazione, utilizza un altro browser.',
  },
  githubLoggedOutWarning: {
    text:
      "Hai effettuato il logout dall'integrazione di GitHub di mei-friend, " +
      'ma il tuo browser è ancora connesso a GitHub! ' +
      '<a href="https://github.com/logout" target="_blank">Clicca qui per effettuare il logout da GitHub</a>.',
  },
  generateUrlError: {
    text: "Impossibile generare l'URL per il file locale ",
  },
  generateUrlSuccess: {
    text: 'URL copiato negli appunti con successo',
  },
  generateUrlNotCopied: {
    text: 'URL non copiato negli appunti, riprova!',
  },
  errorCode: { text: 'Codice errore' },
  submitBugReport: { text: 'Invia segnalazione di bug' },
  loadingSchema: { text: 'Caricamento schema' },
  schemaLoaded: { text: 'Schema caricato' },
  noSchemaFound: { text: 'Nessuna informazione di schema trovata in MEI.' },
  schemaNotFound: { text: 'Schema non trovato' },
  errorLoadingSchema: { text: 'Errore nel caricamento dello schema' },
  notValidated: { text: 'Non validato. Premere qui per validare.' },
  validatingAgainst: { text: 'Validazione contro' },
  validatedAgainst: { text: 'Validato contro' },
  validationMessages: { text: 'messaggi di validazione' },
  validationComplete: { text: 'Validazione completa' },
  validationFailed: { text: 'Validazione fallita' },
  noErrors: { text: 'nessun errore' },
  errorsFound: { text: 'errori trovati' }, // 5 errori trovati

  // github-menu.js / github-menu.js
  githubRepository: { text: 'Repository' },
  githubBranch: { text: 'Ramo' },
  githubFilepath: { text: 'Percorso' },
  githubCommit: { text: 'Commit' },
  githubCommitButton: { classes: { commitAsNewFile: { value: 'Commit come nuovo file' } }, value: 'Commit' },
  commitLog: { text: 'Registro commit' },
  githubDate: { text: 'Data' },
  githubAuthor: { text: 'Autore' },
  githubMessage: { text: 'Messaggio' },
  none: { text: 'Nessuno' },
  commitFileNameText: { text: 'Nome del file' },
  forkRepository: { text: 'Fork del repository' },
  forkError: { text: 'Spiacenti, non è possibile eseguire il fork del repository' },
  loadingFile: { text: 'Caricamento file' },
  loadingFromGithub: { text: 'Caricamento da Github' },
  logOut: { text: 'Esci' },
  githubLogout: { text: 'Esci' },
  selectRepository: { text: 'Seleziona repository' },
  selectBranch: { text: 'Seleziona ramo' },
  commitMessageInput: { placeholder: 'Aggiornato usando mei-friend online' },
  reportIssueWithEncoding: { value: 'Segnala problema di codice' },
  clickToOpenInMeiFriend: { text: 'Clicca per aprire in mei-friend' },
  repoAccessError: {
    text: "Spiacenti, non è possibile accedere ai repository per l'utente o l'organizzazione forniti",
  },
  allComposers: { text: 'Tutti i compositori' }, // fork-repository.js

  // utils renumber measures
  renumberMeasuresModalText: { text: 'Rinumera misure' },
  renumberMeasuresModalTest: { text: 'Test' },
  renumberMeasuresWillBe: { text: '' },
  renumberMeasuresWouldBe: { text: 'sarebbe' },
  renumberMeasuresChangedTo: { text: 'cambiato in' },
  renumberMeasureMeasuresRenumbered: { text: 'misure rinumerate' },

  // Code checker panel (accid.ges)
  codeCheckerTitle: {
    text: 'Verifica gli attributi @accid.ges (rispetto alla tonalità della chiave, gli accid. per misura e legature).',
  },
  codeCheckerFix: { text: 'Correggi' },
  codeCheckerFixAll: { text: 'Correggi tutto' },
  codeCheckerIgnore: { text: 'Ignora' },
  codeCheckerIgnoreAll: { text: 'Ignora tutto' },
  codeCheckerCheckingCode: { text: 'Verifica del codice in corso...' },
  codeCheckerNoAccidMessagesFound: { text: 'Tutti gli attributi accid.ges sembrano corretti.' },
  codeCheckerMeasure: { text: 'Misura' },
  codeCheckerNote: { text: 'Nota' },
  codeCheckerHasBoth: { text: 'ha entrambi' },
  codeCheckerAnd: { text: 'e' },
  codeCheckerRemove: { text: 'Rimuovi' },
  codeCheckerFixTo: { text: 'Correggi a' },
  codeCheckerAdd: { text: 'Aggiungi' },
  codeCheckerWithContradictingContent: { text: 'con contenuto contrastante' },
  codeCheckerTiedNote: { text: 'Nota legata' },
  codeCheckerNotSamePitchAs: { text: 'non stessa altezza di' },
  codeCheckerNotSameOctaveAs: { text: 'non stesso ottavo di' },
  codeCheckerNotSameAsStartingNote: { text: 'non uguale alla nota di partenza' },
  codeCheckerExtra: { text: 'extra' },
  codeCheckerHasExtra: { text: 'ha extra' },
  codeCheckerLacksAn: { text: 'manca un' },
  codeCheckerBecauseAlreadyDefined: { text: 'poiché è già stato definito in precedenza nella misura' },

  // Warning for missing ids
  missingIdsWarningAlert: {
    text: 'mei-friend non è in grado di scorrere gli elementi selezionati nella codifica. Aggiungere gli id alla codifica.',
  },
};
