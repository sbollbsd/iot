Kurzanleitung manueller Datenexport aus Raspi (CCU-Historian):
Auf dem Raspi habe ich eine Tabelle "DATA" angelegt, die alle Datenkanäle von Interesse gesammelt aufnehmen kann.

Select um die Sensor-Kanäle von Interesse zu lesen:
SELECT dp_id,table_name FROM DATA_POINTS where identifier in ('VALVE_STATE','WINDOW_STATE','PRESS_SHORT','LUX','GAS_ENERGY_COUNTER','LEVEL','GAS_POWER','BATTERY_STATE','ENERGY_COUNTER','POWER','CURRENT','VOLTAGE','FREQUENCY','OPERATING_VOLTAGE','HUMIDITY','ACTUAL_TEMPERATURE','BRIGHTNESS','ENERGY_COUNTER','MOTION','STATE','TEMPERATURE')

Ergebnis -> Sensoren von Interesse:
DP_ID	Kanal-Name
3	D_BIDCOS_RF_OEQ1545383_1_STATE
6	D_BIDCOS_RF_OEQ1545383_2_ENERGY_COUNTER
7	D_BIDCOS_RF_OEQ1545383_2_POWER
8	D_BIDCOS_RF_OEQ1545383_2_CURRENT
9	D_BIDCOS_RF_OEQ1545383_2_VOLTAGE
10	D_BIDCOS_RF_OEQ1545383_2_FREQUENCY
11	D_BIDCOS_RF_OEQ2140609_1_STATE
19	D_HMIP_RF_000E58A99C8AEA_0_OPERATING_VOLTAGE
23	D_HMIP_RF_000E58A99C8AEA_1_HUMIDITY
33	D_HMIP_RF_000E58A99C8AEA_1_ACTUAL_TEMPERATURE
41	D_HMIP_RF_000E58A99C8AE9_0_OPERATING_VOLTAGE
45	D_HMIP_RF_000E58A99C8AE9_1_HUMIDITY
55	D_HMIP_RF_000E58A99C8AE9_1_ACTUAL_TEMPERATURE
57	D_BIDCOS_RF_OEQ0537756_3_MOTION
58	D_BIDCOS_RF_OEQ0537756_3_BRIGHTNESS


Insert-Statements um diese Daten in die Gesamttabelle "DATA" zu schreiben:
insert into data( dp_id, ts,value,state ) select '3', ts,value,state from D_BIDCOS_RF_OEQ1545383_1_STATE 
insert into data( dp_id, ts,value,state ) select '6', ts,value,state from D_BIDCOS_RF_OEQ1545383_2_ENERGY_COUNTER
insert into data( dp_id, ts,value,state ) select '7', ts,value,state from D_BIDCOS_RF_OEQ1545383_2_POWER
insert into data( dp_id, ts,value,state ) select '8', ts,value,state from D_BIDCOS_RF_OEQ1545383_2_CURRENT
insert into data( dp_id, ts,value,state ) select '9', ts,value,state from D_BIDCOS_RF_OEQ1545383_2_VOLTAGE
insert into data( dp_id, ts,value,state ) select '10', ts,value,state from D_BIDCOS_RF_OEQ1545383_2_FREQUENCY
insert into data( dp_id, ts,value,state ) select '11', ts,value,state from D_BIDCOS_RF_OEQ2140609_1_STATE
insert into data( dp_id, ts,value,state ) select '19', ts,value,state from D_HMIP_RF_000E58A99C8AEA_0_OPERATING_VOLTAGE
insert into data( dp_id, ts,value,state ) select '23', ts,value,state from D_HMIP_RF_000E58A99C8AEA_1_HUMIDITY
insert into data( dp_id, ts,value,state ) select '33', ts,value,state from D_HMIP_RF_000E58A99C8AEA_1_ACTUAL_TEMPERATURE
insert into data( dp_id, ts,value,state ) select '41', ts,value,state from D_HMIP_RF_000E58A99C8AE9_0_OPERATING_VOLTAGE
insert into data( dp_id, ts,value,state ) select '45', ts,value,state from D_HMIP_RF_000E58A99C8AE9_1_HUMIDITY
insert into data( dp_id, ts,value,state ) select '55', ts,value,state from D_HMIP_RF_000E58A99C8AE9_1_ACTUAL_TEMPERATURE
insert into data( dp_id, ts,value,state ) select '57', ts,value,state from D_BIDCOS_RF_OEQ0537756_3_MOTION
insert into data( dp_id, ts,value,state ) select '58', ts,value,state from D_BIDCOS_RF_OEQ0537756_3_BRIGHTNESS

Export-Statement um diese Tabelle als CSV auf den Raspi zu schreiben: (Transfer geht dann mit WINSCP etc.)
CALL CSVWRITE ('sensor_dump.csv', 'SELECT * FROM DATA')