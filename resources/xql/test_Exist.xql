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

let $uri := request:get-parameter('uri', '/db/apps/theater-data/works/H0201xx/H020149.xml')
let $uri := '/db/apps/theater-data/works/H0201xx/H020149.xml'
let $type := request:get-parameter('type', 'work')
let $docUri := if(contains($uri, '#')) then(substring-before($uri, '#')) else($uri)
let $doc := eutil:getDoc($docUri)/mei:work
let $lang := request:get-parameter('lang', 'de')

(:let $base := concat(replace(system:get-module-load-path(), 'embedded-eXist-server', ''), '/../xslt/') :)
(: TODO: Pr\'fcfen, wie wir an dem replace vorbei kommen:)

let $base := 'xmldb:exist:///db/apps/TheaterTool/resources/xslt/'

return
    if($type = 'work')
    then(
        transform:transform($doc, concat($base, 'meiHead2HTML.xsl'), <parameters><param name="base" value="{$base}"/><param name="lang" value="{$lang}"/></parameters>))
(:    else if($type = 'source'):)
(:    then(transform:transform($doc, concat($base, 'meiHead2HTML.xsl'), <parameters><param name="base" value="\{$base\}"/><param name="lang" value="\{$lang\}"/></parameters>)):)
(:    else if($type = 'text'):)
(:    then(transform:transform($doc, concat($base, 'teiHeader2HTML.xsl'),<parameters><param name="base" value="\{$base\}"/><param name="lang" value="\{$lang\}"/></parameters>)):)
    else()