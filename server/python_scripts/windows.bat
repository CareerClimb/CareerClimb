:: Check if virtual environment directory exists
if not exist "venv\" (
  :: Create a virtual environment
  python -m venv venv
)

:: Activate the virtual environment
call venv\Scripts\activate

:: Install dependencies
pip install --upgrade pip
pip install -U python-jobspy

:: Run the Python script
python3 ./python_scripts/scrapeJobs.py