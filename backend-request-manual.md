#Backend request manual

##Pouzivatel

###Overenie loginu
- request: POST na /api/user/verify { username: 'janci', password: 'heslo' }
- response ak sa neoveri: {"user":null}
- response ak sa uspesne overi: namiesto null JSON zaznamu v DB tabulka user
{"user":{"id":3,"name":"Jano","surname":"Zákaazníkovič","username":"janci","birth_date":"1993-06-14T22:00:00.000Z","registration_date":"2021-09-09T22:00:00.000Z","last_login_timestamp":"2021-11-23T16:49:18.000Z","email":"janci.zakaznik@janci.sk","password":"56B1DB8133D9EB398AABD376F07BF8AB5FC584EA0B8BD6A1770200CB613CA005","workplace_id":null}}

