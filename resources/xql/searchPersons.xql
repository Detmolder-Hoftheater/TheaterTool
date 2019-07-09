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

declare variable $searchValue := request:get-parameter('searchValue', '');

declare variable $db_path := request:get-parameter('path', '');
declare variable $path := concat('xmldb:exist:///apps/', $db_path, '/');

declare variable $file := collection($path);
declare variable $fileNames := $file/tei:person;

declare function local:jsonifyNormalizeCharacter($titles, $fileID) {
    
    let $strings := for $elem in $titles
    
   (: let $serchvalue_tmp := substring($searchValue, 1, 1)
    let $serchvalue_uppercase_tmp := upper-case($serchvalue_tmp)
    let $serchvalue_uppercase := concat($serchvalue_uppercase_tmp, substring($searchValue, 2))
    
    :)
    (:let $title_1 := if (string-length($searchValue) = 1) then
        (
        if (contains(substring($elem, 1, 1), $searchValue) or contains(substring($elem, 1, 1), lower-case($searchValue)) or contains(substring($elem, 1, 1), $serchvalue_uppercase))
        then
            (normalize-space($elem))
        else
            ()
        )
    else
        ():)
    
    (:let $title := if (string-length($searchValue) > 1) then
        (
        
        if (contains($elem, $searchValue) or contains($elem, lower-case($searchValue)) or contains($elem, $serchvalue_uppercase))
        then
            (normalize-space($elem))
        else
            (if ($searchValue = '')
            then
                (normalize-space($elem))
            else
                ())
        )
    else
        (
        if ($searchValue = '') then
            (normalize-space($elem))
        else
            (
            $title_1)):)
    
    let $title := normalize-space($elem)
    let $type := $elem/@type
    
    return
        
        if ($title != '') then
            (concat('{', '"title":"',replace($title, '"', '\\"'), '",', '"dbkey":"',$fileID, '",','"type":"', $type, '"}'))
        else
            ()
    
    return
        string-join($strings, ',')

};




declare function local:jsonifyTitels($fileNames) {
    
    let $strings := for $elem_1 in $fileNames
    
    let $titles := $elem_1/tei:persName
    
    let $fileID := $elem_1/@xml:id
    
    let $content_title := local:jsonifyNormalizeCharacter($titles, $fileID)
    
    return
        if ($content_title != '') then
            ($content_title)
        else
            ()
    
    return
        string-join($strings, ',')

};

(

'[',
local:jsonifyTitels($fileNames),

']'

(: '{"children":[',
        local:jsonifyTitels($fileNames),
    ']}' :)


)




