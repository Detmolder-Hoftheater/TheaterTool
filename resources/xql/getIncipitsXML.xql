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
let $incipitName := request:get-parameter('incipitName', '')
let $dbexpPath := request:get-parameter('dbexpPath', '')
(:let $uri := concat('/db/apps/theater-data/expressions/', $sourceID, '_expr1.xml')

let $doc := doc($uri):)

let $uri := concat('xmldb:exist:///apps/', $dbexpPath, '/')
let $file := collection($uri)
let $content := for $elem in $file
                    return 
                    if($elem/mei:expression[contains(@xml:id,$sourceID)])then($elem)else()

let $template := for $elem in $content
                    return 
                    if($elem//mei:expression/mei:componentGrp/mei:expression[@label =$incipitName]
                    )then($elem//mei:expression/mei:componentGrp/mei:expression[@label =$incipitName])else() 

return
   $template