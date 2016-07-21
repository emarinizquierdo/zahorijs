<step-stack>

    <nav id="utsStepsStack" class="uts-steps-stack {uts-to-left : toTheLeft }">

        <div class="uts-steps-stack-header">
            <p class="uts-steps-stack-to-left" title="move editor to the left" onclick="{toLeft}" if="{!toTheLeft}">&#8647;</p>
            <p class="uts-steps-stack-to-left" title="move editor to the right" onclick="{toRight}" if="{toTheLeft}">&#8649;</p>
            <div class="uts-steps-stack-record-icon" title="restart user tour recording" if="{ steps.data.length > 0 && !tours.isLoading && tours.stopRecord}" onclick="{restartRecord}"><i class="fa fa-circle"></i></div>
            <div class="uts-steps-stack-record-icon" title="stop user tour recording" if="{ steps.data.length > 0 && !tours.isLoading && !tours.stopRecord}" onclick="{stopRecord}"><i class="fa fa-pause"></i></div>
            <h2 class="uts-steps-stack-title">ZahoriJs.</h2>
            <div class="uts-steps-stack-play-icon" title="preview user tour" if="{ steps.data.length > 0 && !tours.isLoading}" onclick="{play}"></div>
        </div>

        <div if="{tours.isLoading}">loading</div>

        <tour-manager id="tourManager" if="{!tours.isLoading}"></tour-manager>

        <ul class="uts-steps-stack__items" if="{!isEditingTour && !isConfiguratingEditor && !tours.isLoading }">
            <li class="uts-steps-stack__item" each={ item, i in steps.data } onclick="{playOnlyOne}">
                <a class="uts-steps-stack__link" if="{!item.deleting}">{item.title.es_ES}</a>
                <div class="uts-steps-stack__buttons_wrapper" if="{!item.deleting}"><i class="fa fa-trash" title="delete step" data-deleting="true" onclick="{deleting}"></i><i class="fa fa-pencil" title="edit step" onclick="{editStep}"></i></div>
                <a class="uts-steps-stack__link uts-steps-stack__link__deleting" if="{item.deleting}">Are you sure?</a>
                <div class="uts-steps-stack__buttons_wrapper uts-steps-stack__link__deleting" if="{item.deleting}"><span class="uts-ok" data-stepindex="{i}" onclick="{deleteStep}">YES</span><span class="uts-no" data-deleting="false" onclick="{deleting}">NO</span></div>
            </li>
        </ul>

        <div class="uts-steps-stack-footer" if="{!isEditingTour && !isConfiguratingEditor}">
            <div if={!tours.isLoading}>
                <i class="fa fa-cog uts-to-right" title="configure app ID" onclick="{configureEditor.bind(this,true)}" if="{!importingTour && showConfigButton}"></i>
                <div if="{tours.activeTour}">
                <i class="fa fa-floppy-o" onclick="{saveSteps}" title="persist user tour in back" if="{!importingTour && steps.toSave}"> Save</i>

                <i class="fa fa-download uts-to-right" title="export user tour to JSON" onclick="{exportTour}" if="{!importingTour && (steps.data.length > 0)}"></i>
                <i class="fa fa-upload uts-to-right" title="import user tour from JSON" onclick="{openImportTour}" if="{!importingTour}"></i>
                <i class="fa fa-ban" onclick="{closeImportTour}" if="{importingTour}"> Cancel</i>
                <div class="uts-steps-stack-import-tour" if="{importingTour}">
                    <input type="file" id="selectedFile" onchange="{importFile}" style="display:none" accept=".json"/>
                    <input type="button" value="Browse..." onclick="document.getElementById('selectedFile').click();" />
                </div>
                </div>
            </div>
        </div>

    </nav>

    <script>

      /* Import */
      var utils = require('../../services/utils');

      //Models
      var tours = zahorijs.editor.tours;
      var steps = zahorijs.editor.steps;

      var modalEditor,
          tourManager;

      /* Public Variables */
      this.tours = tours;
      this.steps = steps;
      this.toTheLeft = false;
      this.importingTour = false;
      this.isEditingTour = false;
      this.isConfiguratingEditor = false;
      this.showConfigButton = true;

      /* Revealing Methods */
      this.play = play.bind(this);
      this.playOnlyOne = playOnlyOne.bind(this);
      this.toLeft = toLeft.bind(this);
      this.toRight = toRight.bind(this);
      this.deleting = deleting.bind(this);
      this.deleteStep = deleteStep.bind(this);
      this.editStep = editStep.bind(this);
      this.exportTour = exportTour.bind(this);
      this.openImportTour = openImportTour.bind(this);
      this.closeImportTour = closeImportTour.bind(this);
      this.saveSteps = saveSteps.bind(this);
      this.configureEditor = configureEditor.bind(this);
      this.editingTour = editingTour.bind(this);
      this.stopRecord = stopRecord.bind(this);
      this.restartRecord = restartRecord.bind(this);
      this.importFile = importFile.bind(this);

      /* Event Handlers */
      this.on('mount', mounted.bind(this));

      /* Private Methods */
      function mounted(){

        modalEditor = this.parent.tags['modal-editor'];
        tourManager = this.tags['tour-manager'];

      }

      function play(){
          if(zahorijs && zahorijs.tour){
            zahorijs.configure({header : this.tours.activeTour.header});
            zahorijs.tour.start(steps.data);
          }
      }

      function playOnlyOne( e ){
          if(zahorijs && zahorijs.tour){
              zahorijs.configure({header : this.tours.activeTour.header});
              zahorijs.tour.start([steps.data[e.item.i]]);
          }
      }

      function toLeft(){
        this.toTheLeft = true;
      }

      function toRight(){
        this.toTheLeft = false;
      }

      function deleting(e){
        e.stopPropagation();
        e.item.item.deleting = ( e.target.dataset.deleting == "true");
      }

      function deleteStep(e){
        e.stopPropagation();
        this.steps.data.splice(e.target.dataset.stepindex, 1);
        this.steps.toSave = true;
      }

      function editStep(e){
          e.stopPropagation();
          modalEditor.openStep(e.item.i, this.steps.data[e.item.i]);
      }

      function exportTour(){
          utils.jsonExport(this.steps.data);
      }

      function openImportTour(){
          this.importingTour = true;
          this.selectedFile.value = null;
      }

      function importFile(evt){

          var file = evt.target.files[0];

          if(!file){
              return;
          }

          // Only process image files.
          /*if ( !file.type.match('application/json') ) {
              return;
          }*/

          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {

              return function(e) {

                  try{
                      this.steps.data = JSON.parse(e.target.result);
                  }catch(e){
                      console.log("error importing tour json");
                  }

                  this.importingTour = false;
                  this.steps.toSave = true;
                  this.update();

              }.bind(this);

          }.bind(this))(file);

          reader.readAsText(file);
      }

      function closeImportTour(){
          this.importingTour = false;
      }

      function saveSteps(){
          this.tours.saveSteps(this.steps.data);
          this.steps.toSave = false;
          this.update();
      }

      function editingTour( editing ){
          this.isEditingTour = editing;
          this.update();
      }

      function configureEditor( configure ){
          this.isConfiguratingEditor = configure;
          tourManager.configureEditor(configure);
      }

      function stopRecord(){
          tours.stopRecord = true;
          this.update();
      }

      function restartRecord(){
          tours.stopRecord = false;
          this.update();
      }

    </script>

    <style scoped>

      .uts-steps-stack {
          height: initial;
          font-family: sans-serif;
          cursor: pointer;
          position: fixed;
          z-index: 999999;
          width: 350px;
          background-color: transparent;
          box-shadow: 1px 1px 2px #cfcfcf;
          bottom: 20px;
          right: 20px;
          -webkit-box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          -moz-box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      }

      .uts-steps-stack.uts-to-left{
          font-size: 20px;
          left: 20px;
          color: #ffffff;
      }

      .uts-steps-stack .uts-steps-stack-header {
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #EAEAEA;
        background-color: #2B2B2B;
        color: white;
        border: #2B2B2B;
      }

      .uts-steps-stack .uts-steps-stack-title{
        font-weight: initial;
        color: #ffffff;
        font-size: 18px!important;
        font-weight: bold;
        padding: 0;
        margin: 0!important;
      }

      .uts-steps-stack .uts-steps-stack-footer {
          min-height: 34px;
          font-family: sans-serif;
          font-size: 16px;
          padding: 4px 12px;
          border-bottom: 1px solid #EAEAEA;
          background-color: #D3D3D3;
          color: white;
          cursor: default;
          border: 1px solid #B7B7B7;
      }

      .uts-steps-stack-footer i{
          color : #000000;
          cursor: pointer;
          margin-right: 20px;
      }

      .uts-steps-stack-footer i.uts-to-right{
        float: right;
        margin-right: 0;
        margin-left: 15px;
        margin-top: 5px;
      }

      .uts-steps-stack-footer i:hover{
          color: #576AAA;
      }

      .uts-steps-stack-import-tour{
          padding: 3px;
      }

      .uts-steps-stack-import-tour textarea{
          margin: 0px 0px 10px;
          height: 72px;
          width: 100%;
          box-sizing: border-box;
          height: 100%;
          resize: none;
          display: none;
      }

      .uts-steps-stack-to-left{
          float: left;
          font-size: 22px!important;
          cursor: pointer;
          color: #ffffff;
      }

      .uts-steps-stack-to-right{
          float: left;
          font-size: 22px;
          cursor: pointer;
      }

      .uts-steps-stack--active {
          display: block;
      }
      .uts-steps-stack__items {
          list-style: none;
          margin: 0;
          padding: 0;
          max-height: 250px;
          overflow: auto;
          background-color: white;
      }
      .uts-steps-stack__item {
          display: block;
          margin-bottom: 4px;
          position: relative;
          width: 100%;
      }
      .uts-steps-stack__item:hover {
          background-color: #F4F5F7;
      }
      .uts-steps-stack__item:last-child {
          margin-bottom: 0;
      }
      .uts-steps-stack__link {
          display: block;
          padding: 4px 12px;
          color: #565656;
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: calc(100% - 75px);
      }

      .uts-steps-stack__buttons_wrapper{
        color: #576AAA;
        position: absolute;
        top: 0;
        right: 0;
        width: 90px;
        text-align: right;
        padding: 4px 15px;
        visibility: hidden;
      }
      .uts-steps-stack__item:hover .uts-steps-stack__buttons_wrapper{
        visibility: visible;
      }
      .uts-steps-stack__buttons_wrapper i{
          margin-left: 15px;
      }
      .uts-steps-stack__buttons_wrapper .fa-trash{
        color: #E95F5F;
      }

      .uts-steps-stack__link.uts-steps-stack__link__deleting{
        color: #E95F5F;
      }

      .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting{
        visibility: visible;
        width: 140px;
      }

      .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting .uts-ok{
        color: #E95F5F;
      }

      .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting .uts-no{
        color: green;
        margin-right: 15px;
        margin-left: 30px;
      }

      .uts-steps-stack-play-icon {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 7.5px 0 7.5px 13.0px;
          border-color: transparent transparent transparent #ffffff;
          position: absolute;
          right: 15px;
          top: 15px;
          cursor: pointer;
      }

      .uts-steps-stack-record-icon {
          position: absolute;
          right: 46px;
          top: 15px;
          vertical-align: middle;
      }
      .uts-steps-stack-record-icon .fa-circle{
          color: red;
      }
      .uts-steps-stack-record-icon .fa-pause{
          color: white;
      }

    </style>
</step-stack>
