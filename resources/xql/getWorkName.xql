xquery version "3.0";

(:import module namespace freidi-pmd="http://www.freischuetz-digital.de/TheaterTool-new" at "../../modules/app.xql";:)

declare namespace request = "http://exist-db.org/xquery/request";
declare namespace mei = "http://www.music-encoding.org/ns/mei";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare namespace xmldb = "http://exist-db.org/xquery/xmldb";
declare namespace system = "http://exist-db.org/xquery/system";
declare namespace transform = "http://exist-db.org/xquery/transform";
(: 
declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";:)
declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";

declare variable $selection := request:get-parameter('dbkey', '');

declare variable $tailpath := request:get-parameter('path', '');
declare variable $path := concat($tailpath, '/',$selection, '.xml');
declare variable $file := doc($path);
declare variable $fileNames := $file//mei:work;

declare function local:jsonifyRegs($fileNames) {
    
    let $strings := for $elem_1 in $fileNames
    
    
    let $titles := $elem_1/mei:title[1]
    
    return
        if ($titles != '') then
            concat('"', replace(normalize-space($titles), '"', '\\"'), '"')
        else
            ()
    
    return
        string-join($strings, ',')

};

(

'{"werk":[',
local:jsonifyRegs($fileNames),
']}'

)




