(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "title",
            alias: "title",
            dataType: tableau.dataTypeEnum.string
		}, {
            id: "description",
            alias: "description",
            dataType: tableau.dataTypeEnum.string
		}, {
            id: "director",
            alias: "director",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "producer",
            alias: "producer",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "release_date",
            alias: "release_date",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "rt_score",
            alias: "rt_score",
            dataType: tableau.dataTypeEnum.string
		}];

        var tableSchema = {
            id: "earthquakeFeed",
            alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://ghibliapi.herokuapp.com/films", function(resp) {
            var feat = resp,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
                    "title": feat[i].title,
					"description": feat[i].description,
                    "director": feat[i].director,
					"producer": feat[i].producer,
                    "release_date": feat[i].release_date,
					"rt_score": feat[i].rt_score,
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "USGS Earthquake Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
