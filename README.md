# CsvToTable
Parse the local CSV file using pure javascript and convert to HTML table

Check out the working demo: http://yasharma.github.io/CsvToTable/

## Usage

#### 1. Clone this repository (in the command line)

```bash
git clone git@github.com:yasharma/CsvToTable.git
cd CsvToTable
```

#### 2. Add your CSV file to current folder

#### 3. In `index.html` configure the `CsvToTable()` constructor function

```html
<script>
	var csvtotable = new CsvToTable({
		csvFile: 'your csv filename/filepath' 
	});
	csvtotable.run();
</script>
```

Available options:
* `csvFile` Path to your CSV file.
