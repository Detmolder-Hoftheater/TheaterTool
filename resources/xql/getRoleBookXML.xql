xquery version "3.0";

import module namespace eutil="http://www.edirom.de/xquery/util" at "/db/apps/TheaterTool/resources/xqm/util.xqm";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

(:declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";:)
declare option exist:serialize "method=xml media-type=text/xml omit-xml-declaration=no indent=yes";

let $bookName := request:get-parameter('regieName', '')
let $db_path := request:get-parameter('path', '')
let $path := concat('xmldb:exist:///apps/', $db_path)
let $file := collection($path)
let $fileNames := $file//tei:TEI[tei:teiHeader//tei:titleStmt[1][tei:title = $bookName]]


(:let $doc := eutil:getDoc($path)/tei:TEI:)

return $fileNames