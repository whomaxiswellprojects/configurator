const BaseConfig = require("./config/BaseConfig");
const fs = require('fs');
const { NoFileError, NoKeyFound, EasyConfig } = require("./src/global");

class ConfiguratorArray {
    /**
     * 
     * @param {any[]} array 
     */
    constructor(array) {
        this.ARRAY = array;
    }

    /**
     * overwrites a key inside the json data
     * @param {*} key 
     * @param {*} value 
     * @returns 
     */
    set(value) {
        this.ARRAY.push(value);
        return this;
    }

    /**
     * Gets the key from the json data if its included
     * @param {*} key 
     * @returns 
     */
    get(key) {
        if (this.has(key)) {
            return this.ARRAY[key];
        } else {
            return null;
        }
    }

    /**
     * Checks if the key is included in the json data
     * @param {*} key 
     * @returns 
     */
    has(key) {
        if (this.ARRAY[key] != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Removes a key that is in the json data
     * @param {*} key 
     * @returns 
     */
    remove(key) {
        if (this.has(key)) {
            delete this.ARRAY[key];
            return this;
        } else {
            return null;
        }
    }
}

class ConfiguratorDictionary {
    constructor(dictionary) {
        this.DICTIONARY = dictionary;
    }

    /**
     * overwrites a key inside the json data
     * @param {*} key 
     * @param {*} value 
     * @returns 
     */
    set(key, value) {
        this.DICTIONARY[key] = value;
        return this;
    }

     /**
     * Gets the key from the json data if its included
     * @param {*} key 
     * @returns 
     */
    get(key) {
        if (this.has(key)) {
            return this.DICTIONARY[key];
        } else {
            return null;
        }
    }

    /**
     * Returns to the array inside the json data if its found
     * @param {*} arrayName 
     * @returns 
     */
     getArray(arrayName) {
        if (this.has(arrayName)) {
            return new ConfiguratorArray(this.DICTIONARY[arrayName]);
        } else {
            throw new NoKeyFound("Couldn't remove key, is the key there?")
        }
    }

    /**
     * Returns to the dictionary inside the json data if its found
     * @param {*} dictionaryName 
     * @returns 
     */
    getDictionary(dictionaryName) {
        if (this.has(dictionaryName)) {
            return new ConfiguratorDictionary(this.DICTIONARY[dictionaryName]);
        } else {
            throw new NoKeyFound("Couldn't remove key, is the key there?")
        }
    }

    /**
     * Checks if the key is included in the json data
     * @param {*} key 
     * @returns 
     */
    has(key) {
        if (this.DICTIONARY[key] != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Removes a key that is in the json data
     * @param {*} key 
     * @returns 
     */
    remove(key) {
        if (this.has(key)) {
            delete this.DICTIONARY[key];
            return this;
        } else {
            return null;
        }
    }
}

class ConfiguratorFile {

    /**
     * 
     * @param {string} fn 
     * @param {*} items 
     * @param {EasyConfig} config 
     */
    constructor(fn, items, config) {
        this.ITEMS = JSON.parse(items);
        this.config = config;
        this.fn = fn;
    }

    /**
     * overwrites a key inside the json data
     * @param {*} key 
     * @param {*} value 
     * @returns 
     */
    set(key, value) {
        this.ITEMS[key] = value;
        if (this.config.autosave) {
            this.save();
        }
        return this;
    }

    /**
     * Gets the key from the json data if its included
     * @param {*} key 
     * @returns 
     */
    get(key) {
        if (this.has(key)) {
            return this.ITEMS[key];
        } else {
            throw new NoKeyFound("Couldn't remove key, is the key there?")
        }
    }

    /**
     * Returns to the array inside the json data if its found
     * @param {*} arrayName 
     * @returns 
     */
    getArray(arrayName) {
        if (this.has(arrayName)) {
            return new ConfiguratorArray(this.ITEMS[arrayName]);
        } else {
            throw new NoKeyFound("Couldn't remove key, is the key there?")
        }
    }

    /**
     * Returns to the dictionary inside the json data if its found
     * @param {*} dictionaryName 
     * @returns 
     */
    getDictionary(dictionaryName) {
        if (this.has(dictionaryName)) {
            return new ConfiguratorDictionary(this.ITEMS[dictionaryName]);
        } else {
            throw new NoKeyFound("Couldn't remove key, is the key there?")
        }
    }

    /**
     * Checks if the key is included in the json data
     * @param {*} key 
     * @returns 
     */
    has(key) {
        if (this.ITEMS[key] != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Removes a key that is in the json data
     * @param {*} key 
     * @returns 
     */
    remove(key) {
        if (this.has(key)) {
            delete this.ITEMS[key];
            if (this.config.autosave) {
                this.save();
            }
            return true;
        } else {
            throw new NoKeyFound("Couldn't remove key, is the key there?")
        }
    }

    /**
     * Saves the json data to the file sat in the Configurator class
     * @returns
     */
    save() {
        if (!fs.existsSync(this.fn)) {
            throw new NoFileError("File not found, is the file there?")
        }
        fs.writeFileSync(this.fn, JSON.stringify(this.ITEMS));
        return this;
    }
}

class Configurator extends BaseConfig {

    /**
     * ---------------------
     * : easy-configurator :
     * ---------------------
     * 
     * Json Configurator sets/removes/gets/checks/saves
     * - - - Utilities:
     * - Creats
     * - Saves
     * - AutoSaver
     * @param {string} file
     * @param {EasyConfig} config
     */
    constructor(file, config) {
        super();
        this.FILE = file;
        this.config = config;
    }

    /**
     * Loads a file that has json data inside
     * @returns 
     */
    load() {
        if (!fs.existsSync(this.FILE)) {
            throw new NoFileError("File not found, is the file there?");
        }
        return new ConfiguratorFile(this.FILE, fs.readFileSync(this.FILE), this.config);
    }

    /**
     * Creates a new Json Data file
     * @returns 
     */
    createNew() {
        return new ConfiguratorFile(this.FILE, "{}", this.config);
    }
}

module.exports = Configurator;