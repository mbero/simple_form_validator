var tableColorsArray;
window.onload = function() {
    tableColorsArray = setTableColorsArray();
    setTableRowsColors('table', tableColorsArray);
    
};

function setNewlyAddedRecordColor(table, newlyAddedRecordNumber)
{
     var tableRows = table.rows;
     var currentrecord = tableRows[newlyAddedRecordNumber-1];
     var newRandomColor = Math.floor((Math.random() * tableColorsArray.length) + 0);
     currentrecord.bgColor=tableColorsArray[newRandomColor];
}

function removeRecordFromTable(record)
{
    //FIXME
    var removedRecordNumber = Number(record.value)+1;
    var table = document.getElementById("table");
    table.deleteRow(removedRecordNumber);
}

function addNewRecordToTable()
{
    var table = document.getElementById("table");

    // Create an empty <tr> element and add it to the 1st position of the table:
    var nextRowNumber = table.rows.length+1;
    var row = table.insertRow();

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
     
    
    // Add some text to the new cells:
    var nextRowNumberAsNumber = nextRowNumber-1;
    cell0.innerHTML = ""+nextRowNumberAsNumber;
    cell1.innerHTML = "NEW_ADDED_ROW";
    cell2.innerHTML = "NEW_ADDED_ROW";
    cell3.innerHTML = "NEW_ADDED_ROW";
    cell4.innerHTML = "<button type='button' onclick='removeRecordFromTable(this)' id='delete_row_button1' value="+nextRowNumberAsNumber+">Delete row</button>";
    
     setNewlyAddedRecordColor(table,nextRowNumber);
}


function setTableRowsColors(tableId, tableColorsArray)
{
    var table = document.getElementById(tableId);
    var tableRows = table.rows;
    for(var i=0; i<tableRows.length; i++)
    {
        var currentrecord = tableRows[i];
        currentrecord.bgColor=tableColorsArray[Math.floor((Math.random() * tableColorsArray.length) + 0)];
    }
}



function setTableColorsArray()
{
    var colors = new Array();
    colors.push("yellow");
    colors.push("red");
    colors.push("green");
    colors.push("blue");
    colors.push("white");
    
    return colors;
}

