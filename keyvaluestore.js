// Simple Hash library
function KeyValueStore() {
  this._length = 0;
  this._values = {};
}
KeyValueStore.prototype = {
  _isString: function (s) {
    return (typeof(s) == 'string');
  },
  size: function () {
    // return the number of values in the Hash
    return this._length;
  },
  exists: function (k) {
    return (this._isString(k) && (k in this._values));
  },
  get: function (key) {
    if (!this.exists(key)) {
      throw 'hash doesn\'t contain key['+key+']';
    }
    return this._values[key];
  },
  set: function (key, value) {
    if (!this._isString(key)) {
      throw 'hash key must be a string';
    }
    if (!this.exists(key)) {
      // only change length if the key is new
      this._length++;
    }
    this._values[key] = value;
    return this;
  },
  setAll: function (values) {
    // takes an array of objects with two members key & value corresponding to the hash entry to be created
    for(var i in values) {
      this.set(values[i].key, values[i].value);
    }
    return this;
  },
  remove: function (key) {
    if (this.exists(key)) {
      delete this._values[key];
      this._length--;
    }
    return this;
  },
  removeAll: function () {
    this._length = 0;
    this._values = {};
    return this;
  },
  each: function (func) {
    // calls a function for each has member passing it the value and key in that order
    if (this._length > 0) {
      for(var k in this._values) {
        func(this._values[k],k);
      }
    }
    return this;
  },
  filter: function (func) {
    // Looks through each value in the Hash, returning an Hash of all the values that pass a truth test (iterator).
    var r = new Hash();
    if (this._length > 0) {
      for(var k in this._values) {
        func(this._values[k]) && r.set(k,this._values[k]);
      }
    }
    return r;
  },
  reject: function(func) {
    // Looks through each value in the Hash, returning a Hash of all the values that fail a truth test (iterator).
    var r = new Hash();
    if (this._length > 0) {
      for(var k in this._values) {
        !func(this._values[k]) && r.set(k,this._values[k]);
      }
    }
    return r;
  },
  keys: function () {
    // return an array of keys
    var a = [];
    if (this._length>0) {
      for(var k in this._values) {
        a.push(k);
      }
    }
    return a;
  },
  values: function () {
    // return an array of values
    var a = [];
    if (this._length>0) {
      for(var k in this._values) {
        a.push(this._values[k]);
      }
    }
    return a;
  },
  toArray: function () {
    // return an array of objects, which have two members: key & value corresponding to the hash entry
    var a = [];
    if (this._length>0) {
      for(var k in this._values) {
        a.push({
          'key': k,
          'value': this._values[k]
        });
      }
    }
    return a;
  }
};
