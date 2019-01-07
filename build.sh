#!/bin/sh

# cleaning the build dir
sencha ant clean

# building the app
sencha app build

# build xar
ant xar