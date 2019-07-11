/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";
//https://github.com/SAPDocuments/Tutorials/blob/master/tutorials/xsa-node-modules/xsa-node-modules.md

var https = require("https");
var xsjs = require("@sap/xsjs");
var xsenv = require("@sap/xsenv");
var port = process.env.PORT || 30000;
var server = require("http").createServer();
/*
https.globalAgent.options.ca = xsenv.loadCertificates();

global.__base = __dirname + "/";
var init = require(global.__base + "utils/initialize");

//Initialize Express App for XSA UAA and HDBEXT Middleware
var app = init.initExpress();

//Setup Routes
var router = require("./router")(app, server);

//Initialize the XSJS Compatibility Layer
init.initXSJS(app);

//Start the Server
server.on("request", app);

server.listen(port, function () {
	console.info("HTTP Server: " + server.address().port);
});*/

var options = {
	anonymous: true, // remove to authenticate calls
	redirectUrl: "/index.xsjs"
};

// configure HANA
try {
	options = Object.assign(options, xsenv.getServices({
		hana: {
			tag: "hana"
		}
	}));
} catch (err) {
	console.log("[WARN]", err.message);
}

// configure UAA
try {
	options = Object.assign(options, xsenv.getServices({
		uaa: {
			tag: "xsuaa"
		}
	}));
} catch (err) {
	console.log("[WARN]", err.message);
}

// start server
xsjs(options).listen(port);

console.log("Server listening on port %d", port);