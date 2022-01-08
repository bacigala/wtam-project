# Backend request manual
How to use backend API :wink:

## Contents
- [**USER PROFILE**](#user-profile)
	- [creation](#profile-creation)
	- [modification](#profile-modification)
	- [deletion](#profile-deletion)
	- [login](#login)
	- [get profile info by user ID](#get-any-profile-by-id)
- [**TRAINING**](#training)
	- [creation](#training-creation)
	- [modification](#training-modification)
	- [deletion](#training-deletion)
	- [sign in](#sign-in)
	- [sign out](#sign-out)
	- [training list for calendar](#training-list-for-calendar)
- [**ACHIEVEMENT**](#achievement)
	- [creation](#achievement-creation)
	- [modification](#achievement-modification)
	- [deletion](#achievement-deletion)
	- [achievement list for user (by user ID)](#achievement-list-for-user)
- [**TRAINING CATEGORIES**](#training-categories)
	- [creation](#category-creation)
	- [modification](#category-modification)
	- [deletion](#category-deletion)
	- [add event](#add-an-event-to-a-category)
	- [remove event](#remove-an-event-from-a-category)
	- [category list](#get-category-list)
- [**GYM**](#gym)
    - [search for gyms / get specific gym](#search-for-gyms)


## User profile

### Profile creation
- **request**: POST to `/api/user/insert`
	```
	{
	  "name" : "Jano",
	  "surname" : "Zákazníkovič",
	  "username" : "janci",
	  "birth_date" : "1993-06-14T22:00:00.000Z",    // optional
	  "email" : "janci.zakaznik@janci.sk",          // optional
	  "password" : "SHA-256-hash-of-the-password",
	  "workplace_id" : null                         // optional, ID of gym
	}
	```
- **response - registration failed**: JSON
	```
	{
	  "success" : false,
	  "message" : "Používateľské meno je už obsadené."
	}
	```
- **resonse - registration ok**: JSON
	```
	{
	  "success" : true,
	  "message" : "Profil bol úspešne vytvorený."
	}
	```

### Profile modification
- **request**: POST to `/api/user/update`
	```
	{
	  username : "Janci",
	  password : "SHA-256-hash-of-the-password",
	  newData : {
	    username : "new_nick",                         // optional
	    password : "SHA-256-hash-of-the-new-password", // optional
	    ... // add any other data that needs to be updated
	  }	
	}
	```
- **response - modification failed**: JSON
	```
	{
	  "success" : false,
	  "message" : "Profil sa nepodarilo upraviť."
	}
	```
- **response - modification ok**: JSON
	```
	{
	  "success" : true,
	  "message" : "Profil bol úspešne upravený."
	}
	```

### Profile deletion
- send [profile modification request](#profile-modification) and set `active="0"`

### Login
- **request**: send JSON below via POST to `/api/user/verify`
	```
	{
	  username : 'janci',
	  password : 'SHA-256-hash-of-the-password'
	}
	```
- **response - login failed**: JSON
	```
	{
	  user : null
	}
	```
- **response - login ok**: JSON
	```
	{
	  "user" : { 
	    "id" : 3,
	    "name" : "Jano",
	    "surname" : "Zákaazníkovič",
	    "username" : "janci",
	    "birth_date" : "1993-06-14T22:00:00.000Z",
	    "registration_date" : "2021-09-09T22:00:00.000Z",
	    "last_login_timestamp" : "2021-11-23T16:49:18.000Z",
	    "email" : "janci.zakaznik@janci.sk",
	    "password" : "56B1DB8133D9EB398AABD376F07BF8AB5FC584EA0B8BD6A1770200CB613CA005",
	    "workplace_id" : null // ID of gym for trainers
	  }
	}
	```

### Get any profile by ID
- e.g. when some logged-in user wants to view other public profile
- **request:** POST to `/api/user/profile`
	```
	{
	  id : 1
	}
	```
 - **response**:
	```
	{
	  "user": {
	    "id" : 1,
	    "name" : "Demeter",
	    "surname" : "Veselý",
	    "username" : "demeter1",
	    "birth_date" : "1999-01-02T23:00:00.000Z",        // type 'DATE' in DB
	    "registration_date" : "2021-06-30T22:00:00.000Z", // type 'DATE' in DB
	    "last_login_timestamp" : "2021-11-23T16:43:48.000Z",
	    "email" : "demeter.vesely@uniba.sk",
	    "workplace_id" : 2, // null if the user id not a trainer
	    "active" : 1,       // constant, inactive profiles are hidden
	    "private" : 0       // constant, private profiles are hidden
	  }
	}
	```

## Training

### Training creation
- **request**: POST to `/api/event/create`
	```
	{
	  gym_id : 1,     // required, foreign key gym.id
	  trainer_id : 1, // required, foreign key user.id
	  name : "Trening s Jancim",
	  location : "Posilka vlavo",
	  from_datetime : 2021-12-05 13:45:00,
	  to_datetime: 2021-12-05 14:50:00,
	  max_participants : 20,
	  plan : ["rozcvicka","miesenie","strecing"]	
	}
	```
- **response**: JSON
	```
	{
	  result : true
	}
	```

### Training modification
- **request**: POST to `/api/event/modify`
	```
	{
	  id = 1, // the only required value
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
- **response**: JSON
	```
	{
	  result : true
	}
	```

### Training deletion
- **request:** POST to `/api/event/delete`
	```
	{
	  id : 1
	}
	```
- **response:** JSON
	```
	{
	  result : true
	}
	```

### Sign in
- **request**: POST to `/api/event/signin`
	```
	{
	  userId : 1,
	  eventId : 1
	}
	```
- **response**: JSON
	```
	{
	  result : true
	}
	```

### Sign out
- **request**: POST to `/api/event/signout`
	```
	{
	  userId : 1,
	  eventId : 1
	}
	```
- **response**: JSON
	```
	{
	  result : true
	}
	```

### Training list for calendar
- load multiple events specified by some criteria
- **request**: POST to `/api/calendar`
	```
	{
	  from : "2021-01-01 12:12:12", // optional
	  to : "2021-01-01 12:12:12",   // optional
	  username : "Janci",           // optional, get trainings only for specified user
	  trainer_id : 9, // optional
	  gym_id : 2,     // optional
	  category_id : 2,// optional
	  
	  // TIME WITHIN EACH DAY SPECIFIED BY RANGE [from,to] ABOVE
	  from_time : 1345,   // optional, time in format HHMM
	  to_time : 1656,     // optional, time in format HHMM
	  
	  // SEARCH BY TRAINER / GYM / CATEGORY NAME
	  trainer_name : "Richa", // specify substring to be search for
	  gym_name : "Stro",      // specify substring to be search for
	  category_name : "silov",// specify substring to be search for
	}
	```
- **response**: JSON
	```
	{
	  events : [ // this array can be empty if no events match criteria
	    {
	      id : 1,
	      name : "Trening s Jancim",
	      location : "Miestnost 1",
	      from : "2021-01-01 12:12:12",
	      to : "2021-01-01 15:12:12",
	      max_participants : 20,
	      plan : ["rozvcicka", "biceps", "strecing"],

	      users : [ // this array can be empty (no users (yet))
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

	      categories : [ // this array can be empty (no category)
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

## Achievement

### Achievement creation
- **request** POST to `/api/achievement/create`
	```
	{
	  trainer_id = 1,   // foreign key v tabulke user
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

### Achievement modification
- **request** POST to `/api/achievement/modify`
	```
	{
	  id = 1,           // required, achievement ID
	  trainer_id = 1,   // optional, foreign key user.id
	  sportsman_id = 1, // optional, foreign key user.id
	  name : "Mrtvy tah",
	  value : "30kg"
	}
	```
- **response** JSON
	```
	{
	  success : true
	}
	```
	
### Achievement deletion
- **request** POST to `/api/achievement/delete`
	```
	{
	  id = 1, // achievement ID
	}
	```
- **response** JSON
	```
	{
	  success : true
	}
	```
 
 ### Achievement list for user
- **request** POST to `/api/achievement/list`
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
	      id = 1,           // achievement ID
	      trainer_id = 1,   // foreign key user.id
	      sportsman_id = 1, // foreign key user.id
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

## Training categories
Each event can be added to multiple categories.

### Category creation
- **request** POST to `/api/category/create`
	```
	{
	  name : "Silový",
	  color : "abcd45" // HEX
	}
	```
- **response** JSON
	```
	{
	  success : true
	}
	```

### Category modification
- **request** POST to `/api/category/modify`
	```
	{
	  id : 1,          // required, ID of category to be modified
	  name : "Silový", // optional
	  color : "abcd45" // optional
	}
	```
- **response** JSON
	```
	{
	  success : true
	}
	```

### Category deletion
- **request** POST to `/api/category/delete`
	```
	{
	  id : 1, // required, ID of category to be deleted
	}
	```
- **response** JSON
	```
	{
	  success : true
	}
	```

### Add an event to a category
- **request** POST to `/api/category/add`
	```
	{
	  event_id : 1,    // required
	  category_id : 1, // required
	}
	```
- **response** JSON
	```
	{
	  success : true
	}
	```

### Remove an event from a category
 - **request** POST to `/api/category/remove`
	```
	{
	  event_id : 1,    // required
	  category_id : 1, // required
	}
	```
- **response** JSON
	```
	{
	  success : true
	}
	```
	
### Get category list
- **request** POST to `/api/category/list`
- **response** JSON
	```
	{
	  categories : [
	    {
	      id : 1,
	      name : "konicny",
	      color : "AABB77" // HEX
	    },
	    {
	      ...
	    }
	    ...
	  ]
	}
	```
	
## Gym

### Search for gyms
Search for gyms matching some criteria or select a specific gym by ID.
- **request** POST to `/api/gym/search`
	- value specified for key *address* will be searched for in street name, street number, city name and zip code
	```
	{
	  id : 1, // optional, response will contain this gym only (if it exists)
	  name : "Gym",              // optional, specify substring to be search for
	  address : "Bratis",        // optional, specify substring to be search for
	  email : "gym@topgyms.com", // optional, specify substring to be search for
	  phone : "1233221"          // optional, specify substring to be search for
	}
	```
 - **response**	JSON
	```
	{
	  gyms : [
	    {
	      id : 1,
	      name : "strong gym",
	      address : "Pristavna 8, 854 02 Bratislava", // deprecated
	      street_name : "Pristavna",
	      street_number : "8",
	      city : "Bratislava",
	      zip : "98732";
	      email : "emanuel@fmfi.sk",
	      phone : "090x 123 123",
	      opening_hours : [ // may be null if no opening hours are specified
	        {
	          "day" : 1,
	          "from_time" : "07:00:00",
	          "to_time" : "22:00:00"
	        },
	        ...
	      ]
	    },
	    {
	      ...
	    },
	    ...
	  ]
	}
	```
