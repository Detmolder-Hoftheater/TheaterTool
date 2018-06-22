xquery version "3.0";

import module namespace freidi-pmd = "http://www.freischuetz-digital.de/TheaterTool-new" at "../../modules/app.xql";

declare namespace request = "http://exist-db.org/xquery/request";
declare namespace mei = "http://www.music-encoding.org/ns/mei";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare namespace xmldb = "http://exist-db.org/xquery/xmldb";
declare namespace system = "http://exist-db.org/xquery/system";
declare namespace transform = "http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";


declare variable $fileName := request:get-parameter('fileName', '');
declare variable $pageToLoad := request:get-parameter('pageNr', '');
declare variable $selectedWork := request:get-parameter('selectedWork', '');
declare variable $workFolder := if (contains($selectedWork, 'H020149')) then
    ('aschenbroedel/')
else
    (if (contains($selectedWork, 'H020263')) then
        ('bettelstudent/')
    else
        (if(contains($selectedWork, 'H020048'))
            then('desTeufelsAnteil/')
            else()));

declare variable $path := concat('xmldb:exist:///apps/theater-data/vertaktung/', $workFolder, $fileName, '.xml');

declare variable $file := doc($path);

declare variable $surface := for $elem in $file//mei:surface

return
    if ($elem/@n = $pageToLoad) then
        ($elem)
    else
        ();

(:$file//mei:surface[@n = $pageToLoad];:)

declare variable $graphic1 := $file//mei:surface[last()]/@n;

declare function local:getJson($surface) {
    
    
    let $page := $surface
    
    let $pageJson := concat('"page":{',
    '"id":"', $page/@xml:id, '",',
    '"n":"', $page/@n, '",',
    '"pageAnzahl":"', $graphic1, '",',
    '"path":"', $page/mei:graphic/@target, '",',
    '"width":"', $page/mei:graphic/@width, '",',
    '"height":"', $page/mei:graphic/@height, '"',
    '}'
    )
    
    let $zones := $page//mei:zone
    
    let $zonesJson := for $zone in $zones
    let $ref := $zone/substring(@data, 2)
    let $elem := $page/id($ref)
    return
        concat('{',
        '"id":"', $zone/@xml:id, '",',
        '"type":"', $zone/@type, '",',
        '"ulx":"', $zone/@ulx, '",',
        '"uly":"', $zone/@uly, '",',
        '"lrx":"', $zone/@lrx, '",',
        '"lry":"', $zone/@lry, '",',
        '"targetID":"', $elem/@xml:id, '",',
        '"n":"', $elem/@n, '"',
        '}')
    return
        (
        '{',
        $pageJson, ',',
        '"zones":[', string-join($zonesJson, ','), ']',
        (:'"path":"',$imgSrc,'"',:)
        '}'
        )

};


let $json := local:getJson($surface)

return
    $json

