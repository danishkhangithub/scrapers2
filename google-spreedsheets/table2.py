import requests
from bs4 import BeautifulSoup
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import numpy as np
import csv


class  Tablescraper:   
    results = []
    def fetch(self, url):
        print('HTTP GET request to URL: %s' % url, end='')
        response = requests.get(url)
        print(' | Status code: %s' % response.status_code)
        
        return response
    
    def parse(self, html):
        content = BeautifulSoup(html, 'lxml')
   
        tables = content.find_all('table')

        tables2 = tables[5]


        table_method2 = content.find('table', {
                                                  'style': 'font-size:11px',
                                                  'cellspacing': 0
                                              })
        theads = table_method2.find('thead')


        tbody = table_method2.find('tbody')

        #rows
        rows = tbody.find_all('tr', {'class' :'site-search-row'})

        col = [[col.text.strip('\n') for col in row.find_all('td')[1:]] for row in rows]


        #headings
        rows2 = theads.find('tr')

        col2 = rows2.find_all('th',{'class':'t-header'})

        col3 = [col.text for col in rows2.find_all('span', {'class':'t-link'})]


        self.results = [col3]
        self.results.append(col)     
        #print(self.results)  
    '''
    def to_csv(self):
        with open('data2.csv', 'w') as f:
         writer = csv.writer(f)
         writer.writerow(self.col3)
         writer.writerows(self.col)
    '''
        
    def run(self):
       
       scope = ['https://www.googleapis.com/auth/spreadsheets',
                 'https://www.googleapis.com/auth/drive']
                     

       credentials =ServiceAccountCredentials.from_json_keyfile_name('google_auth_key.json', scope)
       gs = gspread.authorize(credentials)
       sh = gs.open('quotes')
       return sh
     
       #for page in range(0, 5):
       #    index = page * 24
       url = 'https://bsaonline.com/ASSG_AdvancedSearch/AdvancedSearchResults?Agricultural=false&Commercial=false&Residential=true&Industrial=false&TimberCutover=false&Developmental=false&AdvancedPropClassSearch=False&uid=128&SaleDateRange=6%2F28%2F2020-12%2F28%2F2020&PriceRange=0-0&AreaRange=0-0&YearBuiltRange=0-0&BedRange=0-0&BathRange=0-0&SearchOrigin=1&DetailResultsGrid-size=50&DetailResultsGrid-page=1'
           
       response = self.fetch(url)       
       self.parse(response.text)
       #self.to_csv()
       
       worksheet = auth().worksheet('sheet1')
       
       array = np.array(self.results)
       worksheet.update('A2', array.tolist())
       
       

if __name__ == '__main__':
    scraper = Tablescraper()
    scraper.run()
    
    
    
    
