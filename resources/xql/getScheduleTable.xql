xquery version "3.0";


declare namespace request = "http://exist-db.org/xquery/request";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare namespace xmldb = "http://exist-db.org/xquery/xmldb";
declare namespace system = "http://exist-db.org/xquery/system";
declare namespace transform = "http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $month := request:get-parameter('month', '');
declare variable $year := request:get-parameter('year', '');


declare variable $rolepath := if ($year != '') then
    (concat('xmldb:exist:///apps/theater-data/einnahmen/', $year, '/'))
else
    ();
declare variable $rolepath_1 := if ($year != '') then
    (concat('xmldb:exist:///apps/theater-data/ausgaben/', $year, '/'))
else
    ();

declare variable $rolepath_2 := if ($year != '') then
    (concat('xmldb:exist:///apps/theater-data/spielplaene/', $year, '/'))
else
    ('xmldb:exist:///apps/theater-data/spielplaene/');

declare variable $rolefiles := collection($rolepath);

declare variable $rolefiles_1 := collection($rolepath_1);

declare variable $rolefiles_2 := collection($rolepath_2);

declare variable $schedule := for $elem in ($rolefiles, $rolefiles_1, $rolefiles_2)
return
    if ($elem/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt[1]/tei:title = $month
    or $year = '1820' or $year = '1821' or $year = '1822' or $year = '1823' or $year = '1824' or $year = ''
    ) then
        ($elem)
    else
        ();

declare variable $html_1 := $schedule/tei:TEI/child::*[not(self::tei:teiHeader)];
declare variable $html := local:dispatch($html_1);

declare function local:dispatch($html_1 as node()*) as item()* {
    for $node in $html_1
    return
        typeswitch ($node)
            case text()
                return
                    $node
            case element(tei:hi)
                return
                    local:hi($node)
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
                    (: case element(tei:add) return local:addElement($node)
  case element(tei:del) return local:delElement($node):)
            case element(tei:head)
                return
                    local:head($node)
            case element(tei:row)
                return
                    local:row($node)
            case element(tei:date)
                return
                    local:date($node)
            case element(tei:seg)
                return
                    local:seg($node)
            case element(tei:measure)
                return
                    local:measure($node)
            case element(tei:cell)
                return
                    local:cell($node)
            default
                return
                    local:passthru($node)

};

