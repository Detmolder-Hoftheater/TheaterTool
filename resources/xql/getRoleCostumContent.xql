xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";
                 
declare variable  $bookName := request:get-parameter('regieName', '');

declare variable  $path := 'xmldb:exist:///apps/theater-data/rollen_kostuem/';

declare variable $file := collection($path);
declare variable $fileNames := $file/tei:TEI[tei:teiHeader//tei:titleStmt[1][tei:title = $bookName]];
declare variable $html_1 := $fileNames/tei:text/tei:body/child::*;
declare variable $html := local:dispatch($html_1);


  declare function local:dispatch($html_1 as node()*)  as item()* {
  for $node in $html_1
  return
  typeswitch($node)
  case text() return $node
  case element(tei:s) return local:s($node)
  case element(tei:p) return local:p($node)
  case element(tei:hi) return local:hi($node)
  case element(tei:lb) return local:lb($node)
  case element(tei:div) return local:div($node)
  case element(tei:table) return local:table_1($node)
  (:case element(tei:text) return local:body($node):)
  case element(tei:persName) return local:persName($node)
  case element(tei:add) return local:addElement($node)
  case element(tei:del) return local:delElement($node)
  case element(tei:rs) return local:rs($node)
 (: case element(tei:ref) return local:ref($node):)
  case element(tei:head) return local:head($node)
 (: case element(tei:hi) return local:hi($node):)
  case element(tei:row) return local:row($node)
  case element(tei:cell) return local:cell($node)
  default return local:passthru($node)
  
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
  <span data-sentence="{$sentence}">{local:dispatch($node/node())}</span>
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
  <div align="{$linebreak}">{local:dispatch($node/node())}</div>
};

(: <hi> to <b>, <i>, or <span> :)
declare function local:hi($node as element(tei:hi)) as element() {
  let $rend := $node/@rend
  return
  if ($rend = 'bold') then
    <b>{local:dispatch($node/node())}</b>
  else if ($rend = 'italic') then
    <i>{local:dispatch($node/node())}</i>
     else if ($rend = 'latintype') then
    <i>{local:dispatch($node/node())}</i>
    else if ($rend = 'underline') then
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
  <span class="quotes">‘{local:dispatch($node/node())}’</span>
};
(: <body> to <div> with id attribute :)
declare function local:body($node as element(tei:body)) as element() {
(:let $tableid := $node/tei:table/@xml:id
  return
  if($tableid = '')then(
local:dispatch($node/node())
)else():)
<p>local:dispatch($node/node())</p>
};

(:declare function local:table($node as element(tei:table)) as element() {
(\:td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;:\)
    

  <table id="{$node/@xml:id}" border="1" cellpadding="10" cellspacing="0" style="font-size: 12px; width:100%; font-family: arial, sans-serif">{local:dispatch($node/node())} </table>
 (\:display:none;
 <a href="#" onclick="toggle()">Toggle</a>:\)
};:)

declare function local:table_1($node as element(tei:table)) as element() {
(:let $tableid := $node/@xml:id
  return
  if($tableid ="")then(
  <p>{local:dispatch($node/node())}</p>
)else():)


  <span><p></p><table border="1" cellpadding="10" cellspacing="0" style="font-size: 12px; table-layout:fixed; word-wrap:break-word; font-family: arial, sans-serif">{local:dispatch($node/node())}
  </table></span>

 
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
  <td width="300px">{(local:dispatch($node/node()))}</td>
};

declare function local:ref($node as element(tei:ref)) as element() { 
  let $target := substring($node/@target, 2)
  return
 
 <span>{local:dispatch($node//tei:table[@xml:id = $target])}
  </span>
  
 (: <p>{local:table($node/ancestor::node()//tei:table[@xml:id = $target])}</p>:)
  (:if($node != '')then(
  <p>{local:table($node/ancestor::node()//tei:table[@xml:id = $target])}</p>
  )else(
    if($html_1 != '')then(
    <p>{local:table($html_1/ancestor::node()//tei:table[@xml:id = $target])}</p>
    )else()
    
    ):)
  
  (: return
  if($node != '')then(
  <p>{local:table(./ancestor::node()//tei:table[@xml:id = $target])}</p>
  )else(<p>{$target}test</p>):)
};

declare function local:persName($node as element(tei:persName)) as element() {
if($node/parent::tei:add)then(
if($node/@key != '')then(
  <persName id='{$node/@key}'><a style="color: inherit" href="javascript:getPersonContent('{$node/@key}', '{$node/text()}');">{$node}</a></persName>
  )
  else(
  <persName>{$node}</persName>
  )
)else(
if($node/@key != '')then(
  <persName id='{$node/@key}'><a href="javascript:getPersonContent('{$node/@key}', '{$node/text()}');">{$node}</a></persName>
  )
  else(
  <persName>{$node}</persName>
  )
)

};

(:declare function local:persName_1($node as element(tei:persName)) as element() {
if($node/@key != '')then(
  <persName><a style="color: inherit" href="javascript:getPersonContent('{$node/@key}', '{$node/text()}');">{$node}</a></persName>
  )
  else(
  <persName>{$node}</persName>
  )
};
:)
declare function local:addElement($node as element(tei:add)) as element() {

(:<form>
 <fieldset style="border:1px; border-style:solid; border-color:LightGray; padding: 5px;">
  <legend style="color:LightGray; text-align:left; font-size:8pt;">add</legend>
  <text>{local:dispatch($node/node())}</text>
 </fieldset>
</form>:)

    <span style="color:MediumSeaGreen;">{local:dispatch($node/node())}</span>


};

declare function local:delElement($node as element(tei:del)) as element() {
(:<form>
 <fieldset style="border:1px; border-style:solid; border-color:LightGray; padding: 5px;">
  <legend style="color:LightGray; text-align:left; font-size:8pt;">del</legend>
  <text>{local:dispatch($node/node())}</text>
 </fieldset>
</form>:)
<s style="color:Tomato;">{local:dispatch($node/node())}</s>
};

declare function local:rs($node as element(tei:rs)) as element() {
if($node/@key != '' and $node/tei:ref)then(
  (:<rs><a href="javascript:getWorkContent('{$node/@key}', '{$node/text()}');">{$node}</a><p>{local:dispatch($node/node())}</p></rs>:)
 <rs id='{$node/@key}'><a href="javascript:getWorkContent('{$node/@key}', '{$node/text()}');">{$node}</a><p>{local:dispatch($node/node())}</p></rs>
  )
  else(
    if($node/@key != '' )
    (:then(<rs><a href="javascript:getWorkContent('{$node/@key}', '{$node/text()}');">{$node}</a></rs>:)
    then(<rs id='{$node/@key}'><a href="javascript:getWorkContent('{$node/@key}', '{$node/text()}');">{local:dispatch($node/node())}</a></rs>
 )
    else(
 (: <rs>{$node}</rs>:)
   <rs>{local:dispatch($node/node())}</rs>
  )
  )
};

(
    $html
    )