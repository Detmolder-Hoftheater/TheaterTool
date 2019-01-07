xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $issueID := request:get-parameter('issueID', '');
declare variable $year := request:get-parameter('year', '');
declare variable $issuetailPath := request:get-parameter('dbPath', '');
declare variable $uri := concat('/db/apps/', $issuetailPath, '/', $year, '/');

(:declare variable $uri := concat('/db/apps/theater-data/ausgaben/', $year, '/');:)

declare variable $file := collection($uri);

declare variable $allFiles := $file//tei:TEI;

(:declare variable $allNames := $file//tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt[1]/tei:title;:)

declare variable $schedule := for $elem in $allFiles
                    return
                    
                 if($elem/@xml:id = $issueID)then($elem)else();
                 
declare function local:getGraphicsInformation($schedule) {

let $strings := for $elem in $schedule

         let $rev_images :=  $elem//tei:facsimile/tei:graphic
        
        let $rev_image := local:getGraphic($rev_images)

			return 
			if($rev_image != '')
			then($rev_image)
			else()
						
    return 
        string-join($strings,',')
    
};

declare function local:getGraphic($rev_images) {

let $strings := for $elem in $rev_images

        let $path :=$elem/@url
		let $height := $elem/@height
		let $width :=$elem/@width 

			return 
			if($path != '')then(  
				concat('["',$path, '",', '"',$height, '",', '"',$width,'"]'))
			else()
						
    return 
        string-join($strings,',')
    
};


declare function local:getTableInformation($schedule) {

let $strings := for $elem in $schedule

        let $rows := $elem//tei:text/tei:body//tei:table/tei:row
        
        let $row := if($rows != '')then(local:getTableRow($rows))else()

			return 
			if($row != '')then($row)else()
						
    return 
        string-join($strings,',')
    
};

declare function local:getDateCell($dateCells) {

let $strings := for $oneDate in $dateCells

    let $dateContent := $oneDate/tei:date/@when
   (: replace($oneDate, '"', '\\"' ):)
    
   
                    return 
                     if($dateContent  != '')then(
                    concat('"', $dateContent, '"'))else()
                    (:concat('"', $dateContent, '"'):)
                    
    return 
        string-join($strings,',')
 
};

declare function local:getMeasureCells($measures) {

let $strings := for $oneMeasure in $measures

    let $measureUnit := $oneMeasure/@unit
    let $measure := $oneMeasure
   (: replace($oneDate, '"', '\\"' ):)
    
   
                    return 
                     if($measureUnit  != '')then(
                    concat($measureUnit, ': ',$measure))else()
                    (:concat('"', $dateContent, '"'):)
                    
    return 
        string-join($strings,', ')
 
};

declare function local:getTableRow($rows) {

let $strings := for $elem_1 in $rows

    let $cells := $elem_1/tei:cell
    let $date:= local:getDateCell($cells)
    let $onecell := local:getTableCell($cells)
    
   (: let $date:= $elem_1/tei:cell/tei:date/@when
    
    let $onecell := if($elem_1/tei:cell/tei:persName != '' or $elem_1/tei:cell/tei:rs != '')then(local:getCellContent($elem_1/tei:cell/node()))else():)
    
    let $measures := $elem_1/tei:cell/tei:measure
    let $measure := local:getMeasureCells($measures)
     
    (: let $rthlr := $elem_1/tei:cell/tei:measure[@unit='Rthlr'][1]
 
    
    let $ggr := $elem_1/tei:cell/tei:measure[@unit='ggr'][1]
    
    let $d := $elem_1/tei:cell/tei:measure[@unit='d']:)
           
   (: let $cell := local:getTableCell($cells):)

                    return 
                    if($onecell  != '')then(
                   concat('{"cells":[', '{"date":[', $date, ']},', 
                  (: '{"inhalt":[', $onecell, ']},',:)
                  '{"measure":["', $measure, '"]},', 
                             (:'{"rthlr":["', $rthlr, '"]},', 
                               '{"ggr":["', $ggr, '"]},', 
                                 '{"d":["', $d, '"]},' , :)
                                 $onecell,
                                 
                                ']}'))else()
                    (:if($cell  != '')then(concat('{"cells":[', $cell, ']}'))else():)
                    
    return 
        string-join($strings,',')
 
};

declare function local:getDateContent($dateCells) {

let $strings := for $oneDate in $dateCells

    let $dateContent := $oneDate
   (: replace($oneDate, '"', '\\"' ):)
    
   
                    return 
                    $oneDate
                    (:concat('"', $dateContent, '"'):)
                    
    return 
        string-join($strings,',')
 
};

declare function local:getTableCell($cells) {

let $strings := for $elem_2 in $cells

    (:let $dateCells:= $elem_2/ancestor::tei:row/tei:cell/tei:date

   let $date := concat('"', local:getDateContent($dateCells/@when), '"'):)
   (: let $date := concat('"', $dateCells[1]/@when, '"'):)
    
    let $onecell := if($elem_2/tei:persName != '' or $elem_2/tei:rs != '')then(local:getCellContent($elem_2/node()))else()
    
    (:let $onecell_1 := if($elem_2/ancestor::tei:row/tei:cell/tei:persName != '' or $elem_2/ancestor::tei:row/tei:cell/tei:rs != '')then(local:getCellContent($elem_2/ancestor::tei:row/tei:cell/node()))else()
    :)
   (: let $rthlr := $elem_2/ancestor::tei:row/tei:cell[not(child::tei:persName)]/tei:measure[@unit='Rthlr'][1]
   (\: $elem_2/ancestor::tei:row/tei:cell[not(child::tei:rs)]/tei:measure[@unit='Rthlr']:\)
    
    let $ggr := $elem_2/ancestor::tei:row/tei:cell[not(child::tei:persName)]/child::tei:measure[@unit='ggr'][1]
    
    let $d := $elem_2/ancestor::tei:row/tei:cell[not(child::tei:persName)]/child::tei:measure[@unit='d']:)
           
                    return 
                    
                    if($onecell != '')
                            then(
                            concat('{"inhalt":[', $onecell, ']}')
                           (: $onecell:)
                         
                            (:concat('{"date":[', $date, ']},','{"inhalt":[', $onecell, ']},',
                                '{"rthlr":["', $rthlr, '"]},', 
                                '{"ggr":["', $ggr, '"]},', 
                                '{"d":["', $d, '"]}' ):)
                                
                                )
                            else()
                    
                    
                        (:if($date = '' and $onecell = '')
                            then()
                        else(
                            if($onecell != '')
                            then(concat('{"date":[', $date, ']},','{"inhalt":[', $onecell, ']},',
                                '{"rthlr":["', $rthlr, '"]},', '{"ggr":["', $ggr, '"]},', '{"d":["', $d, '"]}' ))
                            else()
                        ):)
                                                            
    return 
        string-join($strings,',')
 
};


declare function local:getCellContent($elem_2) {

let $strings := for $elem in $elem_2
    
     let $content := if($elem[@type ='work'])then(
            concat('{"work":["', normalize-space(replace($elem, '"', '\\"' )), '"', ', "', $elem/@key, '"]}')
        )
        else( 
        )
    
    let  $content_2 :=  if($elem/self::tei:persName)then(
             concat('{"workpersons":["', replace($elem, '"', '\\"' ), '"', ', "', $elem/@key, '"]}')
          )else()
          
    let  $content_3_0 := normalize-space($elem[not(self::tei:persName) and not($elem[@type ='work'])])  
    
    let  $content_3_1 := replace($content_3_0, '"', '\\"' )
          
   let  $content_3 := concat('{"celltext":["', $content_3_1, '"]}')
 
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
   