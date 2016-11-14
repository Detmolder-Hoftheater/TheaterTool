xquery version "3.0";

(:import module namespace freidi-pmd="http://www.freischuetz-digital.de/TheaterTool-new" at "../../modules/app.xql";:)

declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";
(: 
declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";:)
declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";

declare variable $searchValue := request:get-parameter('searchValue', '');

declare variable $db_path := request:get-parameter('path', '');
declare variable $path := concat('xmldb:exist:///apps/', $db_path, '/');

declare variable $file := collection($path);
declare variable $fileNames := $file//tei:person;

declare function local:jsonifyRoles($names) {

let $strings := for $elem in $names

					let $id_1 :=normalize-space($elem)
					(:let $role := $elem/@role
					let $dbkey :=$elem/@dbkey:)
                   
                    return 
                     if($id_1 != '')then( 
                     $id_1
				(:concat('["',$id_1, '",', '"',$role, '",', '"',$dbkey,'"]'):)
				)
else()
    return 
        string-join($strings,',')
  
};

declare function local:jsonifyNormalizeCharacter($titles, $fileID, $names) {

let $strings := for $elem in $titles

    (:let $title_tmp := substring($elem, 2):)
    let $serchvalue_tmp := substring($searchValue, 1, 1)
    let $serchvalue_uppercase_tmp := upper-case($serchvalue_tmp)
    let $serchvalue_uppercase := concat($serchvalue_uppercase_tmp, substring($searchValue, 2)) 

	let $title := if(contains($elem, $searchValue) or contains($elem, lower-case($searchValue)) or contains($elem, $serchvalue_uppercase))
			then(normalize-space($elem))
			else(if($searchValue ='*')
			     then(normalize-space($elem))
			     else())
					
	let $comp := local:jsonifyRoles($names)	
	
	let $type := $elem/@type
	let $language := $elem/@xml:lang

                    return 
                    
                    if($title  != '')then(concat('["',replace($title, '"', '\\"'), '","', $fileID, '","', $comp, '","', $type, '","', $language, '"]'))else()
                    
    return 
        string-join($strings,',')
 
};


declare function local:jsonifyTitels($fileNames) {

let $strings := for $elem in $fileNames

		let $names :=$elem//tei:persName

	    let $fileName_1 := local:jsonifyNormalizeCharacter($elem, $names)
	  
			return 
			if($fileName_1 != '')then($fileName_1)else()
						
    return 
        string-join($strings,',')
    
};
  
 (

  '[',
        local:jsonifyTitels($fileNames),

    ']'
   
    (: '{"children":[',
        local:jsonifyTitels($fileNames),
    ']}' :)
   

)




