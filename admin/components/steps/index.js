(function(riot) {
    'use strict'

    var tour = require('../../services/tour');

    function Steps() {

        riot.observable(this);
        this.data = [];
        this.toSave = false;

        /* Revealing Methods */

        /* Event Handlers */
        this.on('add', add.bind(this));
        this.on('edit', edit.bind(this));
        this.on('updateSteps', update.bind(this));
    }

    /*Private Methods*/

    /**
     * Method that adds a new step in steps Array
     * @param {object} step Step object
     */
    function add(step) {

        this.toSave = true;
        step.id = new Date().getTime().toString();
        this.data.push(JSON.parse(JSON.stringify(step)));
        this.trigger('updated');

    }

    /**
     * Method that edit a n-element from Steps
     * @param  {integer} pIndex index integer
     * @param  {object} pStep  step object
     * @return {NA}        NA
     */
    function edit(pIndex, pStep) {

        this.toSave = true;
        this.data[pIndex] = pStep;
        this.trigger('updated');

    }

    function update(pSteps){

        this.data = pSteps;
        this.trigger('updated');

    }

    module.exports = Steps;

})(window.riot);