(: Recurse through child nodes :)
(:declare function local:passthru($node as node()*) as item()* {:)
declare function local:passthru($node as node()*) as item()* {
    local:dispatch($node/node())
    (:element {name($node)} 
{ if($node/@*!= '')then(
  ($node/@*,local:dispatch($node/node()))
  )else()}:)
};

(: <s> to <span> with attributes :)
declare function local:s($node as element(tei:s)) as element() {
    let $sentence := $node/@n
    return
        <span
            data-sentence="{$sentence}">{local:dispatch($node/node())}</span>
};

(: <p> to <p> with attributes :)
declare function local:p($node as element(tei:p)) as element() {
    <p>{local:dispatch($node/node())}</p>
};

declare function local:lb($node as element(tei:lb)) as element() {
    <br>{local:dispatch($node/node())}</br>
};

declare function local:div($node as element(tei:div)) as element() {
    let $linebreak := $node/@rend
    return
        <div
            align="{$linebreak}">{local:dispatch($node/node())}</div>
};

(: <hi> to <b>, <i>, or <span> :)
declare function local:hi($node as element(tei:hi)) as element() {
    let $rend := $node/@rend
    return
        if ($rend = 'bold') then
            <b>{$node/text()}</b>
        else
            if ($rend = 'italic') then
                <i>{$node/text()}</i>
            else
                if ($rend = 'latintype') then
                    
                    if ($node/parent::tei:head)
                    then
                        (<i>{$node/text()}</i>)
                    else
                        (<td
                            width="300px"><i>{$node/text()}</i></td>)
                
                else
                    if ($rend = 'underline') then
                        <u>{$node/text()}</u>
                    else
                        <span>{$node/text()}</span>
};
(: <quote> to <span> :)
declare function local:quote($node as element(tei:quote)) as element() {
    let $rend := $node/@rend
    return
        if ($rend = 'blockquote') then
            <blockquote>{local:dispatch($node/node())}</blockquote>
        else
            <q>{local:dispatch($node/node())}</q>
};
(: <q> to quote :)
declare function local:q($node as element(tei:q)) as element() {
    <span
        class="quotes">‘{local:dispatch($node/node())}’</span>
};
(: <body> to <div> with id attribute :)
declare function local:body($node as element(tei:body)) as element() {
    <div
        lang="la"
        id="tei-document">{local:dispatch($node/node())}</div>
};

declare function local:table($node as element(tei:table)) as element() {
    
    <span><p></p><table
            border="1"
            cellpadding="10"
            cellspacing="0"
            style="font-size: 12px; border-collapse: collapse; table-layout:fixed; word-wrap:break-word; font-family: arial, sans-serif">{local:dispatch($node/node())}</table></span>
};

declare function local:head($node as element(tei:head)) as element() {
    <caption>{local:dispatch($node/node())}</caption>
};

(:declare function local:hi($node as element(tei:hi)) as element() {
  <tr><td><hi rend="{$node/@rend}">{local:dispatch($node/node())}</hi></td></tr>
};:)

declare function local:row($node as element(tei:row)) as element() {
    <tr>{local:dispatch($node/node())}</tr>
};

declare function local:date($node as element(tei:date)) as element() {
    
    <td
        width="300px">{$node/text()}</td>
};

declare function local:seg($node as element(tei:seg)) as element() {
    <text></text>
};

declare function local:measure($node as element(tei:measure)) as element() {
    <text></text>
};

declare function local:cell($node as element(tei:cell)) as element() {
    let $test := $node/text()
    return
        if ($test != '') then
            (
            <div>{local:dispatch($node/element())}</div>
            (:<div>{local:dispatch($node/tei:rs)}</div>:)
            )
        else
            (
            <div>{local:dispatch($node/node())}</div>
            )
            
            
            (:<div>{local:dispatch($node/element())}</div>:)
};

declare function local:persName($node as element(tei:persName)) as element() {
    (:if($node/@key != '')then(
  <persName><a href="javascript:getPersonContent('{$node/@key}', '{$node/text()}');">{$node}</a></persName>
  else(
  <persName>{$node}</persName>
  ):)
    
    if ($node/parent::tei:add) then
        (
        if ($node/@key != '') then
            (
            <td
                width="300px">
                <persName
                    id='{$node/@key}'><a
                        style="color: inherit"
                        href="javascript:getPersonContentForSchedule('{$node/@key}', '{$node/text()}');">{$node}</a></persName></td>
            )
        else
            (
            <td
                width="300px"><persName>{$node}</persName></td>
            )
        )
    else
        (
        if ($node/@key != '') then
            (
            <td
                width="300px"><persName
                    id='{$node/@key}'><a
                        href="javascript:getPersonContentForSchedule('{$node/@key}', '{$node/text()}');">{$node}</a></persName></td>
            )
        else
            (
            <td
                width="300px"><persName>{$node}</persName></td>
            )
        )
};

declare function local:addElement($node as element(tei:add)) as element() {
    
    (:<form>
 <fieldset style="border:1px; border-style:solid; border-color:LightGray; padding: 5px;">
  <legend style="color:LightGray; text-align:left; font-size:8pt;">add</legend>
  <text>{local:dispatch($node/node())}</text>
 </fieldset>
</form>:)
    
    <span
        style="color:MediumSeaGreen;">{local:dispatch($node/node())}</span>


};

declare function local:delElement($node as element(tei:del)) as element() {
    
    <s
        style="color:Tomato;">{local:dispatch($node/node())}</s>
};

declare function local:rs($node as element(tei:rs)) as element() {
    if ($node/@key != '') then
        (
        (:<rs><a href="javascript:getWorkContent('{$node/@key}', '{$node/text()}');">{$node}</a></rs>:)
        <td
            width="300px"><rs
                id='{$node/@key}'><a
                    href="javascript:getWorkContentForSchedule('{$node/@key}', '{$node/text()}');">{local:dispatch($node/node())}</a></rs></td>
        )
    else
        (
        (:<rs>{$node}</rs>:)
        <td
            width="300px"><rs>{local:dispatch($node/node())}</rs></td>
        )
};



(

$html
)
