xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";


declare variable $sourceID := request:get-parameter('sourceID', '');
declare variable $uri := concat('/db/apps/theater-data/sources/', $sourceID, '.xml');
declare variable $file := doc($uri);
declare variable $content := $file//mei:source;


declare function local:jsonifyTitel($content) {

let $strings := for $elem in $content

					let $id :=$elem/mei:titleStmt[not(ancestor::mei:componentGrp)][1]/mei:title
                   
                    return 
                       
if(count($id) gt 0) then(concat('"',string-join($id,'","'),'"')) else()
    
    return 
        string-join($strings,',')

   
    
};

declare function local:jsonifyRoles($id) {

let $strings := for $elem in $id

					let $id_1 :=$elem
					let $role := $elem/@role
                   
                    return 
                     if($id_1 != '')then(  
				concat('["',$id_1,'",',
							'"',$role,'"]'))
else()
    return 
        string-join($strings,',')



   
    
};


declare function local:jsonifyAutoren($content) {

let $strings := for $elem in $content

					let $id :=$elem/mei:titleStmt[not(ancestor::mei:componentGrp)][1]//mei:persName

					let $names := local:jsonifyRoles($id)
 return 
    if($names != '')then(                     
$names
    )else()
    return 
        string-join($strings,',')
   
    
};

declare function local:jsonifyAbschriften($content) {

let $strings := for $elem in $content

					let $id :=$elem/mei:pubStmt[1]/mei:date
                   
                    return 
                       
if(count($id) gt 0) then(concat('"',string-join($id,'","'),'"')) else()
    
    return 
        string-join($strings,',') 
};


declare function local:jsonifyRepositories($id) {

let $strings := for $elem in $id

					
					let $repository := $elem/mei:repository
                   
				return 
					concat(
							'"',$repository,'"')


    return 
        string-join($strings,',')

};

declare function local:jsonifyProvenienzen($content) {

let $strings := for $elem in $content

					let $id :=$elem//mei:provenance

					let $names := local:jsonifyRepositories($id)
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

declare function local:jsonifyBib($content) {

let $strings := for $elem in $content

					let $id :=$elem//mei:physLoc[not(ancestor::mei:componentGrp)]/mei:repository/mei:name
					let $sign :=$elem//mei:physLoc[not(ancestor::mei:componentGrp)]/mei:identifier
                   
                    return 
                      if($id != '')then(        
concat(
							'"',$id, '/',
$sign,
'"'))else()
    
    return 
        string-join($strings,',') 
};

declare function local:jsonifyBemerkungen($content) {

let $strings := for $elem in $content

					let $id :=$elem//mei:notesStmt[not(ancestor::mei:componentGrp)]/mei:annot

					let $sign :=local:jsonifyAnnot($id)
                   
                    return 
                      if($sign != '')then(        
							$sign)else()
    
    return 
        string-join($strings,',') 
};

declare function local:jsonifyAnnot($id) {

let $strings := for $elem in $id

					
					let $repository := normalize-space($elem)
                   
				return 
					concat(
							'"',replace($repository, '"', '\\"' ),'"')


    return 
        string-join($strings,',')

};


 (
    '{"titel":[',
        local:jsonifyTitel($content),
    '],"autoren":[',
        local:jsonifyAutoren($content),
	'],"abschriften":[',
        local:jsonifyAbschriften($content),
	'],"abschriften":[',
        local:jsonifyProvenienzen($content),
	'],"sprachen":[',
        local:jsonifySprachen($content),
	'],"bibliotheken":[',
        local:jsonifyBib($content),
	'],"bemerkungen":[',
        local:jsonifyBemerkungen($content),
    ']}'

)