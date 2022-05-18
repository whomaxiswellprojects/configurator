# Sections

- [Sections](#sections)
- [easy-configurator](#easy-configurator)
- [How to use](#how-to-use)
- [Utilities](#utilities)
- [Credits](#credits)

# easy-configurator
easy-configurator is a JSON type configurator that saves json data to files that ends with custom extension also with loading it can load a file that has saved json data and parses it

# How to use

This is how to use it
```js
const Configurator = require("easy-configurator"); // Require Easy Configurator
const config = new Configurator("myfile.ext").createNew(); // This creates a new file named myfile.ext
const config2 = new Configurator("myfile.ext").load(); // This loads a new json data file named myfile.ext
```

Setting/getting/removing/saving in easy-configurator
```js
const Configurator = require("easy-configurator"); // Require Easy Configurator
const config = new Configurator("myfile.ext").createNew(); // Creating a new File : setting and removing returns to this

//Setting
config.set("mykey", "myvalue"); // the set function has two params: (key, value) returns to the class which is the config class that we created

//Getting
config.get("mykey"); // the get function has one param: (key) returns the key inside the json data file

//Removing
config.remove("mykey"); // the remove function has one param: (key) removes a key and returns to the class which is the config class that we created

// Saving
config.save(); // the save function overwrites the file that existed in the workspace/folder if there is no file it will create a file, if there is a file and the file was loaded then it overwrites it
```

# Utilities
- [x] Saving
- [x] Loading
- [0] AutoSaving

# Credits
<h1>WhomaxiswellProjects (R) Copyright-claimed 2016</h1>
