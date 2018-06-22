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

declare variable $selection := request:get-parameter('selection', '');

declare variable $path := 'xmldb:exist:///apps/theater-data/rollen/';
declare variable $file := collection($path);
declare variable $fileNames := $file//tei:castItem;

declare function local:jsonifyRegs($fileNames) {
    
    let $strings := for $elem_1 in $fileNames
    
    let $titles := $elem_1/tei:roleName
    let $content_title := local:jsonifyroleNames($titles, $elem_1)
    
    return
        if ($content_title != '') then
            ($content_title)
        else
            ()
    
    return
        string-join($strings, ',')

};

(:declare function local:jsonifyPersons($titles, $elem_1) {

let $strings := for $elem in $titles

		let $fileName :=  $elem/tei:roleName
		
		let $roleName := local:jsonifyroleNames($fileName, $elem_1)
		
		return
            $roleName		
		return 
        string-join($strings,', ')
};:)



declare function local:jsonifyroleNames($titles, $elem_1) {
    
    let $strings := for $elem in $titles
    
    let $fileName := $elem
    
    let $subName := substring($fileName, 1, 1)
    let $serchvalue_uppercase_tmp := upper-case($subName)
    let $fileName1 := if ($selection != 'Zahlen' and (contains($selection, $subName) or contains($selection, $serchvalue_uppercase_tmp)))
    then
        ($fileName)
    else
        ()
    
    let $fileName2 := if (contains($selection, 'Zahlen'))
    then
        (if(contains('ABCDEFGJIHKLMNOPQRSTUVWXYZÜÄÖ', $subName) or contains('ABCDEFGJIHKLMNOPQRSTUVWXYZÜÄÖ', $serchvalue_uppercase_tmp))then()else($fileName))
    else
        ()
        
    let $fileName3 := if($fileName1 != '')then($fileName1 )else($fileName2)
    
    let $personId := if ($fileName3 != '')
    then
        ($elem_1/@xml:id)
    else
        ()
    
    
    let $type := if ($fileName3 != '')
    then
        (
        $elem/@type
        )
    else
        ()
    
    
    return
        if ($fileName3 != '') then
            (
            concat('["', $fileName3, '",',
            '"', $personId, '",',
            '"', $type, '"',
            ']'))
        else
            ()
    return
        string-join($strings, ',')

};


declare function local:jsonifyForename($foreNameList) {
    
    let $strings := for $elem in $foreNameList
    
    let $forename := $elem
    
    return
        $forename
    
    return
        string-join($strings, ', ')

};




(

'{"roles":[',
local:jsonifyRegs($fileNames),
']}'

)




