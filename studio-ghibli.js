(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "title",
            alias: "Title",
            dataType: tableau.dataTypeEnum.string
		}, {
            id: "description",
            alias: "Description",
            dataType: tableau.dataTypeEnum.string
		}, {
            id: "director",
            alias: "Director",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "producer",
            alias: "Producer",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "release_date",
            alias: "Release Date",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "rt_score",
            alias: "Rotten Tomato Score",
            dataType: tableau.dataTypeEnum.integer
		}];

        var tableSchema = {
            id: "studio-ghibliapi",
            alias: "Studio Ghibli Movies",
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
            tableau.connectionName = "Studio Ghibli Movies"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
