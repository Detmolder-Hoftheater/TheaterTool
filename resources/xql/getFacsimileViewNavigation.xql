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

declare variable $selection1 := request:get-parameter('workName', '');


(:declare variable $path := 'xmldb:exist:///apps/theater-data/vertaktung/aschenbroedel/edirom_source_0f385ae9-ab62-4188-8795-5c0931cd4586.xml';

declare variable $file := doc($path);
declare variable $fileNames := $file//mei:sourceDesc//mei:title;:)


declare variable $path := 'xmldb:exist:///apps/theater-data/vertaktung/aschenbroedel/';
declare variable $file := collection($path);
declare variable $fileNames := $file//mei:sourceDesc//mei:title;

declare function local:jsonifySlurs($fileNames) {

let $strings := for $elem in $fileNames

		let $navItem := $elem
		
                    return 
						
                        concat('{name:"',$navItem,'",',
							'"leaf":"true",',
							'"icon":"resources/images/Images-17.png"',
 							
							
                            '}')
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
        local:jsonifySlurs($fileNames),
    ']}' 
   

)




