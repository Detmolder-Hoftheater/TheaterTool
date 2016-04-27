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

declare function local:jsonifySlurs($fileNames) {

let $strings := for $elem in $fileNames

		let $path1 := concat($path, $elem, '.xml')
		let $file1 := doc($path1)
		let $fileName :=  $file1//mei:title[not(@type)][1]

		let $fileID :=  $file1//mei:work/@xml:id

		let $comp := $file1//mei:persName[@role ="cmp"]

		let $fileName1 := if(contains($fileName, $selection1))
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

                    return 
						if($fileName1 != '')then(
                        concat('{name:"',$fileName1,'",',
							'details:"',"true",'",',                          
                            'xml:"',"true",'",',
							'componist:"',$comp,'",',
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
									'"name":"Facsimile",',
									'"extName":"Facsimile",',
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




