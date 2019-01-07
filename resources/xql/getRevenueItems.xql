xquery version "3.0";

(:import module namespace freidi-pmd="http://www.freischuetz-digital.de/TheaterTool-new" at "../../modules/app.xql";:)

declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";
declare namespace eutil="http://exist-db.org/xquery/util";
(: 
declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";:)
declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";


declare variable $db_path := request:get-parameter('path', '');
declare variable $path := concat('xmldb:exist:///apps/', $db_path, '/');
declare variable $file := collection($path);


declare function local:jsonifySlurs($file) {

let $strings := for $elem in $file
                    return
                        
                        concat('"', eutil:collection-name($elem), '"')
                        
						


    return 
        string-join($strings,',')

   
    
};

     
    
 (

 (: '[',
        local:jsonifySlurs($persName),

    ']':)
   
     '{"names":[',
    
        local:jsonifySlurs($file),
    ']}' 
   

)




