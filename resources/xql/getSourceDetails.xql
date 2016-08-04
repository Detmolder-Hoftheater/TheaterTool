xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";


declare variable $sourceID := request:get-parameter('sourceID', '');
declare variable $workPath := request:get-parameter('workPath', '/db/apps/theater-data/works/');
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

declare function local:jsonifyRISM($content) {

let $strings := for $elem in $content

					let $id :=$elem/mei:identifier[not(ancestor::mei:componentGrp)][1]
                   
                    return 
                       
if(contains($id, '_'))then(substring-after($id, '_'))else($id)
    
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


(:declare function local:jsonifyContenSource($content, $source_id) {

let $strings := for $elem in $content

					

			let $s_title :=$elem/mei:componentGrp/mei:source[@xml:id=$source_id]/mei:titleStmt[1]/mei:title[not(@type)]

			(\:let $subtitle :=$elem/mei:titleStmt[ancestor::mei:componentGrp][1]/mei:title[@type ='sub']
					let $repository := normalize-space($elem):\)
                   
				return 
					concat(
							'"s_title":"',$s_title,'"')


    return 
        string-join($strings,',')

};
:)

declare function local:jsonifyInscription($persNames) {

let $strings := for $elem_1 in $persNames

			let $persName :=$elem_1

			let $dbkey :=$elem_1/@dbkey

				return 
if($persName != '')then(concat('"',$persName, '",','"',$dbkey, '"'))else()


    return 
        string-join($strings,',')

};

declare function local:jsonifyTitlePages($desc) {

let $strings := for $elem_1 in $desc

			let $page := normalize-space($elem_1)

				return 
if($page != '')then(concat('"',replace($page, '"', '\\"' ), '"'))else()


    return 
        string-join($strings,',')

};

declare function local:jsonifyInhalt($items) {

let $strings := for $elem_1 in $items

			let $item := normalize-space($elem_1)

				return 
if($item != '')then(concat('"',replace($item, '"', '\\"' ), '"'))else()


    return 
        string-join($strings,',')

};

declare function local:jsonifyAnnots($annots) {

let $strings := for $elem_1 in $annots

			let $item := normalize-space($elem_1)

				return 
if($item != '')then(concat('"',replace($item, '"', '\\"' ), '"'))else()


    return 
        string-join($strings,',')

};

declare function local:jsonifyTitleArray($s_title_array) {

let $strings := for $elem_1 in $s_title_array

			let $item := $elem_1

				return 
if($item != '')then(concat('"',$item, '"'))else()


    return 
        string-join($strings,',')

};

declare function local:jsonifySourceHier($s_list) {

let $strings := for $elem_1 in $s_list

			
			let $s_title :=$elem_1/mei:titleStmt[1]/mei:title[1]

			let $signatur :=$elem_1/mei:physLoc[1]/mei:identifier

			let $desc := $elem_1/mei:physDesc[1]/mei:titlePage			
			let $titlePages := local:jsonifyTitlePages($desc)

			let $medium := $elem_1/mei:physDesc[1]/mei:physMedium

			let $persNames := $elem_1/mei:physDesc[1]/mei:inscription/mei:persName
			let $inscription := local:jsonifyInscription($persNames)

			let $pages :=$elem_1/mei:physDesc[1]/mei:extent[1]

			let $dimension :=$elem_1/mei:physDesc[1]/mei:dimensions[1]

			let $items := $elem_1/mei:contents[1]/mei:contentItem

			let $inhalt := local:jsonifyInhalt($items)

			let $annots := $elem_1/mei:notesStmt[1]/mei:annot

			let $s_bemerkungen := local:jsonifyAnnots($annots)
					
                   
				return 


(:'"s_title":[',if($s_title != '')then($s_title)else(), '],',:)

concat('[{',

'"s_title":','"',$s_title, '",',
'"signatur":','"',normalize-space($signatur), '",',
'"titlePages":[',if($titlePages != '')then($titlePages)else(), '],',
'"medium":','"',$medium, '",',
'"inscription":[',if($inscription != '')then($inscription)else(), '],',

'"inhalt":[',if($inhalt != '')then($inhalt)else(), '],',
'"seitenzahl":','"',$pages, '",',
'"groesse":','"',$dimension, '",',
'"s_bemerkungen":[',if($s_bemerkungen != '')then($s_bemerkungen)else(),']',
'}]'
(:'"seitenzahl":','"',$pages, '",',
'"groesse":','"',$dimension, '",',
'"signatur":','"',normalize-space($signatur), '",',
'"beschreibung":','"',$beschreibung, '",',
'"inscription":[',if($inscription != '')then($inscription)else(), '],',
'"titlePages":[',if($titlePages != '')then($titlePages)else(), '],',
'"inhalt":[',if($inhalt != '')then($inhalt)else(), '],',
'"s_bemerkungen":[',if($s_bemerkungen != '')then($s_bemerkungen)else(), 
']':)
)

    return 
        string-join($strings,',')

};

declare function local:jsonifyContenSource($source_el) {

let $strings := for $elem_1 in $source_el

			let $s_title :=$elem_1/mei:titleStmt[1]/mei:title[1]

			let $signatur :=$elem_1/mei:physLoc[1]/mei:identifier

			let $desc := $elem_1/mei:physDesc[1]/mei:titlePage			
			let $titlePages := local:jsonifyTitlePages($desc)

			let $medium := $elem_1/mei:physDesc[1]/mei:physMedium

			let $persNames := $elem_1/mei:physDesc[1]/mei:inscription/mei:persName
			let $inscription := local:jsonifyInscription($persNames)

			let $pages :=$elem_1/mei:physDesc[1]/mei:extent[1]

			let $dimension :=$elem_1/mei:physDesc[1]/mei:dimensions[1]

			let $items := $elem_1/mei:contents[1]/mei:contentItem

			let $inhalt := local:jsonifyInhalt($items)

			let $annots := $elem_1/mei:notesStmt[1]/mei:annot

			let $s_bemerkungen := local:jsonifyAnnots($annots)

			let $s_list := $elem_1/mei:componentGrp/mei:source
			let $source_hier := local:jsonifySourceHier($s_list)
					
                   
				return 

concat(
(:'"s_title":[',if($s_title != '')then($s_title)else(), '],',:)
'"s_title":','"',$s_title, '",',
'"signatur":','"',normalize-space($signatur), '",',
'"titlePages":[',if($titlePages != '')then($titlePages)else(), '],',
'"medium":','"',$medium, '",',
'"source_hier":[',if($source_hier != '')then(concat('{"sources_1":[',$source_hier,']}'))else(), '],',
'"inscription":[',if($inscription != '')then($inscription)else(), '],',

'"inhalt":[',if($inhalt != '')then($inhalt)else(), '],',
'"s_bemerkungen":[',if($s_bemerkungen != '')then($s_bemerkungen)else(), 
']'
)

    return 
        string-join($strings,',')

};

declare function local:jsonifySources($content) {

let $strings := for $elem in $content/mei:relationList/mei:relation

	let $rel := $elem[@rel = 'hasPart']/@target
	let $source_id := substring-after($rel, '#')

	let $source_el := $content/mei:componentGrp/mei:source[@xml:id = $source_id]
	let $content_source := local:jsonifyContenSource($source_el)

	
                    return 
if($content_source != '')then(concat('[{',$content_source,'}]'))else()


    return 
        string-join($strings,',')
 
};

declare function local:jsonifyWorkTitel($content) {

let $strings := for $elem in $content/mei:relationList/mei:relation

	let $targetWork := $elem[@rel = 'isEmbodimentOf']/@target
	let $origId_1 := substring-after($targetWork, '#')
	let $origId := if(contains($origId_1, '_'))then(substring-before($origId_1, '_'))else($origId_1)
	let $uriWork := concat($workPath, $origId, '.xml')
	let $fileWork := doc($uriWork)
	let $titles := $fileWork//mei:titleStmt[1]/mei:title
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
'{"sources":[',
        local:jsonifySources($content),

   ']}'
    

)