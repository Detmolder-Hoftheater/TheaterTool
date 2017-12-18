xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";


declare variable $workID := request:get-parameter('dbkey', '');
declare variable $uri := concat('/db/apps/theater-data/persons/', $workID, '.xml');
declare variable $file := doc($uri);
declare variable $content := $file//tei:person;


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


declare function local:jsonifyGender($content) {

let $strings := for $elem in $content

					let $id :=$elem//tei:sex
                   
                    return 
                      if($id != '')then(        
concat(
							'"',$id,'"'))else()
    
    return 
        string-join($strings,',') 
};

declare function local:jsonifySummary($content) {

let $strings := for $elem in $content

					let $id :=$elem//tei:note//tei:list//tei:item
					
					let $names := local:jsonifyNotes($id)
 return 
    if($names != '')then(                     
$names
    )else()
    return 
        string-join($strings,',')
   
    
};


declare function local:jsonifyNotes($id) {

let $strings := for $elem in $id

					let $id_1 :=normalize-space($elem)
					
                    return 
                     if($id_1 != '')then(  
				concat('"',replace($id_1, '"', '\\"' ), '"'))
else()
    return 
        string-join($strings,',')
  
};

declare function local:jsonifySummaryText($content) {

let $strings := for $elem in $content

					let $id_1 :=normalize-space($elem//tei:note)
					
                    return 
                     if($id_1 != '')then(  
				concat('"',replace($id_1, '"', '\\"' ), '"'))
else()
    return 
        string-join($strings,',')
  
};


declare function local:jsonifyRegs($content) {

let $strings := for $elem in $content

    let $titles := for $title in $elem//tei:persName
    return if($title/@type = 'reg')then($title)else()

	(:let $titles := $elem//tei:persName[@type = 'reg']:)
	let $content_title := local:jsonifyRegNames($titles)
	
                    return 
if($content_title != '')then($content_title)else()

    return 
        string-join($strings,',')
 
};

declare function local:jsonifyFulls($content) {

let $strings := for $elem in $content

    let $titles := for $title in $elem//tei:persName
    return if($title/@type = 'full')then($title)else()

	(:let $titles := $elem//tei:persName[@type = 'full']:)
	let $content_title := local:jsonifyRegNames($titles)
	
                    return 
if($content_title != '')then($content_title)else()

    return 
        string-join($strings,',')
 
};

declare function local:jsonifyAlts($content) {

let $strings := for $elem in $content

    let $titles := for $title in $elem//tei:persName
    return if($title/@type = 'alt')then($title)else()

	(:let $titles := $elem//tei:persName[@type = 'alt']:)
	let $content_title := local:jsonifyAltNames($titles)
	
                    return 
if($content_title != '')then($content_title)else()

    return 
        string-join($strings,',')
 
};

declare function local:jsonifyPseuds($content) {

let $strings := for $elem in $content

    let $titles := for $title in $elem//tei:persName
    return if($title/@type = 'pseud')then($title)else()

	(:let $titles := $elem//tei:persName[@type = 'pseud']:)
	let $content_title := local:jsonifyPseudNames($titles)
	
                    return 
if($content_title != '')then($content_title)else()

    return 
        string-join($strings,',')
 
};


declare function local:jsonifyPseudNames($titles) {

let $strings := for $elem in $titles
    
    let $name := $elem
    
	(:let $title := $elem/tei:surname
	let $foreNameList := $elem/tei:forename
	let $foreNames := local:jsonifyForename($foreNameList)	               
	let $language := $elem/tei:nameLink:)
	
                    return 
                  (: concat('["',$name, '","',   $title,  '","',   $foreNames, '","', $language,'"]'):)
                  concat('["',normalize-space($name),'"]')

    return 
        string-join($strings,',')
 
};


declare function local:jsonifyAltNames($titles) {

let $strings := for $elem in $titles

	let $title := $elem
	
                    return 
concat('["',normalize-space($title),'"]')
    return 
        string-join($strings,',')
 
};


declare function local:jsonifyRegNames($titles) {

let $strings := for $elem in $titles

	let $title := $elem/tei:surname
	let $foreNameList := $elem/tei:forename
	let $foreNames := local:jsonifyForename($foreNameList)	               
	let $language := $elem/tei:nameLink
	
                    return 
concat('["',$title, '","', $foreNames, '","', $language,'"]')
    return 
        string-join($strings,',')
 
};


declare function local:jsonifyForename($foreNameList) {

let $strings := for $elem in $foreNameList

	let $forename := $elem
	
                    return 
                       $forename

    return 
        string-join($strings,', ')
 
};



declare function local:jsonifyBirth($content) {

let $strings := for $elem in $content

					let $date :=$elem//tei:birth/tei:date/@when
					
					let $place :=$elem//tei:birth/tei:placeName/tei:settlement
					
					let $data := if($date != '')
					       then(if($place != '')
					           then(concat($date, ', ', $place))else($date))
					       else(if($place != '')then($place)else())
					                  
                    return 
                            
concat(
							'["', $data,'"]')
    
    return 
        string-join($strings,',') 
};

declare function local:jsonifyDeath($content) {

let $strings := for $elem in $content

					let $date :=$elem//tei:death/tei:date/@when
					
					let $place :=$elem//tei:death/tei:placeName/tei:settlement
					
					let $data := if($date != '')
					       then(if($place != '')
					           then(concat($date, ', ', $place))else($date))
					       else(if($place != '')then($place)else())
					                  
                    return 
                            
concat(
							'["', $data,'"]')
    
    return 
        string-join($strings,',') 
};


declare function local:jsonifyResidenceDetails($events) {

let $strings := for $elem in $events

					let $over :=$elem/tei:settlement
					let $date_from := $elem/@from
					let $date_to := $elem/@to
					let $date_when := $elem/@when
					(:let $geogNamesOrt :=$elem/mei:geogName[@type='venue']
					let $geogNamesStadt := $elem/mei:geogName[@type='place']:)
                   
                    return 
                      
				concat('["',$over, '",', '"',$date_from, '",', '"',$date_to,'",','"',$date_when,'"]')
    return 
        string-join($strings,',')
  
};


declare function local:jsonifyResidence($content) {

let $strings := for $elem in $content

					let $events :=$elem//tei:residence

					let $names := local:jsonifyResidenceDetails($events)
 return 
    if($names != '')then(                     
$names
    )else()
    return 
        string-join($strings,',')
   
    
};

declare function local:jsonifyOccupation($content) {

let $strings := for $elem in $content

					let $events :=$elem//tei:occupation

					let $names := local:jsonifyOccupationDetails($events)
 return 
    if($names != '')then(                     
$names
    )else()
    return 
        string-join($strings,',')
   
    
};

declare function local:jsonifyOccupationDetails($events) {

let $strings := for $elem in $events

					let $occ :=$elem
					let $type := $elem/@type
					let $date_from := $elem/@from
					let $date_to := $elem/@to
					let $date_when := $elem/@when
					(:let $geogNamesOrt :=$elem/mei:geogName[@type='venue']
					let $geogNamesStadt := $elem/mei:geogName[@type='place']:)
                   
                    return 
                      
				concat('["',$occ, '",', '"',$type, '",',   '"',$date_from, '",', '"',$date_to,'",','"',$date_when,'"]')
    return 
        string-join($strings,',')
  
};


declare function local:jsonifyRoleReferences($workID) {

let $rolepath := 'xmldb:exist:///apps/theater-data/rollen_kostuem/'
let $rolefiles := collection($rolepath)
let $rolefile := $rolefiles//tei:TEI
(:if($rolefiles//tei:TEI//tei:rs[@key=$workID])then($rolefiles//tei:TEI)else():)
(:let $rolefileTest := if($rolefile[@key=$workID != ''])then($rolefile)else():)
(:let $refData := local:jsonifyRefDataRoles($rolefile):)

let $strings := for $elem in $rolefile
		let $names := if($elem//tei:TEI//tei:persName[@key=$workID])then($elem//tei:titleStmt/tei:title)else()
 return 
    if($names != '')then(                     
concat('"',$names, '"')
    )else()
    return 
        string-join($strings,',')
   
    
};

declare function local:jsonifyRegieReferences($workID) {

(:let $roleTailPath := request:get-parameter('regie', '')
let $rolepath := if($roleTailPath != '')then(concat('/db/apps/', $roleTailPath, '/'))else():)
let $rolepath := 'xmldb:exist:///apps/theater-data/regiebuecher/'
let $rolefiles := collection($rolepath)
let $rolefile := $rolefiles//tei:TEI
(:let $rolepath := 'xmldb:exist:///apps/theater-data/regiebuecher/':)

let $strings := for $elem in $rolefile
		let $names := if($elem//tei:TEI//tei:persName[@key=$workID])then($elem//tei:titleStmt/tei:title)else()
 return 
    if($names != '')then(                     
concat('"',$names, '"')
    )else()
    return 
        string-join($strings,',')
   
    
};


declare function local:jsonifySourcesReferences($workID) {

let $rolepath := 'xmldb:exist:///apps/theater-data/sources/'
let $rolefiles := collection($rolepath)
let $rolefile := $rolefiles//mei:source/@xml:id

let $strings := for $elem in $rolefile
         let $path1 := concat($rolepath, $elem, '.xml')
		let $file1 := doc($path1)
		let $names :=  $file1//mei:persName
		let $listNames := local:jsonifyPersNamesForSources($names, $file1)
		(:let $names := if($elem//mei:source//mei:persname[@dbkey=$workID])then($elem//mei:titlestmt/mei:title[1])else():)
 return 
    if($listNames != '')then(                     
$listNames
    )else()
    return 
        string-join($strings,',')
   
    
};


declare function local:jsonifyWorksReferences($workID) {

let $rolepath := 'xmldb:exist:///apps/theater-data/works/'
let $rolefiles := collection($rolepath)
let $rolefile := $rolefiles//mei:work/@xml:id

let $strings := for $elem in $rolefile

        let $path1 := concat($rolepath, $elem, '.xml')
		let $file1 := doc($path1)
		let $names :=  $file1//mei:titleStmt//mei:persName
		let $listNames := local:jsonifyPersNames($names, $file1)
       (: let $names := $elem/mei:work//mei:titlestmt[1]/mei:title[1]:)
		(:let $names := if($elem/mei:work//mei:persname[@dbkey=$workID])then($elem//mei:titlestmt[1]/mei:title[1])else():)
 return 
    if($listNames != '')then(                     
$listNames
    )else()
    return 
        string-join($strings,',')
};


declare function local:jsonifyPersNames($names, $file1) {

let $strings := for $elem in $names

					let $name :=if($elem[@dbkey=$workID])then($file1//mei:titleStmt//mei:title[1])else()
					let $dbId :=if($elem[@dbkey=$workID])then($file1//mei:work/@xml:id)else()

 return 
    if($name != '')then(                     
concat('["',$name, '",', '"',$dbId, '"]')
    )else()
    return 
        string-join($strings,',')
   
    
};

declare function local:jsonifyPersNamesForSources($names, $file1) {

let $strings := for $elem in $names

					let $name :=if($elem[@dbkey=$workID])then($file1//mei:titleStmt[not(ancestor::mei:componentGrp)][1]/mei:title[1])else()
					let $dbId :=if($elem[@dbkey=$workID])then($file1/mei:source[not(ancestor::mei:componentGrp)]/@xml:id)else()
					(:let $workIdREf:) 
					let $worTargetId:=if($elem[@dbkey=$workID])then($file1/mei:source[not(ancestor::mei:componentGrp)]/mei:relationList/mei:relation[@rel='isEmbodimentOf']/@target)else()
                    let $workIdExpr := tokenize($worTargetId, "#")[last()]
                    let $workRefId := substring-before($workIdExpr, '_')
                    
                    let $rismLabel := if($elem[@dbkey=$workID])then($file1/mei:source//mei:identifier[@label ="RISM-label"][1])else()
		            let $physLoc := if($elem[@dbkey=$workID])then($file1/mei:source//mei:identifier[@type ="shelfLocation"][1])else()
		            let $sourceName := concat('Quelle: ', $rismLabel, ' , ' ,$physLoc)
                   
 return 
    if($name != '')then(   
    
concat('["',normalize-space($name), '",', '"',$dbId, '",', '"',$workRefId,'",', '"',$sourceName,'",', '"',$physLoc, '"]')
    )else()
    return 
        string-join($strings,',')
   
    
};


declare function local:jsonifyJournalReferences($workID) {

let $rolepath := 'xmldb:exist:///apps/theater-data/theaterjournal/'
let $rolefiles := collection($rolepath)
let $rolefile := $rolefiles//tei:TEI

let $strings := for $elem in $rolefile
		let $names := if($elem//tei:TEI//tei:persName[@key=$workID])then($elem//tei:titleStmt/tei:title/tei:date)else()
 return 
    if($names != '')then(                     
concat('"',$names, '"')
    )else()
    return 
        string-join($strings,',')
   
    
};

declare function local:jsonifyGagenRefReferences($workID) {

let $rolepath := 'xmldb:exist:///apps/theater-data/gagenbuecher/'
let $rolefiles := collection($rolepath)
let $rolefile := $rolefiles//tei:TEI

let $strings := for $elem in $rolefile
		let $names := if($elem//tei:TEI//tei:persName[@key=$workID])then($elem//tei:titleStmt/tei:title)else()
 return 
    if($names != '')then(                     
concat('"',$names, '"')
    )else()
    return 
        string-join($strings,',')
   
    
};

declare function local:getDateString($dates) {

let $strings := for $elem in $dates

					let $onedate :=$elem/@when
                   
                    return 
                      if($onedate != '')then(        

							$onedate)else()
    
    return 
        string-join($strings,',') 
};

declare function local:jsonifyIssueReferences($workID) {

let $rolepath := 'xmldb:exist:///apps/theater-data/ausgaben/'
let $rolefiles := collection($rolepath)
let $rolefile := $rolefiles//tei:TEI

let $strings := for $elem in $rolefile
        return
        let $dates := if($elem//tei:TEI//tei:persName[@key=$workID])then($elem//tei:titleStmt/tei:title/tei:date)else()    
       let $date := local:getDateString($dates)
		let $names := if($elem//tei:TEI//tei:persName[@key=$workID])then($elem//tei:titleStmt/tei:title)else()
		
 return 
    if($names != '')then(                     
concat('["',normalize-space($names), '",', '"', $date, '"]')
    )else()
    return 
        string-join($strings,',')
   
    
};

declare function local:jsonifyGNDList($id) {

let $strings := for $elem in $id

					let $id :=$elem
                   
                    return 
                      if($id != '')then(        
concat(
							'"',$id,'"'))else()
    
    return 
        string-join($strings,',') 
};

declare function local:jsonifyGND($content) {

let $strings := for $elem in $content

					let $id :=$elem//tei:idno[@type='gnd']
					
					let $gndList := local:jsonifyGNDList($id)
                   
                    return 
                        
concat('[',$gndList,']')
    
    return 
        string-join($strings,',') 
};

declare function local:jsonifyWega($content) {

let $strings := for $elem in $content

					let $id :=$elem//tei:idno[@type='wega']
                   
                    return 
                      if($id != '')then(        
concat(
							'"',$id,'"'))else()
    
    return 
        string-join($strings,',') 
};

declare function local:jsonifyVIAF($content) {

let $strings := for $elem in $content

					let $id :=$elem//tei:idno[@type='viaf']
                   
                    return 
                      if($id != '')then(        
concat(
							'"',$id,'"'))else()
    
    return 
        string-join($strings,',') 
};


 (
    '{"autoren":[',
        local:jsonifyAutoren($content),
	'],"geschlecht":[',
        local:jsonifyGender($content),
    '],"gnd":[',
        local:jsonifyGND($content),
    '],"wega":[',
         local:jsonifyWega($content),
    '],"viaf":[',
        local:jsonifyVIAF($content),
    '],"birth":[',
        local:jsonifyBirth($content),
     '],"death":[',
        local:jsonifyDeath($content),
    '],"occupation":[',
        local:jsonifyOccupation($content),
    '],"residence":[',
        local:jsonifyResidence($content),
     '],"summaryText":[',
        local:jsonifySummaryText($content),
   (: '],"summary":[',
        local:jsonifySummary($content),:)
     '],"roleRef":[',
        local:jsonifyRoleReferences($workID),
      '],"sourcesRef":[',
        local:jsonifySourcesReferences($workID),
      '],"worksRef":[',
        local:jsonifyWorksReferences($workID),
     '],"journalRef":[',
        local:jsonifyJournalReferences($workID), 
      '],"regieRef":[',
        local:jsonifyRegieReferences($workID), 
     '],"gagenRef":[',
        local:jsonifyGagenRefReferences($workID), 
     '],"issueRef":[',
        local:jsonifyIssueReferences($workID), 
        '],"pseuds":[',
        local:jsonifyPseuds($content), 
     '],"alts":[',
        local:jsonifyAlts($content), 
    '],"fulls":[',
        local:jsonifyFulls($content), 
	'],"regs":[',
        local:jsonifyRegs($content),
    ']}'

)