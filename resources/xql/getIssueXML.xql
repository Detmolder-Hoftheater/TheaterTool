xquery version "3.0";

import module namespace eutil="http://www.edirom.de/xquery/util" at "/db/apps/TheaterTool/resources/xqm/util.xqm";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

let $month := request:get-parameter('issueName', '')
let $year := request:get-parameter('year', '')

let $uri := concat('/db/apps/theater-data/ausgaben/', $year, '/')

(:let $file := doc($uri):)
let $file := collection($uri)

(:let $headName := $file//tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt[1]/tei:title[$month]
let $schedule := if($headName != '')then($file//tei:TEI)else()
let $doc := eutil:getDoc($schedule)/tei:TEI:)

let $fileNames := $file//tei:TEI[tei:teiHeader//tei:titleStmt[1][tei:title = $month]]


return
   $fileNames