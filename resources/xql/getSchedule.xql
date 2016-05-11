xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

let $month := request:get-parameter('month', '')
let $year := request:get-parameter('year', '')

let $uri := concat('/db/apps/theater-data/einnahmen/', $year, '/', $year, '_', $month, '.xml')

let $file := doc($uri)

let $headName := $file//tei:profileDesc//tei:keywords/tei:term['Spielplan']

let $schedule := if($headName != '')then($file)else()

(:let $type := request:get-parameter('type', 'work')
let $docUri := if(contains($uri, '#')) then(substring-before($uri, '#')) else($uri)
let $doc := if(contains($type, 'work'))then(eutil:getDoc($docUri)/mei:work)else(eutil:getDoc($docUri)/mei:source)
(\:let $doc := eutil:getDoc($docUri)/mei:work:\)
let $lang := request:get-parameter('lang', 'de'):)

(:let $base := concat(replace(system:get-module-load-path(), 'embedded-eXist-server', ''), '/../xslt/') :)
(: TODO: Pr\'fcfen, wie wir an dem replace vorbei kommen:)

let $base := 'xmldb:exist:///db/apps/TheaterTool/resources/xslt/'

return  
        transform:transform($schedule, concat($base, 'test.xsl'), <parameters></parameters>)
   