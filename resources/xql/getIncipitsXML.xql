xquery version "3.0";

import module namespace eutil="http://www.edirom.de/xquery/util" at "/db/apps/TheaterTool/resources/xqm/util.xqm";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

let $sourceID := request:get-parameter('sourceID', '')
(:let $year := request:get-parameter('year', ''):)

let $uri := concat('/db/apps/theater-data/expressions/', $sourceID, '_expr1.xml')

(:, $year, '/', $year, '_', $month, '.xml'):)

let $doc := doc($uri)/mei:expression

return
   $doc