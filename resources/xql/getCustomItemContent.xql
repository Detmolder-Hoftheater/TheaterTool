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

(:let $uri := request:get-parameter('uri', ''):)

let $tailPath := request:get-parameter('dbPath', '')
(:let $type := request:get-parameter('type', 'work'):)
(:let $uri := concat('/db/apps/', $tailPath, '/'):)
let $doc:= util:binary-doc($tailPath)

return
   $doc