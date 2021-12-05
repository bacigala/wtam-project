# Backend request manual

## Pouzivatel

### Overenie loginu (prihlasenie)
- request: POST na /api/user/verify { username: 'janci', password: 'sha 256 hash hesla' }
- response ak sa neoveri: {"user":null}
- response ak sa uspesne overi: namiesto null JSON zaznamu v DB tabulka user
{"user":{"id":3,"name":"Jano","surname":"Zákaazníkovič","username":"janci","birth_date":"1993-06-14T22:00:00.000Z","registration_date":"2021-09-09T22:00:00.000Z","last_login_timestamp":"2021-11-23T16:49:18.000Z","email":"janci.zakaznik@janci.sk","password":"56B1DB8133D9EB398AABD376F07BF8AB5FC584EA0B8BD6A1770200CB613CA005","workplace_id":null}}

### Registracia
- request: POST na /api/user/insert {key : value z tabulky user, key2 : value2, ... }
- ak sa nepodari: {"success":false,"message":"Používateľské meno je už obsadené."}
- ak sa podari: {"success":true,"message":"Profil bol úspešne vytvorený."}

### Uprava profilu
- request: POST na /api/user/update
```
	{
		username : "Janci",
		password : "heslo",
		newData	: 	{
						username : "novy_nick",
						password : "nove_heslo"
						...
					}	
	}
```
- ak sa nepodari: {"success":false,"message":"Profil sa nepodarilo upraviť."}
- ak sa podari: {"success":true,"message":"Profil bol úspešne upravený."}

### Odstranenie profilu
- upravte profil, nastavte active="0"

### Nacitanie profilu
 - napriklad pri kliknuti na profil v zozname prihlasenych
 - **request:** POST na `/api/user/profile`
	JSON {id : 3}
 - **response:**
	```
	{
		"user": {
			"id":1,
			"name":"Demeter",
			"surname":"Veselý",
			"username":"demeter1",
			"birth_date":"1999-01-02T23:00:00.000Z", // v DB je to len DATE
			"registration_date":"2021-06-30T22:00:00.000Z", // v DB je to len DATE
			"last_login_timestamp":"2021-11-23T16:43:48.000Z",
			"email":"demeter.vesely@uniba.sk",
			"workplace_id":2,
			"active":1,
			"private":0
		}
	}
	```
	- *hash hesla* v response nie je
	- *active* je vzdy *1*, neaktivne profily su skryte
	- *private* je vzdy *0*, neverejne profily su skryte


## Training list pre kalendar
- nacitanie dat pre kalendar (podla kriterii)
- jednoducha manipulacia s jednym gymom alebo jednym treningom (select dat/uprava/prihllasenie/odhlasenie) je v dalsej casti, tu sa robi SELECT pre kalendar

- request: POST na /api/calendar
```
{
	from : "2021-01-01 12:12:12",   // povinny udaj
	to : "2021-01-01 12:12:12",	// povinny udaj
	
	username : "Janci",	// volitele, treningy len daneho pouzivatela (kde je prihlseny)
	trainer_id : 9, // volitelne, len treningy, ktore vedie dany trener
	gym_id : 2,	// volitelne, len treningy v danom gyme
	category_id : 2 // volitelne, len treningy v danej kategorii
}
```
- response je JSON:
```
{
	events : [
		{
			id : 1,
			name : "Trening s Jancim",
			location : "Miestnost 1",
			from : "2021-01-01 12:12:12",
			to : "2021-01-01 15:12:12",
			max_participants : 20,
			
			plan : ["rozvcicka", "biceps", "strecing"],
			users : [
				{
					id : 1,
					name : "Alojz",
					surname : "Mamut"
				},
				{
					...
				},
				...			
			],
			
			categories : [
				{
					id : 1,
					name : "Silovy",
					color : "f032ab"
				},
				{
					...
				},
				...			
			],			
			
			trainer_id : 1,
			trainer_name : "Franto",
			trainer_surname : "Frantovic",
			
			gym_id : 1,
			gym_name : "Fancy gym",
		},
		{
			...		
		},
		...	
	]
}
```
- ak zadanym parametrom nevyhovuje ziadny trening, pole _events_ je prazdne
- tiez moze byt prazdne pole _users_ ak nikto nie je prihlaseny alebo _categories_ ak trening nie je zaradeny


## Event / Trening

### Prihlasenie sa na trening
- request: POST na /api/event/signin {"userId" : 1, eventId : 1}
- response: JSON {result : true}

### Odhlasenie sa z treningu
- request: POST na /api/event/signout {"userId" : 1, eventId : 1}
- response: JSON {result : true}

### Vytvorenie treningu
- request: POST na /api/event/create
```
{
	gym_id : 1, // *povinne*, musi byt realne gym_id (foreign key)
	trainer_id : 1, // *povinne*, musi byt realne user_id (foreign key)
	name : "Trening s Jancim",
	location : "Posilka vlavo",
	from_datetime : 2021-12-05 13:45:00,
	to_datetime: 2021-12-05 14:50:00,
	max_participants : 20,
	plan : ["rozcvicka","miesenie","strecing"]	
}
```
- response: JSON {result : true}

### Uprava treningu
- request: POST na /api/event/modify
```
{
	id = 1, // jedine *povinne*, ostatne volitelne
	name : "Trening s Jancim",
	gym_id : 1,
	location : "Posilka vlavo",
	from_datetime : 2021-12-05 13:45:00,
	to_datetime: 2021-12-05 14:50:00,
	trainer_id : 1,
	max_participants : 20,
	plan : ["rozcvicka","miesenie","strecing"]	
}
```
- response: JSON {result : true}

### Odstranenie treningu
- *request:* POST na /api/event/delete {"id" : 1}
- *response:* JSON {result : true}


## Achievements (uspechy)

### Pridanie uspechu
- **request** posli JSON nizsie cez POST na `/api/achievement/create`
	```
	{
	  trainer_id = 1, // foreign key v tabulke user
	  sportsman_id = 1, // foreign key v tabulke user
	  name : "Mrtvy tah",
	  value : "20kg"
	}
	```
- **response** JSON
	```
	{
	  success : true
	}
	```

### Uprava uspechu
- **request** posli JSON nizsie cez POST na `/api/achievement/modify`
	```
	{
	  id = 1, // ID uspechu, jedine povinne
	  trainer_id = 1, // foreign key v tabulke user
	  sportsman_id = 1, // foreign key v tabulke user
	  name : "Mrtvy tah",
	  value : "30kg"
	}
	```
	- povinny je len key `id`, ostatne pridavame len ak sa ma zmenit im pridelena hodnota
- **response** JSON
	```
	{
	  success : true
	}
	```
	
### Odstranenie uspechu
- **request** posli JSON nizsie cez POST na `/api/achievement/delete`
	```
	{
	  id = 1, // ID uspechu
	}
	```
- **response** JSON
	```
	{
	  success : true
	}
	```
 
 ### Achievement list pre pouzivatela
 - **request** posli JSON nizsie cez POST na `/api/achievement/list`
	```
	{
	  user_id = 1,
	}
	```
- **response** JSON
	```
	{
	  achievements : [
	    {
		  id = 1, // ID uspechu
		  trainer_id = 1, // foreign key v tabulke user
	      sportsman_id = 1, // foreign key v tabulke user
	      name : "Mrtvy tah",
	      value : "30kg"	
		},
		{
		  ...
		},
		...
	  ]
	}
	```
	- pouzivatel bez uspechov -> `{achievements : []}`
	- neexistujuce *user_id* v request -> `{achievements : []}`
