from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.support import expected_conditions as EC
import time
import sys

login_url = 'https://www.linkedin.com'
base_url = "https://www.linkedin.com/company/amazon/people/"
chrome_driver_path = '/home/danish-khan/scrapers/researchgate/chromedriver'

chrome_options = Options()
#chrome_options.add_argument('--headless')

webdriver = webdriver.Chrome(
  executable_path=chrome_driver_path, options=chrome_options
)

# default login credential and search query
username = 'fidamuhammaddf12@gmail.com'
password = 'fidamuhammad881'

with webdriver as driver:
    # Set timeout time 
    wait = WebDriverWait(driver, 3)

    # retrive url in headless browser
    driver.get(login_url)
    
    driver.find_element_by_id("session_key").send_keys(username)
    driver.find_element_by_id("session_password").send_keys(password)
    driver.find_element_by_class_name("sign-in-form__submit-button").click()
    time.sleep(5)
    
    driver.get(base_url)
    
    
    time.sleep(5)
    selector = '.ember-view link-without-visited-state'
    names = WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector))
    ) 
    for name in names: 
     print(names.text)
    #driver.close()









