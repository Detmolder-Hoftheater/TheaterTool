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

declare variable $selection1 := request:get-parameter('workName', '');


declare variable $path := 'xmldb:exist:///apps/theater-data/works/';
declare variable $file := collection($path);
declare variable $fileNames := $file//mei:work/@xml:id;

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

declare function local:jsonifySlurs($fileNames) {

let $strings := for $elem in $fileNames

		let $path1 := concat($path, $elem, '.xml')
		let $file1 := doc($path1)
		let $fileName1 := $file1//mei:title[not(@type)][1]
		
		let $fileName := if($fileName1 !=" ")then($fileName1)else($file1//mei:titleStmt//mei:title[1])

		let $fileID :=  if(contains($file1//mei:work/@xml:id, $selection1))
			then($file1//mei:work/@xml:id)
			else()
		
		(:$file1//mei:work/@xml:id:)

		let $comp := $file1//mei:persName[@role ="cmp"][1]

		let $fileName1 := $fileName
		(:if(contains($fileName, $selection1))
			then($fileName)
			else():)
 
		let $expression := $file1//mei:relation[@rel ="hasRealization"]/@target
		let $expressionFileName := tokenize($expression, "#")[last()]
		let $path_1 := concat('xmldb:exist:///apps/theater-data/expressions/', $expressionFileName, '.xml')
		let $file_1 := doc($path_1)

		let $source := $file_1//mei:relation[@rel ="hasEmbodiment"]/@target
		
		let $source := if(contains($fileName1, 'Aschenbrödel') or contains($fileName1, 'Der Bettelstudent')  or contains($fileName1, 'Des Teufels Anteil'))
			then($file_1//mei:relation[@rel ="hasEmbodiment"]/@target)
			else($file1//mei:relation[@rel ="hasEmbodiment"]/@target)
		
		let $sourceFileName := tokenize($source, "#")[last()]
		let $path2 := concat('xmldb:exist:///apps/theater-data/sources/', $sourceFileName, '.xml')
		let $fileSource := doc($path2)
		let $rismLabel := $fileSource//mei:identifier[@label ="RISM-label"][1]
		let $physLoc := $fileSource//mei:identifier[@type ="shelfLocation"][1]
		let $sourceName := concat('Quelle: ', $rismLabel, ' , ' ,$physLoc)
		let $extName := concat($fileName1, ': ',  $comp)
		
		let $workFolder := if(contains($fileID, 'H020149'))then('aschenbroedel/')else(
        if(contains($fileID, 'H020263'))then('bettelstudent/')else('test/'))
        let $path := concat('xmldb:exist:///apps/theater-data/vertaktung/', $workFolder, '/')
        let $file := collection($path)      
        let $facsimNames := concat('"children":[',local:getFacsimNames($file), ']' )
		
		let $isExtend := if(contains($fileID, 'H020149')  or contains($fileID, 'H020263'))
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
			
			let $isOverwiew := if(contains($fileID, 'H020149')  or contains($fileID, 'H020263'))
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
			
			let $iconWork := if(contains($fileName1, 'Aschenbrödel') or contains($fileName1, 'Der Bettelstudent')  or contains($fileName1, 'Des Teufels Anteil'))
			then('resources/images/BookBlau-17.png')
			else('resources/images/Books1-17.png')

			let $iconSource := if(contains($fileName1, 'Aschenbrödel') or contains($fileName1, 'Der Bettelstudent')  or contains($fileName1, 'Des Teufels Anteil'))
			then('resources/images/SourceBlue.png')
			else('resources/images/SourceRed.png')

			let $iconIncipits := if(contains($fileName1, 'Aschenbrödel') or contains($fileName1, 'Der Bettelstudent')  or contains($fileName1, 'Des Teufels Anteil'))
			then('resources/images/IncBlue.png')
			else('resources/images/IncRed.png')

			(:let $iconRISM := if(contains($fileName1, 'Aschenbrödel') or contains($fileName1, 'Der Bettelstudent')  or contains($fileName1, 'Des Teufels Anteil'))
			then('resources/images/RismBlue.png')
			else('resources/images/Literature-17.png'):)
			
			let $isSource := if($sourceFileName != '')
			then(concat('"children":[{',
								'name:"',$sourceName,'",',
								'extName:"',$sourceName,'",',
								'incipits:"',"true",'",',
								'sourceID:"',$sourceFileName,'",',
								'expanded:"',"true",'",',
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
						if($fileID != '')then(
                        concat('{name:"',$fileName,'",',
							'details:"',"true",'",',                          
                            'xml:"',"true",'",', 
							'componist:"',$comp,'",',
							'expanded:"',"true",'",',
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

			

                   (: return 
						if($fileName1 != '')then(
                        concat('{name:"',$fileName1,'",',
							'details:"',"true",'",',                          
                            'xml:"',"true",'",',
							'componist:"',$comp,'",',
							'expanded:"',"true",'",',
							'extName:"',$extName,'",',
							'werkID:"',$fileID,'",',   
							'incipits:"',"false",'",',
							'"icon":"resources/images/BookBlau-17.png",',
 							
							'"children":[{',
								'name:"',$sourceName,'",',
								'extName:"',$sourceName,'",',
								'incipits:"',"true",'",',
								'expanded:"',"true",'",',
								'sourceID:"',$sourceFileName,'",',
								'details:"',"true",'",',  
								'expanded:"',"true",'",',                         
                            	'xml:"',"true",'",',
								'"icon":"resources/images/SourceBlue.png",', 
								'"children":[',
									'{',
									'"leaf":"true",',
									'"name":"RISM",',
									'"extName":"RISM",',
									'incipits:"',"false",'",',
									'details:"',"false",'",',                          
                            		'xml:"',"true",'",',
									'"icon":"resources/images/RismBlue.png",', 
								'},',
								'{',
									'"leaf":"true",',
									'"name":"Incipits",',
									'"extName":"Incipits",',
									'incipits:"',"true",'",',
									'details:"',"false",'",',                          
                            		'xml:"',"false",'",',
									'"icon":"resources/images/IncBlue.png",', 
								'},',
								'{',
									'"leaf":"true",',
									'"name":"Faksimiles",',
									'"extName":"Faksimiles",',
									'incipits:"',"false",'",',
									'details:"',"false",'",',                          
                            		'xml:"',"true",'",',
									'"icon":"resources/images/Images-17.png",', 
								'}',
								']',
							'}]',
                            '}'))
else ()
    return 
        string-join($strings,',')
:)
   
    
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




