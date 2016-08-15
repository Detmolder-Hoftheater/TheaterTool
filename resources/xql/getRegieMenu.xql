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

declare variable $selection1 := request:get-parameter('selection1', '');
declare variable $selection2 := request:get-parameter('selection2', '');
declare variable $selection3 := request:get-parameter('selection3', '');
declare variable $selection4 := request:get-parameter('selection4', '');
declare variable $selection5 := request:get-parameter('selection5', '');

declare variable $path := 'xmldb:exist:///apps/theater-data/regiebuecher/';
declare variable $file := collection($path);
declare variable $fileNames := $file//tei:TEI/tei:teiHeader;

declare function local:jsonifySlurs($fileNames) {

let $strings := for $elem in $fileNames

		let $name := $elem//tei:titleStmt[1]//tei:title

                    return 
						concat('"', $name, '"')
    return 
        string-join($strings,',')

   
    
};

     
    
 (

 (: '[',
        local:jsonifySlurs($persName),

    ']':)
   
     '{"names":[',
        local:jsonifySlurs($fileNames),
    ']}' 
   

)




