xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";


declare variable $sourceID := request:get-parameter('sourceID', '');
declare variable $worktailPath := request:get-parameter('workPath', '');
declare variable $worktailPath_1 := concat('/db/apps/', $worktailPath, '/');
declare variable $workPath := collection($worktailPath_1);
declare variable $sourcePath := request:get-parameter('sourcePath', '');
declare variable $uri := concat('/db/apps/', $sourcePath, '/');
declare variable $file := collection($uri);
declare variable $content := for $elem in $file
                    return 
                    if($elem/mei:source[@xml:id = $sourceID])then($elem)else();

(:declare variable $uri := concat('/db/apps/theater-data/sources/', $sourceID, '.xml');
declare variable $file := doc($uri);
declare variable $content := $file//mei:source;:)

declare variable $workID := request:get-parameter('workId', '');
(:declare variable $rel := $content/mei:relationList[not(ancestor::mei:componentGrp)]/mei:relation[@rel = 'isEmbodimentOf']/@target;
declare variable $origId_1 := tokenize($rel, "#")[last()];
declare variable $origId := tokenize($origId_1, "_")[1];:)
declare variable $fileWork :=for $elem in $workPath
                    return 
                    if($elem/mei:work[@xml:id = $workID])then($elem)else();
                    

declare function local:jsonifyTitel($content) {

let $strings := for $elem in $content

					let $id :=$elem//mei:titleStmt[not(ancestor::mei:componentGrp)][1]/mei:title[1]
                   
                    return 
                       
if(count($id) gt 0) then(concat('"',string-join(normalize-space($id),'","'),'"')) else()
    
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

					let $id :=$elem//mei:titleStmt[not(ancestor::mei:componentGrp)][1]//mei:persName

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
							'"',normalize-space($repository),'"')


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
							'"',normalize-space($id), '/',
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

declare function local:jsonifyContenSource($elem) {

let $strings := for $elem_1 in $elem

			let $s_title_array :=$elem_1/mei:titleStmt[1]/mei:title[not(@type)]

			let $s_title := local:jsonifyTitleArray($s_title_array)

			let $subtitle :=$elem_1/mei:titleStmt[1]/mei:title[@type ='sub']

			let $pages :=$elem_1/mei:physDesc[1]/mei:extent[1]

			let $dimension :=$elem_1/mei:physDesc[1]/mei:dimensions[1]

			let $signatur :=$elem_1/mei:physLoc[1]/mei:identifier

			let $persNames := $elem_1/mei:physDesc[1]/mei:inscription/mei:persName

			let $inscription := local:jsonifyInscription($persNames)

			let $desc := $elem_1/mei:physDesc[1]/mei:titlePage

			let $titlePages := local:jsonifyTitlePages($desc)

			let $beschreibung := $elem_1/mei:physDesc[1]/mei:physMedium

			let $items := $elem_1/mei:contents[1]/mei:contentItem

			let $inhalt := local:jsonifyInhalt($items)

			let $annots := $elem_1/mei:notesStmt[1]/mei:annot

			let $s_bemerkungen := local:jsonifyAnnots($annots)
					
                   
				return 
concat(
'"s_title":[',if($s_title != '')then($s_title)else(), '],',
'"subtitle":','"',$subtitle, '",',
'"seitenzahl":','"',$pages, '",',
'"groesse":','"',$dimension, '",',
'"signatur":','"',normalize-space($signatur), '",',
'"beschreibung":','"',$beschreibung, '",',
'"inscription":[',if($inscription != '')then($inscription)else(), '],',
'"titlePages":[',if($titlePages != '')then($titlePages)else(), '],',
'"inhalt":[',if($inhalt != '')then($inhalt)else(), '],',
'"s_bemerkungen":[',if($s_bemerkungen != '')then($s_bemerkungen)else(), ']')

    return 
        string-join($strings,',')

};

declare function local:jsonifySources($content) {

let $strings := for $elem in $content/mei:componentGrp/mei:source

	let $content_source := local:jsonifyContenSource($elem)
	
                    return 
concat('[{',$content_source,'}]')
    return 
        string-join($strings,',')
 
};

declare function local:jsonifyWorkTitel($fileWork) {

let $strings := for $elem in $fileWork

	let $titles := $elem//mei:titleStmt[1]/mei:title
	let $content_title := local:jsonifyTitleInformation($titles)
	
                    return 
if($content_title != '')then($content_title)else()

    return 
        string-join($strings,',')

(:let $rel := $content//mei:relationList[not(ancestor::mei:componentGrp)]/mei:relation[@rel = 'isEmbodimentOf']/@target
let $origId_1 := tokenize($rel, "#")[last()]
let $origId := tokenize($origId_1, "_")[1]
let $fileWork :=for $elem in $workPath
                    return 
                    if($elem//mei:work[@xml:id = $origId])then($elem)else():)
(:let $titles := $fileWork/mei:titleStmt[1]/mei:title
	let $content_title := local:jsonifyTitleInformation($titles)
                    
           return 
               $titles:)
(:if($content_title != '')then($fileWork)else() :)      
                    

(:let $strings := for $elem in $content//mei:relationList/mei:relation



	let $targetWork := $elem[@rel = 'isEmbodimentOf']/@target
	let $origId_1 := tokenize($targetWork, "#")[last()]
    let $origId := tokenize($origId_1, "_")[1]
   (\: substring-before($origId_1, '_'):\)
	
	(\:let $origId_1 := substring-after($targetWork, '#')
	let $origId := if(contains($origId_1, '_') and $origId_1 != '')then(substring-before($origId_1, '_'))else($origId_1):\)
	
	(\:let $file_11 := collection($workPath):\)
	(\:let $file_1 := $file_11/mei:work:\)
    let $fileWork :=for $elem_1 in $workPath
                    return $elem_1
                    (\:if($elem_1//mei:work[@xml:id = $origId])then($elem_1)else():\)
	
	(\:let $uriWork := concat($workPath, $origId, '.xml')
	let $fileWork := doc($uriWork):\)
	let $titles := $fileWork/mei:titleStmt[1]/mei:title
	let $content_title := local:jsonifyTitleInformation($titles)
	
                    return 
                 $fileWork
(\:if($content_title != '')then($fileWork)else():\)

    return 
        string-join($strings,','):)
 
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

declare function local:jsonifyHOverview($content) {

let $strings := for $elem in $content

					let $id_1 :=$elem//mei:history[not(ancestor::mei:componentGrp)]/mei:p
					
					let $id :=normalize-space($id_1)
					                  
                    return 
                      if($id != '')then(        
concat(
							'["',replace($id, '"', '\\"' ),'"]'))else()
    
    return 
        string-join($strings,',') 
};

declare function local:jsonifyCreation($content) {

let $strings := for $elem in $content

					let $date :=$elem//mei:history[not(ancestor::mei:componentGrp)]/mei:creation/mei:date
					
					let $place :=$elem//mei:history[not(ancestor::mei:componentGrp)]/mei:creation/mei:geogName
					
					let $data := if($date != '')
					       then(if($place != '')
					           then(concat($date, ', ', $place))else($date))
					       else(if($place != '')then($place)else())
					                  
                    return 
                 if($data != '')then(                  
concat(
							'["', $data,'"]'))else()
    
    return 
        string-join($strings,',') 
};

declare function local:jsonifyEventDetails($events) {

let $strings := for $elem in $events

					let $over :=$elem/mei:p
					let $date := $elem/mei:date
					let $geogNamesOrt :=''
					let $geogNamesStadt := $elem/mei:geogName
					
                    return 
                      
				concat('["',$over, '",', '"',$date, '",', '"',$geogNamesOrt,'",','"',$geogNamesStadt,'"]')
    return 
        string-join($strings,',')
  
};


declare function local:jsonifyEvents($content) {

let $strings := for $elem in $content

					let $events :=$elem//mei:eventList[not(ancestor::mei:componentGrp)]//mei:event

					let $names := local:jsonifyEventDetails($events)
 return 
    if($names != '')then(                     
$names
    )else()
    return 
        string-join($strings,',')
   
    
};



 (
    '{"titel":[',
        local:jsonifyTitel($content),
    '],"autoren":[',
        local:jsonifyAutoren($content),
	'],"rism":[',
        local:jsonifyRISM($content),
	(:'],"abschriften":[',
        local:jsonifyAbschriften($content),:)
	'],"abschriften":[',
        local:jsonifyProvenienzen($content),
     '],"hoverview":[',
        local:jsonifyHOverview($content),
    '],"creation":[',
        local:jsonifyCreation($content),
    '],"events":[',
        local:jsonifyEvents($content),
	(:'],"sprachen":[',
        local:jsonifySprachen($content),:)
	'],"bibliotheken":[',
        local:jsonifyBib($content),
	(:'],"bemerkungen":[',
        local:jsonifyBemerkungen($content),:)
	'],"sources":[',
        local:jsonifySources($content),
	'],"workTitel":[',
        local:jsonifyWorkTitel($fileWork),
    ']}'

)