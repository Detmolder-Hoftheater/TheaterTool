    xquery version "3.0";

import module namespace freidi-pmd="http://www.freischuetz-digital.de/pmdCE-new" at "../../modules/app.xql";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $path := request:get-parameter('path', '');
declare variable $typeString := request:get-parameter('types', 'all');

declare variable $surface := collection('/db/apps/controlevents-data/')//mei:surface[@xml:id = $path];
             
declare variable $graphic := $surface/mei:graphic[1];

declare variable $imgSrc := $freidi-pmd:ce-imageURI || substring-before(substring-after($surface/mei:graphic/@target, 'sources/'),'.jpg') || '/{z}-{x}-{y}.jpg';


declare function local:getJson($surface,$types) {


    let $page := $surface
    
    let $pageJson := concat('"page":{',
                         '"id":"',$page/@xml:id,'",',
                         '"n":"',$page/@n,'",',
                         '"width":"',$page/mei:graphic/@width,'",',
                         '"height":"',$page/mei:graphic/@height,'"',
                         '}'
                     )

    let $zones := if('all' = $types)
                  then($page//mei:zone)
                  else($page//mei:zone[@type = $types])
                  
    let $zonesJson := for $zone in $zones
                      let $ref := $zone/substring(@data,2)
                      let $elem := $page/id($ref)
                      return 
                          concat('{',
                              '"id":"',$zone/@xml:id,'",',
                              '"type":"',$zone/@type,'",',
                              '"ulx":"',$zone/@ulx,'",',
                              '"uly":"',$zone/@uly,'",',
                              '"lrx":"',$zone/@lrx,'",',
                              '"lry":"',$zone/@lry,'",',
                              '"targetID":"',$elem/@xml:id,'",',
                              '"n":"',$elem/@n,'"',
                          '}')
    return (
        '{',
            $pageJson,',',
            '"zones":[',string-join($zonesJson,','),'],',
            '"path":"',$imgSrc,'"',
        '}'
    )
    
};

(:let $path := request:get-parameter('path', ''):)
(:let $typeString := request:get-parameter('types', 'all'):)

(:let $doc := doc('/db/apps/controlevents-data/' || $path):)
let $doc := collection($freidi-pmd:ce-data)//mei:surface[@xml:id = $path]

let $types := tokenize($typeString,',')

let $json := local:getJson($doc,$types)

return
    $json
    
    