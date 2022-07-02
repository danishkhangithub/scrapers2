import requests
from bs4 import BeautifulSoup
import csv
import pandas as pd

states = []

url = 'https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States'

response = requests.get(url)

content = BeautifulSoup(response.text, 'lxml')

table = content.find('table')

tbody = table.find('tbody')

rows = tbody.find_all('tr')


thead = [[th.text.strip().replace('[', '')
         for th in 
         row.find_all('th')[:1]] 
         for row in rows]

for col in thead[2:]:
   states.append(list(col))
print((states))

df = pd.DataFrame(states)

print(df)



#for state in thead:
#states.append(thead)
    
with open('usa_states.text', 'a') as text_file:
    
     text_file.write(df.to_string(header = False, index = False) )


