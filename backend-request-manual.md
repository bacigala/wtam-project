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
