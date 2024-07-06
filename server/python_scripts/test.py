import csv
import time
from jobspy import scrape_jobs
import sys
import pandas as pd 
import json

searchTerm = "Software Engineer"




# #  Hours Old Filters:  15.877912282943726
# #  Hours Old Filters:  5.939743995666504
# #  Hours Old Filters:  6.998088121414185
# #  ------------- ------------- Hours Old Filter ------------- -------------

# start = time.time()

# jobs = scrape_jobs(
#     search_term=searchTerm,
#     verbose=0,                       # print errors only
#     hours_old=24
#     # linkedin_fetch_description=True # get full description and direct job url for linkedin (slower)
# )
# end = time.time()
# print("Hours Old Filters: ", end - start)


# # Blank Filters:  7.656922101974487s
# # Blank Filters:  8.83687710762024
# # Blank Filters:  6.435046911239624
# #  ------------- ------------- Blank Filters ------------- -------------


# # start = time.time()

# # jobs = scrape_jobs(
# #     search_term=searchTerm,
# #     verbose=0,                       # print errors only  
# #     # hours_old=72,
# #     # linkedin_fetch_description=True # get full description and direct job url for linkedin (slower)
# # )
# # end = time.time()
# # print("Blank Filters: ", end - start)


# # # Full Description Filters:  22.871461153030396
# # # Full Description Filters:  9.709332942962646
# # # Full Description Filters:  11.55193305015564
#  ------------- ------------- Full Description Filter ------------- -------------

start = time.time()

jobs = scrape_jobs(
    search_term=searchTerm,
    verbose=0,                       # print errors only
    linkedin_fetch_description=True, # get full description and direct job url for linkedin (slower)
    country_indeed='USA'
)
end = time.time()
print("Full Description Filters: ", end - start)

print(f"Found {len(jobs)} jobs")
print(jobs.head())
jobs.to_csv("countryjobs.csv", quoting=csv.QUOTE_NONNUMERIC, escapechar="\\", index=False) # to_excel




# # # All Filters:  21.26894211769104
# # # All Filters:  10.26953911781311
# # # All Filters:  20.21537208557129
# # #  ------------- ------------- Hours Old And Description Filter ------------- -------------

# # start = time.time()

# # jobs = scrape_jobs(
# #     search_term=searchTerm,   
# #     verbose=0,                       # print errors only
# #     hours_old=24,
# #     linkedin_fetch_description=True # get full description and direct job url for linkedin (slower)
# # )
# # end = time.time()
# # print("All Filters: ", end - start)



# # # Time Filters and Process: 8.252935886383057
# # # All Filters and Process: 13.094388961791992
# # # All Filters and Process:  19.957073211669922
# # # All Filters and Process:  2.2086501121520996
# # #  ------------- ------------- ALl and Process ------------- -------------
# start = time.time()


# jobs = scrape_jobs(
#     search_term=searchTerm,
#     verbose=0,                       # print errors only
#     linkedin_fetch_description=True 
# )

# # Replace NaN values with Null
# jobs = jobs.where(pd.notnull(jobs), None)

# # Prepare jobData list
# jobData = []
# print(f"Found {len(jobs)} jobs")


# for index, row in jobs.iterrows():
#     try:
#         # Check if 'company' field is null or empty
#         if pd.isnull(row['company']) or row['company'].strip() == '':
#             raise ValueError(f"Company name is missing for job ID: {row['id']}") # skip
    
#         # Ensure 'location' is a string and not empty
#         location_str = str(row['location']) if row['location'] else ''

#         # split location. Example: "Edmonton, Alberta, Canada"
#         location_split = location_str.split(',')
#         city = location_split[0].strip() if len(location_split) > 0 else ''
#         state = location_split[1].strip() if len(location_split) > 1 else ''
#         country = location_split[2].strip() if len(location_split) > 2 else ''
        
#         # Convert salary NaN to None
#         salary = None if pd.isna(row['min_amount']) else row['min_amount']

#         # Handle date_posted being None
#         posted_time = row['date_posted'].isoformat() if row['date_posted'] else None

#         # Choose the appropriate link
#         link = row['job_url_direct'] if row['job_url_direct'] else row['job_url'] # job_url_direct: company site, job_url: job board site.

#         data = {
#             'title': row['title'],
#             'company': row['company'],
#             'currency': row['currency'],
#             'postedTime': posted_time,  # Convert date to ISO format string                
#             'description': row['description'],
#             'salary': salary,
#             'JobPostingID': row['id'],
#             'link': link,
#             'isRemote': row['is_remote'],
#             'country': country,
#             'state': state,
#             'city': city
#         }

#         jobData.append(data)
#     except Exception as e:
#         print(f"Exception: {e} occurred for job ID: {row['id']}")  
#         continue  # Skip this job and continue with the next one

# # Convert jobData to JSON format
# with open('jobDataJson.json', 'w', encoding='utf-8') as f:
#     json.dump(jobData, f, ensure_ascii=False, indent=4)

# end = time.time()
# print("All Filters and Process: ", end - start)


