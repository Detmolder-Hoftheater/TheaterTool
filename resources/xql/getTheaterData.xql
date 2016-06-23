xquery version "3.0";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $uri := '/db/apps/theater-data/extendedWorks.xml';

declare variable $file := doc($uri);

declare variable $entry := $file//entry;



declare function local:jsonifyDBkeys($entry) {

let $strings := for $elem in $entry

                   
					let $dbkey := if($elem//@key = "work")then($elem//@value)else()

					let $dbkey := if($elem//@key = "work")then($elem//@value)else()

                    return 
						if($dbkey != "")then( concat('{"dbkey":"',$dbkey, '"}'))else()
                       
						
    return 
        string-join($strings,',')   
};


declare function local:jsonifyYears($entry) {

let $strings := for $elem in $entry

                   
					let $years := if($elem//@key = "years")then($elem//@value)else()

					
                    return 
						if($years != "")then( concat('"years":"',$years, '"'))else()
                       
						
    return 
        string-join($strings,',')   
};

declare function local:jsonifyName($entry) {

let $strings := for $elem in $entry

                   
					let $name := if($elem//@key = "name")then($elem//@value)else()

					
                    return 
						if($name != "")then( concat('"name":"',$name, '"'))else()
                  						
    return 
        string-join($strings,',')   
};

    
 (
'{',
local:jsonifyName($entry),
',',
local:jsonifyYears($entry),
',',
'"dbkeys":',
  '[',
        local:jsonifyDBkeys($entry),
']',
    '}'
   
      
   

)