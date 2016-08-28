(function(){

	// Constructor method
	this.CsvToTable = function(){
		this.csvFile = null;

		// Create options by extending defaults with the passed in arugments
    	if (arguments[0] && typeof arguments[0] === "object") {
      		this.options = arguments[0];
    	}

	}

	CsvToTable.prototype.run = function() {
		return buildTable.call(this);
	}

	function getCSV() {
		try{
			var csvfile = this.options.csvFile;
			return new Promise(function(resolve, reject) {
				var request = new XMLHttpRequest();
				request.open("GET", csvfile, true);
				request.onload = function() {
				    if (request.status == 200) {
				        resolve(request.response);
				    } else {
				        reject(Error(request.statusText));
				    }
				};

				request.onerror = function() {
				 	reject(Error('Error fetching data.'));
				};
				request.send();
			});
		}catch(err){
			console.error(err);
		}
	}

    function isNotEmpty(row) {
        return row !== "";
    }

	function buildTable() {
		getCSV.call(this).then(function(response){
			var allRows = response.split(/\r?\n|\r/).filter(isNotEmpty);
	        var table = '<table>';
	        for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
	            if (singleRow === 0) {
	                table += '<thead>';
	                table += '<tr>';
	            } else {
	                table += '<tr>';
	            }
	            var rowCells = allRows[singleRow].split(',');
	            for(var rowCell = 0; rowCell < rowCells.length; rowCell++){
	                if(singleRow === 0){
	                    table += '<th>';
	                    table += rowCells[rowCell];
	                    table += '</th>';
	                } else {
	                    table += '<td>';
	                    table += rowCells[rowCell];
	                    table += '</td>';
	                }
	            }
	            if (singleRow === 0) {
	                table += '</tr>';
	                table += '</thead>';
	                table += '<tbody>';
	            } else {
	                table += '</tr>';
	            }
	        }
	        table += '</tbody>';
	        table += '</table>';

	        document.body.innerHTML += table;
		}, function(error){
			console.error(error);
		});
	}

}());
