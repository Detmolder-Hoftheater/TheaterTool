xquery version "3.0";

import module namespace eutil="http://www.edirom.de/xquery/util" at "/db/apps/TheaterTool/resources/xqm/util.xqm";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

(:declare option exist:serialize "method=xml media-type=text/xml omit-xml-declaration=yes indent=yes";:)
(:declare option exist:serialize "method=xml media-type=text/xml omit-xml-declaration=no indent=yes";:)

declare option exist:serialize "method=xml media-type=text/xml omit-xml-declaration=yes indent=yes";


let $dbkey := request:get-parameter('dbkey', '')
(:let $year := request:get-parameter('year', ''):)

let $uri := concat('/db/apps/theater-data/persons/', $dbkey, '.xml')

(:, $year, '/', $year, '_', $month, '.xml'):)

let $doc := eutil:getDoc($uri)

(:let $doc_1 := eutil:getDoc($uri)/root():)

return
   $doc