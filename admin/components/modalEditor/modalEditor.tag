<modal-editor>

  <div id="uts-modal-editor" class="uts-modal-editor { open: isOpen }">
      <div class="uts-modal-editor-container">

          <div class="uts uts-close-icon" onclick="{close.bind(this, true)}"></div>

          <div class="uts page-header">
              <h1>User Tour Editor</h1>
              <div class="uts buttons-group ng-scope">
                  <button type="button" class="uts uts-btn btn-success" onclick="{close.bind(this, true)}">Cancel</button>
                  <button if="{!editing}" type="button" class="uts uts-btn btn-info" onclick="{addStep}" disabled="{!step.title.es_ES || !step.title.en_US}">Add</button>
                  <button if="{editing}" type="button" class="uts uts-btn btn-info" onclick="{saveStep}" disabled="{!step.title.es_ES || !step.title.en_US}">Save</button>
              </div>
          </div>

          <div id="uts-modal-editor-content" class="uts-modal-editor-content">

              <div class="uts uts-jumbotron">
                  <h2>Step Action</h2>
                  <div class="uts checkbox" if="{!this.step.typewrite}">
                      <label><input id="doClick" type="checkbox" onchange={toggleDoClick}> Do Click</label>
                  </div>
                  <div class="uts checkbox" if="{!this.step.doClick}">
                      <label><input id="typewrite" type="checkbox" onchange={toggleTypewrite}> Typewrite</label>
                      <label if="{this.step.typewrite}">Typewrite String</label>
                      <input if="{this.step.typewrite}" id="typewriteValue" placeholder="Write something" type="text" class="uts form-control">
                  </div>
              </div>

              <div class="uts uts-jumbotron">
                  <h2>Step DOM Selector</h2>
                  <div class="uts checkbox">
                      <label><input id="showDOMSelectorCheckbox" type="checkbox" onchange={toggleShowDOMSelector}> Change calculated DOM Selector</label>
                      <label if="{showDomSelector}" class="uts-warning">ONLY DO IT IF YOU KNOW EXACTLY THE DOM SELECTOR</label>
                      <label if="{showDomSelector}">DOM String Selector</label>
                      <input id="DOMSelector" if="{showDomSelector}" type="text" class="uts form-control" value="{this.step.selector}">
                  </div>
              </div>

              <div class="uts uts-jumbotron">
                  <h2>Step title</h2>
                  <label>Title (es_ES)</label>
                  <input id="es_ES" placeholder="Give me a title" type="text" class="uts form-control" onkeyup="{readTitles}">
                  <p></p>
                  <label>Title (en_US)</label>
                  <input id="en_US" placeholder="Give me a title" type="text" class="uts form-control" onkeyup="{readTitles}">
                  <p></p>
              </div>

              <div class="uts uts-jumbotron">
                  <h2>Icon Selector</h2>
                  <p></p>
                  <button type="button" class="uts uts-btn btn-info" onclick="{showIconSelector}" if="{!showIconS}">Show Icon Selector</button>
                  <button type="button" class="uts uts-btn btn-info" onclick="{hideIconSelector}" if="{showIconS}">Hide Icon Selector</button>
                  <img class="uts-step-icon" src="{step.icon.imageUrl}" if="{step.icon.imageUrl}"/><div class="uts uts-close-icon uts-close-icon-selector" if="{step.icon.imageUrl}" onclick="{clearIconSelection}"></div>
                  <p></p>
                  <div class="uts-image-selector" if="{showIconS}">
                      <ul>
                          <li each={ icon in icons } class={ uts-image-selected: step.icon.id == icon.id } onclick="{selectIcon}">
                              <img src="{icon.imageUrl}" />
                          </li>
                      </ul>
                  </div>
              </div>

              <p></p>
              <p></p>

              <div class="uts uts-jumbotron">
                  <h2>Description</h2>
                  <label>Description (es_ES)</label>
                  <div id="medium_editor_toolbar_01"></div>
                  <textarea id="description_es_ES" placeholder="Give me a description" type="text" class="uts" name="description_es_ES" ></textarea>
                  <p></p>
                  <label>Description (en_US)</label>
                  <div id="medium_editor_toolbar_02"></div>
                  <textarea id="description_en_US" placeholder="Give me a description" type="text" class="uts" name="description_en_US"></textarea>
                  <p></p>
              </div>

              <div class="uts uts-jumbotron">

                  <h2>Custom Button</h2>
                  <p></p>

                  <div class="uts checkbox">
                      <label><input id="enableCustomButton" type="checkbox" onchange={toggleCustomButton}> Custom Button enabled</label>
                  </div>

                  <div if="{step.enableCustomButton}">
                      <label>Custom Button URL</label>
                      <input id="urlCustomButton" placeholder="http://wikipedia.org" type="text" class="uts form-control">
                      <p></p>
                      <label>Custom Button Name (es_ES)</label>
                      <input id="customButtonEs_ES" placeholder="Give me a title" type="text" class="uts form-control" >
                      <p></p>
                      <label>Custom Button Name (en_US)</label>
                      <input id="customButtonEn_US" placeholder="Give me a title" type="text" class="uts form-control" >
                      <p></p>
                  </div>
              </div>

          </div>
      </div>
  </div>

  <script>

  /* Import */
  var utils = require('../../services/utils');
  var icons = require('../../services/icons');

  //Models
  var tours = bbva.usertour.editor.tours;
  var steps = bbva.usertour.editor.steps;

  /* Constants */
  var OPTIONS_DESCRIPTION_ES_ES_EDITOR = {
          selector: '#description_es_ES',
          height: 200,
          menubar: false,
          mode : "textareas",
          elementpath: false,
          toolbar: 'undo redo | bold underline italic',
          plugins: "wordcount",
          valid_elements : 'strong/b,i,br',
          keep_styles: false,
          force_br_newlines : true,
          force_p_newlines : false,
          forced_root_block : '' // Needed for 3.x
      },
      OPTIONS_DESCRIPTION_EN_US_EDITOR = {
          selector: '#description_en_US',
          height: 200,
          menubar: false,
          mode : "textareas",
          elementpath: false,
          toolbar: 'undo redo | bold underline italic',
          plugins: "wordcount",
          valid_elements : 'strong/b,i,br',
          keep_styles: false,
          force_br_newlines : true,
          force_p_newlines : false,
          forced_root_block : '' // Needed for 3.x
      };

  var _oldBodyOverflow,
      stepBackup;

  /* Public Variables */
  /* Main object that stores the fields */
  this.step = {
      title : {},
      intro : {},
      doClick : false,
      typewrite : false,
      typewriteValue : null,
      icon : {},
      enableCustomButton : false,
      customButton : {},
      urlCustomButton : null,
  };

  this.isOpen = false;
  this.editing = false;
  this.currentSelector;
  this.stepIndex;
  this.icons;
  this.showIconS = false;
  this.showDomSelector = false;

  /* Revealing Methods and Event Handlers */

  this.on('mount', function(e){});

  //Open - close modal
  this.open = open.bind(this);
  this.openStep = openStep.bind(this);
  this.close = close.bind(this);
  //Read, toggle checkboxes
  this.readTitles = readTitles.bind(this);
  this.toggleDoClick = toggleDoClick.bind(this);
  this.toggleTypewrite = toggleTypewrite.bind(this);
  this.toggleCustomButton = toggleCustomButton.bind(this);
  this.toggleShowDOMSelector = toggleShowDOMSelector.bind(this);
  //Icons selection
  this.showIconSelector = showIconSelector.bind(this);
  this.hideIconSelector = hideIconSelector.bind(this);
  this.selectIcon = selectIcon.bind(this);
  this.clearIconSelection = clearIconSelection.bind(this);
  //Add step
  this.addStep = addStep.bind(this);
  //Edit step
  this.saveStep = saveStep.bind(this);


  /* Private Methods */

  /**
   * This method is called when open event is received
   * @param  {String} selector String selector of the DOM element clicked
   * @return {NA}          NA
   */
  function open(selector){

      this.editing = false;
      this["uts-modal-editor-content"].scrollTop = 0;

      //We have to wait for tinymce are ready
      tinymceStart.call(this, function(){

          reset.call(this);
          if(!this.icons) {
            loadIcons.call(this);
          }
          this.step.selector = selector;
          this.isOpen = true;
          _oldBodyOverflow = document.body.style.overflow;
          document.body.style.overflow = "hidden";
          //We have to call update for riotjs updating
          //(similar to $apply of angularjs)
          this.update();

      }.bind(this));

  }

  /**
   * Method that opens the modalEditor using a current step index
   * to set step[index] data in the form
   * @param  {integer} pIndex step index
   * @param  {object} pStep  step
   * @return {NA}        NA
   */
  function openStep( pIndex, pStep ){

    this.stepIndex = pIndex;
    this.editing = true;

    this["uts-modal-editor-content"].scrollTop = 0;

    //We have to wait for tinymce are ready
    tinymceStart.call(this, function(){

        reset.call(this);
        if(!this.icons) {
          loadIcons.call(this);
        }
        fillFields.call(this, pStep);
        this.isOpen = true;
        //We have to call update for riotjs updating
        //(similar to $apply of angularjs)
        this.update();

    }.bind(this));

    //Do a backup of the original object
    stepBackup = JSON.parse(JSON.stringify(pStep));


  }

  /**
   * Method that closes the editor modal
   * @return {NA} NA
   */
  function close( cancel ){

      this.isOpen = false;
      document.body.style.overflow = _oldBodyOverflow;

      if(cancel && stepBackup){
        fillFields.call(this, JSON.parse(JSON.stringify(stepBackup)));
      }
  }

  /**
   * Method that reset all fields and this.step object
   */
  function reset(){

      this.doClick.checked = false;
      this.typewrite.checked = false;
      this.typewriteValue.value = "";
      this.showDOMSelectorCheckbox.checked = false;
      this.showDomSelector = false;

      this.es_ES.value = "";
      this.en_US.value = "";

      this.description_es_ES.value = "";
      this.description_en_US.value = "";

      if(this.description_es_ES_Editor){
          tinymce.get('description_es_ES').setContent("")
      }

      if(this.description_en_US_Editor){
          tinymce.get('description_en_US').setContent("")
      }

      this.enableCustomButton.checked = false;
      this.urlCustomButton.value = "";
      this.customButtonEs_ES.value = "";
      this.customButtonEn_US.value = "";

      this.step = {
          title : {},
          intro : {},
          doClick : false,
          typewrite : false,
          typewriteValue : null,
          icon : {},
          enableCustomButton : false,
          customButton : {},
          urlCustomButton : null,
      };

  }

  /**
   * Method that fills form fields from steps model
   * @param  {array} pStep steps array
   * @return {NA}       NA
   */
  function fillFields( pStep ){

      this.doClick.checked = pStep.doClick;
      this.typewrite.checked = pStep.typewrite;
      this.typewriteValue.value = pStep.typewriteValue;

      this.DOMSelector.value = pStep.selector;

      this.es_ES.value = pStep.title.es_ES;
      this.en_US.value = pStep.title.en_US;

      if(this.description_es_ES_Editor){
          tinymce.get('description_es_ES').setContent(pStep.intro.es_ES)
      }

      if(this.description_en_US_Editor){
          tinymce.get('description_en_US').setContent(pStep.intro.en_US)
      }

      this.step.icon = pStep.icon;
      this.enableCustomButton.checked = pStep.enableCustomButton;
      this.urlCustomButton.value = pStep.urlCustomButton;
      this.customButtonEs_ES.value = pStep.customButton.es_ES;
      this.customButtonEn_US.value = pStep.customButton.en_US;
      this.step = JSON.parse(JSON.stringify(pStep));

      this.update();

  }

  /**
   * Method that starts tinymce editor
   * @return {NA} NA
   */
  function tinymceStart( callback ){

      if(this.description_es_ES_Editor && this.description_en_US_Editor){

          callback();

      }else{

          OPTIONS_DESCRIPTION_ES_ES_EDITOR.setup = setupTinyMCE.bind(this);
          OPTIONS_DESCRIPTION_EN_US_EDITOR.setup = setupTinyMCE.bind(this);

          if(!this.description_es_ES_Editor){
              tinymce.init(OPTIONS_DESCRIPTION_ES_ES_EDITOR)
          }

          if(!this.description_en_US_Editor){
              tinymce.init(OPTIONS_DESCRIPTION_EN_US_EDITOR)
          }

          function setupTinyMCE (ed) {

            ed.on('init', function(args) {

                console.debug(args.target.id);

                if(args.target.id == "description_es_ES"){
                  this.description_es_ES_Editor = true;
                }

                if(args.target.id == "description_en_US"){
                  this.description_en_US_Editor = true;
                }

                if(this.description_es_ES_Editor && this.description_en_US_Editor){
                  callback();
                }

            }.bind(this));

          };

      }

  }

  /**
   * Method that reads title fields
   * @param  {event} e [description]
   * @return {NA}   NA
   */
  function readTitles( e ){
      this.step.title[e.target.id] = e.target.value;
  }

  /**
   * Method that toggle custombutton checkbox
   * @param  {event} e [description]
   * @return {NA}   NA
   */
  function toggleCustomButton(e) {
      this.step.enableCustomButton = e.target.checked;
  }

  /**
   * Method that toggle doClick checkbox
   * @param  {event} e [description]
   * @return {NA}   NA
   */
  function toggleDoClick(e) {
      this.step.doClick = e.target.checked;
  }

  /**
   * Method that toggle typewrite checkbox
   * @param  {event} e [description]
   * @return {NA}   NA
   */
  function toggleTypewrite(e) {
      this.step.typewrite = e.target.checked;
  }

  /**
   * Method that toggle Show DOM Selector checkbox
   * @param  {event} e [description]
   * @return {NA}   NA
   */
  function toggleShowDOMSelector(e){
      this.showDomSelector = e.target.checked;
  }

  /**
   * Method that reads form editor
   * @return {[type]} [description]
   */
  function readFields(){

      this.step.typewriteValue = this.typewriteValue.value;

      if(this.showDomSelector){
          this.step.selector = this.DOMSelector.value;
      }

      this.step.intro.es_ES = tinymce.get()[0].getContent();
      this.step.intro.en_US = tinymce.get()[1].getContent();
      this.step.urlCustomButton = this.urlCustomButton.value;
      this.step.customButton.es_ES = this.customButtonEs_ES.value;
      this.step.customButton.en_US = this.customButtonEn_US.value;

  }

  /**
   * Method that shows icon selector area
   * @return {NA} NA
   */
  function showIconSelector(){
      this.showIconS = true;
  }

  /**
   * Method that hides icon selector area
   * @return {NA} NA
   */
  function hideIconSelector(){
      this.showIconS = false;
  }

  /**
   * Method that call to icons service from back
   * @return {NA}   NA
   */
  function loadIcons(){

      icons.get(function(err, data){

          if(data && data.body && data.body.data && data.body.data.list){
              this.icons = data.body.data.list;
              this.update();
          }

      }.bind(this));

  }

  /**
   * Method that select an image icon for the step
   * @param  {event} event event triggered onclick
   * @return {[type]}       [description]
   */
  function selectIcon(event){
      this.step.icon = event.item.icon;
      this.step.iconId = this.step.icon.id
      this.showIconS = false;
  }

  /**
   * Method that clear icon image selected
   * @return {NA} NA
   */
  function clearIconSelection(){
      this.step.icon = {};
      this.step.iconId = null;
      this.showIconS = false;
  }

  /**
   *  Method that add a step to the tour
   */
  function addStep(){

      readFields.call(this);

      steps.trigger('add', this.step);
      this.close();

      if(this.step.doClick){
          document.querySelector(this.step.selector).click();
      }

      if(this.step.typewrite){

        var input = document.querySelector(this.step.selector);
        input.value = this.step.typewriteValue;

        utils.change(this.step.selector);
        utils.submit(this.step.selector);

      }

  }

  /**
   * Method that update in steps model the edited step
   * @return {NA} NA
   */
  function saveStep(){

      readFields.call(this);

      steps.trigger('edit', this.stepIndex, this.step);
      this.close();

      if(this.step.doClick){
          document.querySelector(this.step.selector).click();
      }

      if(this.step.typewrite){

          var input = document.querySelector(this.step.selector);
          input.value = this.step.typewriteValue;

          utils.change(this.step.selector);
          utils.submit(this.step.selector);

      }

  }

  </script>

  <style scoped>

    input[type='checkbox'] {
      display: inline-block;
    }

    textarea {
      display: none!important;
    }
    .uts-modal-editor {
        font-family: sans-serif;
        position: fixed;
        padding: 0px;
        width: 0px;
        height: 0px;
        margin: 0px;
        left: 0;
        background-color: rgba(128, 128, 128, 0.64);
        overflow: hidden;
        z-index: 9999999999999;
    }
    .uts-modal-editor .uts-modal-editor-container {
        padding: 20px;
        width: 60%;
        height: 100%;
        background-color: white;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        z-index: 99999999999999;
        bottom: 0;
        border: 1px solid #E0E0E0;
        border-radius: 5px;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        -webkit-transition: all 0.2s ease-out;
        -moz-transition: all 0.2s ease-out;
        -ms-transition: all 0.2s ease-out;
        -o-transition: all 0.2s ease-out;
        transition: all 0.2s ease-out;
        position: relative;
    }
    .uts-modal-editor .uts-modal-editor-container .page-header {
        margin: 0 0 12px 0;
    }
    .uts-modal-editor .uts-modal-editor-container .uts-modal-editor-content {
        overflow: auto;
        height: calc(100% - 100px);
    }
    .uts-modal-editor.open {
        top: 0;
        width: 100%;
        height: 100%;
        padding: 20px;
    }
    .uts-modal-editor .h1, .uts-modal-editor h1 {
        font-size: 26px;
    }
    .uts-modal-editor .row {
        margin-left: -15px;
        margin-right: -15px;
    }
    .uts-modal-editor .uts-jumbotron {
        padding: 30px;
        margin-bottom: 30px;
        color: inherit;
        background-color: #eee;
        border-radius: 6px;
        margin: 10px;
    }
    .uts-modal-editor .uts-jumbotron p {
        margin-bottom: 15px;
        font-size: 14px;
        font-weight: 200;
    }
    .uts-modal-editor .form-control {
        display: block;
        width: 100%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    }

    .uts-modal-editor .uts-warning{
        color: red;
        font-size: 14px!important;
    }

    .uts-modal-editor .uts-btn {
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        border-radius: 4px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .uts-modal-editor .btn-success {
        color: #fff;
        background-color: #5cb85c;
        border-color: #4cae4c;
    }

    .uts-modal-editor .btn-success:hover{
        color: #fff;
        background-color: #47a447;
        border-color: #398439;
    }

    .uts-modal-editor .btn-info {
        color: #fff;
        background-color: #5bc0de;
        border-color: #46b8da;
    }

    .uts-modal-editor .btn-info:hover{
        color: #fff;
        background-color: #39b3d7;
        border-color: #269abc;
    }

    .uts-modal-editor .uts-close-icon {
        top: 5px;
        position: absolute;
        right: 5px;
        display: inline-block;
        width: 17px;
        height: 17px;
        overflow: hidden;
        cursor: pointer;
        margin: 6px;
    }
    .uts-modal-editor .uts-close-icon:hover::before, .uts-modal-editor .uts-close-icon:hover::after {
        background: #2f2f2f;
    }
    .uts-modal-editor .uts-close-icon::before, .uts-modal-editor .uts-close-icon::after {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        top: 50%;
        left: 0;
        margin-top: -1px;
        background: #b9b9b9;
    }
    .uts-modal-editor .uts-close-icon::before {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .uts-modal-editor .uts-close-icon::after {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    .uts-modal-editor .btn-info.disabled, .uts-modal-editor .btn-info[disabled], .uts-modal-editor .btn-info.disabled:hover{
        background-color: #BDC9CD;;
        border-color: #46b8da;
    }

    .uts-modal-editor .btn.disabled, .uts-modal-editor .btn[disabled] {
        cursor: not-allowed;
        pointer-events: none;
        opacity: .65;
        filter: alpha(opacity=65);
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .uts-modal-editor .uts-image-selector{
        background-color: #ffffff;
    }

    .uts-modal-editor .uts-image-selector ul {
        list-style: none;
        margin: 0px;
        padding: 0;
        max-height: 400px;
        overflow: auto;
    }

    .uts-modal-editor .uts-image-selector li {
      margin: 3px;
      border: 2px solid #ffffff;
      padding: 2px;
      display: inline-block;
      width: 35px;
      text-align: center;
    }

    .uts-image-selector li.uts-image-selected {
        border: 2px solid rgb(71, 164, 255);
    }

    .uts-modal-editor .uts-image-selector li img {
        max-width: 28px;
        vertical-align: middle;
    }

    .uts-modal-editor .uts-step-icon {
        max-width: 35px;
        margin-left: 10px;
        vertical-align: middle;
    }

    .uts-modal-editor .uts-close-icon.uts-close-icon-selector {
        position: relative;
        margin-left: 15px;
        vertical-align: sub;
    }

    .uts-modal-editor .uts-close-icon.uts-close-icon-selector::before, .uts-modal-editor .uts-close-icon.uts-close-icon-selector::after {
        background: #D63838;
        height: 2px;
    }

    .uts-modal-editor .uts-close-icon.uts-close-icon-selector:hover::before, .uts-modal-editor .uts-close-icon.uts-close-icon-selector:hover::after {
        background: #FF9292;
    }

</style>

</modal-editor>
