
import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = ["https://spreadsheets.google.com/feeds", 'https://www.googleapis.com/auth/spreadsheets',
         "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive"]

credentials = ServiceAccountCredentials.from_json_keyfile_name('google_auth_key.json', scope)
client = gspread.authorize(credentials)

spreadsheet = client.open('csv_to_gsheet')

with open('data.csv', 'rb') as file_obj:
    content = file_obj.read()
    client.import_csv(spreadsheet.id, data=content)

print('done')