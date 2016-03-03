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

declare variable $file := doc('xmldb:exist:///apps/theater-data/persons/H0000xx/H000001.xml');
declare variable $persName := $file//tei:persName[@type = 'reg'];

declare function local:jsonifySlurs($persName) {

let $strings := for $elem in $persName
                    let $surname := $elem/tei:surname
					let $forename := $elem/tei:forename[1]
                    return 
                        concat('{name:"',$surname,'",',
                            'vorname:"',$forename,'",',
                            'details:"',"true",'",',                          
                            'xml:"',"true",'"',
                            '}')
    return 
        string-join($strings,',')

   
    
};
       
    
 (
   
        local:jsonifySlurs($persName)
   

)




