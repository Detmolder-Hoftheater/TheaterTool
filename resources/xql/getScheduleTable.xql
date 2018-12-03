xquery version "3.0";


declare namespace request = "http://exist-db.org/xquery/request";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare namespace xmldb = "http://exist-db.org/xquery/xmldb";
declare namespace system = "http://exist-db.org/xquery/system";
declare namespace transform = "http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $month := request:get-parameter('month', '');
declare variable $year := request:get-parameter('year', '');

declare variable $uri := concat('/db/apps/theater-data/einnahmen/', $year, '/');

declare variable $file := collection($uri);

declare variable $uri_1 := concat('/db/apps/theater-data/ausgaben/', $year, '/');

declare variable $file_1 := collection($uri_1);

declare variable $path_2 := concat('xmldb:exist:///apps/theater-data/spielplaene/', $year, '/');
declare variable $file_2 := collection($path_2);

declare variable $selectedDate := concat($year, '-', $month);

declare variable $schedule := for $elem in ($file, $file_1, $file_2)
return
    if (($elem/tei:TEI/tei:teiHeader/tei:profileDesc//tei:keywords/tei:term['Spielplan']
    and $elem/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt[1]/tei:title//tei:date[@when = $selectedDate])
    or $year = '1820' or $year = '1821' or $year = '1822' or $year = '1823' or $year = '1824'
    ) then
        ($elem)
    else
        ();


declare function local:getSchedulePlace($schedule) {
    
    let $strings := for $elem in $schedule
    
    let $place := local:getPlace($elem//tei:head//tei:table//tei:settlement)
    
    return
        if ($place != '') then
            (concat('"', $place, '"'))
        else
            ()
    
    return
        string-join($strings, ',')

};

declare function local:getPlace($place) {
    
    let $strings := for $elem in $place
    
    let $settl := $elem
    
    return
        $settl
    
    return
        string-join($strings, ' ,')

};


declare function local:getTableInformation($schedule) {
    
    let $strings := for $elem in $schedule
    
    let $rows := $elem//tei:row
    
    let $row := if ($rows != '') then
        (local:getTableRow($rows))
    else
        ()
    
    return
        if ($row != '') then
            ($row)
        else
            ()
    
    return
        string-join($strings, ',')

};

declare function local:getTableRow($rows) {
    
    let $strings := for $elem_1 in $rows
    
    let $cells := $elem_1/tei:cell
    
    let $cell := local:getTableCell($cells)
    
    return
        
        if ($cell != '') then
            (concat('{"cells":[', $cell, ']}'))
        else
            ()
    
    return
        string-join($strings, ',')

};

declare function local:getTableCell($cells) {
    
    let $strings := for $elem_2 in $cells
    
    
    
    let $date := concat('"', replace($elem_2/ancestor::tei:row/tei:cell/tei:date, '"', '\\"'), '"')
    
    (: let $onecell_row := if($elem_2/tei:rs != '')then(local:getCellContent($elem_2/child::node()[not(self::tei:seg)]))else()
    
    let $onecell_1 := if($onecell_row != '')then(translate($onecell_row, '[', ''))else()
    
    let $onecell_2 := if($onecell_row != '')then(translate($onecell_1, ']', '' ))else()
    
    let $onecell_3 := if($onecell_row != '')then(replace($onecell_2, '"', '\\"' ))else()
    
    let $onecell := if($onecell_row != '')then(replace($onecell_3, ',', '' ))else():)
    
    (:let $onecell := local:getCellContent($elem_2/following-sibling::*[not(self::tei:seg)]):)
    
    (:let $onecell := if($elem_2/tei:rs != '')then(local:getCellContent($elem_2/self))else():)
    
    (:let $onecell := if($elem_2/tei:rs != '')then(local:getCellContent($elem_2[not(self::tei:seg)]/child::*))else():)
    let $onecell := if ($elem_2/tei:rs != '') then
        (local:getCellContent($elem_2[not(self::tei:seg)]/node()))
    else
        ()
    
    let $workPersons := $elem_2/tei:persName
    
    let $workPerson := local:getWorkPersons($workPersons)
    
    let $works := $elem_2/tei:rs[@type = 'work']
    
    let $workArray := local:getWork($works)
    
    (: let $text_cell := if($onecell = '' and $workPersons = '' and $works = '')then($elem_2)else():)
    
    return
        
        if ($date = '')
        then
            ((:concat('{"date":[', $date, ']}'):) )
        else
            (
            if ($onecell != '')
            then
                (
                concat('{"date":[', normalize-space($date), ']},', '{"inhalt":[', $onecell, ']}')
                
                (:if($workPerson != '')
                                then(
                                    if($workArray != '')
                                    then(
                                        concat('{"date":[', $date, ']},','{"inhalt":[', $onecell, ']},', '{"work":[', $workArray, ']},',  '{"workpersons":[', normalize-space($workPerson), ']}')
                                    )else(concat('{"date":[', $date, ']},','{"inhalt":[', $onecell, ']},', '{"work":[', ']},', '{"workpersons":[', normalize-space($workPerson), ']}')))                               
                                else(
                                    if($workArray != '')
                                    then(concat('{"date":[', $date, ']},','{"inhalt":[', $onecell, ']},', '{"work":[', $workArray, ']},', '{"workpersons":[', ']}'))
                                    else(concat('{"date":[', $date, ']},','{"inhalt":[', $onecell, ']},', '{"work":[', ']},', '{"workpersons":[', ']}'))):)
                
                
                )
            else
                ()
            )
    
    
    
    return
        string-join($strings, ',')

};

declare function local:getWork($works) {
    
    let $strings := for $elem_3 in $works
    
    let $work := $elem_3
    
    let $workId := $work/@key
    
    return
        concat('["', normalize-space($work), '"', ', "', $workId, '"]')
    
    
    
    return
        string-join($strings, ',')

};

declare function local:getWorkPersons($workPersons) {
    
    let $strings := for $elem_3 in $workPersons
    
    let $pers := $elem_3
    
    let $persId := $pers/@key
    
    return
        concat('["', $pers, '"', ', "', $persId, '"]')
    
    
    
    return
        string-join($strings, ',')

};

declare function local:getCellContent($elem_2) {
    
    let $strings := for $elem in $elem_2
    
    (: let $content := if($elem/tei:rs != '')then(
        if($elem/tei:rs[@type ='work'])then(
            
            local:getWork($elem/tei:rs[@type ='work'])
        )
        else(
          if($elem_2/tei:persName != '')then(
                local:getWorkPersons($elem_2/tei:persName)
          )else()
        
        )
    
    )else($elem/node()):)
    
    
    
    let $content := if ($elem/@type = 'work') then
        (
        (: $elem:)
        concat('{"work":["', normalize-space($elem), '"', ', "', $elem/@key, '"]}')
        
        (:local:getWork($elem/tei:rs[@type ='work']):)
        )
    else
        (
        
        )
    
    
    
    let $content_2 := if ($elem/self::tei:persName) then
        (
        (:$elem:)
        concat('{"workpersons":["', $elem, '"', ', "', $elem/@key, '"]}')
        
        (:local:getWorkPersons($elem_2/tei:persName):)
        )
    else
        ()
    
    let $content_3_0 := normalize-space($elem[not(self::tei:persName) and not(self::tei:seg) and not($elem[@type = 'work'])])
    
    let $content_3_1 := replace($content_3_0, '"', '\\"')
    
    let $content_3 := concat('{"celltext":["', $content_3_1, '"]}')
    
    (:$elem/node():)
    (:$elem(node()[not(self::tei:seg)]):)
    (:$elem/node()[not(self::tei:seg)]:)
    (:$elem/child::node()[not(self::tei:seg)]:)
    
    
    
    (:self::tei:rs or self::tei:persName:)
    
    return
        if ($content != '')
        then
            ($content)
        else
            (
            if ($content_2 != '') then
                (normalize-space($content_2))
            else
                ($content_3)
            
            )
            
            (:concat($content, ',', $content_2, ',', $content_3):)
    
    
    return
        string-join($strings, ',')

};

declare function local:getTables($schedule) {
    
    let $strings := for $elem_3 in $schedule
    
    let $tables := $elem_3
    
    let $rows := local:getTableInformation($tables)
    
    let $places := local:getSchedulePlace($tables)
    
    return
        concat('{"rows":[',

$rows,

'],',
'"settlement":[',
$places,

']}')
    
    return
        string-join($strings, ',')

};


(
'{"tables":[',

local:getTables($schedule//tei:text//tei:body//tei:table),


']}'


)
