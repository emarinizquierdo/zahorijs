export default ProgressBar;

  function ProgressBar(p_parentWrapper){

    /* Public Variables */
    this.generalWrapper = document.createElement('div');
    this.bar;

    /* Revealing Methods */
    this.render = render.bind(this);

    /* Call to the constructor */
    build.call(this, p_parentWrapper);

  }

  /**
   * Constructor method
   * @param  {DOM} p_parentWrapper parent DOM element
   * @return {NA}                 NA
   */
  function build(p_parentWrapper) {

      this.generalWrapper.className = "uts-progressbar";
      this.bar = document.createElement('span');
      this.generalWrapper.appendChild(this.bar);
      p_parentWrapper.appendChild(this.generalWrapper);

  }

  function render( pSteps ){

    var progress = (((pSteps.getPointer() + 1) * 100) / pSteps.steps.length);
    this.bar.style.width = progress + "%";

  }