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

declare function local:getTableInformation($schedule) {

let $strings := for $elem in $schedule

        let $rows := $elem//tei:text/tei:body//tei:table/tei:row
        
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
    
     let $content := if($elem[@type ='work'])then(
           (: $elem:)
            concat('{"work":["', normalize-space($elem), '"', ', "', $elem/@key, '"]}')
            
            (:local:getWork($elem/tei:rs[@type ='work']):)
        )
        else(
          
        )
    
    let  $content_2 :=  if($elem/self::tei:persName)then(
             concat('{"workpersons":["', $elem, '"', ', "', $elem/@key, '"]}')
          )else()
          
    let  $content_3_0 := normalize-space($elem[not(self::tei:persName) and not($elem[@type ='work'])])  
    
    let  $content_3_1 := replace($content_3_0, '"', '\\"' )
          
   let  $content_3 := concat('{"celltext":["', $content_3_1, '"]}')
  
                    return 
                    if($content != '')
                    then($content)                   
                    else(
                        if($content_2 != '')then(normalize-space($content_2))else($content_3)
                    
                    )
                                 
    return 
        string-join($strings,',')
 
};
                    
 (                   
  '{"rows":[',
 
        local:getTableInformation($schedule),

     ']}'
   
)
   