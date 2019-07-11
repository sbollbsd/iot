/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";

var conn = $.hdb.getConnection();
var query = 'SELECT "DB"."TABLE_NAME", "DB"."ADDRESS" , "DB"."NAME" FROM "IOTDB::Datapoints" as "DB"';
var rs = conn.executeQuery(query);

/*var body = "";
for (var item of rs) {
	if (item.TYPE !== "BOOL") {
		body += item.TABLE_NAME + "\t" +
			item.ADDRESS + "\t" + item.NAME + "\n";
	}
}
*/
$.response.setBody(query);
$.response.contentType = "application/vnd.ms-excel; charset=utf-16le";
$.response.headers.set("Content-Disposition",
	"attachment; filename=Excel.xls");
$.response.status = $.net.http.OK;