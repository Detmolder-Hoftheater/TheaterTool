xquery version "3.0";

import module namespace eutil="http://www.edirom.de/xquery/util" at "/db/apps/TheaterTool/resources/xqm/util.xqm";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

(:declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";:)
declare option exist:serialize "method=xml media-type=text/xml omit-xml-declaration=no indent=yes";

let $month := request:get-parameter('month', '')
let $year := request:get-parameter('year', '')

let $issueID := request:get-parameter('schedID', '')
let $year := request:get-parameter('year', '')
let $issuetailPath := request:get-parameter('dbPath', '')
let $uri := concat('/db/apps/', $issuetailPath, '/', $year, '/')
let $file := collection($uri)
let $schedule := $file//tei:TEI[@xml:id = $issueID]   

(:let $uri := concat('/db/apps/theater-data/einnahmen/', $year, '/')
let $file := collection($uri)

let $uri_1 := concat('/db/apps/theater-data/ausgaben/', $year, '/')

let $file_1 := collection($uri_1)

let $selectedDate := concat($year, '-', $month)

let $schedule := for $elem in ($file, $file_1)
                    return 
                    if($elem/tei:TEI/tei:teiHeader/tei:profileDesc//tei:keywords/tei:term['Spielplan']
                     and $elem/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt[1]/tei:title//tei:date[@when = $selectedDate]
                    )then($elem)else() :)
                    
                    
                    
                    
return
   $schedule