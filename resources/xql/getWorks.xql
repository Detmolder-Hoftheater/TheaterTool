xquery version "3.0";

(:import module namespace freidi-pmd="http://www.freischuetz-digital.de/TheaterTool-new" at "../../modules/app.xql";:)

declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";
(: 
declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";:)
declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";

declare variable $selection1 := request:get-parameter('selection1', '');
declare variable $selection2 := request:get-parameter('selection2', '');
declare variable $selection3 := request:get-parameter('selection3', '');
declare variable $selection4 := request:get-parameter('selection4', '');
declare variable $selection5 := request:get-parameter('selection5', '');

declare variable $path := 'xmldb:exist:///apps/theater-data/works/';
declare variable $file := collection($path);
declare variable $fileNames := $file//mei:work/@xml:id;

declare function local:jsonifyRoles($names) {

let $strings := for $elem in $names

					let $id_1 :=normalize-space($elem)
					(:let $role := $elem/@role
					let $dbkey :=$elem/@dbkey:)
                   
                    return 
                     if($id_1 != '')then( 
                     $id_1
				(:concat('["',$id_1, '",', '"',$role, '",', '"',$dbkey,'"]'):)
				)
else()
    return 
        string-join($strings,',')
  
};

declare function local:jsonifySlurs($fileNames) {

let $strings := for $elem in $fileNames

let $path1 := concat($path, $elem, '.xml')
		let $file1 := doc($path1)
		(:let $fileName :=  $file1//mei:title[not(@type='sub')][1]:)
		
		let $titles := $file1//mei:titleStmt[1]/mei:title[not(@type='sub')]
	   let $fileName := local:jsonifyTitleInformation($titles, $file1)


	
	(:let $type := $elem/@type
	let $language := $elem/@xml:lang:)
	
                    return 
                    if($fileName != '')then( 
                     $fileName
				
				)
                  else()  
(:concat('["',$title, '","', $type, '","', $language,'"]'):)
    return 
        string-join($strings,',')
 
};

declare function local:getFacsimNames($file) {

let $strings := for $elem in $file

		let $navItem := $elem//mei:sourceDesc//mei:title
		let $xmlid := $elem//mei:mei/@xml:id
                    return 
						if($navItem != '')then(
                        concat('{name:"',$navItem,'",',
							'"leaf":"true",',
							'xmlid:"',$xmlid,'",',
							'"icon":"resources/images/Images-17.png"',							
                            '}'))
else()
    return 
        string-join($strings,',')

   
    
};

declare function local:jsonifyTitleInformation($titles, $file1) {

let $strings := for $elem in $titles

		let $fileName := normalize-space($elem)
		
		let $nametype := $elem/@type
	    let $language := $elem/@xml:lang

		let $fileID :=  $file1/mei:work/@xml:id
		
		let $names :=$file1//mei:titleStmt//mei:persName

		let $comp := local:jsonifyRoles($names)

		(:let $comp := $file1//mei:persName[@role ="cmp"] :)
(:or @role ="cre"  or @role ="aut"]:)

		let $fileNameCut := substring($fileName, 1,4)
		let $fileNameFiltered_0 :=  if(contains($fileNameCut, 'Der ') 
								or contains($fileNameCut, 'Die ') 
								or contains($fileNameCut, 'Les ')
								or contains($fileNameCut, 'The ')
								or contains($fileNameCut, 'Das '))
			then(substring($fileName, 5))
			else($fileName)
			
		let $fileNameCut_1 :=  if($fileNameFiltered_0 = $fileName)
			then(substring($fileName, 1,3))
			else($fileName)	
		 let $fileNameFiltered_1 :=  if(contains($fileNameCut_1, 'Le ') 
								or contains($fileNameCut_1, 'La ') 
								(:or contains($fileNameCut_1, 'L' '):)
								)
			then(substring($fileName, 4))
			else($fileName)
			
			let $fileNameFiltered :=  if($fileNameFiltered_1 != $fileName)then($fileNameFiltered_1)else($fileNameFiltered_0)
			
		let $subName_0 := substring($fileNameFiltered, 1,1)
		let $subName := upper-case($subName_0)
		
		let $fileName1 := if(contains($subName, $selection1) 
								or contains($subName, $selection2) 
								or contains($subName, $selection3)
								or $selection4 != '' and contains($subName, $selection4)
								or $selection5 != '' and contains($subName, $selection5))
			then($fileName)
			else()


		let $expression := $file1//mei:relation[@rel ="hasRealization"]/@target
		let $expressionFileName := tokenize($expression, "#")[last()]
		let $path_1 := concat('xmldb:exist:///apps/theater-data/expressions/', $expressionFileName, '.xml')
		let $file_1 := doc($path_1)

        let $source := if($file_1 !='')
			then($file_1//mei:relation[@rel ="hasEmbodiment"]/@target)
			else($file1//mei:relation[@rel ="hasEmbodiment"]/@target)


		(:let $source := if(contains($fileID, 'H020149') or contains($fileID, 'H020048')  or contains($fileID, 'H020263')
		or contains($fileID, 'H020010'))
			then($file_1//mei:relation[@rel ="hasEmbodiment"]/@target)
			else($file1//mei:relation[@rel ="hasEmbodiment"]/@target):)

 
		(:let $source := $file1//mei:relation[@rel ="hasEmbodiment"]/@target:)
		let $sourceFileName := tokenize($source, "#")[last()]
		let $path2 := concat('xmldb:exist:///apps/theater-data/sources/', $sourceFileName, '.xml')
		let $fileSource := doc($path2)
		let $rismLabel := $fileSource//mei:identifier[@label ="RISM-ID"][1]
		let $physLoc := normalize-space($fileSource//mei:identifier[@type ="shelfLocation"][1])
		let $sourceName := concat('Quelle: ', $rismLabel, ' , ' ,$physLoc)
		let $extName := concat($fileName1, ': ',  $comp)
		
		(:let $workFolder := if(contains($fileID, 'H020149'))then('aschenbroedel/')else(
        if(contains($fileID, 'H020263'))then('bettelstudent/')else('test/')):)
        
        let $workFolder := if (contains($fileID, 'H020149')) then
        ('aschenbroedel/')
    else
        (
        if (contains($fileID, 'H020263')) then
            ('bettelstudent/')
        else
            (if(contains($fileID, 'H020048'))then('desTeufelsAnteil/')else('test/')))
        
        let $path := concat('xmldb:exist:///apps/theater-data/vertaktung/', $workFolder, '/')
        let $file := collection($path)      
        let $facsimNames := concat('"children":[',local:getFacsimNames($file), ']' )
				
		let $isExtend := if(contains($fileID, 'H020149')  or contains($fileID, 'H020263') or contains($fileID, 'H020048'))
			then(concat('{',
									'"leaf":"false",',
									'"name":"Faksimiles",',
									'"extName":"Faksimiles",',
									'incipits:"',"false",'",',
									'details:"',"false",'",',                          
                            		'xml:"',"true",'",',
									'"icon":"resources/images/Images-17.png",', 
									$facsimNames,
								'}')
			)
			else()
			
			let $isOverwiew := if(contains($fileID, 'H020149')  or contains($fileID, 'H020263')  or contains($fileID, 'H020048'))
			then(concat('{',
									'"leaf":"true",',
									'"name":"Beschreibung",',
									'"extName":"Beschreibung",',
									'incipits:"',"false",'",',
									'details:"',"false",'",',                          
                            		'xml:"',"false",'",',
									'"icon":"resources/images/SourceBlue.png",', 
								'},')
			)
			else()

			let $iconWork := if(contains($fileID, 'H020149') or contains($fileID, 'H020048')  or contains($fileID, 'H020263'))
			then('resources/images/BookBlau-17.png')
			else('resources/images/Books1-17.png')

			let $iconSource := if(contains($fileID, 'H020149') or contains($fileID, 'H020048')  or contains($fileID, 'H020263'))
			then('resources/images/SourceBlue.png')
			else('resources/images/SourceRed.png')

			let $iconIncipits := if(contains($fileID, 'H020149') or contains($fileID, 'H020048')  or contains($fileID, 'H020263'))
			then('resources/images/IncBlue.png')
			else('resources/images/IncRed.png')

			(:let $iconRISM := if(contains($fileID, 'H020149') or contains($fileID, 'H020048')  or contains($fileID, 'H020263'))
			then('resources/images/RismBlue.png')
			else('resources/images/Literature-17.png'):)


let $isSource := if($sourceFileName != '')
			then(concat('"children":[{',
								'name:"',$sourceName,'",',
								'physLocation:"',$physLoc,'",',
								'extName:"',$sourceName,'",',
								'incipits:"',"true",'",',
								'sourceID:"',$sourceFileName,'",',
								'icon:"',$iconSource,'",', 
								'details:"',"true",'",',                          
                            	'xml:"',"true",'",',
								'"children":[',
									(:'{',
									'"leaf":"true",',
									'"name":"RISM",',
									'"extName":"RISM",',
									'incipits:"',"false",'",',
									'details:"',"false",'",', 
									'icon:"',$iconRISM,'",',                         
                            		'xml:"',"true",'",',
								'},',:)
								$isOverwiew,
								'{',
									'"leaf":"true",',
									'"name":"Incipits",',
									'"extName":"Incipits",',
									'incipits:"',"true",'",',
									'details:"',"false",'",', 
									'icon:"',$iconIncipits,'",',                         
                            		'xml:"',"false",'",',
								'},',
								$isExtend,
								']',
							'}]')
			)
			else()

let $isLeaf := if($sourceFileName )then()else('"leaf":"true",')

                    return 
						if($fileName1 != '')then(
                        concat('{name:"',$fileName,'",',
                            'nametype:"',$nametype,'",',
							'language:"',$language,'",',
							'details:"',"true",'",',                          
                            'xml:"',"true",'",', 
							'componist:"',$comp,'",',
							'extName:"',$extName,'",',
							'werkID:"',$fileID,'",', 
							'icon:"',$iconWork,'",',
							'incipits:"',"false",'",',	
							$isLeaf,
							$isSource,
													
							(:'"children":[{',
								'name:"',$sourceName,'",',
								'extName:"',$sourceName,'",',
								'incipits:"',"true",'",',
								'sourceID:"',$sourceFileName,'",',
								'icon:"',$iconSource,'",', 
								'details:"',"true",'",',                          
                            	'xml:"',"true",'",',
								'"children":[',
									'{',
									'"leaf":"true",',
									'"name":"RISM",',
									'"extName":"RISM",',
									'incipits:"',"false",'",',
									'details:"',"false",'",', 
									'icon:"',$iconRISM,'",',                         
                            		'xml:"',"true",'",',
								'},',
								'{',
									'"leaf":"true",',
									'"name":"Incipits",',
									'"extName":"Incipits",',
									'incipits:"',"true",'",',
									'details:"',"false",'",', 
									'icon:"',$iconIncipits,'",',                         
                            		'xml:"',"false",'",',
								'},',
								$isExtend,
								']',
							'}]',:)
                            '}'))
else ()
    return 
        string-join($strings,',')

   
    
};

(:declare function local:jsonifySlurs($path) {

let $local-doctypes := collection($path)

let $strings1 := for $elem1 in $local-doctypes
					(\:let $fileTest := doc($elem1):\)
				let $surname := $elem1
                   (\: let $strings := for $elem in $elem1
                    	let $surname := $elem//mei:persName:\)
					
                    	return 
                        	concat('{name:"',$surname,'",',
							'details:"',"true",'",',                          
                            'xml:"',"true",'"',
                            '}')
   (\: return 
        string-join($strings,','):\)
    return 
        string-join($strings1,',')

};:)


       
    
 (

 (: '[',
        local:jsonifySlurs($persName),

    ']':)
   
     '{"children":[',
        local:jsonifySlurs($fileNames),
    ']}' 
   

)




