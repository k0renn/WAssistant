
class LocalStorage:

    def __init__(self, driver, items=None) :
        if items is None:
            items = dict()
        self.driver = driver
        self.set_items(items)

    def __len__(self):
        return self.driver.execute_script("return window.localStorage.length;")

    def set_items(self, items) :
        if items is not dict:
            TypeError(items)
        self.driver.execute_script( \
            'window.localStorage.clear();' \
            'var obj = arguments[0];' \
            'for (item in obj)' \
            '  window.localStorage.setItem(item, obj[item]);' \
            , items )

    def add_items(self, items) :
        if items is not dict:
            TypeError(items)
        self.driver.execute_script( \
            'var obj = arguments[0];' \
            'for (item in obj)' \
            '  window.localStorage.setItem(item, obj[item]);' \
            , items )

    def items(self) :
        return self.driver.execute_script( \
            "var ls = window.localStorage, items = {}; " \
            "for (var i = 0, k; i < ls.length; ++i) " \
            "  items[k = ls.key(i)] = ls.getItem(k); " \
            "return items; ")

    def keys(self) :
        return self.driver.execute_script( \
            "var ls = window.localStorage, keys = []; " \
            "for (var i = 0; i < ls.length; ++i) " \
            "  keys[i] = ls.key(i); " \
            "return keys; ")

    def get(self, key):
        return self.driver.execute_script("return window.localStorage.getItem(arguments[0]);", key)

    def set(self, key, value):
        self.driver.execute_script("window.localStorage.setItem(arguments[0], arguments[1]);", key, value)

    def has(self, key):
        return key in self.keys()

    def remove(self, key):
        self.driver.execute_script("window.localStorage.removeItem(arguments[0]);", key)

    def clear(self):
        self.driver.execute_script("window.localStorage.clear();")

    def __getitem__(self, key) :
        value = self.get(key)
        if value is None :
          raise KeyError(f'{key} is not found in the localstorage.')
        return value

    def __setitem__(self, key, value):
        self.set(key, value)

    def __contains__(self, key):
        return key in self.keys()

    def __iter__(self):
        return self.items().__iter__()

    def __repr__(self):
        return self.items().__str__()
