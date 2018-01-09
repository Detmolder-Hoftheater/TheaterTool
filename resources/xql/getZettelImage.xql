xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";
                 
declare variable  $bookName := request:get-parameter('regieName', '');

declare variable  $path := 'xmldb:exist:///apps/theater-data/zettel/';

declare variable $file := collection($path);
declare variable $fileNames := $file/tei:TEI[tei:teiHeader//tei:titleStmt[1][tei:title = $bookName]];

declare function local:getGraphicsInformation($fileNames) {

let $strings := for $elem in $fileNames

        let $rev_images :=  $elem//tei:facsimile/tei:graphic
        
        let $rev_image := local:getGraphic($rev_images)
        
       (: let $path :=$elem//tei:facsimile/tei:graphic/@url
		let $height := $elem//tei:facsimile/tei:graphic/@height
		let $width :=$elem//tei:facsimile/tei:graphic/@width :)

			return 
			if($rev_image != '')
			then($rev_image)
			else()
			
			(:if($path != '')then(  
				concat('["',$path, '",', '"',$height, '",', '"',$width,'"]'))
			else():)
        
       (: let $graphic := if($graphics != '')then(local:getGraphic($graphics))else()

			return 
			if($graphic != '')then($graphic)else():)
						
    return 
        string-join($strings,',')
    
};

declare function local:getGraphic($rev_images) {

let $strings := for $elem in $rev_images

        (:let $row := $elem:)
        
        let $path :=$elem/@url
		let $height := $elem/@height
		let $width :=$elem/@width 

			return 
			(:if($row != '')
			then($row)
			else():)
			
			if($path != '')then(  
				concat('["',$path, '",', '"',$height, '",', '"',$width,'"]'))
			else()
						
    return 
        string-join($strings,',')
    
};


 (                   
  '{"graphics":[',
       local:getGraphicsInformation($fileNames),

     ']}'
   
)