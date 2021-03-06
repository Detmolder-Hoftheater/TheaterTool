xquery version "3.0";

import module namespace eutil="http://www.edirom.de/xquery/util" at "/db/apps/TheaterTool/resources/xqm/util.xqm";
(:import module namespace expath="http://expath.org/ns/pkg";:)

declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

(:let $uri := request:get-parameter('uri', '')
let $type := request:get-parameter('type', 'work')
let $docUri := if(contains($uri, '#')) then(substring-before($uri, '#')) else($uri)
let $doc := if(contains($type, 'work'))then(eutil:getDoc($docUri)/mei:work)else(eutil:getDoc($docUri)/mei:source)
:)
let $workID := request:get-parameter('sourceID', '')
let $dbexpPath := request:get-parameter('dbexpPath', '')
let $uri := concat('xmldb:exist:///apps/', $dbexpPath, '/')
let $file := collection($uri)
let $content := for $elem in $file
                    return 
                    if($elem/mei:expression[contains(@xml:id,$workID)])then($elem)else()

let $doc :=  $content//mei:expression[child::mei:incip]

let $snippet := 
for $elem in $doc return
<html>
<mei xmlns:xmldb="http://exist-db.org/xquery/xmldb" xmlns="http://www.music-encoding.org/ns/mei" meiversion="2013">
    <meiHead>
        <fileDesc>
            <titleStmt>
                <title>{$elem/@label}</title>
            </titleStmt>
            <pubStmt/>
        </fileDesc>
    </meiHead>
    <music>
        <body>
            <mdiv>{
                               
                                $elem//mei:score

                             } </mdiv>
        </body>
    </music>
</mei>
</html>

return

   $snippet
