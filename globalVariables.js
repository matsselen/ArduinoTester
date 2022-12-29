// MIT License
// Copyright (c) 2021 Mats Selen
// ---------------------------------

'use strict';

// current version
var currentVersion = [0,1,2];

// serial port
var port = null;
var reader = null;
var writer = null;
var serialConnected = false;

// data received on serial port
var rxdata = [];
var writePointer = 0;
var readPointer = 0;


