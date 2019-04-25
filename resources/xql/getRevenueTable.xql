xquery version "3.0";


declare namespace request = "http://exist-db.org/xquery/request";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare namespace xmldb = "http://exist-db.org/xquery/xmldb";
declare namespace system = "http://exist-db.org/xquery/system";
declare namespace transform = "http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $month := request:get-parameter('month', '');
declare variable $year := request:get-parameter('year', '');

declare variable $uri := concat('/db/apps/theater-data/einnahmen/', $year, '/', $year, '_', $month, '.xml');

declare variable $file := doc($uri);
(:declare variable $fileNames := $file/tei:TEI[$file/tei:TEI//tei:profileDesc//tei:keywords/tei:term['Einnahmebeleg']];:)
declare variable $headName := $file//tei:profileDesc//tei:keywords/tei:term['Einnahmebeleg'];
declare variable $schedule := if ($headName != '') then
    ($file)
else
    ();
declare variable $html_1 := $schedule/tei:TEI/child::*[not(self::tei:teiHeader)];
declare variable $html := local:dispatch($html_1);

declare variable $images := if ($headName != '') then
    ($schedule//tei:facsimile/tei:graphic)
else
    ();


declare function local:dispatch($html_1 as node()*) as item()* {
    for $node in $html_1
    return
        typeswitch ($node)
            case text()
                return
                    $node
                    (:case element(tei:s) return local:s($node):)
            case element(tei:p)
                return
                    local:p($node)
            case element(tei:hi)
                return
                    local:hi($node)
            case element(tei:lb)
                return
                    local:lb($node)
            case element(tei:div)
                return
                    local:div($node)
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
            case element(tei:add)
                return
                    local:addElement($node)
            case element(tei:del)
                return
                    local:delElement($node)
            case element(tei:head)
                return
                    local:head($node)
                    (: case element(tei:hi) return local:hi($node):)
            case element(tei:row)
                return
                    local:row($node)
            case element(tei:cell)
                return
                    local:cell($node)
                    (: case element(tei:facsimile) return local:facsimile($node):)
            case element(tei:graphic)
                return
                    local:graphic($node)
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

declare function local:graphic($node as element(tei:graphic)) as element() {
    
    <el
        src='{$node/@url}'
        height='{$node/@height}'
        width='{$node/@width}'></el>
    
    (:let $path := $node/@path
   let $height := $node/@height
   let $width := $node/@width
   return
    <element src='{$path}' height='{$height}' width='{$width}'></element>:)
};

(:declare function local:facsimile($node as element(tei:facsimile)) as element() {
    let $strings := for $elem in $node
    return local:graphic($elem/node())
   return 
        string-join($strings,',')
};:)

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
            <b>{local:dispatch($node/node())}</b>
        else
            if ($rend = 'italic') then
                <i>{local:dispatch($node/node())}</i>
            else
                if ($rend = 'latintype') then
                    <i>{local:dispatch($node/node())}</i>
                else
                    if ($rend = 'underline') then
                        <u>{local:dispatch($node/node())}</u>
                    else
                        <span>{local:dispatch($node/node())}</span>
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
    (:td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;:)
    
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

declare function local:cell($node as element(tei:cell)) as element() {
    <td
        width="300px">{(local:dispatch($node/node()))}</td>
    (:if($node//tei:rs/@type ='work')then(<td width="300px" bgcolor="red">{(local:dispatch($node/node()))}</td>)else(<td width="300px">{(local:dispatch($node/node()))}</td>)
  :)
};

declare function local:persName($node as element(tei:persName)) as element() {
    
    if ($node/parent::tei:add or $node/parent::tei:del) then
        (
        if ($node/@key != '') then
            (
            <persName
                id='{$node/@key}'><a
                    style="color: inherit"
                    href="javascript:getPersonContentForRevenue('{$node/@key}', '{$node/text()}');">{$node}</a></persName>
            )
        else
            (
            <persName>{$node}</persName>
            )
        )
    else
        (
        if ($node/@key != '') then
            (
            <persName
                id='{$node/@key}'><a
                    href="javascript:getPersonContentForRevenue('{$node/@key}', '{$node/text()}');">{$node}</a></persName>
            )
        else
            (
            <persName>{$node}</persName>
            )
        )
};

declare function local:addElement($node as element(tei:add)) as element() {
    <span
        style="color:MediumSeaGreen;">{local:dispatch($node/node())}</span>


};

declare function local:delElement($node as element(tei:del)) as element() {
    <s
        style="color:Tomato;">{local:dispatch($node/node())}</s>
};

declare function local:rs($node as element(tei:rs)) as element() {
    if ($node/parent::tei:add or $node/parent::tei:del)
    then
        (
        if ($node/@key != '')
        then
            (
            <rs
                id='{$node/@key}'><a
                    style="color: inherit"
                    href="javascript:getWorkContentForRevenue('{$node/@key}', '{$node/text()}');">{$node}</a></rs>
            )
        else
            (
            <rs>{$node}</rs>
            )
        )
    else
        (
        if ($node/@key != '')
        then
            (
            <rs
                id='{$node/@key}'><a
                    href="javascript:getWorkContentForRevenue('{$node/@key}', '{$node/text()}');">{$node}</a></rs>
            )
        else
            (
            <rs>{$node}</rs>
            )
        )
};



(

$html
)
