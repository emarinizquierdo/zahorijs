import request from 'superagent'
export default tours;

function tours(properties) {

        /**
         * Tour Service Class
         * @return {NA} NA
         */
        var Tours = function() {

            /* Public Variables */

            /* Revealing Methods */
            this.get = get.bind(this);
            this.read = read.bind(this);

        }

        /**
         * Method that read a list of tours from back
         * @param  {Function} callback callback Function
         * @return {NA}            NA
         */
        function get(callback, pRetrieveReaded) {

            var queryString = "";

            var params = {
                    userFellowships : true,
                    published : true
                };

            if (pRetrieveReaded || properties.app) {

                if(pRetrieveReaded){
                    params.showall = true;
                }

                //Add appId only if it is passed as configuration option
                if(properties.app){
                    params.app = properties.app;
                }

            }

            queryString = "?filters=" + encodeURIComponent(JSON.stringify(params));

            request.get(properties.connector[properties.environment] + properties.services.commons.tour + queryString)
                .end(callback);

        };

        /**
         * Method thad marks as readed a specific tour
         * @param  {integer}   pTourID  id tour
         * @param  {Function} callback Callback Function
         * @return {NA}            NA
         */
        function read(pTourID, callback) {

            var params = {
                readTourList: [],
                deleteSession: false
            };

            //Add appId only if it is passed as configuration option
            if(properties.app){
                params.app = properties.app;
            }

            params.readTourList.push(pTourID);

            var data = "json=" + encodeURIComponent(JSON.stringify(params));

            request.put(properties.connector[properties.environment] + properties.services.commons.users)
                .send(data)
                .end(callback);

        }


        /* Return a tour instance as module */
        return new Tours();

    }
