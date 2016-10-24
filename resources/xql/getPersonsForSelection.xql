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

declare variable $selection := request:get-parameter('selection', '');

declare variable $path := 'xmldb:exist:///apps/theater-data/persons/';
declare variable $file := collection($path);
declare variable $fileNames := $file//tei:person;

declare function local:jsonifyRegs($fileNames) {

let $strings := for $elem_1 in $fileNames

	let $titles := $elem_1//tei:persName
	let $content_title := local:jsonifyPersons($titles, $elem_1)
	
                    return 
if($content_title != '')then($content_title)else()

    return 
        string-join($strings,',')
 
};

declare function local:jsonifyPersons($titles, $elem_1) {

let $strings := for $elem in $titles

		let $fileName :=  $elem//tei:surname[1]
		
		let $subName := substring($fileName, 1,1)
		let $fileName1 := if(contains($selection, $subName))
			then($fileName)
			else()

let $personId := if($fileName1 != '')
			then($elem_1/@xml:id)
			else()
			
			
	let $foreName := 	if($fileName1 != '')
			then(
			local:jsonifyForename($elem//tei:forename)
			
			)
			else()
			
	let $type := 	if($fileName1 != '')
			then(
			$elem/@type
			)
			else()	
			
			
                    return 
      if($fileName1 != '')then(                
 concat('["',$fileName1,'",',
							'"',$personId,'",',	
							'"',$foreName,'",',
							'"',$type,'"',
                            ']'))
else ()
    return 
        string-join($strings,',')
   
};


declare function local:jsonifyForename($foreNameList) {

let $strings := for $elem in $foreNameList

	let $forename := $elem
	
                    return 
                       $forename

    return 
        string-join($strings,', ')
 
};



    
 (

     '{"persons":[',
        local:jsonifyRegs($fileNames),
    ']}' 
   
)




