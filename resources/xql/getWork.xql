xquery version "3.0";

(:import module namespace freidi-pmd="http://www.freischuetz-digital.de/TheaterTool-new" at "../../modules/app.xql";:)

declare namespace request = "http://exist-db.org/xquery/request";
declare namespace mei = "http://www.music-encoding.org/ns/mei";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare namespace xmldb = "http://exist-db.org/xquery/xmldb";
declare namespace system = "http://exist-db.org/xquery/system";
declare namespace transform = "http://exist-db.org/xquery/transform";
declare namespace edirom = "http://www.edirom.de/ns/1.3";
(: 
declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";:)
declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";

declare variable $selection1 := request:get-parameter('workName', '');

declare variable $pathtail := request:get-parameter('path', '');
declare variable $path := concat($pathtail,'/');
declare variable $file := collection($path);
declare variable $fileNames := $file//mei:work/@xml:id;

declare function local:getFacsimNames($file) {
    
    let $strings := for $elem in $file
    
    let $navItem := $elem/edirom:names[1]/edirom:name[1] (://mei:sourceDesc//mei:title:)
    let $sourcePath := $elem/@targets
    let $sourceDov := doc($sourcePath)
    let $xmlid := $sourceDov/mei:mei/@xml:id
    
    return
        if ($navItem != '') then
            (
            concat('{name:"', $navItem, '",',
            '"leaf":"true",',
            'xmlid:"', $xmlid, '",',
            '"icon":"resources/images/Images-17.png"',
            '}'))
        else
            ()
    return
        string-join($strings, ',')



};

declare function local:getSourcesContent($fileID, $fileName1, $comp, $facsimNames, $expression) {

    let $strings := for $elem in $expression

    let $expressionFileName := tokenize($elem, "#")[last()]		

    let $expPath := concat('xmldb:exist:///apps/theater-data/expressions/', $expressionFileName, '.xml')
    (:let $file_1 := doc($expPath):)
    
    let $file_exp := doc($expPath)
    
    let $source := $file_exp//mei:relation[@rel = "hasEmbodiment"]/@target
    
    let $sourceFileName := substring-after($source, '#')
   
    let $path2 := concat('xmldb:exist:///apps/theater-data/sources/', $sourceFileName, '.xml')
    let $fileSource := doc($path2)
    let $rismLabel := $fileSource//mei:physLoc//mei:repository//mei:identifier[@label = "RISM-label"][1]
    let $physLoc := normalize-space($fileSource//mei:physLoc//mei:identifier[@type = "shelfLocation"][1])
    let $sourceName := concat('Quelle: ', $rismLabel, ' , ', $physLoc)
    let $extName := concat($fileName1, ': ', $comp)	
     let $iconIncipits := if (contains($fileName1, 'Aschenbrödel') or contains($fileName1, 'Der Bettelstudent') or contains($fileID, 'H020224') or contains($fileID, 'H021013') or contains($fileID, 'H020166') or contains($fileName1, 'Des Teufels Anteil') or contains($fileID, 'H020076')  or contains($fileID, 'H020261'))
    then
        ('resources/images/IncBlue.png')
    else
        ('resources/images/IncRed.png')
        
         let $iconSource := if (contains($fileName1, 'Aschenbrödel') or contains($fileName1, 'Der Bettelstudent') or contains($fileName1, 'Joseph') or contains($fileID, 'H020224') or contains($fileID, 'H021013') or contains($fileName1, 'Des Teufels Anteil') or contains($fileID, 'H020076')  or contains($fileID, 'H020261'))
    then
        ('resources/images/SourceBlue.png')
    else
        ('resources/images/SourceRed.png')
        
    
    let $isIncipit := if ($file_exp//mei:score and $file_exp//mei:score/child::mei:scoreDef)
    then
        (concat('{',
        '"leaf":"true",',
        '"name":"Incipits",',
        '"extName":"Incipits",',
        'incipits:"', "true", '",',
        'details:"', "false", '",',
        'icon:"', $iconIncipits, '",',
        'xml:"', "false", '",',
        '},')
        )
    else
        ()
    let $isOverwiew := if (contains($fileID, 'H020149') or contains($fileID, 'H020263') or contains($fileID, 'H020048'))
    then
        (concat('{',
        '"leaf":"true",',
        '"name":"Beschreibung",',
        '"extName":"Beschreibung",',
        'incipits:"', "false", '",',
        'details:"', "false", '",',
        'xml:"', "false", '",',
        '"icon":"resources/images/SourceBlue.png",',
        '},')
        )
    else
        ()
        
         let $isExtend := if (contains($fileID, 'H020149') or contains($fileID, 'H020263') or contains($fileID, 'H020048') or contains($sourceFileName, 'H220154') or contains($fileID, 'H021013') or contains($fileID, 'H020224') or contains($fileID, 'H020076') or contains($fileID, 'H020261'))
    then
        (concat('{',
        '"leaf":"false",',
        '"name":"Faksimiles",',
        '"extName":"Faksimiles",',
        'incipits:"', "false", '",',
        'details:"', "false", '",',
        'xml:"', "true", '",',
        '"icon":"resources/images/Images-17.png",',
        $facsimNames,
        '}')
        )
    else
        ()
    
    
   (: let $strings := for $elem in $fileID
    
    let $navItem := $elem/edirom:names[1]/edirom:name[1] (\://mei:sourceDesc//mei:title:\)
    let $sourcePath := $elem/@targets
    let $sourceDov := doc($sourcePath)
    let $xmlid := $sourceDov/mei:mei/@xml:id:)
    
    return
        if ($sourceName != '') then
            (
            concat('{',
      'name:"', $sourceName, '",',
         'physLocation:"', $physLoc, '",',
        'extName:"', $sourceName, '",',
        'incipits:"', "true", '",',
        'sourceID:"', $sourceFileName, '",',
        'expanded:"', "true", '",',
        'icon:"', $iconSource, '",',
        'details:"', "true", '",',
        'xml:"', "true", '",',
        '"children":[',
        $isOverwiew,
        $isIncipit,
        $isExtend,
        ']',
        '}'))
        else
            ()
    return
        string-join($strings, ',')



};

declare function local:jsonifySlurs() {
    
    (:let $strings := for $elem in $fileNames:)
    
    let $path1 := concat($path, $selection1, '.xml')
    let $file1 := doc($path1)
    let $fileName1 := $file1//mei:title[not(@type)][1]
    
   let $fileName := if ($fileName1 != " ") then
        (replace(normalize-space($fileName1), '"', '\\"'))
    else
        (replace(normalize-space($file1//mei:titleStmt//mei:title[1]), '"', '\\"' ))
    
    let $fileID := if (contains($file1//mei:work/@xml:id, $selection1))
    then
        ($file1//mei:work/@xml:id)
    else
        ()
        
        (:$file1//mei:work/@xml:id:)
    
    let $comp := $file1//mei:persName[@role = "cmp"][1]
    
    let $fileName1 := $fileName
    
			let $workFolder := if (contains($fileID, 'H020149')) then
        ('aschenbroedel/edition-HT_Isouard.xml')
    else
        (
        if (contains($fileID, 'H020263')) then
            ('bettelstudent/edition-HT_Bettelstudent.xml')
        else
            (if (contains($fileID, 'H020048')) then
                ('desTeufelsAnteil/edition-Auber_DesTeufelsAnteil.xml')
            else
                (if (contains($fileID, 'H020076')) then
                    ('unbekannte/edition.xml')
                else
                    (if (contains($fileID, 'H020166')) then
                        ('joseph/edition_Joseph_DT.xml')
                    else
                        if(contains($fileID, 'H020224'))then
                            ('yelvaLortzing/edition_Yelva_Lortzing.xml')
                        else(
                            if(contains($fileID, 'H021013'))then    
                                ('yelvaReissiger/edition_Yelva_Reissiger.xml')
                            else(
                                if(contains($fileID, 'H020261'))then    
                                ('muellerBalett/edition_MuellerBalett.xml')
                            else(
                            
                                'test/')))))))
                            
    let $edpath := concat('xmldb:exist:///apps/theater-data/vertaktung/', $workFolder)
    (:let $file := collection($path):)
    let $file_1 := doc($edpath)
    let $file_2 := $file_1/edirom:edition
    let $file_3 := $file_2/edirom:works[1]/edirom:work/edirom:navigatorDefinition/edirom:navigatorCategory[2]/edirom:navigatorItem
    let $facsimNames := concat('"children":[', local:getFacsimNames($file_3), ']')
    
   (: let $isExtend := if (contains($fileID, 'H020149') or contains($fileID, 'H020263') or contains($fileID, 'H020048') or contains($fileID, 'H020166') or contains($fileID, 'H021013') or contains($fileID, 'H020224') or contains($fileID, 'H020076'))
    then
        (concat('{',
        '"leaf":"false",',
        '"name":"Faksimiles",',
        '"extName":"Faksimiles",',
        'incipits:"', "false", '",',
        'details:"', "false", '",',
        'xml:"', "true", '",',
        '"icon":"resources/images/Images-17.png",',
        $facsimNames,
        '}')
        )
    else
        ():)
    
    (:let $isOverwiew := if (contains($fileID, 'H020149') or contains($fileID, 'H020263') or contains($fileID, 'H020048'))
    then
        (concat('{',
        '"leaf":"true",',
        '"name":"Beschreibung",',
        '"extName":"Beschreibung",',
        'incipits:"', "false", '",',
        'details:"', "false", '",',
        'xml:"', "false", '",',
        '"icon":"resources/images/SourceBlue.png",',
        '},')
        )
    else
        ():)
        
         let $iconWork := if (contains($fileName1, 'Aschenbrödel') or contains($fileName1, 'Der Bettelstudent') or contains($fileName1, 'Joseph') or contains($fileID, 'H020224') or contains($fileID, 'H021013') or contains($fileName1, 'Des Teufels Anteil') or contains($fileID, 'H020076') or contains($fileID, 'H020261'))
    then
        ('resources/images/BookBlau-17.png')
    else
        ('resources/images/Books1-17.png')
    
    
   (: let $iconSource := if (contains($fileName1, 'Aschenbrödel') or contains($fileName1, 'Der Bettelstudent') or contains($fileName1, 'Joseph') or contains($fileID, 'H020224') or contains($fileID, 'H021013') or contains($fileName1, 'Des Teufels Anteil') or contains($fileID, 'H020076'))
    then
        ('resources/images/SourceBlue.png')
    else
        ('resources/images/SourceRed.png'):)
        
        
        (:let $iconIncipits := if (contains($fileName1, 'Aschenbrödel') or contains($fileName1, 'Der Bettelstudent') or contains($fileID, 'H020224') or contains($fileID, 'H021013') or contains($fileID, 'H020166') or contains($fileName1, 'Des Teufels Anteil') or contains($fileID, 'H020076'))
    then
        ('resources/images/IncBlue.png')
    else
        ('resources/images/IncRed.png'):)
    
(:	+++++++++++		:)			
			
	let $expression := $file1//mei:relation[@rel = "hasRealization"]/@target
    
	let $sourcesContent :=  local:getSourcesContent($fileID, $fileName1, $comp, $facsimNames, $expression)	
			
    (:let $expPath := concat('xmldb:exist:///apps/theater-data/expressions/', $fileID, '_expr1', '.xml')
   
    let $file_exp := doc($expPath)
    
    let $source := $file_exp//mei:relation[@rel = "hasEmbodiment"]/@target
    
    let $sourceFileName := substring-after($source, '#')
   
    let $path2 := concat('xmldb:exist:///apps/theater-data/sources/', $sourceFileName, '.xml')
    let $fileSource := doc($path2)
    let $rismLabel := $fileSource//mei:physLoc//mei:repository//mei:identifier[@label = "RISM-label"][1]
    let $physLoc := normalize-space($fileSource//mei:physLoc//mei:identifier[@type = "shelfLocation"][1])
    let $sourceName := concat('Quelle: ', $rismLabel, ' , ', $physLoc)
    let $extName := concat($fileName1, ': ', $comp)	:)
    
   (: let $expression := $file1//mei:relation[@rel = "hasRealization"]/@target
    let $expressionFileName := tokenize($expression, "#")[last()]
    let $path_1 := concat('xmldb:exist:///apps/theater-data/expressions/', $expressionFileName, '.xml')
    let $file_exp := doc($path_1)
    
    let $source := if ($file_exp != '')
    then
        ($file_exp//mei:relation[@rel = "hasEmbodiment"]/@target)
    else
        ($file1//mei:relation[@rel = "hasEmbodiment"]/@target)
        
     
    let $sourceFileName := tokenize($source, "#")[last()]
    let $path2 := concat('xmldb:exist:///apps/theater-data/sources/', $sourceFileName, '.xml')
    let $fileSource := doc($path2)
    let $rismLabel := $fileSource//mei:physLoc//mei:repository//mei:identifier[@label = "RISM-label"][1]
    let $physLoc := normalize-space($fileSource//mei:physLoc//mei:identifier[@type = "shelfLocation"][1])
    let $sourceName := concat('Quelle: ', $rismLabel, ' , ', $physLoc)
    let $extName := concat($fileName1, ': ', $comp)
    :)
    
    
   (: let $isIncipit := if ($file_exp//mei:score and $file_exp//mei:score/child::mei:scoreDef)
    then
        (concat('{',
        '"leaf":"true",',
        '"name":"Incipits",',
        '"extName":"Incipits",',
        'incipits:"', "true", '",',
        'details:"', "false", '",',
        'icon:"', $iconIncipits, '",',
        'xml:"', "false", '",',
        '},')
        )
    else
        ()
    :)
   
    let $extName := concat($fileName1, ': ', $comp)
      
    let $isSource := if ($sourcesContent != '')
    then
        (concat('"children":[',
        $sourcesContent,
        (:'{',
        'name:"', $sourceName, '",',
        'physLocation:"', $physLoc, '",',
        'extName:"', $sourceName, '",',
        'incipits:"', "true", '",',
        'sourceID:"', $sourceFileName, '",',
        'expanded:"', "true", '",',
        'icon:"', $iconSource, '",',
        'details:"', "true", '",',
        'xml:"', "true", '",',
        '"children":[',
        $isOverwiew,
        $isIncipit,
        $isExtend,
        ']',
        '}',:)
        ']')
        )
    else
        ()
    
    let $isLeaf := if ($sourcesContent) then
        ()
    else
        ('"leaf":"true",')
    
    return
        if ($fileID != '') then
            (
            concat('{"name":"', $fileName, '",',
            '"details":"', "true", '",',
            '"xml":"', "true", '",',
            '"componist":"', $comp, '",',
            '"expanded":"', "true", '",',
            '"extName":"', $extName, '",',
            '"werkID":"', $fileID, '",',
            '"icon":"', $iconWork, '",',
            '"incipits":"', "false", '",',
            $isLeaf,
            $isSource,
            
            
            '}'))
        else
            ()

};


(

'{"children":[',
local:jsonifySlurs(),
']}'


)




