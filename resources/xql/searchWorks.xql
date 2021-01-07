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
(:declare variable $type := request:get-parameter('type', '');:)

declare variable $db_path := request:get-parameter('path', '');
declare variable $path := concat($db_path, '/');

(:declare variable $path := 'xmldb:exist:///apps/theater-data/works/';:)
declare variable $file := collection($path);
declare variable $fileNames := $file//mei:work/@xml:id;

declare function local:jsonifyRoles($names) {
    
    let $strings := for $elem in $names
    
    let $id_1 := normalize-space($elem)
    (:let $role := $elem/@role
					let $dbkey :=$elem/@dbkey:)
    
    return
        if ($id_1 != '') then
            (
            $id_1
            (:concat('["',$id_1, '",', '"',$role, '",', '"',$dbkey,'"]'):)
            )
        else
            ()
    return
        string-join($strings, ',')

};

declare function local:jsonifyNormalizeCharacter($titles, $fileID, $names) {
    
    let $strings := for $elem in $titles
    
    
    (:let $serchvalue_tmp := substring($searchValue, 1, 1)
    let $serchvalue_uppercase_tmp := upper-case($serchvalue_tmp)
    let $serchvalue_uppercase := concat($serchvalue_uppercase_tmp, substring($searchValue, 2))
    
    let $fileNameCut := substring($elem, 1, 4)
    let $fileNameFiltered := if (contains($fileNameCut, 'Der ')
    or contains($fileNameCut, 'Die ')
    or contains($fileNameCut, 'Das '))
    then
        (substring($elem, 5))
    else
        ($elem):)
    
    
    (:let $title_1 := if (string-length($searchValue) = 1) then
        (
        if (contains(substring($fileNameFiltered, 1, 1), $searchValue) or contains(substring($fileNameFiltered, 1, 1), lower-case($searchValue)) or contains(substring($fileNameFiltered, 1, 1), $serchvalue_uppercase))
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
    
    let $comp := local:jsonifyRoles($names)
    
    let $type := $elem/@type
    let $language := $elem/@xml:lang
    
    return
        
        if ($title != '') then
            (concat('{', '"title":"', replace($title, '"', '\\"'), '",', '"dbkey":"', $fileID, '",', '"authors":"', $comp, '",', '"type":"', $type, '",', '"lang":"', $language, '"}'))
        else
            ()
    
    return
        string-join($strings, ',')

};


declare function local:getWork($titles, $fileID, $names) {
    
    let $strings := for $elem in $titles
    
    let $type := $elem/@type
    
    let $lang := $elem/@xml:lang
    
    let $elemValue := normalize-space($elem)
    
    let $comp := local:jsonifyRoles($names)
    
    return
        
        if ($elemValue != '') then
            (:(concat('["', replace($elemValue, '"', '\\"'), '","', $fileID, '","', $type, '","', $lang, '"]')):)
            (concat('{', '"title":"', replace($elemValue, '"', '\\"'), '",', '"dbkey":"', $fileID, '",', '"authors":"', $comp, '",', '"type":"', $type, '",', '"lang":"', $lang, '"}'))
        
        else
            ()
    
    return
        string-join($strings, ',')

};


declare function local:jsonifyTitels($fileNames) {
    
    let $strings := for $elem in $fileNames
    
    let $path1 := concat($path, $elem, '.xml')
    let $file1 := doc($path1)
    
    let $fileID := $file1/mei:work/@xml:id
    
    let $names := $file1//mei:persName[parent::mei:*/parent::mei:work]
    
    
    let $titles := $file1//mei:title[not(@type = 'sub')]
    
     let $fileName_1 := if ($searchValue = '*') then
        (local:getWork($titles, $fileID, $names))
    else
        (local:jsonifyNormalizeCharacter($titles, $fileID, $names))
    
    
    (:let $fileName_1 := local:jsonifyNormalizeCharacter($titles, $fileID, $names):)
    
    return
        if ($fileName_1 != '') then
            ($fileName_1)
        else
            ()
    
    return
        string-join($strings, ',')

};

(

'[',
local:jsonifyTitels($fileNames),

']'

)




