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

(:declare variable $selection1 := request:get-parameter('selectedWork', '');:)


(:declare variable $path := 'xmldb:exist:///apps/theater-data/vertaktung/aschenbroedel/edirom_source_0f385ae9-ab62-4188-8795-5c0931cd4586.xml';

declare variable $file := doc($path);
declare variable $fileNames := $file//mei:sourceDesc//mei:title;:)

declare variable $selectedWork := request:get-parameter('selectedWork', '');
declare variable $workFolder := if(contains($selectedWork, 'H020149'))then('aschenbroedel/')else(
if(contains($selectedWork, 'H020263'))then('bettelstudent/')else('test/'));
declare variable $path := concat('xmldb:exist:///apps/theater-data/vertaktung/', $workFolder, '/');

(:declare variable $path := 'xmldb:exist:///apps/theater-data/vertaktung/aschenbroedel/';:)
declare variable $file := collection($path);

(:declare variable $fileNames := $file//mei:sourceDesc//mei:title;
:)

declare function local:jsonifySlurs($file) {

let $strings := for $elem in $file

		let $navItem := $elem//mei:sourceDesc//mei:title
		let $xmlid := $elem//mei:mei/@xml:id
                    return 
						if($navItem != '')then(
                        concat('{name:"',$navItem,'",',
							'"leaf":"true",',
							'xmlid:"',$xmlid,'",',
							'"icon":"resources/images/Images-17.png"',							
                            '}'))
else()
    return 
        string-join($strings,',')

   
    
};

(:declare function local:jsonifySlurs($path) {

let $local-doctypes := collection($path)

let $strings1 := for $elem1 in $local-doctypes
					(\:let $fileTest := doc($elem1):\)
				let $surname := $elem1
                   (\: let $strings := for $elem in $elem1
                    	let $surname := $elem//mei:persName:\)
					
                    	return 
                        	concat('{name:"',$surname,'",',
							'details:"',"true",'",',                          
                            'xml:"',"true",'"',
                            '}')
   (\: return 
        string-join($strings,','):\)
    return 
        string-join($strings1,',')

};:)


       
    
 (

 (: '[',
        local:jsonifySlurs($persName),

    ']':)
   
     '{"children":[',
        local:jsonifySlurs($file),
    ']}' 
   

)




