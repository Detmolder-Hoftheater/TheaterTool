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

declare variable $path := concat('/db/apps/theater-data/sources/', $selection, '.xml');
declare variable $file := doc($path);
declare variable $fileNames := $file;

declare function local:jsonifyRegs($fileNames) {
    
    let $strings := for $elem in $fileNames
    
    let $titles := $elem/mei:source[not(ancestor::mei:componentGrp)]/mei:titleStmt[1]/mei:title[1]
    
    let $worTargetId := $elem/mei:source[not(ancestor::mei:componentGrp)]/mei:relationList/mei:relation[@rel = 'isEmbodimentOf']/@target
   
    let $workIdExpr := tokenize($worTargetId, "#")[last()]
    let $workRefId := substring-before($workIdExpr, '_')
    
    let $rismLabel := $elem/mei:source//mei:identifier[@codedval = "RISM-label"][1]
    
    let $physLoc_tmp := $elem/mei:source//mei:identifier[@type = "shelfLocation"][1]
    
    let $physLoc := replace($physLoc_tmp, '\n', '')
    
    let $sourceName := concat('Quelle: ', $rismLabel, ', ', $physLoc)
    
    return
        if ($titles != '') then
          concat('"', normalize-space($titles), '", "', $workRefId, '", "',  $sourceName, '", "', $physLoc,  '"')
            
        else
            ()
    
    return
        string-join($strings, ',')

};

(

'{"quelle":[',
local:jsonifyRegs($fileNames),
']}'

)




