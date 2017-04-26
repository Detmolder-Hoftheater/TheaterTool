xquery version "3.0";

(:import module namespace expath="http://expath.org/ns/pkg";:)

declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $workID := request:get-parameter('sourceID', '');
declare variable $path := concat('/db/apps/theater-data/expressions/', $workID, '_expr1.xml');
(:declare variable $path := 'xmldb:exist:///apps/theater-data/expressions/H020263_expr1.xml';:)
declare variable $doc :=  doc($path)//mei:expression[child::mei:incip];

   declare function local:getNames($doc) {

let $strings := for $elem in $doc

		let $name := $elem/@label

                    return 
						concat('"', $name, '"')
    return 
        string-join($strings,',')

   
    
};
   
   (

 
     '{"names":[',
        (:local:getNames($doc),:)
        '"BildRot.png",',
        '"BildOrange.png",',
        '"BildGelb.png",',
        '"BildGruen.png",',
        '"BildHimmel.png",',
        '"BildBlau.png",',
        '"BildViolett.png"',
    ']}' 
   

)
