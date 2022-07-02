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
base_url = "https://www.linkedin.com/search/results/people/?keywords=accountants%20in%20sydney%20australia&origin=CLUSTER_EXPANSION"
chrome_driver_path = '/home/danish-khan/scrapers/researchgate/chromedriver'
total = []
chrome_options = Options()
#chrome_options.add_argument('--headless')

webdriver = webdriver.Chrome(
  executable_path=chrome_driver_path, options=chrome_options
)

# default login credential and search query
username = 'danishkhankd237@gmail.com'
password = 'dankhanish446'

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
    last_height = driver.execute_script('return document.body.scrollHeight')
    print('height:',last_height)
    time.sleep(5)
   
    while True:
       # Scroll down to bottom
      driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")
    
      time.sleep(2)
      
      #driver.execute_script("window.scrollTo(1, 5000);")
      new_height = driver.execute_script("return document.body.scrollHeight")
      print('new height:' +str(new_height))
      if new_height == last_height:
          break
      last_height = new_height 
    total.append(last_height)   
    
    selector = '.artdeco-card+ .mb2 .t-16 .app-aware-link'  
    names = WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector))
    )
    count = 0
    time.sleep(2)
    
    print(total[0])
    print(len(names))

    for name in names:
       print(name.text,'\n')
       count +=1   
    print('count:',count) 
    
    driver.close()









