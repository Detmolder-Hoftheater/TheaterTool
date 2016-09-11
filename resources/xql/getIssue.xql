xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

let $month := request:get-parameter('issueName', '')
let $year := request:get-parameter('year', '')

let $uri := concat('/db/apps/theater-data/ausgaben/', $year, '/')

let $file := collection($uri)

let $allFiles := $file//tei:TEI

let $allNames := $file//tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt[1]/tei:title

let $schedule := for $elem in $allFiles
                    return
                    
                 if($elem/tei:teiHeader/tei:fileDesc/tei:titleStmt[1]/tei:title = $month)then($elem)else()

let $base := 'xmldb:exist:///db/apps/TheaterTool/resources/xslt/'

return transform:transform($schedule, concat($base, 'issue.xsl'), <parameters></parameters>)
   