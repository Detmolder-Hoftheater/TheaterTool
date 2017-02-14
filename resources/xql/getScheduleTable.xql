xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $month := request:get-parameter('month', '');
declare variable $year := request:get-parameter('year', '');

declare variable $uri := concat('/db/apps/theater-data/einnahmen/', $year, '/');

declare variable $file := collection($uri);

declare variable $uri_1 := concat('/db/apps/theater-data/ausgaben/', $year, '/');

declare variable $file_1 := collection($uri_1);

declare variable $selectedDate := concat($year, '-', $month);

declare variable $schedule := for $elem in ($file, $file_1)
                    return 
                    if($elem/tei:TEI/tei:teiHeader/tei:profileDesc//tei:keywords/tei:term['Spielplan']
                     and $elem/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt[1]/tei:title//tei:date[@when = $selectedDate]
                    )then($elem)else();
 
 
 
declare function local:getTableInformation($schedule) {

let $strings := for $elem in $schedule

        let $rows := $elem//tei:text/tei:body//tei:table/tei:row
        
        let $row := if($rows != '')then(local:getTableRow($rows))else()

			return 
			if($row != '')then($row)else()
						
    return 
        string-join($strings,',')
    
};

declare function local:getTableRow($rows) {

let $strings := for $elem_1 in $rows

    let $cells := $elem_1/tei:cell
    
    let $cell := local:getTableCell($cells)

                    return 
                    
                    if($cell  != '')then(concat('{"cells":[', $cell, ']}'))else()
                    
    return 
        string-join($strings,',')
 
};

declare function local:getTableCell($cells) {

let $strings := for $elem_2 in $cells

   
    
    let $date := if($elem_2/tei:date != '')then(concat('"', $elem_2/tei:date, '"'))else()
    
    let $onecell := if($elem_2/tei:rs != '')then(local:getCellContent($elem_2/child::node()[not(self::tei:seg)]))else()
     
    let $workPersons := $elem_2/tei:persName
    
    let $workPerson := local:getWorkPersons($workPersons)
    
    let $works := $elem_2/tei:rs[@type='work']
    
    let $workArray := local:getWork($works)
    
                    return 
                    
                        if($date != '')
                        then(concat('{"date":[', $date, ']}'))
                        else(
                            if($onecell != '')
                            then(
                                if($workPerson != '')
                                then(
                                    if($workArray != '')
                                    then(
                                        concat('{"inhalt":["', normalize-space($onecell), '"]},', '{"work":[', $workArray, ']},',  '{"workpersons":[', $workPerson, ']}')
                                    )else(concat('{"inhalt":["', normalize-space($onecell), '"]},', '{"work":[', ']},', '{"workpersons":[', $workPerson, ']}')))                               
                                else(
                                    if($workArray != '')
                                    then(concat('{"inhalt":["', normalize-space($onecell), '"]},', '{"work":[', $workArray, ']},', '{"workpersons":[', ']}'))
                                    else(concat('{"inhalt":["', normalize-space($onecell), '"]},', '{"work":[', ']},', '{"workpersons":[', ']}')))
                                
                                
                                
                                
                                
                                )
                            else()
                        )
                      
                 
                                      
    return 
        string-join($strings,',')
 
};

declare function local:getWork($works) {

let $strings := for $elem_3 in $works

    let $work := $elem_3
    
    let $workId := $work/@key
    
                    return 
                        concat('["', normalize-space($work), '"', ', "', $workId, '"]')
                    
                   
                    
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

declare function local:getCellContent($elem_2) {

let $strings := for $elem in $elem_2

    let $content := $elem
    (:$elem(node()[not(self::tei:seg)]):)
    (:$elem/node()[not(self::tei:seg)]:)
    (:$elem/child::node()[not(self::tei:seg)]:)
    
    
    
   (:self::tei:rs or self::tei:persName:)
    
                    return 
                       $content
                 
                                      
    return 
        string-join($strings,',')
 
};
                    
                    

(

  '{"rows":[',
        local:getTableInformation($schedule),

     ']}'
   
)
   