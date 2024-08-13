import json
from jobspy import scrape_jobs
import sys
import pandas as pd 
import os

class JobScraper:
    def dailyScrape(self, search_term, json_file):
        # Only scrapes jobs posted in the last 24 hours
        jobData = []
        countries = ["USA", "Canada"]
        for country in countries:
            try:
                jobs = scrape_jobs(
                    search_term=search_term,
                    country_indeed=country,  
                    verbose=0,                       # Print errors only
                    location=country,
                    hours_old=24,
                    linkedin_fetch_description=True,
                    enforce_annual_salary=True
                )
                jobData.extend(self.cleanseData(jobs, search_term))
            except TimeoutError as e:
                print(f"A timeout error occurred while scraping {search_term}: {e}")
            except Exception as e:
                print(f"An error occurred while scraping {search_term}: {e}")
        
        # Convert jobData to JSON format
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(jobData, f, ensure_ascii=False, indent=4)
            

    def scrape(self, search_term, json_file):
        # Without time restrictions
        jobData = []
        countries = ["Canada"]
        for country in countries:
            try:
                jobs = scrape_jobs(
                    search_term=search_term,
                    country_indeed=country,  
                    verbose=0,                       # Print errors only
                    results_wanted=100,
                    location=country,
                    offset=0,
                    linkedin_fetch_description=True,
                    enforce_annual_salary=True
                )
                jobData.extend(self.cleanseData(jobs, search_term))
            except TimeoutError as e:
                print(f"A timeout error occurred while scraping {search_term}: {e}")
            except Exception as e:
                print(f"An error occurred while scraping {search_term}: {e}")
        
        # Convert jobData to JSON format
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(jobData, f, ensure_ascii=False, indent=4)


    def cleanseData(self, jobs, search_term):

        # Replace NaN values with Null
        jobs = jobs.where(pd.notnull(jobs), None)

        # Prepare jobData list
        jobData = []

        print(f"Found {len(jobs)} jobs")
        
        for index, row in jobs.iterrows():
            try:
                # Check if 'company' field is null or empty
                if pd.isnull(row['company']) or row['company'].strip() == '':
                    raise ValueError(f"Company name is missing for job ID: {row['id']}") # skip
            
                # Ensure 'location' is a string and not empty
                location_str = str(row['location']) if row['location'] else ''

                # Split the 'location' string. Example: "Chicago, IL, USA"
                location_split = location_str.split(',')
                city = location_split[0].strip() if len(location_split) > 0 else ''
                state = location_split[1].strip() if len(location_split) > 1 else ''
                country = location_split[2].strip() if len(location_split) > 2 else ''

                # Handle 'date_posted' being None
                posted_time = row['date_posted'].isoformat() if row['date_posted'] else None
                
                # Convert 'salary' NaN to None
                minSalary = None if pd.isna(row['min_amount']) else row['min_amount']
                maxSalary = None if pd.isna(row['max_amount']) else row['max_amount']

                # Choose the appropriate link
                link = row['job_url_direct'] if row['job_url_direct'] else row['job_url'] # job_url_direct: company site. job_url: job board site.

                # Check if 'title', 'company', or 'link' fields are null or empty
                if pd.isna(row['title']) or row['title'].strip() == '':
                    raise ValueError("Title is missing")
                if pd.isna(row['company']) or row['company'].strip() == '':
                    raise ValueError("Company name is missing")
                if pd.isna(link) or link.strip() == '':
                    raise ValueError("Link is missing")

                data = {
                    'title': row['title'],
                    'searchTerm': search_term,
                    'company': row['company'],
                    'currency': row['currency'],
                    'postedTime': posted_time,              # Convert date to ISO format string                  
                    'description': row['description'],
                    'minSalary': minSalary,
                    'maxSalary': maxSalary,
                    'JobPostingID': row['id'],
                    'link': link,
                    'isRemote': row['is_remote'],
                    'country': country,
                    'state': state,
                    'city': city
                }
                jobData.append(data)

            except Exception as e:
                print(f"Exception: {e} occurred for job ID: {row['id']}")  
                continue  # Skip this job and continue with the next one

        return jobData


if __name__ == '__main__':
    search_term = sys.argv[1] # first cmd line argument
    json_file = 'jobDataJson.json'
    if os.path.exists(json_file):
        os.remove(json_file)

    print(f"Scraping jobs for '{search_term}'...")
    scraper = JobScraper()
    scraper.dailyScrape(search_term, json_file)


