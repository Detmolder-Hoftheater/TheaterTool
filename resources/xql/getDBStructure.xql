xquery version "3.0";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $uri := '/db/apps/theater-data/dbStructure.xml';

declare variable $file := doc($uri);

declare variable $entry := $file//entry;



declare function local:jsonifySlurs($entry) {

let $strings := for $elem in $entry

                   
					let $entrykey := $elem//@key
					let $entryvalue := $elem//@value

                    return 
						concat('{', $entrykey, ':',$entryvalue,
                            '}')
                       
						
    return 
        string-join($strings,',')   
};

    
 (

  '[',
        local:jsonifySlurs($entry),

    ']'
   
      
   

)