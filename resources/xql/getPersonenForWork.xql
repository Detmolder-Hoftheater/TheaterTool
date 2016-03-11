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


(:declare variable $path := 'xmldb:exist:///db/contents/persons/H0000xx/H000001.xml';:)

declare variable $fileName := request:get-parameter('fileName', '');
declare variable $type := request:get-parameter('type', '');
declare variable $path := if($type = 'work')then(concat('xmldb:exist:///apps/theater-data/works/', $fileName, '.xml'))else(concat('xmldb:exist:///apps/theater-data/sources/', $fileName, '.xml'));



(:declare variable $path := 'xmldb:exist:///apps/theater-data/works/';:)

declare variable $file := doc($path);
(:collection($path);:)
(:doc('xmldb:exist:///apps/theater-data/works/H0201xx/H020149.xml');:)

declare variable $persName := $file//mei:persName;
(:$file//mei:persName;:)


declare function local:jsonifySlurs($persName) {

let $strings := for $elem in $persName
                    let $surname := $elem

					let $xml := if($elem[not(@dbkey)])then('false')else('true')

					let $details := if($elem[not(@dbkey)])then('false')else('true')
					
                    return 
                        concat('{name:"',$surname,'",',
							'details:"',$details,'",',                          
                            'xml:"',$xml,'"',
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

  '[',
        local:jsonifySlurs($persName),
(:local:jsonifySlurs($path),:)
    ']'
   
      
   

)




