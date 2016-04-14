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

declare function local:jsonifySlurs($fileNames) {

let $strings := for $elem in $fileNames

		let $path1 := concat($path, $elem, '.xml')
		let $file1 := doc($path1)
		let $fileName :=  $file1//mei:title[not(@type)][1]

		let $fileID :=  $file1//mei:work/@xml:id

		let $comp := $file1//mei:persName[@role ="cmp"] 
(:or @role ="cre"  or @role ="aut"]:)

		let $fileNameCut := substring($fileName, 1,4)
		let $fileNameFiltered :=  if(contains($fileNameCut, 'Der ') 
								or contains($fileNameCut, 'Die ') 
								or contains($fileNameCut, 'Das '))
			then(substring($fileName, 5))
			else($fileName)
		let $fileName1 := if(contains(substring($fileNameFiltered, 1,1), $selection1) 
								or contains(substring($fileNameFiltered, 1,1), $selection2) 
								or contains(substring($fileNameFiltered, 1,1), $selection3)
								or $selection4 != '' and contains(substring($fileNameFiltered, 1,1), $selection4)
								or $selection5 != '' and contains(substring($fileNameFiltered, 1,1), $selection5))
			then($fileName)
			else()
 
		let $source := $file1//mei:relation[@rel ="hasEmbodiment"]/@target
		let $sourceFileName := tokenize($source, "#")[last()]
		let $path2 := concat('xmldb:exist:///apps/theater-data/sources/', $sourceFileName, '.xml')
		let $fileSource := doc($path2)
		let $rismLabel := $fileSource//mei:identifier[@label ="RISM-label"]
		let $physLoc := $fileSource//mei:identifier[@type ="shelfLocation"][1]
		let $sourceName := concat('Quelle: ', $rismLabel, ' , ' ,$physLoc)
		let $extName := concat($fileName1, ': ',  $comp)
		let $isExtend := if(contains($fileName1, 'Aschenbrödel') or contains($fileName1, 'Der Bettelstudent')  or contains($fileName1, 'Des Teufels Anteil'))
			then(concat('{',
									'"leaf":"true",',
									'"name":"Facsimile",',
									'"extName":"Facsimile",',
									'incipits:"',"false",'",',
									'details:"',"false",'",',                          
                            		'xml:"',"true",'",',
									'"icon":"resources/images/Images-17.png",', 
								'}')
			)
			else()

			let $iconWork := if(contains($fileName1, 'Aschenbrödel') or contains($fileName1, 'Der Bettelstudent')  or contains($fileName1, 'Des Teufels Anteil'))
			then('resources/images/BookBlau-15.png')
			else('resources/images/Books1-17.png')

                    return 
						if($fileName1 != '')then(
                        concat('{name:"',$fileName,'",',
							'details:"',"true",'",',                          
                            'xml:"',"true",'",', 
							'componist:"',$comp,'",',
							'extName:"',$extName,'",',
							'werkID:"',$fileID,'",', 
							'icon:"',$iconWork,'",',
							'incipits:"',"false",'",',							
							'"children":[{',
								'name:"',$sourceName,'",',
								'extName:"',$sourceName,'",',
								'incipits:"',"true",'",',
								'sourceID:"',$sourceFileName,'",',
								'"icon":"resources/images/Book1-16.png",', 
								'details:"',"true",'",',                          
                            	'xml:"',"true",'",',
								'"children":[',
									'{',
									'"leaf":"true",',
									'"name":"RISM",',
									'"extName":"RISM",',
									'incipits:"',"false",'",',
									'details:"',"false",'",',                          
                            		'xml:"',"true",'",',
									'"icon":"resources/images/Literature-17.png",', 
								'},',
								'{',
									'"leaf":"true",',
									'"name":"Incipits",',
									'"extName":"Incipits",',
									'incipits:"',"true",'",',
									'details:"',"false",'",',                          
                            		'xml:"',"false",'",',
									'"icon":"resources/images/MusicTranscript-17.png",', 
								'},',
								$isExtend,
								']',
							'}]',
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




