xquery version "3.0";

import module namespace eutil="http://www.edirom.de/xquery/util" at "/db/apps/TheaterTool/resources/xqm/util.xqm";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

(:declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";:)
declare option exist:serialize "method=xml media-type=text/xml omit-xml-declaration=yes indent=yes";

let $month := request:get-parameter('month', '')
let $year := request:get-parameter('year', '')

(:let $uri := concat('/db/apps/theater-data/einnahmen/', $year, '/', $year, '_', $month, '.xml'):)

let $uri := concat('/db/apps/theater-data/einnahmen/', $year, '/')
let $file := collection($uri)

let $uri_1 := concat('/db/apps/theater-data/ausgaben/', $year, '/')

let $file_1 := collection($uri_1)

let $path_2 := concat('xmldb:exist:///apps/theater-data/spielplaene/', $year, '/')
let $file_2 := collection($path_2)

let $selectedDate := concat($year, '-', $month)

let $schedule := for $elem in ($file, $file_1, $file_2)
                    return 
                    if(($elem/tei:TEI/tei:teiHeader/tei:profileDesc//tei:keywords/tei:term['Spielplan']
                     and $elem/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt[1]/tei:title//tei:date[@when = $selectedDate])
                     or $year = '1820' or $year = '1821' or $year = '1822' or $year = '1823' or $year = '1824'
                    )then($elem)else() 

(:let $doc := eutil:getDoc($schedule)/tei:TEI:)

return
   $schedule