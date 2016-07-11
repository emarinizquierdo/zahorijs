<tour-manager>

    <div id="utsToursManager" class="uts-tours-manager-wrapper" >

      <div if="{tours.activeTour && !configuratingEditor}" class="uts-tour-title">
        <div class="uts-tour-title-text" if="{!creatingTour}">Tour: {tours.activeTour.name.es_ES}</div>
        <div class="uts-title__buttons_wrapper" title="edit user tour info" if="{!creatingTour}"><i class="fa fa-pencil" onclick="{showEditTour}" if="{!creatingTour}"></i></div>
      </div>

      <div if="{(!tours.activeTour && !configuratingEditor) || creatingTour}" class="uts-tour-editor-wrapper">

        <button type="button" class="uts uts-btn btn-success" onclick="{showEditTour}" if="{!creatingTour}" >Create Tour</button>

        <div if="{creatingTour}">
            <label>Title (es_ES)</label>
            <input id="es_ES" placeholder="Give me a title" type="text" class="uts form-control" onkeyup="{readTitles}" value="{tours.activeTour.name.es_ES}">
            <p></p>
            <label>Title (en_US)</label>
            <input id="en_US" placeholder="Give me a title" type="text" class="uts form-control" onkeyup="{readTitles}" value="{tours.activeTour.name.en_US}">
            <p></p>
            <i class="fa fa-ban" onclick="{hideEditTour.bind(this, true)}" > Cancel</i>
            <i class="fa fa-check" onclick="{saveTour}" if="{tours.activeTour.name.es_ES && tours.activeTour.name.en_US}" > Accept</i>
        </div>
      </div>
      <div if="{configuratingEditor}" class="uts-tour-editor-wrapper">

        <div>
            <label>App ID</label>
            <input id="api_key" placeholder="API KEY" type="text" class="uts form-control" value="{editor.apiKey}">
            <p></p>
            <label>App ID</label>
            <input id="app_id" placeholder="App ID" type="text" class="uts form-control" value="{editor.id}">
            <p></p>
            <i class="fa fa-ban" onclick="{configureEditor.bind(this, false, false)}" > Cancel</i>
            <i class="fa fa-check" onclick="{setApiKey}" > Accept</i>
        </div>
      </div>
    </div>

    <script>

      /* Import */
      var utils = require('../../services/utils');
      var tour = require('../../services/tour');

      //Models
      var tours = zahorijs.editor.tours;
      var steps = zahorijs.editor.steps;

      /* Private Variables */
      var tourInfoBackup,
          apiKeyBackup;

      /* Public Variables */
      this.tours = tours;
      this.steps = steps;
      this.creatingTour = false;
      this.configuratingEditor = false;
      this.editor = {
          setApiKey : null
      };

      /* Revealing Methods */
      this.showEditTour = showEditTour.bind(this);
      this.hideEditTour = hideEditTour.bind(this);
      this.configureEditor = configureEditor.bind(this);
      this.readTitles = readTitles.bind(this);
      this.saveTour = saveTour.bind(this);
      this.readApiKey = readApiKey.bind(this);
      this.setApiKey = setApiKey.bind(this);
      this.checkIsNumber = checkIsNumber.bind(this);

      /* Event Handlers */
      this.on('mount', onMount.bind(this));

      /* Private Methods */
      function onMount(){

        this.tours.on('updateTours', function(data){
            this.steps.trigger('updateSteps', data);
            this.update();
        }.bind(this));

        readApiKey.call(this);
        this.tours.trigger('load', {apiKey : this.editor.apiKey, id : this.editor.id});

      }

      function readApiKey(){
        // Store
        this.editor.apiKey = localStorage.getItem("zahorijs.editor.apiKey");
        this.editor.id = localStorage.getItem("zahorijs.editor.id");

      }

      /**
       * [setappID description]
       * @return {[type]} [description]
       */
      function setApiKey( ){

        this.editor.apiKey = this.api_key.value;
        this.tours.activeTour = this.tours.activeTour || {};
        this.tours.activeTour.name = this.tours.activeTour.name || {};
        this.tours.activeTour.apiKey = this.editor.apiKey;

        this.editor.id = this.app_id.value;
        this.tours.activeTour.id = this.editor.id;

        // Store
        localStorage.setItem("zahorijs.editor.apiKey", this.api_key.value);
        localStorage.setItem("zahorijs.editor.id", this.app_id.value);
        this.tours.trigger('load', {apiKey : this.editor.apiKey, id : this.editor.id});
        configureEditor.call(this, true, true);
      }

      /**
       * Method that shows the tour editor form
       * @return {NA} NA
       */
      function showEditTour(){

          tourInfoBackup = JSON.parse(JSON.stringify(this.tours.activeTour));
          this.creatingTour = true;
          this.parent.editingTour(true);

      }

      /**
       * Method that hide the tour editor form
       * @param  {boolean} cancel If it is true, we recover form inputs
       * @return {NA}        NA
       */
      function hideEditTour( cancel ){

          if(cancel ){
            this.tours.activeTour = JSON.parse(JSON.stringify(tourInfoBackup));
          }

          this.creatingTour = false;
          this.parent.editingTour(false);
          this.update();
      }

      function configureEditor( configure, forceClose){

          if(forceClose){

              this.configuratingEditor = false;
              this.parent.isConfiguratingEditor = false;
              this.parent.update();
              return;

          }

          if(configure){

              apiKeyBackup = this.editor.apiKey;

          }else{

              this.editor.apiKey = apiKeyBackup;
              this.api_key.value = apiKeyBackup;

          }

          this.configuratingEditor = configure;
          this.parent.isConfiguratingEditor = configure;

          this.parent.update();
      }

      /**
       * Method that reads tour title fields
       * @param  {event} event [description]
       * @return {NA}   NA
       */
      function readTitles( event ){
          this.tours.activeTour = this.tours.activeTour || {};
          this.tours.activeTour.name = this.tours.activeTour.name || {};
          this.tours.activeTour.name[event.target.id] = event.target.value;
      }

      function checkIsNumber(evt){

          var charCode = (evt.which) ? evt.which : evt.keyCode;

          if((charCode > 31 && (charCode < 48 || charCode > 57))){
              evt.preventDefault();
              return false;
          }

          return true;

      }

      function saveTour(){
          hideEditTour.call(this);
          this.tours.saveTour({apiKey : this.editor.apiKey, id : this.editor.id});
      }

    </script>

    <style scoped>

      p{
        margin-bottom: 10px;
      }
      .uts-tours-manager-wrapper{
        width: 100%;
        background-color: #E6E6E6;
        border: 1px solid #CCCCCC;
      }

      .uts-tours-manager-wrapper .uts-tour-editor-wrapper{
          padding: 10px;
      }

      .uts-tours-manager-wrapper .form-control {
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

      .uts-tours-manager-wrapper .uts-tour-title{
          position: relative;
      }

      .uts-tours-manager-wrapper .uts-tour-title .uts-tour-title-text{
        display: block;
        padding: 4px 12px;
        color: #576AAA;
        text-decoration: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: calc(100% - 75px);
      }

      .uts-tours-manager-wrapper .uts-tour-title .uts-title__buttons_wrapper{
          color: #576AAA;
          position: absolute;
          top: 0;
          right: 0;
          width: 80px;
          text-align: right;
          padding: 4px 15px;
      }

      .uts-tours-manager-wrapper .uts-tour-title .uts-title__buttons_wrapper i{
          margin-left: 10px;
      }

      .uts-tours-manager-wrapper .uts-tour-editor-wrapper i:hover{
          color: #576AAA;
      }

    </style>
</tour-manager>
