xquery version "3.0";

import module namespace eutil="http://www.edirom.de/xquery/util" at "/db/apps/TheaterTool/resources/xqm/util.xqm";
(:import module namespace expath="http://expath.org/ns/pkg";:)

declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

(:declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";:)
declare option exist:serialize "method=xml media-type=text/xml omit-xml-declaration=no indent=yes";


let $uri := request:get-parameter('uri', '')
let $type := request:get-parameter('type', 'work')
let $docUri := if(contains($uri, '#')) then(substring-before($uri, '#')) else($uri)
let $doc := if(contains($type, 'work'))then(eutil:getDoc($docUri)/mei:work)else(eutil:getDoc($docUri)/mei:source)

return
   $doc