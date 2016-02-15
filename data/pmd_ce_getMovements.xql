xquery version "3.0";

declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";
declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";

"{
    movements: [
        {id: 'A_mov6', name: 'Movement 6', source_id: 'A'},
        {id: 'A_mov8', name: 'Movement 8', source_id: 'A'},
        {id: 'A_mov9', name: 'Movement 9', source_id: 'A'},
        {id: 'ED_mov1', name: 'Movement 1', source_id: 'ED'}
    ]
}"