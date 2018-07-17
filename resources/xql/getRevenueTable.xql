xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $month := request:get-parameter('month', '');
declare variable $year := request:get-parameter('year', '');

declare variable $uri := concat('/db/apps/theater-data/einnahmen/', $year, '/', $year, '_', $month, '.xml');

declare variable $file := doc($uri);

declare variable $headName := $file//tei:profileDesc//tei:keywords/tei:term['Einnahmebeleg'];

declare variable $schedule := if($headName != '')then($file)else();

declare variable $images := if($headName != '')then($schedule//tei:facsimile/tei:graphic)else();

declare function local:getGraphicsInformation($schedule) {

let $strings := for $elem in $schedule

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

declare function local:getTableInformation($schedule) {

let $strings := for $elem in $schedule

        let $rows := $elem//tei:text/tei:body//tei:table/tei:row
        
        (:let $row := $elem//tei:facsimile/tei:graphic/@url:)
        
        let $row := if($rows != '')then(local:getTableRow($rows))else()

			return 
			if($row != '')then($row)else()
						
    return 
        string-join($strings,',')
    
};

declare function local:getTableRow($rows) {

let $strings := for $elem_1 in $rows

    let $cells := $elem_1/tei:cell
    
    let $cell := local:getTableCell($cells)

                    return 
                    
                    if($cell  != '')then(concat('{"cells":[', $cell, ']}'))else()
                    
    return 
        string-join($strings,',')
 
};

declare function local:getTableCell($cells) {

let $strings := for $elem_2 in $cells

    let $date := concat('"', replace($elem_2/ancestor::tei:row/tei:cell/tei:date, '"', '\\"' ), '"')
    
    let $onecell := if($elem_2/tei:rs != '')then(local:getCellContent($elem_2/node()))else()
    
    let $rthlr := $elem_2/ancestor::tei:row/tei:cell[not(child::tei:rs)]/tei:measure[@unit='Rthlr']
   (: $elem_2/ancestor::tei:row/tei:cell[not(child::tei:rs)]/tei:measure[@unit='Rthlr']:)
    
    let $ggr := $elem_2/ancestor::tei:row/tei:cell[not(child::tei:rs)]/child::tei:measure[@unit='ggr']
    
    let $d := $elem_2/ancestor::tei:row/tei:cell[not(child::tei:rs)]/child::tei:measure[@unit='d']
           
                    return 
                    
                        if($date = '')
                            then()
                        else(
                            if($onecell != '')
                            then(concat('{"date":[', $date, ']},','{"inhalt":[', $onecell, ']},',
                                '{"rthlr":["', $rthlr, '"]},', '{"ggr":["', $ggr, '"]},', '{"d":["', $d, '"]}' ))
                            else()
                        )
                                                            
    return 
        string-join($strings,',')
 
};


declare function local:getCellContent($elem_2) {

let $strings := for $elem in $elem_2
    
    let $content := if($elem/self::tei:rs/@type ='work')then(
            concat('{"work":["', normalize-space(replace($elem, '"', '\\"' )), '"', ', "', $elem/@key, '"]}')
        )
        else( 
        )
    
    let  $content_2 :=  if($elem/self::tei:persName)then(
             concat('{"workpersons":["', replace($elem, '"', '\\"' ), '"', ', "', $elem/@key, '"]}')
          )else()
          
    let  $content_3_0 := replace($elem, '"', '\\"' )
    
   (: let  $content_3_1 := replace($content_3_0, '"', '\\"' ):)
          
   let  $content_3 := if($content_3_0 != '')then(concat('{"celltext":["', normalize-space($content_3_0), '"]}'))else()
 
                    return 
                    if($content != '')
                    then($content)                   
                    else(
                        if($content_2 != '')then(normalize-space($content_2))else(
                        if($content_3 != '')then($content_3)else()
                        
                        )
                    
                    )
                                 
    return 
        string-join($strings,',')
 
};
                    
 (                   
  '{"rows":[',
 
        local:getTableInformation($schedule),

     '],',
     '"graphics":[',
       local:getGraphicsInformation($schedule),

     ']}'
   
)
   