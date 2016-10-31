xquery version "3.0";

module namespace api = "http://www.hoftheater-detmold.de/xquery/api";

(:~
: Returns a JSON representation of all Annotations of a document
:
: @param $uri The document to process
: @return The JSON representation
:)
declare function api:documents($model as map()) {
    "foobar"
};