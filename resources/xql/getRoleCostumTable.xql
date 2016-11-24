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
        
        let $row := if($rows != '')then(local:getTableRow($rows))else()

			return 
			if($row != '')then($row)else()
						
    return 
        string-join($strings,',')
    
};

declare function local:getTableRow($rows) {

let $strings := for $elem in $rows

    let $cells := $elem/tei:cell
    
    let $cell := local:getTableCell($cells)

                    return 
                    
                    if($cell  != '')then(concat('[', $cell, ']'))else()
                    
    return 
        string-join($strings,',')
 
};

declare function local:getWork($works) {

let $strings := for $elem in $works

    let $work := if($elem/@type = 'work')then($elem)else()
    
    let $workId := if($work/@type = 'work')then($work/@key)else()
    

                    return 
                    
                    if($work  != '')then(concat('["', $work, '"', ', "', $workId, '"]'))else()
                    
    return 
        string-join($strings,',')
 
};


declare function local:getTableCell($cells) {

let $strings := for $elem in $cells

    let $onecell := $elem
    
    let $works := $onecell/tei:rs
    
    let $workArray := local:getWork($works)
    
                    return 
                    
                    if($workArray  != '')then(concat('[', $workArray, ']'))else(
                        if($onecell != '')then(concat('[["', normalize-space($onecell), '"]]'))else())
                    
                                      
    return 
        string-join($strings,',')
 
};



(

  '[',
        local:getTableInformation($allFiles),

    ']'
   
)
