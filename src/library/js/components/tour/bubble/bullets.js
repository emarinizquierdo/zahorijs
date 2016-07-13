import BasicButton from './basicButton';

export default Bullets;

			/**
			 * Bullets class
			 * @param {NA} parentWrapper NA
			 */
	    function Bullets(parentWrapper) {

        /* Inheritance */
        BasicButton.call(this, parentWrapper);

        /* Private Variables */
				this.generalWrapper;
				this._parentWrapper;
				this._ulContainer;

        /* Public Variables */

        /* Revealing Methods */
        this.paint = paint.bind(this);

				/* Constructor */
				build.call(this, parentWrapper);

			}

      /*
          Private Methods
       */
      /**
       * Constructor
       * @param  {DOM element} parentWrapper Dom parent element
       * @return {NA}               NA
       */
      function build(parentWrapper) {
					this.generalWrapper.className = "uts-bullets";
					this._parentWrapper = parentWrapper;
          this._parentWrapper.appendChild(this.generalWrapper);
      }

			/**
			 * Function that build bullets from steps
			 * @param  {Object} pSteps     steps object
			 * @return {NA}            NA
			 */
      function paint(pSteps) {

          var i,
              innerLi,
              anchorLink;

          this.generalWrapper.innerHTML = "";

          for (i = 0; i < pSteps.steps.length; i++) {
              innerLi = document.createElement('li');
              anchorLink = document.createElement('a');
              anchorLink.href = 'javascript:void(0);';
              anchorLink.innerHTML = "&nbsp;";
							if(i == pSteps.getPointer()){
								anchorLink.className = 'active';
							}
              innerLi.appendChild(anchorLink);
              this._ulContainer = document.createElement('ul');
              this._ulContainer.appendChild(innerLi);
              this.generalWrapper.appendChild(this._ulContainer);
          }

					//If there are more than one step, we show bullets
					if(pSteps.steps.length > 1){
						this.show();
					}

      }


    Bullets.prototype = Object.create(BasicButton.prototype);
    Bullets.prototype.constructor = Bullets;