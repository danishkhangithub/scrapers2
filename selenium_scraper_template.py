from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
import sys

class Scraper:

    url = 'https://www.zillow.com/boston-ma/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22usersSearchTerm%22%3A%22Boston%2C%20MA%22%2C%22mapBounds%22%3A%7B%22west%22%3A-71.25911181640626%2C%22east%22%3A-70.83613818359376%2C%22south%22%3A42.189162794696%2C%22north%22%3A42.437455456234105%7D%2C%22mapZoom%22%3A11%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A44269%2C%22regionType%22%3A6%7D%5D%2C%22isMapVisible%22%3Afalse%2C%22filterState%22%3A%7B%22price%22%3A%7B%22min%22%3A300000%7D%2C%22doz%22%3A%7B%22value%22%3A%221%22%7D%2C%22mp%22%3A%7B%22min%22%3A1142%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%7D%2C%22isListVisible%22%3Atrue%7D'

    def __init__(self):
        self.chrome_driver_path = '/home/danish-khan/scrapers/researchgate/chromedriver'

        self.chrome_options = Options()
        #self.chrome_options.add_argument('--headless')

        self.driver = webdriver.Chrome(
                                         executable_path= self.chrome_driver_path,
                                         options=self.chrome_options
             )

    def fetch(self, data):
        soup = BeautifulSoup(data, 'html.parser')

    def run(self):
        self.driver.get(self.url)
        response = self.driver.page_source
        self.fetch(response)

    def __del__(self):
        # must close the driver after task finished
        self.driver.close()

if __name__ == '__main__':
    scraper = run()
