mongo  mongodb:27017/hexenverfolgung  --eval ' db.verfolgung.updateMany({"Ort":"Annaburg"},{$set:{"Coordinaten":{"lat":"50.8144193","lon":"13.1009791" }}})'
mongo  mongodb:27017/hexenverfolgung  --eval ' db.verfolgung.updateMany({"Ort":"Oederan"},{$set:{"Coordinaten":{"lat":"55.8144193","lon":"10.1009791" }}})'
mongo  mongodb:27017/hexenverfolgung  --eval ' db.verfolgung.updateMany({"Ort":"Gahlenz"},{$set:{"Coordinaten":{"lat":"49.8144193","lon":"9.1009791" }}})'
mongo  mongodb:27017/hexenverfolgung  --eval ' db.verfolgung.updateMany({"Ort":"Benshausen"},{$set:{"Coordinaten":{"lat":"42.6384261","lon":"12.674297" }}})'
mongo  mongodb:27017/hexenverfolgung  --eval ' db.verfolgung.updateMany({"Ort":"Neustadt/Orla"},{$set:{"Coordinaten":{"lat":"47.6384261","lon":"18.674297" }}})'
mongo  mongodb:27017/hexenverfolgung  --eval ' db.verfolgung.updateMany({"Ort":"Bautzen"},{$set:{"Coordinaten":{"lat":"46.603354","lon":"1.8883335" }}})'
