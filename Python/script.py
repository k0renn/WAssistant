from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from pprint import pprint
import time
import json
from storage import LocalStorage


def main() :
  driver = webdriver.Chrome(executable_path='./chromedriver')  # Optional argument, if not specified will search path.
  driver.get('http://web.whatsapp.com/');

  time.sleep(150)

  save_session(driver)

  # driver.quit()

def save_session(driver) :
  local_storage = LocalStorage(driver)
  pprint(local_storage.items())
  write_file(data = local_storage.items())

def load_session(driver) :
  data = read_file()
  local_storage = LocalStorage(driver)
  local_storage.set_items(data)

def write_file(filename = 'session.json', data = ''):
    f = open(filename, 'w', encoding='utf-8')
    json.dump(data, f, ensure_ascii=False, indent=4)

def read_file(filename = 'session.json'):
    return json.load(open(filename, 'r', encoding='utf-8'))

if __name__ == '__main__':
  main()
