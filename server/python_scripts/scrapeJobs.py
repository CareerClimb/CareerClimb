import json
from jobspy import scrape_jobs
import pandas as pd 
from pymongo.mongo_client import MongoClient


def scraper(search_term="Computer Science", location="USA"):
    jobs = scrape_jobs(
        search_term=search_term,
        location=location # required for indeed/glassdoor
    )
    
    # Check if NaN values are present
    print("NaN values before transformation:")
    print(jobs.isna().sum())

    # Replace NaN values with Null
    jobs = jobs.where(pd.notnull(jobs), None)

    # Fit Schema
    jobData = []
    print(f"Found {len(jobs)} jobs")

    
    for index, row in jobs.iterrows():
        try:
            # Check if 'company' field is null or empty
            if pd.isnull(row['company']) or row['company'].strip() == '':
                raise ValueError(f"Company name is missing for job ID: {row['id']}") # skip
        
            # Ensure 'location' is a string and not empty
            location_str = str(row['location']) if row['location'] else ''

            # split location. Example: "Edmonton, Alberta, Canada"
            location_split = location_str.split(',')
            city = location_split[0].strip() if len(location_split) > 0 else ''
            state = location_split[1].strip() if len(location_split) > 1 else ''
            country = location_split[2].strip() if len(location_split) > 2 else ''
            
            # Convert salary NaN to None
            salary = None if pd.isna(row['min_amount']) else row['min_amount']

            data = {
                'title': row['title'],
                'company': row['company'],
                'currency': row['currency'],
                'postedTime': row['date_posted'].isoformat(),  # Convert date to ISO format string                
                'description': row['description'],
                'salary': salary,
                'JobPostingID': row['id'],
                'link': row['job_url'],
                'isRemote': row['is_remote'],
                'country': country,
                'state': state,
                'city': city
            }

            jobData.append(data)

        except Exception as e:
            print(f"Exception: {e} occurred for job ID: {row['id']}")  
            continue  # Skip this job and continue with the next one

    # Convert jobData to JSON format
    with open('jobDataJson.json', 'w', encoding='utf-8') as f:
        json.dump(jobData, f, ensure_ascii=False, indent=4)



scraper()
