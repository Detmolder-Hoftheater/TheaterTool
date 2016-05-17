xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

let $uri := request:get-parameter('uri', '')
let $type := request:get-parameter('type', 'source')
let $docUri := if(contains($uri, '#')) then(substring-before($uri, '#')) else($uri)
let $doc := doc($docUri)


let $base := 'xmldb:exist:///db/apps/TheaterTool/resources/xslt/'

return  
        transform:transform($doc, concat($base, 'source.xsl'), <parameters></parameters>)
   