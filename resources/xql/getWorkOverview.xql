xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";


declare variable $workID := request:get-parameter('workID', '');
declare variable $uri := concat('/db/apps/theater-data/works/', $workID, '.xml');
declare variable $file := doc($uri);
declare variable $content := $file//mei:work;


declare function local:jsonifyRoles($id) {

let $strings := for $elem in $id

					let $id_1 :=$elem
					let $role := $elem/@role
					let $dbkey :=$elem/@dbkey
                   
                    return 
                     if($id_1 != '')then(  
				concat('["',$id_1, '",', '"',$role, '",', '"',$dbkey,'"]'))
else()
    return 
        string-join($strings,',')
  
};


declare function local:jsonifyAutoren($content) {

let $strings := for $elem in $content

					let $id :=$elem//mei:persName

					let $names := local:jsonifyRoles($id)
 return 
    if($names != '')then(                     
$names
    )else()
    return 
        string-join($strings,',')
   
    
};


declare function local:jsonifySprachen($content) {

let $strings := for $elem in $content

					let $id :=$elem//mei:langUsage/mei:language
                   
                    return 
                      if($id != '')then(        
concat(
							'"',$id,'"'))else()
    
    return 
        string-join($strings,',') 
};


declare function local:jsonifyWorkTitel($content) {

let $strings := for $elem in $content

	let $titles := $elem//mei:titleStmt[1]/mei:title
	let $content_title := local:jsonifyTitleInformation($titles)
	
                    return 
if($content_title != '')then($content_title)else()

    return 
        string-join($strings,',')
 
};


declare function local:jsonifyTitleInformation($titles) {

let $strings := for $elem in $titles

	let $title := $elem
	let $type := $elem/@type
	let $language := $elem/@xml:lang
	
                    return 
concat('["',$title, '","', $type, '","', $language,'"]')
    return 
        string-join($strings,',')
 
};



 (
    '{"autoren":[',
        local:jsonifyAutoren($content),
	'],"sprachen":[',
        local:jsonifySprachen($content),
	'],"workTitel":[',
        local:jsonifyWorkTitel($content),
    ']}'

)