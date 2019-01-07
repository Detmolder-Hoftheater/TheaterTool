xquery version "3.0";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $uri := '/db/apps/theater-data/dbStructure.xml';

declare variable $file := doc($uri);

declare variable $entry := $file//entry;

declare variable $path_works := '/db/apps/theater-data/extendedWorks.xml';

declare variable $file_work := doc($path_works);

declare variable $entry_work := $file_work//work;

declare function local:getNavType($entry) {

let $strings := for $elem in $entry

                   
					let $navType := if($elem//@key = "navigation_type")then($elem//@value)else()

					
                    return 
						if($navType != "")then( concat('"navigation_type":"',$navType, '"'))else()
                       
						
    return 
        string-join($strings,',')   
};

declare function local:jsonifyLanguage($entry) {

let $strings := for $elem in $entry

                   
					let $years := if($elem//@key = "language")then($elem//@value)else()

					
                    return 
						if($years != "")then( concat('"language":"',$years, '"'))else()
                       
						
    return 
        string-join($strings,',')   
};

declare function local:jsonifyStartYear($entry) {

let $strings := for $elem in $entry

                   
					let $years := if($elem//@key = "startyear")then($elem//@value)else()

					
                    return 
						if($years != "")then( concat('"startyear":"',$years, '",'))else()
                       
						
    return 
        string-join($strings,',')   
};

declare function local:jsonifyEndYear($entry) {

let $strings := for $elem in $entry

                   
					let $years := if($elem//@key = "endyear")then($elem//@value)else()

					
                    return 
						if($years != "")then( concat('"endyear":"',$years, '",'))else()
                       
						
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

declare function local:jsonifySlurs($entry) {

let $strings := for $elem in $entry

                   
					let $entrykey := $elem//@key
					let $entryvalue := $elem//@value

                    return 
						concat('{', 
						
						'"dbName":"',$entrykey,'",',
							'"dbValue":"',$entryvalue,'"', 
						
                            '}')
                       
						
    return 
        string-join($strings,',')   
};

declare function local:getExtendedWorks($entry_work) {

let $strings := for $elem in $entry_work

                   
					let $entrykey := $elem//@key
					
					return 
						concat( 
						
						'"',$entrykey,'"'
						
						
                          )
					
                    (:return 
						concat('{', 
						
						'"key":"',$entrykey,'"'
						, 
						
                            '}'):)
                       
						
    return 
        string-join($strings,',')   
};

declare function local:getCustomItems($entry) {

let $strings := for $elem in $entry                 
					(:let $entrykey := $elem//@key:)
					let $entryvalue := $elem//@value
					let $imagePath := $elem//@dbPath

                    return 
						concat('{', 						
						'"dbValue":"',$entryvalue,'",',
						'"dbPath":"',$imagePath,'"', 
                            '}')
                       
						
    return 
        string-join($strings,',')   
};

    
 (

  '{',
   local:getNavType($entry),
',',
  local:jsonifyLanguage($entry),
',',
 local:jsonifyName($entry),
',',
local:jsonifyStartYear($entry),

local:jsonifyEndYear($entry),

'"extendedWorks":',
  '[',
        local:getExtendedWorks($entry_work),
']',
',', 
'"dbPaths":',
  '[',
        local:jsonifySlurs($entry[@key !='custom']),
']',
',',  
'"customItems":',
  '[',
        local:getCustomItems($entry[@key='custom']),
']',

    '}'
   
      
   

)