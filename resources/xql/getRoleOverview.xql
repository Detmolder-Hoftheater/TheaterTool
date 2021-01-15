xquery version "3.0";


declare namespace request = "http://exist-db.org/xquery/request";
declare namespace mei = "http://www.music-encoding.org/ns/mei";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare namespace xmldb = "http://exist-db.org/xquery/xmldb";
declare namespace system = "http://exist-db.org/xquery/system";
declare namespace transform = "http://exist-db.org/xquery/transform";

declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";


declare variable $workID := request:get-parameter('dbkey', '');
declare variable $uri := concat('/db/apps/theater-data/rollen/', $workID, '.xml');
declare variable $file := doc($uri);
declare variable $content := $file//tei:castItem;


declare function local:jsonifyNotes($id) {
    
    let $strings := for $elem in $id
    
    let $id_1 := normalize-space($elem)
    
    return
        if ($id_1 != '') then
            (
            concat('"', replace($id_1, '"', '\\"'), '"'))
        else
            ()
    return
        string-join($strings, ',')

};

declare function local:jsonifySummaryText($content) {
    
    let $strings := for $elem in $content
    
    (:let $id_1 := normalize-space($elem//tei:note):)
    let $notetext := $elem/tei:roleDesc/node()
    
    let $completNote := local:jsonifyOneEl($notetext)
    
    return
        if ($completNote != '') then
            
            concat('"',normalize-space((replace($completNote, '"', '\\"'))), '"')
        else
            ()
    return
        string-join($strings, ', ')

};

declare function local:jsonifyOneEl($notetext) {
    
    let $strings := for $elem in $notetext
    
    let $oneEl := if($elem/local-name() = 'roleName')then(local:dispatch($elem))else($elem)
      
    return
       
        if ($oneEl != '') then
           $oneEl
        else
            ()
    
    return
        string-join($strings, ' ')

};


declare function local:dispatch($id_1 as node()*) as item()* {
    for $nodet in $id_1
    return
        typeswitch ($nodet)                     
            case element(tei:persName) 
                return 
                    local:persName($nodet)
            case element(tei:roleName) 
                return 
                    local:roleName($nodet)
            case text()
                return
                    $nodet 
            default
                return
                    local:passthru($nodet)

};

declare function local:passthru($node as node()*) as item()* {
    local:dispatch($node/node())
};

declare function local:persName($node as element(tei:persName)) as element() {
    if ($node/@key != '') then
        <persName>{concat(
        '<persName id=', $node/@key,
        '><a href="javascript:getPersonContentForPerson(&apos;',
        $node/@key, '&apos;,&apos;',$node,'&apos;);">',$node,'</a></persName>')}</persName>
    else(
        
        concat('"', $node, '"')
        )
        
};

declare function local:roleName($node as element(tei:roleName)) as element() {
    if ($node/@key != '') then
        <roleName>{concat(
        '<roleName id=', $node/@key,
        '><a href="javascript:getRoleContentForRole(&apos;',
        $node/@key, '&apos;,&apos;',$node,'&apos;);">',$node,'</a></roleName>')}</roleName>
    else(
        
        concat('"', $node, '"')
        )
        
};

declare function local:jsonifyActors($content) {
    
    let $strings := for $elem in $content
    
    let $id_1 := local:jsonifyOneActor($elem/tei:actor)
    
    return
        if ($id_1 != '') then
            (
            concat('"', $id_1, '"'))
        else
            ()
    return
        string-join($strings, ',')

};

declare function local:jsonifyOneActor($content) {
    
    let $strings := for $elem in $content
    
    let $id_1 := $elem/tei:persName
    
    return
        if ($id_1 != '') then
            (
            $id_1 )
        else
            ()
    return
        string-join($strings, ', ')

};

declare function local:jsonifyBiblValues($content) {
    
    let $strings := for $elem in $content
    
    let $id_1 := $elem
    
    return
        if ($id_1 != '') then
            (
            $id_1 )
        else
            ()
    return
        string-join($strings, ' ')

};


declare function local:jsonifyRegs($content) {
    
    let $strings := for $elem in $content
    
    let $titles := $elem/tei:roleName[@type = 'reg']
   
    let $content_title := local:jsonifyForename($titles)
    
    return
        if ($content_title != '') then
            (concat('"',$content_title, '"'))
        else
            ()
    
    return
        string-join($strings, ',')

};

declare function local:jsonifyForename($foreNameList) {
    
    let $strings := for $elem in $foreNameList
    
    let $forename := $elem
    
    return
        $forename
    
    return
        string-join($strings, ', ')

};


declare function local:jsonifyAlts($content) {
    
    let $strings := for $elem in $content
    
    let $titles := for $title in $elem//tei:roleName
    return
        if ($title/@type = 'alt') then
            ($title)
        else
            ()
            
    let $content_title := local:jsonifyAltNames($titles)
    
    return
        if ($content_title != '') then
            ($content_title)
        else
            ()
    
    return
        string-join($strings, ',')

};


declare function local:jsonifyAltNames($titles) {
    
    let $strings := for $elem in $titles
    
    let $title := $elem
    let $subtype := $elem/@subtype
    
    return
        if ($subtype != "") then
            (concat('["', normalize-space($title), ' (', $subtype, ')', '"]'))
        else
            (concat('["', normalize-space($title), '"]'))
    
    return
        string-join($strings, ',')

};


declare function local:jsonifyDayReport($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/tagesberichte/'
    let $rolefiles := collection($rolepath)
    
    let $rolefile := $rolefiles//tei:TEI
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
   (: $rolefile//tei:TEI//tei:persName[@key = $workID]:)
    let $names := local:jsonifyReportRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()


};

declare function local:jsonifyReportRefNames($nameList) {
    
    let $strings := for $elem in $nameList
    let $titleName := $elem/root()//tei:titleStmt/tei:title
    let $volldate := $elem/root()//tei:titleStmt/tei:title/tei:date[1]/@when
    
    let $dateSplit := tokenize($volldate, '-')
    let $names := concat($titleName, ': ', normalize-space(replace($elem, '"', ' ')))
    
    return
        if ($names != '') then
            (
            concat('["', normalize-space($names), '", "', $dateSplit[1], '"]')
            )
        else
            ()
    return
        string-join($strings, ',')

};


declare function local:jsonifyRoleReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/rollen_kostuem/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    (:if($rolefiles//tei:TEI//tei:rs[@key=$workID])then($rolefiles//tei:TEI)else():)
    (:let $rolefileTest := if($rolefile[@key=$workID != ''])then($rolefile)else():)
    (:let $refData := local:jsonifyRefDataRoles($rolefile):)
    
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
   (: $rolefile//tei:TEI//tei:persName[@key = $workID]:)
    
    let $names := local:jsonifyRoleRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()

};

declare function local:jsonifyRoleRefNames($nameList) {
    
    let $strings := for $elem in $nameList
    let $titleName := $elem/root()//tei:titleStmt/tei:title
    let $names := concat($titleName, ': ', normalize-space($elem))
    
    return
        if ($names != '') then
            (
            concat('"', $names, '"')
            )
        else
            ()
    return
        string-join($strings, ',')

};

declare function local:jsonifyRegieReferences($workID) {
    
    (:let $roleTailPath := request:get-parameter('regie', '')
let $rolepath := if($roleTailPath != '')then(concat('/db/apps/', $roleTailPath, '/'))else():)
    let $rolepath := 'xmldb:exist:///apps/theater-data/regiebuecher/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
    (:$rolefile//tei:TEI//tei:persName[@key = $workID]:)
    let $names := local:jsonifyRoleRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()
};

declare function local:jsonifyTaxReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/taxation/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    (:let $rolepath := 'xmldb:exist:///apps/theater-data/regiebuecher/':)
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
    (:$rolefile//tei:TEI//tei:persName[@key = $workID]:)
    
    let $names := local:jsonifyRoleRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()

};

declare function local:jsonifyBestandReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/bestand/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    (:let $rolepath := 'xmldb:exist:///apps/theater-data/regiebuecher/':)
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
    (:$rolefile//tei:TEI//tei:persName[@key = $workID]:)
    
    let $names := local:jsonifyRoleRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()

};

declare function local:jsonifySourcesReferences($workID) {
    
    let $sorcepath := 'xmldb:exist:///apps/theater-data/sources/'
    let $allSourceFiles := collection($sorcepath)
    
    let $strings := $allSourceFiles//mei:source[descendant::*[@dbkey = $workID]]
    let $oneSource : = local:jsonifyOneSorcesData($strings)   
    (:let $stringContent := local:jsonifySorcesData($strings):)
    
    return
        if ($oneSource != '') then
            (
            $oneSource
            )
        else
            ()
    
};

declare function local:jsonifyOneSorcesData($content) {

    let $sourcetitle := $content/parent::mei:componentGrp/parent::mei:source/mei:titleStmt/mei:title[1]
    let $sourceID := $content/parent::mei:componentGrp/parent::mei:source/@xml:id
    
    
    let $worTargetId := $content/parent::mei:componentGrp/parent::mei:source[not(ancestor::mei:componentGrp)]/mei:relationList/mei:relation[@rel = 'isEmbodimentOf']/@target
    let $workIdExpr := tokenize($worTargetId, "#")[last()]
    let $workRefId := substring-before($workIdExpr, '_')
    
    
    let $stringContent := local:jsonifySorcesData($content, $sourcetitle, $sourceID, $workRefId)
    return
        if($stringContent != '')
        then(
        $stringContent
        (:concat('["', $sourcetitle, '",', '"', $sourceID,'",', '"',  $workRefId,  '",',$stringContent, ']'):)
        )
        else()
    
            
};

declare function local:jsonifySorcesData($content, $sourcetitle, $sourceID, $workRefId) {
let $strings := for $elem in $content
    
    let $worktitle := replace(normalize-space($elem/mei:titleStmt/mei:title[1]), '"', '\\"')
    let $rolefile := $elem/@xml:id
    let $location := $elem/mei:physLoc/mei:identifier
    let $rismLabel := $elem//mei:identifier[@label = "RISM-label"][1]
    
    let $sourceName := concat('Quelle: ', $sourcetitle, ', Einzellquelle ', $worktitle, ' , ', $rismLabel, ' , ', $location)
    
    return
            (
            
            concat('["', $worktitle, '",', '"', $rolefile, '",', '"', $workRefId, '",', '"', $sourceName, '",', '"', $location, '"]')
            
            )
            
            
    return
        string-join($strings, ',')

};

declare function local:jsonifyRollenReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/sources/'
    let $rolefiles := collection($rolepath)
    
    let $strings := for $elem in $rolefiles
    let $tailSources := $elem/mei:source/mei:componentGrp/mei:source[descendant::*[@dbkey = $workID]]/mei:physDesc/mei:titlePage
    
    let $tailSource := local:getRoleData($tailSources)
    
    return
        if ($tailSource != '') then
            $tailSource
        else
            ()
    return
        string-join($strings, ',')


};


declare function local:getRoleData($tailSources) {
    
    let $strings := for $elem in $tailSources
    let $roleName := local:getRoleNames($elem/mei:p/mei:name)
    (:local:getRoleNames($elem/mei:p/mei:name/node()):)
    (:let $roleKey := $elem/mei:p/mei:name/@dbkey:)
    return
        if ($roleName != '') then
            ($roleName)
        else
            ()
    
    return
        string-join($strings, ',')


};

declare function local:getRoleNames($roleName) {
    
    let $strings := for $elem in $roleName
    let $roleNames := $elem
    let $roleKey := $elem/@dbkey
    return
        if ($roleNames != '') then
            (
            concat('["', $roleNames, '",', '"', $roleKey, '"]')
            )
        else
            ()
    return
        string-join($strings, ',')


};


declare function local:jsonifyWorksReferences($content) {

    let $workref := $content/tei:ref/@target
    let $workId := tokenize($workref, "#")[last()]
    let $workpath := concat('/db/apps/theater-data/works/', $workId, '.xml')
    let $workfile := doc($workpath)
    let $workcontent := $workfile//mei:work
    let $worktitle := $workcontent/mei:title[1]
    let $rolefile := $workcontent/@xml:id
    return
            (
            concat('["', $worktitle, '",', '"', $rolefile, '"]')
            )

};


declare function local:jsonifyPersNames($names, $file1, $workID) {
    
    let $strings := for $elem in $names
    
    let $name := if ($elem[@codedval = $workID]) then
        (replace($file1/mei:title[1], '"', '\\"'))
    else
        ()
    let $dbId := if ($elem[@codedval = $workID]) then
        ($file1//mei:work/@xml:id)
    else
        ()
    
    return
        if ($name != '') then
            (
            concat('["', $name, '",', '"', $dbId, '"]')
            )
        else
            ()
    return
        string-join($strings, ',')


};

declare function local:jsonifyPersNamesForSources($names, $file1) {
    
    let $strings := for $elem in $names
    
    let $name := if ($elem[@dbkey = $workID]) then
        ($file1//mei:titleStmt[not(ancestor::mei:componentGrp)][1]/mei:title[1])
    else
        ()
    let $dbId := if ($elem[@dbkey = $workID]) then
        ($file1/mei:source[not(ancestor::mei:componentGrp)]/@xml:id)
    else
        ()
        (:let $workIdREf:)
    let $worTargetId := if ($elem[@dbkey = $workID]) then
        ($file1/mei:source[not(ancestor::mei:componentGrp)]/mei:relationList/mei:relation[@rel = 'isEmbodimentOf']/@target)
    else
        ()
    let $workIdExpr := tokenize($worTargetId, "#")[last()]
    let $workRefId := substring-before($workIdExpr, '_')
    
    let $rismLabel := if ($elem[@dbkey = $workID]) then
        ($file1/mei:source//mei:identifier[@label = "RISM-label"][1])
    else
        ()
    
    let $physLoc_tmp := if ($elem[@dbkey = $workID]) then
        ($file1/mei:source//mei:identifier[@type = "shelfLocation"][1])
    else
        ()
    let $physLoc := replace($physLoc_tmp, '\n', '')
    
    let $sourceName := concat('Quelle: ', $rismLabel, ' , ', $physLoc)
    
    return
        if ($name != '') then
            (
            
            concat('["', replace(normalize-space($name), '"', '\\"'), '",', '"', $dbId, '",', '"', $workRefId, '",', '"', $sourceName, '",', '"', $physLoc, '"]')
            )
        else
            ()
    return
        string-join($strings, ',')


};

declare function local:jsonifyRevenueReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/einnahmen/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
   (: $rolefile//tei:TEI//tei:persName[@key = $workID]:)
    let $names := local:jsonifyReportRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()
            
            (:let $strings := for $elem in $rolefile
		let $names := if($elem//tei:TEI//tei:rs[@key=$workID])then($elem//tei:titleStmt/tei:title/tei:date)else()
 return 
    if($names != '')then(                     
concat('"',$names, '"')
    )else()
    return 
        string-join($strings,','):)


};


declare function local:jsonifyJournalReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/theaterjournal/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    
    let $nameList := $rolefile/root()//tei:rs[@key = $workID]
    (:$rolefile//tei:TEI//tei:persName[@key = $workID]:)
    let $names := local:jsonifyRoleRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()
            (:
    let $strings := for $elem in $rolefile
    let $names := if ($elem//tei:TEI//tei:persName[@key = $workID]) then
        ($elem//tei:titleStmt/tei:title/tei:date)
    else
        ()
    return
        if ($names != '') then
            (
            concat('"', $names, '"')
            )
        else
            ()
    return
        string-join($strings, ',')
:)

};

declare function local:jsonifyGagenRefReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/gagenbuecher/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
    (:$rolefile//tei:TEI//tei:persName[@key = $workID]:)
    let $names := local:jsonifyRoleRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()
};

declare function local:getDateString($dates) {
    
    let $strings := for $elem in $dates
    
    let $onedate := $elem/@when
    
    return
        if ($onedate != '') then
            (
            
            $onedate)
        else
            ()
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyIssueReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/ausgaben/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
    (:$rolefile//tei:TEI//tei:persName[@key = $workID]:)
    let $names := local:jsonifyReportRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()
            
            (:let $strings := for $elem in $rolefile
    return
        let $dates := if ($elem//tei:TEI//tei:persName[@key = $workID]) then
            ($elem//tei:titleStmt/tei:title/tei:date)
        else
            ()
        let $date := local:getDateString($dates)
        let $names := if ($elem//tei:TEI//tei:persName[@key = $workID]) then
            ($elem//tei:titleStmt/tei:title)
        else
            ()
        
        return
            if ($names != '') then
                (
                concat('["', normalize-space($names), '",', '"', $date, '"]')
                )
            else
                ()
    return
        string-join($strings, ','):)


};


declare function local:jsonifyScheduleReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/einnahmen/'
    let $rolepath_1 := 'xmldb:exist:///apps/theater-data/ausgaben/'
    let $rolepath_2 := 'xmldb:exist:///apps/theater-data/spielplaene/'
    
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI//tei:term['Spielplan']
    let $nameList := $rolefile/root()//tei:rs[@key = $workID]
    
    let $rolefiles_1 := collection($rolepath_1)
    let $rolefile_1 := $rolefiles_1//tei:TEI//tei:term['Spielplan']
    let $nameList_1 := $rolefile_1/root()//tei:rs[@key = $workID]
    
    let $rolefiles_2 := collection($rolepath_2)
    let $nameList_2 := $rolefiles_2//tei:TEI//tei:rs[@key = $workID]
    
    let $names := local:jsonifyScheduleRefNames($nameList, $nameList_1, $nameList_2)
    
    return
        if ($names != '') then
            (
            concat('', normalize-space($names), '')
            )
        else
            ()
};

declare function local:jsonifyScheduleRefNames($nameList, $nameList_1, $nameList_2) {
    
    let $strings := for $elem in ($nameList, $nameList_1, $nameList_2)
    let $titleName := $elem/root()//tei:titleStmt/tei:title
    (:let $volldate := $elem/root()//tei:titleStmt/tei:title/tei:date[1]/@when:)
    let $volldate := document-uri($elem/root())
    
    let $dateSplit := tokenize($volldate, '/')
    let $names := concat(normalize-space($titleName), ': ', normalize-space($elem))
    
    return
        if ($names != '') then
            (
            concat('["', normalize-space($names), '", "', $dateSplit[6], '"]')
            )
        else
            ()
    return
        string-join($strings, ',')

};


(
'{"alts":[',
local:jsonifyAlts($content),
'],"regs":[',
local:jsonifyRegs($content),
'],"summaryText":[',
local:jsonifySummaryText($content),
'],"actors":[',
local:jsonifyActors($content),
'],"worksRef":[',
local:jsonifyWorksReferences($content),
'],"sourcesRef":[',
local:jsonifySourcesReferences($workID),
(:'],"dayReport":[',
local:jsonifyDayReport($workID),
'],"taxation":[',
local:jsonifyTaxReferences($workID),
'],"bestand":[',
local:jsonifyBestandReferences($workID),
'],"regieRef":[',
local:jsonifyRegieReferences($workID),
'],"gagenRef":[',
local:jsonifyGagenRefReferences($workID),
'],"revenueRef":[',
local:jsonifyRevenueReferences($workID),
'],"issueRef":[',
local:jsonifyIssueReferences($workID),
'],"scheduleRef":[',
local:jsonifyScheduleReferences($workID),:)
'],"journalRef":[',
local:jsonifyJournalReferences($workID),
']}'
)

(:xquery version "3.0";


declare namespace request = "http://exist-db.org/xquery/request";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace xmldb = "http://exist-db.org/xquery/xmldb";
declare namespace system = "http://exist-db.org/xquery/system";
declare namespace transform = "http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $bookName := request:get-parameter('dbkey', '');
declare variable $path := concat('/db/apps/theater-data/rollen/', $bookName, '.xml');
declare variable $file := doc($path);
declare variable $html_1 := $file//tei:castItem;
declare variable $html := local:dispatch($html_1);

(\:declare variable  $allSourceFiles := collection('/db/apps/theater-data/sources/');:\)
declare variable $sorcepath := 'xmldb:exist:///apps/theater-data/sources/';
declare variable $allSourceFiles := collection($sorcepath);
declare variable $strings := for $elem in $allSourceFiles  
    return $elem/mei:source/mei:componentGrp/mei:source[descendant::*[@dbkey = $bookName]]/mei:physDesc/mei:inscription/mei:persName;

declare variable $htmlPerson := local:dispatch($strings);

declare function local:dispatch($html_1 as node()*) as item()* {
    for $node in $html_1
    return
        typeswitch ($node)
            case text()
                return
                    $node
                    
            (\:case element(tei:s) return local:s($node):\)
            (\:case element(tei:p)
                return
                    local:p($node):\)
            case element(tei:roleName)
                return
                    local:roleName($node)
            case element(tei:roleDesc)
                return
                    local:roleDesc($node)
            case element(tei:actor)
                return
                    local:roleActor($node)
            case element(tei:ref)
                return
                    local:workRef($node)
            case element(mei:persName) 
                return 
                    local:persName($node)
                    (\:case element(tei:hi)
                return
                    local:hi($node)
            case element(tei:lb)
                return
                    local:lb($node)
            case element(tei:div)
                return
                    local:div($node)
            case element(tei:table)
                return
                    local:table($node)
            case element(tei:body)
                return
                    local:body($node)
            case element(tei:persName)
                return
                    local:persName($node)
            case element(tei:rs)
                return
                    local:rs($node)
            case element(tei:head)
                return
                    local:head($node)
                    (\: case element(tei:hi) return local:hi($node):\)
            case element(tei:row)
                return
                    local:row($node)
            case element(tei:cell)
                return
                    local:cell($node):\)
            default
                return
                    local:passthru($node)

};

(\: Recurse through child nodes :\)
(\:declare function local:passthru($node as node()*) as item()* {:\)
declare function local:passthru($node as node()*) as item()* {
    local:dispatch($node/node())
    (\:element {name($node)} 
{ if($node/@*!= '')then(
  ($node/@*,local:dispatch($node/node()))
  )else()}:\)
};

declare function local:persName($node as element(mei:persName)) as element() {

if($node/@dbkey != '')then(
  <div><persName><a href="javascript:getPersonContent('{$node/@dbkey}', '{$node/text()}');">{$node}</a></persName></div>
  )
  else(
  <div><persName>{$node}</persName></div>
  )
};


declare function local:roleName($node as element(tei:roleName)) as element() {
(\:let $roleType := $node/@type
let $roleTypeAsElem := if($roleType = 'reg')
    then(' (regulär)')
    else(if($roleType = 'full')
        then(' (vollständig)')
        else(if($roleType = 'alt')
            then(' (alternativ)')
            else(if($roleType = 'nick')
                then(' (nick)')
                else()))):\)

let $roleId := $node/@key
let $roleName := $node/text()
let $parentRole := $node/parent::node()/local-name()
let $roleType := $node/@type
let $roleTypeValue := if($roleType != '')then(concat('(', $roleType, ')'))else()
return
    if($parentRole ='castItem')
        then(if ( $roleId!= '') then
        (       
        <dev><font size = "1"><b style="color:gray;">Rollenname {$roleTypeValue}: </b></font><a href="javascript:getRoleContent('{$roleId}', '{$roleName}');">{$roleName}</a></dev>
        )
    else
        (
        <p><font size = "1"><b style="color:gray;">Rollenname {$roleTypeValue}: </b></font>{$roleName}</p>
        ))
        else(if ( $roleId!= '') then
        (       
        <a href="javascript:getRoleContent('{$roleId}', '{$roleName}');">{$roleName}</a>
        )
    else
        (
        <p>{$roleName}</p>
        ))

   
    
};

declare function local:workRef($node as element(tei:ref)) as element() {
    let $workref := $node/@target
    let $workId := tokenize($workref, "#")[last()]
    let $workpath := concat('/db/apps/theater-data/works/', $workId, '.xml')
    let $workfile := doc($workpath)
    let $workcontent := $workfile//mei:work
    let $worktitle := $workcontent//mei:title[1]/text()
    return  
     <p><font size = "1"><b style="color:gray;">Werk: </b></font><a href="javascript:getWorkContent('{$workId}', '{$worktitle}');">{$worktitle}</a></p> 
};

declare function local:roleDesc($node as element(tei:roleDesc)) as element() {
    <p><font size = "1"><b style="color:gray;">Rollenbeschreibung: </b></font>{local:dispatch($node/node())}</p>
    (\:<p>Beschreibung: {local:dispatch($node/node())}</p>:\)
    (\:{$node/text()[not($node/descendant::node())]}{local:dispatch($node/descendant::node())}{$node/descendant::text()}:\)
};

declare function local:roleActor($node as element(tei:actor)) as element() {
    <p><font size = "1"><b style="color:gray;">Schauspieler(in): </b></font>{$node}</p>
};


(
$html,
if($htmlPerson != '')then(
(<hr size="1"color="#909090"></hr>),
(<b style="color:gray; font-size: 12px;">Referenzen in Spielbetrieb und Verwaltung</b>),
(<br></br>),
(\:(<img src="resources/images/Mask-19.png"align="middle"/>),:\)
(<br></br>),
(<b style="color:gray; font-size: 12px;">Personen (generiert aus den Quellenmaterialien)</b>),
(<br></br>),
$htmlPerson)else()
  
        (\:local:getPersons($allSourceFiles):\)

):)