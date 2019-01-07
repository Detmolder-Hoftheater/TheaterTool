xquery version "3.0";

import module namespace eutil="http://www.edirom.de/xquery/util" at "/db/apps/TheaterTool/resources/xqm/util.xqm";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

(:declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";:)
declare option exist:serialize "method=xml media-type=text/xml omit-xml-declaration=no indent=yes";

let $dbkey := request:get-parameter('dbkey', '')
let $persontailPath := request:get-parameter('dbPath', '')
(:let $path := concat('xmldb:exist:///apps/', $persontailPath, '/'):)

let $uri := concat('/db/apps/', $persontailPath, '/')
let $file := collection($uri)
let $doc := for $elem in $file
                    return 
                    if($elem/tei:person[@xml:id = $dbkey])then($elem)else()

(:let $uri := concat('/db/apps/', $persontailPath, '/', $dbkey, '.xml')
let $doc := eutil:getDoc($uri)/tei:person:)

return
   $doc