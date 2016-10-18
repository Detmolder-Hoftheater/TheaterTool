xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

let $regiename := request:get-parameter('regieName', '')

let $path := 'xmldb:exist:///apps/theater-data/abonnement/'

let $file := collection($path)

let $allFiles := $file//tei:TEI

let $allNames := $file//tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt[1]/tei:title

let $schedule := for $elem in $allFiles
                    return
                    
                 if($elem/tei:teiHeader/tei:fileDesc/tei:titleStmt[1]/tei:title = $regiename)then($elem)else()


(:let $type := request:get-parameter('type', 'work')
let $docUri := if(contains($uri, '#')) then(substring-before($uri, '#')) else($uri)
let $doc := if(contains($type, 'work'))then(eutil:getDoc($docUri)/mei:work)else(eutil:getDoc($docUri)/mei:source)
(\:let $doc := eutil:getDoc($docUri)/mei:work:\)
let $lang := request:get-parameter('lang', 'de'):)

(:let $base := concat(replace(system:get-module-load-path(), 'embedded-eXist-server', ''), '/../xslt/') :)
(: TODO: Pr\'fcfen, wie wir an dem replace vorbei kommen:)

let $base := 'xmldb:exist:///db/apps/TheaterTool/resources/xslt/'

return  
        transform:transform($schedule, concat($base, 'abo.xsl'), <parameters></parameters>)
   