export default Ticker;

    /**
     * Ticker class.
     * This object allow us trigger an event
     * that is listened by 'overlayer' and 'bubbles'.
     * For each cycle they readjust their position taken
     * as reference the target.
     */
    function Ticker(){

      /* Private Variables */
      var LAP_TIME = 400,
          cycle = null,
          event = new Event('ut-tick');

      //Revealing Public Methods
      this.start = start.bind(this);
      this.end = end.bind(this);

      /* Private Methods */

      /**
       * Method that starts the ticker
       * @return {null} NA
       */
      function start(){
        dispatch.apply(this);
      }

      /**
       * Function that trigger the event 'ut-tick'
       * every LAP_TIME to allow 'overlayer' and 'bubble'
       * synchronize position with his target
       * @return {null} NA
       */
      function dispatch(){

        if(cycle){
          clearTimeout(cycle);
        };

        cycle = setTimeout(function(){
          document.dispatchEvent(event);
          dispatch.apply(this);
        }.bind(this), LAP_TIME);

      }

      /**
       * Method that stops trigger LAP_TIME event
       * @return {null} NA
       */
      function end(){
        clearTimeout(cycle);
      }

    }
