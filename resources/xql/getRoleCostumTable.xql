xquery version "3.0";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $regiename := request:get-parameter('regieName', '');

declare variable $path := 'xmldb:exist:///apps/theater-data/rollen_kostuem/';

declare variable $file := collection($path);

declare variable $allFiles := $file//tei:TEI;

declare variable $allNames := $file//tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt[1]/tei:title;


declare function local:getTableInformation($allFiles) {

let $strings := for $elem in $allFiles

        let $name := if($elem/tei:teiHeader/tei:fileDesc/tei:titleStmt[1]/tei:title = $regiename)then($elem)else()

        let $rows := if($name != '')then($elem//tei:text/tei:body//tei:table[not(@n='details')]//tei:row)else()
        
        let $row := if($rows != '')then(local:getTableRow($rows, $elem))else()

			return 
			if($row != '')then($row)else()
						
    return 
        string-join($strings,',')
    
};

declare function local:getTableRow($rows, $elem) {

let $strings := for $elem_1 in $rows

    let $cells := $elem_1/tei:cell
    
    let $cell := local:getTableCell($cells, $elem)

                    return 
                    
                    if($cell  != '')then(concat('{"cells":[', $cell, ']}'))else()
                    
    return 
        string-join($strings,',')
 
};

declare function local:getPerson($persons) {

let $strings := for $elem in $persons

    let $person := $elem
    
    let $personId := $person/@key
    
                    return 
                    
                    concat('"', $person, '"', ', "', $personId, '"')
                    
    return 
        string-join($strings,',')
 
};

declare function local:getTableCell($cells) {

let $strings := for $elem in $cells

    let $onecell := $elem
    
    let $persons := $onecell/tei:persName
    
    let $person := if($persons != '')then(local:getPerson($persons))else()
    
                    return 
                    
                    if($person  != '')then(
                    concat('{"person":[', normalize-space($person), ']}')
                    )else(
                        if($onecell != '')then(concat('["', normalize-space($onecell), '"]'))else())
                    
                                      
    return 
        string-join($strings,',')
 
};

declare function local:getInhalt($inhaltTable) {

let $strings := for $elem in $inhaltTable

    let $cells := $elem/tei:cell
    
    let $cell := local:getTableCell($cells)

                    return 
                    
                    if($cell  != '')then(concat('{"cells":[', $cell, ']}')
                    )else()
                    
    return 
        string-join($strings,',')
 
};

declare function local:getWork($works, $elem, $onecell) {

let $strings := for $elem_3 in $works

    let $work := if($elem_3/@type = 'work')then($elem_3)else()
    
    let $workId := if($work  != '')then($work/@key)else()
    
    let $refTable := if($work  != '')then($work/tei:ref/@target)else()
    
    let $tableId := if($refTable  != '')then(tokenize($refTable, "#")[last()])else()
    
    let $inhaltTable := $elem//tei:text/tei:body//tei:table[@xml:id=$tableId]//tei:row
    
    let $inhaltDetails := local:getInhalt($inhaltTable)
    
                    return 
                    
                    if($work  != '')then(
                        if($inhaltDetails != '')
                        then(concat('"', normalize-space($onecell), '"', ', "', $workId, '",', '{"akten":[',$inhaltDetails, ']}'))
                        else(concat('"', normalize-space($onecell), '"', ', "', $workId, '"')
                        ))
                        else()
                    
                    
                    
    return 
        string-join($strings,',')
 
};


declare function local:getWorkPersons($workPersons) {

let $strings := for $elem_3 in $workPersons

    let $pers := $elem_3
    
    let $persId := $pers/@key
    
                    return 
                        concat('["', $pers, '"', ', "', $persId, '"]')
                    
                   
                    
    return 
        string-join($strings,',')
 
};



declare function local:getTableCell($cells, $elem) {

let $strings := for $elem_2 in $cells

    let $onecell := $elem_2
    
    let $date := $elem_2/tei:date
    
    let $workPersons := $elem_2/tei:persName
    
    let $workPerson := local:getWorkPersons($workPersons)
    
    let $works := $onecell/tei:rs
    
    let $workArray := local:getWork($works, $elem, $onecell)
    
                    return 
                    
                    if($workArray  != '')then(
                        if($workPerson  != '')then(concat('{"work":[', $workArray, ']},', '{"workpersons":[', $workPerson, ']}'))
                        else(concat('{"work":[', $workArray, ']}')))
                    
                    else(
                        if($date != '')then(concat('{"date":["', normalize-space($onecell), '"]}'))else(
                            if($workPerson  != '')then(concat('{"workpersons":[', $workPerson, ']}'))else(
                            concat('["', normalize-space($onecell), '"]'))
                        )
                    )
                    
                                      
    return 
        string-join($strings,',')
 
};



(

  '{"rows":[',
        local:getTableInformation($allFiles),

     ']}'
   
)
